import React from 'react';
import { ChevronDown } from 'lucide-react';

const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' },
];

const LanguageSelector = ({ selectedLanguage, onSelect }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selected = languages.find(l => l.id === selectedLanguage) || languages[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-xs font-medium text-accent-grey mb-1 uppercase tracking-wider">
                Language
            </label>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-primary-bg border border-border rounded-xl hover:border-accent-grey transition-colors text-accent-black"
            >
                <span className="font-medium">{selected.name}</span>
                <ChevronDown className={`w-4 h-4 text-accent-grey transition-transform \${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-primary-bg border border-border rounded-xl shadow-lg overflow-hidden z-20 py-1">
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => {
                                onSelect(lang.id);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary-bg transition-colors \${
                selectedLanguage === lang.id ? 'text-accent-black font-medium bg-secondary-bg' : 'text-accent-grey'
              }`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
