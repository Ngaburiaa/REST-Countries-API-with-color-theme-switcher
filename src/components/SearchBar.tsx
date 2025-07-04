import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  darkMode: boolean;
}

export const SearchBar = ({ onSearch, darkMode }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <div className={`relative w-full max-w-md ${darkMode ? 'text-white' : 'text-gray-950'}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a country..."
        className={`block w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          darkMode
            ? 'bg-blue-900 border-blue-800 placeholder-gray-400'
            : 'bg-white border-gray-300 placeholder-gray-400'
        }`}
      />
    </div>
  );
};