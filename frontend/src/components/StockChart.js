import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

/**
 * StockChart component
 *
 * @param {Object} props - The component props
 * @param {Array} props.data - The stock data to be displayed in the chart
 * @returns
 */
export default function StockChart({ data }) {
  const chartData = {
    labels: data.map((d) => new Date(d.date)),
    datasets: [
      {
        label: "Closing Price (USD)",
        data: data
        .filter((d) => typeof d.close === "number" && d.close > 0)
        .map((d) => d.close),
        fill: false,
        borderColor: "rgb(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "month" },
        title: { display: true, text: "Date" },
      },
      y: {
        title: { display: true, text: "Price (USD)" },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
