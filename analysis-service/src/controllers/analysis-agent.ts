import { Request, Response, NextFunction, RequestHandler } from "express";
import logger from "../utils/logger";
import { openai } from "../services/openai";
import { MAX_FOLLOWUP_ROUNDS } from "../utils/utils";
import { tools } from "../tools/tools";
import { executeTool } from "../tools/tools";
export const analysisAgent: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { transcription, model = "google/gemini-2.0-flash-001" } = req.body;
        if (!transcription || typeof transcription !== "string") {
            res.status(400).json({ error: "Missing or invalid transcription" });
            return;
        }

        if (!process.env.OPENROUTER_API_KEY) {
            logger.error("OPENROUTER_API_KEY is not set in environment variables");
            res.status(500).json({ error: "OPENROUTER_API_KEY is not set" });
            return;
        }
        const messages = [
            {
                role: "system" as const,
                content: "You are a helpful assistant that analyzes journal entries to identify emotions, struggles, and gratitude as JSON. After analysis, provide a brief reflection for the user."
            },
            {
                role: "user" as const,
                content: `Analyze this journal entry: "${transcription}"`
            }
        ];

        const firstResponse = await openai.chat.completions.create({
            model,
            messages: messages as any,
            tools,
        });

        const assistantMessage = firstResponse.choices?.[0]?.message;
        let analysis = null;
        let toolResults = [];
        if (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
            const toolCall = assistantMessage.tool_calls[0];
            const parameters = toolCall.function?.arguments;
            if (parameters) {
                try {
                    const parsedParameters = JSON.parse(parameters);
                    logger.info(`Executing tool ${toolCall.function?.name} with parameters: ${JSON.stringify(parsedParameters)}`);
                    const result = await executeTool(toolCall.function?.name, parsedParameters);
                    analysis = result;
                    toolResults.push({ tool_call_id: toolCall.id, toolName: toolCall.function?.name, result });
                } catch (error: any) {
                    logger.error(`Error executing tool ${toolCall.function?.name}: ${error.message}`);
                    logger.error(`Parameters received: ${parameters}`);
                    logger.error(`Error: ${error.message}`);
                    toolResults.push({ toolName: toolCall.function?.name, error: error.message });
                }
            }
        }

        // 4. Ask for a reflection (follow-up prompt)
        const reflectionPrompt = [
            ...messages,
            {
                role: "assistant" as const,
                content: `Analysis: ${JSON.stringify(analysis)}`
            },
            {
                role: "user" as const,
                content: "Based on this analysis, provide a brief, empathetic reflection for the user."
            }
        ];
        const reflectionResponse = await openai.chat.completions.create({
            model,
            messages: reflectionPrompt as any // Same as above, cast if needed
        });
        const reflection = reflectionResponse.choices?.[0]?.message?.content;

        // 5. Respond
        res.json({
            analysis,
            reflection,
            toolResults,
        });

    } catch (error: any) {
        logger.error(`Error in analysisAgent: ${error.message} ${error.stack}, ${error.code}`);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
}
