import { useEffect, useState } from "react";
import api from "../utils/api";
import IndexChart from "../components/IndexChart";
import IndexDateFilter from "../components/IndexDateFilter";

/**
 * IndexChartPage component
 * 
 * @returns 
 */
export default function IndexChartPage() {
  const [indexData, setIndexData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchIndexData = async () => {
      try {
        const response = await api.get("/index");
        setIndexData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching index data:", error);
      }
    };
    fetchIndexData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (fromDate && toDate) {
        const filtered = indexData.filter((data) => {
          const date = new Date(data.date);
          return date >= new Date(fromDate) && date <= new Date(toDate);
        });
        setFilteredData(filtered);
      } else {
        setFilteredData(indexData);
      }
    };
    filterData();
  }, [fromDate, toDate, indexData]);

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setFilteredData(indexData);
  };
  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Index Chart</h1>
      <IndexDateFilter
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        onReset={handleReset}
      />
      {filteredData.length ? (
        <IndexChart data={filteredData} />
      ) : (
        <p>Loading or no data available...</p>
      )}
    </div>
  );
}
