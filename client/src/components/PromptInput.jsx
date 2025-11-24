import React from 'react';
import { Sparkles, Send } from 'lucide-react';

const PromptInput = ({ prompt, setPrompt, onGenerate, isGenerating }) => {
    const maxLength = 500;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            onGenerate();
        }
    };

    return (
        <div className="flex flex-col h-full">
            <label className="block text-xs font-medium text-accent-grey mb-1 uppercase tracking-wider">
                Prompt
            </label>
            <div className="relative flex-1 bg-primary-bg border border-border rounded-xl hover:border-accent-grey transition-colors focus-within:border-accent-black focus-within:ring-1 focus-within:ring-accent-black overflow-hidden flex flex-col">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe the code you want to generate... (e.g., 'Create a recursive function to calculate Fibonacci numbers')"
                    className="w-full h-full p-4 resize-none outline-none bg-transparent text-accent-black placeholder-gray-400 font-medium"
                    maxLength={maxLength}
                />

                <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary-bg/50">
                    <span className="text-xs text-accent-grey font-medium">
                        {prompt.length}/{maxLength}
                    </span>

                    <button
                        onClick={onGenerate}
                        disabled={!prompt.trim() || isGenerating}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-accent-black text-primary-bg hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none \${
              !prompt.trim() || isGenerating ? '' : 'hover:bg-opacity-90'
            }`}
                    >
                        {isGenerating ? (
                            <>
                                <Sparkles className="w-4 h-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                Generate <Send className="w-3 h-3" />
                            </>
                        )}
                    </button>
                </div>
            </div>
            <p className="mt-2 text-xs text-accent-grey text-center">
                Press <kbd className="font-sans bg-secondary-bg px-1 rounded border border-border">Ctrl</kbd> + <kbd className="font-sans bg-secondary-bg px-1 rounded border border-border">Enter</kbd> to generate
            </p>
        </div>
    );
};

export default PromptInput;
