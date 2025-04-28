import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

/**
 * IndexChart component
 *
 * @param {Object} props - The component props
 */
export default function IndexChart({ data }) {
  const chartData = {
    labels: data.map((d) => new Date(d.date)),
    datasets: [
      {
        label: "S&P 500 Index)",
        data: data.map((d) => d.value),
        fill: false,
        borderColor: "rgb(75, 192, 192, 1)",
        tension: 0.2,
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
        title: { display: true, text: "Index Value" },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
