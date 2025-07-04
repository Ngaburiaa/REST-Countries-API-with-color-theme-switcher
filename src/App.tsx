// src/App.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import type { Country } from "./types/country";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (region: string) => {
    setRegionFilter(region);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark");
  };

  useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await axios.get("/data.json");
      const data = response.data;

      if (Array.isArray(data)) {
        setCountries(data);
      } else if (Array.isArray(data.countries)) {
        setCountries(data.countries);
      } else {
        console.error("Invalid country data format", data);
        setCountries([]); // fallback
      }
    } catch (error) {
      console.error("Failed to load countries:", error);
      setCountries([]); // fallback
    }
  };

  fetchCountries();
}, []);


  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-blue-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <NavBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Home
        searchQuery={searchQuery}
        regionFilter={regionFilter}
        countries={countries}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
