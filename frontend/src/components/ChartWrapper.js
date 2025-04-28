import { useEffect, useState } from "react";
import api from "../utils/api";
import StockChart from "./StockChart";

/**
 * ChartWrapper fetches and passes stock data to StockChart
 */
export default function ChartWrapper({ symbol }) {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await api.get(`/stocks/symbol/${symbol}`);
        setStockData(res.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <div style={{ marginTop: "2rem" }}>
      {stockData.length ? (
        <StockChart data={stockData} />
      ) : (
        <p>Loading or no data...</p>
      )}
    </div>
  );
}
