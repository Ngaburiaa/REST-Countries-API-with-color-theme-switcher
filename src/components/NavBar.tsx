import { SearchBar } from './SearchBar';
import { RegionFilter } from './RegionFilter';

interface NavbarProps {
  onSearch: (query: string) => void;
  onFilter: (region: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const NavBar = ({ onSearch, onFilter, darkMode, toggleDarkMode }: NavbarProps) => {
  return (
    <div
      className={`sticky top-0 z-50 shadow-md ${
        darkMode ? 'bg-blue-950 text-white' : 'bg-gray-50 text-gray-950'
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Where in the world?</h1>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 ml-4"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <SearchBar onSearch={onSearch} darkMode={darkMode} />
            <RegionFilter onFilter={onFilter} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};