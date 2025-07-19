import { openai } from "../services/openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const emotionSchema = z.object({
    name: z.string(),
    score: z.number(),
    description: z.string()
})

const analysisSchema = z.object({
    emotions: z.array(emotionSchema),
    struggles: z.array(z.string()),
    gratitude: z.array(z.string())
})

const analysisTool = {
    type: "function", 
    function: {
        name: "analyse_entry",
        description: "Analyze a journal entry transcription to identify emotions, struggles, and gratitude. Use this tool whenever you receive a journal entry or personal reflection that needs emotional analysis and insight extraction.",
        parameters: {
            type: "object",
            properties: {
                transcription: {
                    type: "string",
                    description: "The journal entry transcription to analyze for emotions, struggles, and gratitude."
                }
            },
            required: ["transcription"]
        }
    }
}


export const executeTool = async (toolName: string, parameters: any): Promise<any> => {
    if (toolName === "analyse_entry") {
        console.log(`Executing tool ${toolName} with parameters: ${JSON.stringify(parameters)}`);
        const { transcription } = parameters;
        console.log(`Received parameters:`, parameters);
        console.log(`Transcription type:`, typeof transcription);
        console.log(`Transcription length:`, transcription?.length);
        console.log(`Transcription value:`, transcription);
        
        if (!transcription || typeof transcription !== "string") {
            throw new Error("Invalid parameters for analyse_entry tool");
        }
        const response = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that analyzes journal entries to identify emotions, struggles, and gratitude as json format, each being arrays of strings" },
                { role: "user", content: transcription }
            ],
            response_format: { type: "json_object" }
        });
        const analysis = response.choices[0].message.content;
        console.log(`Analysis from the conversation: ${analysis}`);
        return JSON.parse(analysis || "{}");
    } else {
        throw new Error(`Tool ${toolName} is not implemented`);
    }
};


export const tools = [
    analysisTool
].map(tool => ({
    ...tool,
    type: "function" as const
}));

