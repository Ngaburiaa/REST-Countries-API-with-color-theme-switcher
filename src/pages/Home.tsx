import { useState } from 'react';
import { CountryCard } from '../components/CountryCard';
import { CountryDetailModal } from '../components/CountryDetailModal';
import type { Country } from '../types/Country';

interface Props {
  countries: Country[];
  darkMode: boolean;
  searchQuery: string;
  regionFilter: string;
}

export const Home = ({ countries, darkMode, searchQuery, regionFilter }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const filtered = countries.filter((country) => {
    const name = country.name?.toLowerCase() || '';
    const matchesSearch = name.includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter ? country.region === regionFilter : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className={`container mx-auto px-4 py-6 transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {filtered.length === 0 ? (
        <p className="text-center mt-20 text-xl opacity-70">No countries found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((country) => (
            <div
              key={country.alpha3Code}
              onClick={() => setSelectedCountry(country)}
              className="cursor-pointer"
            >
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      )}

      {selectedCountry && (
        <CountryDetailModal
          country={selectedCountry}
          countries={countries}
          darkMode={darkMode}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
};
