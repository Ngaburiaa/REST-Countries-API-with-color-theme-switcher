import { useState } from 'react';

interface RegionFilterProps {
  onFilter: (region: string) => void;
  darkMode: boolean;
}

export const RegionFilter = ({ onFilter, darkMode }: RegionFilterProps) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleSelect = (region: string) => {
    setSelectedRegion(region);
    onFilter(region);
    setIsOpen(false);
  };

  return (
    <div className="relative w-48">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          darkMode
            ? 'bg-gray-900 border-gray-700 text-white'
            : 'bg-white border-gray-300 text-gray-950'
        }`}
      >
        {selectedRegion || 'Filter by Region'}
        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 w-full mt-1 rounded-md shadow-lg py-1 transition-colors ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          {[...regions, ''].map((region, index) => (
            <button
              key={region || 'clear'}
              onClick={() => handleSelect(region)}
              className={`block w-full text-left px-4 py-2 transition-colors ${
                darkMode
                  ? 'text-white hover:bg-gray-800'
                  : 'text-gray-950 hover:bg-blue-100'
              }`}
            >
              {region || 'Clear Filter'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
