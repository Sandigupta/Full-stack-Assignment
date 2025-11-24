import React from 'react';
import { Clock, Search, Star, Trash2, ChevronRight } from 'lucide-react';

const HistoryPanel = ({ history, onSelect, onDelete, onToggleFavorite }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filter, setFilter] = React.useState('all'); // 'all', 'favorites'

    const filteredHistory = history.filter(item => {
        const matchesSearch = item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.language.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'favorites' && item.favorite);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col h-full bg-primary-bg border-l border-border w-80">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-bold text-accent-black flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5" /> History
                </h2>

                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search history..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-secondary-bg rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent-black"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all border border-transparent \${
              filter === 'all' ? 'bg-accent-black text-primary-bg' : 'bg-transparent text-accent-grey hover:bg-secondary-bg hover:border-border hover:text-accent-black'
            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('favorites')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all border border-transparent \${
              filter === 'favorites' ? 'bg-accent-black text-primary-bg' : 'bg-transparent text-accent-grey hover:bg-secondary-bg hover:border-border hover:text-accent-black'
            }`}
                    >
                        Favorites
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {filteredHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No history found
                    </div>
                ) : (
                    filteredHistory.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="group relative p-3 rounded-xl hover:bg-secondary-bg cursor-pointer transition-all border border-transparent hover:border-border"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold uppercase text-accent-grey tracking-wider">
                                    {item.language}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                    {new Date(item.timestamp).toLocaleDateString()}
                                </span>
                            </div>

                            <p className="text-sm text-accent-black font-medium line-clamp-2 mb-2">
                                {item.prompt}
                            </p>

                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleFavorite(item.id);
                                    }}
                                    className={`p-1.5 rounded-full hover:bg-accent-black hover:text-primary-bg transition-colors \${
                    item.favorite ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                                >
                                    <Star className={`w-3.5 h-3.5 \${item.favorite ? 'fill-current' : ''}`} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(item.id);
                                    }}
                                    className="p-1.5 rounded-full hover:bg-accent-black text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HistoryPanel;
