import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'; // Added Volume icons
import ReactMarkdown from 'react-markdown';
import { VoiceVisualizer } from './VoiceVisualizer';
import { useGemini } from '../hooks/useGemini';
import { useSpeech } from '../hooks/useSpeech';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function ChatInterface() {
    const { sendMessage, isLoading } = useGemini();
    const {
        isListening,
        transcript,
        isMuted, // New
        toggleMute, // New
        startListening,
        stopListening,
        speak,
        resetTranscript
    } = useSpeech();

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello. I am Jarvis. How can I assist you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (transcript) {
            setInput(transcript);
        }
    }, [transcript]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        if (isListening) stopListening();

        const userMessage = input;
        setInput('');
        resetTranscript();

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);

        const response = await sendMessage(userMessage);

        if (response) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            }]);
            speak(response);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            resetTranscript();
            startListening();
        }
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full relative">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-6 pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent min-h-0">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] p-4 rounded-2xl backdrop-blur-md border ${msg.role === 'user'
                                    ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-50 rounded-tr-sm'
                                    : 'bg-slate-800/50 border-slate-700/50 text-slate-100 rounded-tl-sm'
                                }`}
                        >
                            <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                            <span className="text-xs opacity-50 mt-2 block">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="relative pb-4">
                <form onSubmit={handleSubmit} className="relative flex items-center gap-4 bg-slate-800/40 backdrop-blur-xl p-2 rounded-full border border-white/10 focus-within:border-cyan-500/50 transition-colors">
                    
                    {/* Mute Toggle Button */}
                    <button
                        type="button"
                        onClick={toggleMute}
                        className={`p-3 rounded-full transition-all duration-300 ${isMuted
                            ? 'bg-slate-700/50 text-slate-400'
                            : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
                            }`}
                        title={isMuted ? "Unmute Voice" : "Mute Voice"}
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    {/* Microphone Button */}
                    <button
                        type="button"
                        onClick={toggleListening}
                        className={`p-3 rounded-full transition-all duration-300 ${isListening
                            ? 'bg-red-500/20 text-red-400 animate-pulse'
                            : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
                            }`}
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>

                    {isListening && (
                        <div className="absolute left-28 top-1/2 -translate-y-1/2">
                            <VoiceVisualizer isListening={isListening} />
                        </div>
                    )}

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isListening ? "Listening..." : "Type or speak..."}
                        className={`flex-1 bg-transparent border-none outline-none text-white placeholder-slate-400 px-2 ${isListening ? 'pl-24' : ''}`}
                    />

                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="p-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
