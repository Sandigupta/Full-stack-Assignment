import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Download, Maximize2, Loader2 } from 'lucide-react';

const CodeOutput = ({ code, language, theme, isGenerating }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `generated-code.\${language === 'python' ? 'py' : language === 'javascript' ? 'js' : 'txt'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-accent-grey uppercase tracking-wider">
                    Output
                </label>

                <div className="flex items-center gap-1">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 text-accent-grey hover:text-accent-black hover:bg-secondary-bg rounded-md transition-colors"
                        title="Copy code"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-1.5 text-accent-grey hover:text-accent-black hover:bg-secondary-bg rounded-md transition-colors"
                        title="Download file"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="relative flex-1 rounded-xl overflow-hidden border border-border bg-primary-bg shadow-sm">
                {code ? (
                    <SyntaxHighlighter
                        language={language}
                        style={theme === 'dark' ? oneDark : oneLight}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            height: '100%',
                            fontSize: '0.9rem',
                            backgroundColor: 'transparent',
                        }}
                        showLineNumbers={true}
                        wrapLines={true}
                    >
                        {code}
                    </SyntaxHighlighter>
                ) : isGenerating ? (
                    <div className="h-full flex flex-col items-center justify-center text-accent-grey bg-secondary-bg/50">
                        <div className="w-16 h-16 mb-4 rounded-2xl bg-secondary-bg flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-accent-black animate-spin" />
                        </div>
                        <p className="text-sm font-medium text-accent-black">Generating code...</p>
                        <p className="text-xs opacity-60 mt-1">This may take a few seconds</p>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-accent-grey bg-secondary-bg/50">
                        <div className="w-16 h-16 mb-4 rounded-2xl bg-secondary-bg flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-border border-t-accent-grey rounded-full" />
                        </div>
                        <p className="text-sm font-medium">Ready to generate code</p>
                        <p className="text-xs opacity-60 mt-1">Select a language and describe your request</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeOutput;
