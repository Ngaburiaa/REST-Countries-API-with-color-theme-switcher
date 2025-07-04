import { useParams, useNavigate } from 'react-router-dom';
import type { Country } from '../types/country';

interface Props {
  countries: Country[];
  darkMode: boolean;
}

export const CountryDetail = ({ countries, darkMode }: Props) => {
  const params = useParams<{ code?: string }>();
  const navigate = useNavigate();

  const code = params.code;

  if (!code) {
    return <div className="p-6 text-center">Country code not provided.</div>;
  }

  const country = countries.find(c => c.cca3 === code);

  if (!country) {
    return <div className="p-6 text-center">Country not found.</div>;
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies).map(cur => cur.name).join(', ')
    : 'N/A';

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className={`mb-8 px-6 py-2 shadow-md rounded-md ${darkMode ? 'bg-blue-900 text-white' : 'bg-white text-gray-950'}`}
      >
        &larr; Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-auto object-cover shadow-md"
        />

        <div>
          <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>

          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p><strong>Native Name:</strong> {nativeName}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            </div>
            <div>
              <p><strong>Top Level Domain:</strong> {country.tld?.[0]}</p>
              <p><strong>Currencies:</strong> {currencies}</p>
              <p><strong>Languages:</strong> {languages}</p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((borderCode) => {
                  const borderCountry = countries.find(c => c.cca3 === borderCode);
                  return borderCountry ? (
                    <button
                      key={borderCode}
                      onClick={() => navigate(`/country/${borderCode}`)}
                      className={`px-4 py-1 text-sm rounded shadow ${darkMode ? 'bg-blue-900 text-white' : 'bg-white text-gray-950'}`}
                    >
                      {borderCountry.name.common}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
