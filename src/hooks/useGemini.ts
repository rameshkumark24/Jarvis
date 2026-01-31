// src/hooks/useGemini.ts
import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { useState, useRef } from "react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export function useGemini() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // FIX: Use a Ref to keep the chat session (and history) alive across renders
    const chatSession = useRef<ChatSession | null>(null);

    const sendMessage = async (message: string) => {
        if (!API_KEY) {
            const msg = "API Key not found. Please set VITE_GEMINI_API_KEY in your .env file.";
            setError(msg);
            return msg;
        }

        setIsLoading(true);
        setError(null);

        try {
            // FIX: Only start a new chat if one doesn't exist yet
            if (!chatSession.current) {
                const genAI = new GoogleGenerativeAI(API_KEY);
                // Updated to a specific model version for stability
                const model = genAI.getGenerativeModel({
                    model: "gemini-2.0-flash", 
                });
                chatSession.current = model.startChat({
                    // Optional: You can preload history here if you ever add save/load functionality
                    history: [],
                });
            }

            // Send message to the existing session
            const result = await chatSession.current.sendMessage(message);
            const response = await result.response;

            return response.text();
        } catch (err) {
            console.error("Gemini API Error:", err);
            const errorMessage =
                err instanceof Error ? err.message : "Unknown error occurred";
            setError(errorMessage);
            
            // Optional: Reset session on critical errors so the user can try starting fresh
            chatSession.current = null; 
            
            return `Error: ${errorMessage}. Please check the console for more details.`;
        } finally {
            setIsLoading(false);
        }
    };

    return { sendMessage, isLoading, error };
}
