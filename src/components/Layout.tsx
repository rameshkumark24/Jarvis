import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative selection:bg-cyan-500/30">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-4 py-8 h-dvh flex flex-col">
                <header className="flex items-center justify-between mb-8 flex-shrink-0">
                    <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        JARVIS
                    </h1>
                    <div className="text-sm text-slate-400 font-mono">
                        SYSTEM ONLINE
                    </div>
                </header>

                <div className="flex-1 flex flex-col relative min-h-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
