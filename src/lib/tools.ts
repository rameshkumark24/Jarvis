import { SchemaType } from "@google/generative-ai";

export const tools = [
    {
        name: "getCurrentTime",
        description: "Get the current time and date",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {},
        },
    },
    {
        name: "getWeather",
        description: "Get the current weather for a specific location",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                location: {
                    type: SchemaType.STRING,
                    description: "The city and state, e.g. San Francisco, CA",
                },
            },
            required: ["location"],
        },
    },
];

export const functions = {
    getCurrentTime: async () => {
        return new Date().toLocaleString();
    },
    getWeather: async ({ location }: { location: string }) => {
        try {
            const response = await fetch(`https://wttr.in/${encodeURIComponent(location)}?format=3`);
            if (!response.ok) throw new Error("Weather service unavailable");
            const text = await response.text();
            return text.trim();
        } catch (error) {
            return "I couldn't fetch the weather information at the moment.";
        }
    },
};
