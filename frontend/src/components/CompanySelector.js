import { useEffect, useState } from "react";
import api from "../utils/api";

/**
 * CompanySelector dropdown
 * @param {Function} onSelect - callback when a company is selected
 * @param {String} selectedSymbol - current selected symbol
 */
export default function CompanySelector({ selectedSymbol, onSelect }) {
  const [validCompanies, setValidCompanies] = useState([]);

  useEffect(() => {
    const fetchValidCompanies = async () => {
      try {
        const res = await api.get("/companies/valid");
        setValidCompanies(res.data);
      } catch (error) {
        console.error("Error fetching valid companies:", error);
      }
    };

    fetchValidCompanies();
  }, []);

  return (
    <label>
      <select
        value={selectedSymbol}
        onChange={(e) => onSelect(e.target.value)}
        style={{ padding: "0.5rem", marginTop: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px"
         }}
      >
        {validCompanies.map((company) => (
          <option key={company.symbol} value={company.symbol}>
            {company.longname || company.shortname} ({company.symbol})
          </option>
        ))}
      </select>
    </label>
  );
}
