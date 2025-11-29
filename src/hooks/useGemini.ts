// src/hooks/useGemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export function useGemini() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (message: string) => {
        if (!API_KEY) {
            const msg =
                "API Key not found. Please set VITE_GEMINI_API_KEY in your .env file.";
            setError(msg);
            return msg;
        }

        setIsLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);

            // Use a current, supported model name:
            // "gemini-flash-latest" (alias) or pin to "gemini-2.0-flash" / "gemini-2.5-flash"
            const model = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
            });

            const chat = model.startChat();
            const result = await chat.sendMessage(message);
            const response = await result.response;

            return response.text();
        } catch (err) {
            console.error("Gemini API Error:", err);
            const errorMessage =
                err instanceof Error ? err.message : "Unknown error occurred";
            setError(errorMessage);
            return `Error: ${errorMessage}. Please check the console for more details.`;
        } finally {
            setIsLoading(false);
        }
    };

    return { sendMessage, isLoading, error };
}
