import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import LanguageSelector from './components/LanguageSelector';
import CodeOutput from './components/CodeOutput';
import HistoryPanel from './components/HistoryPanel';
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
console.log('Current API_URL:', API_URL);


function App() {
    const [theme, setTheme] = useState('light');
    const [prompt, setPrompt] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    // Load history from backend and favorites from localStorage
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/history`);
                const backendHistory = response.data.data;

                // Load favorites from localStorage
                const savedFavorites = localStorage.getItem('code-copilot-favorites');
                const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];

                // Merge history with favorites
                const mergedHistory = backendHistory.map(item => ({
                    ...item,
                    timestamp: new Date(item.createdAt).getTime(), // Map createdAt to timestamp
                    favorite: favoriteIds.includes(item.id)
                }));

                setHistory(mergedHistory);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            }
        };

        fetchHistory();

        const savedTheme = localStorage.getItem('code-copilot-theme');
        if (savedTheme) setTheme(savedTheme);
    }, []);

    // Save theme to localStorage
    useEffect(() => {
        localStorage.setItem('code-copilot-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Save favorites to localStorage whenever history changes
    useEffect(() => {
        const favoriteIds = history.filter(item => item.favorite).map(item => item.id);
        localStorage.setItem('code-copilot-favorites', JSON.stringify(favoriteIds));
    }, [history]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setCode(''); // Clear previous code

        try {
            const response = await axios.post(`${API_URL}/api/generate`, {
                prompt,
                language,
            });

            const data = response.data;

            if (data.code) {
                setCode(data.code);

                // Add to history
                const newEntry = {
                    id: data.id,
                    prompt: data.prompt,
                    language: data.language,
                    code: data.code,
                    timestamp: new Date(data.createdAt).getTime(),
                    favorite: false,
                };
                setHistory(prev => [newEntry, ...prev]);
            }
        } catch (error) {
            console.error('Error generating code:', error);
            setCode('// Error: Failed to generate code. Please ensure the backend server is running.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleHistorySelect = (item) => {
        setPrompt(item.prompt);
        setLanguage(item.language);
        setCode(item.code);
        if (window.innerWidth < 1024) setShowHistory(false); // Close on mobile select
    };

    const handleDeleteHistory = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/history/${id}`);
            setHistory(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to delete history item:', error);
        }
    };

    const handleToggleFavorite = (id) => {
        setHistory(prev => prev.map(item =>
            item.id === id ? { ...item, favorite: !item.favorite } : item
        ));
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-secondary-bg transition-colors duration-200">
            <Header theme={theme} toggleTheme={toggleTheme} toggleHistory={() => setShowHistory(!showHistory)} />

            <main className="flex-1 flex overflow-hidden relative">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 overflow-y-auto lg:overflow-hidden">

                    {/* Left Panel: Input & Settings */}
                    <div className="flex flex-col gap-6 w-full lg:w-1/3 min-w-[300px]">
                        <div className="bg-primary-bg p-6 rounded-2xl shadow-sm border border-border flex-1 flex flex-col gap-6">
                            <LanguageSelector
                                selectedLanguage={language}
                                onSelect={setLanguage}
                            />
                            <div className="flex-1">
                                <PromptInput
                                    prompt={prompt}
                                    setPrompt={setPrompt}
                                    onGenerate={handleGenerate}
                                    isGenerating={isGenerating}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Output */}
                    <div className="flex-1 min-w-[300px] h-[500px] lg:h-auto">
                        <div className="bg-primary-bg p-6 rounded-2xl shadow-sm border border-border h-full">
                            <CodeOutput
                                code={code}
                                language={language}
                                theme={theme}
                                isGenerating={isGenerating}
                            />
                        </div>
                    </div>

                </div>

                {/* Mobile History Backdrop */}
                {showHistory && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                        onClick={() => setShowHistory(false)}
                    />
                )}

                {/* History Panel */}
                <div className={`
          fixed inset-y-0 right-0 z-30 w-80 bg-primary-bg shadow-2xl transform transition-transform duration-300 ease-in-out
          lg:relative lg:transform-none lg:shadow-none lg:border-l lg:border-border lg:h-full
          ${showHistory ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
                    <HistoryPanel
                        history={history}
                        onSelect={handleHistorySelect}
                        onDelete={handleDeleteHistory}
                        onToggleFavorite={handleToggleFavorite}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
