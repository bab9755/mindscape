import { Request, Response, NextFunction, RequestHandler } from "express";
import logger from "../utils/logger";
import { openai } from "../services/openai";
import { MAX_FOLLOWUP_ROUNDS } from "../utils/utils";
import { tools } from "../tools/tools";
import { executeTool } from "../tools/tools";




export const analysisAgent: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { messages, model = "google/gemini-2.0-flash-001" } = req.body;
        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: "Invalid messages format" });
            return;
        }

        if (!process.env.OPENROUTER_API_KEY) {
            logger.error("OPENROUTER_API_KEY is not set in environment variables");
            res.status(500).json({ error: "OPENROUTER_API_KEY is not set" });
            return;
        }

        //tool call accumulator
        const allToolResults = [];
        let currentMessages = [...messages];
        let currentResponse;
        let shouldContinue = true;
        let roundsCompleted = 0;


        const firstResponse = await openai.chat.completions.create({
            model,
            messages,
            tools: tools,
        });

        currentResponse = firstResponse;

        while (shouldContinue && roundsCompleted < MAX_FOLLOWUP_ROUNDS) {
            const assistantMessage = currentResponse.choices?.[0]?.message;
            if (!assistantMessage) {
                logger.error("No message in the response");
                res.status(500).json({ error: "No message in the response" });
                return;
            }
            if(!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
                logger.info("No tool calls in the response, ending analysis");
                shouldContinue = false;
                break;
            }   
            console.log(`Rounds completed: ${roundsCompleted + 1}`);
            const toolResults = assistantMessage.tool_calls.map(async (toolCall) => {
                const toolName = toolCall.function?.name;
                if (!toolName) {
                    logger.error("Tool call does not have a function name");
                    return;
                }
                const parameters = toolCall.function?.arguments;
                if (!parameters) {
                    logger.error("Tool call does not have parameters");
                    return;
                }
                try {
                    // Parse the parameters from JSON string to object
                    const parsedParameters = JSON.parse(parameters);
                    logger.info(`Executing tool ${toolName} with parameters: ${JSON.stringify(parsedParameters)}`);
                    const result = await executeTool(toolName, parsedParameters);
                    return { tool_call_id: toolCall.id, toolName, result };
                } catch (error: any) {
                    logger.error(`Error executing tool ${toolName}: ${error.message}`);
                    logger.error(`Parameters received: ${parameters}`);
                    logger.error(`Error: ${error.message}`);
                    return { toolName, error: error.message };
                }
            });
            const resolvedToolResults = await Promise.all(toolResults);
            allToolResults.push(...resolvedToolResults);
            currentMessages.push(assistantMessage);

            const toolResponseMessage = resolvedToolResults.map((result) => ({
                role: "tool",
                tool_call_id: result?.tool_call_id,
                name: result?.toolName,
                content: JSON.stringify(result?.result || result?.error || {}),
            }));
            currentMessages.push(...toolResponseMessage);


            if (roundsCompleted < MAX_FOLLOWUP_ROUNDS - 1) {
                const followupResponse = await openai.chat.completions.create({
                    model,
                    messages: currentMessages,
                    tools: tools,
                });
                currentResponse = followupResponse;
                roundsCompleted++;
            } else {
                const finalResponse = await openai.chat.completions.create({
                    model,
                    messages: currentMessages,
                    tools: tools,
                });
                currentResponse = finalResponse;
                shouldContinue = false;
            }

        }
        res.json({
            analysis: currentResponse.choices?.[0]?.message?.content || "",
            toolResults: allToolResults,
        });

    } catch (error: any) {
        logger.error(`Error in analysisAgent: ${error.message} ${error.stack}, ${error.code}`);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
}
