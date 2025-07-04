import type { Country } from "../types/Country";
import { X } from "lucide-react";

interface Props {
  country: Country;
  countries: Country[];
  darkMode: boolean;
  onClose: () => void;
}

export const CountryDetailModal = ({ country, countries, darkMode, onClose }: Props) => {
  const currencies = country.currencies?.map((cur) => cur.name).join(", ") || "N/A";
  const languages = country.languages?.map((lang) => lang.name).join(", ") || "N/A";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div
        className={`max-w-4xl w-full p-6 rounded-md relative shadow-lg overflow-auto max-h-[90vh] transition-colors duration-300 ${
          darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"
        }`}
      >
        <button
          className="absolute top-4 right-4 hover:text-red-400 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={country.flags.svg}
            alt={country.name}
            className="w-full object-cover rounded"
          />

          <div>
            <h2 className="text-2xl font-bold mb-4">{country.name}</h2>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Native Name:</strong> {country.nativeName}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Subregion:</strong> {country.subregion}</p>
                <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
              </div>
              <div>
                <p><strong>Top Level Domain:</strong> {country.topLevelDomain?.[0]}</p>
                <p><strong>Currencies:</strong> {currencies}</p>
                <p><strong>Languages:</strong> {languages}</p>
              </div>
            </div>

            {country.borders?.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold mb-2">Border Countries:</p>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((code) => {
                    const border = countries.find((c) => c.alpha3Code === code);
                    return border ? (
                      <span
                        key={code}
                        className={`px-3 py-1 text-sm rounded shadow transition-colors ${
                          darkMode ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      >
                        {border.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
