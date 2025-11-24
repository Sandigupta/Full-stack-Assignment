import React from 'react';
import { Code2, Moon, Sun, History } from 'lucide-react';

const Header = ({ theme, toggleTheme, toggleHistory }) => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-primary-bg border-b border-border sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-accent-black rounded-lg">
                    <Code2 className="w-6 h-6 text-primary-bg" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-accent-black">
                    Code Copilot
                </h1>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleHistory}
                    className="p-2 rounded-lg hover:bg-secondary-bg transition-colors text-accent-grey hover:text-accent-black lg:hidden"
                    aria-label="Toggle history"
                >
                    <History className="w-5 h-5" />
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-secondary-bg transition-colors text-accent-grey hover:text-accent-black"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </header>
    );
};

export default Header;
