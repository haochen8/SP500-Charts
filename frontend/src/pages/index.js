import { useState } from "react";
import CompanySelector from "../components/CompanySelector";
import ChartWrapper from "../components/ChartWrapper";

/**
 * Home component
 */
export default function Home() {
  const [symbol, setSymbol] = useState("ABBV");

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "1rem" }}>
      <h1>S&P 500 Stock Price Chart</h1>
      <CompanySelector selectedSymbol={symbol} onSelect={setSymbol} />
      <ChartWrapper symbol={symbol} />
    </div>
  );
}
