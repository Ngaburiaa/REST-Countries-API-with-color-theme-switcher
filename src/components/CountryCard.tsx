// src/components/CountryCard.tsx
import type { Country } from "../types/country";

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <div className="bg-base-100 rounded-md shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer">
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-extrabold mb-2">{country.name}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
      </div>
    </div>
  );
};
