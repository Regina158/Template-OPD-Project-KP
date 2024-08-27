import { useEffect, useState } from "react";
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
} from "chart.js";
import { getStatistik } from "../fetch/api";
import useThemeSwitcher from "../hooks/useThemeSwitcher "; // Pastikan path ini sesuai

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistik() {
  const [statistik, setStatistik] = useState([]);
  const [theme] = useThemeSwitcher();

  useEffect(() => {
    console.log("Current theme:", theme); // Tambahkan log untuk memeriksa tema
    const fetchStatistik = async () => {
      try {
        const dataStatistik = await getStatistik();
        const data = dataStatistik.find((item) => item.jenis_file === "Grafik");
        setStatistik(data);
      } catch (error) {
        console.error("Error fetching statistik data:", error);
      }
    };

    fetchStatistik();
  }, [theme]); // Tambahkan theme sebagai dependensi

  const hasLineChartData =
    statistik?.excel?.data && statistik.excel.data.length > 0;

  const lineChartData = {
    labels: hasLineChartData
      ? statistik.excel.data.map((item) => item["1"])
      : [],
    datasets: [
      {
        label: hasLineChartData ? statistik?.judul || "Statistik" : "No Data",
        data: hasLineChartData
          ? statistik.excel.data.map((item) => parseFloat(item["2"]))
          : [],
        borderColor:
          theme === "dark"
            ? "rgba(100, 149, 237, 0.8)"
            : "rgba(100, 149, 237, 0.5)",
        backgroundColor:
          theme === "dark"
            ? "rgba(100, 149, 237, 0.3)"
            : "rgba(100, 149, 237, 0.1)",

        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: theme === "dark" ? "rgb(231, 235, 239)" : "rgb(31, 41, 55)",
        },
      },
      title: {
        display: true,
        text: hasLineChartData ? statistik?.judul || "Grafik Data" : "No Data",
        font: {
          size: 20,
          weight: "bold",
        },
        color: theme === "dark" ? "rgb(231, 235, 239)" : "rgb(31, 41, 55)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tahun",
          color: theme === "dark" ? "rgb(231, 235, 239)" : "rgb(31, 41, 55)",
        },
        ticks: {
          color: theme === "dark" ? "rgb(231, 235, 239)" : "rgb(31, 41, 55)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Nilai",
          color: theme === "dark" ? "rgb(231, 235, 239)" : "rgb(31, 41, 55)",
        },
        ticks: {
          color: theme === "dark" ? "rgb(231, 235, 239)" : "rgb(31, 41, 55)",
        },
      },
    },
  };

  const renderYearlySummary = () => {
    if (!hasLineChartData) return null;

    return (
      <ul className="list-disc pl-5 dark:text-gray-300">
        {statistik.excel.data.map((item, index) => (
          <li key={index} className="mb-2">
            <strong>{item["1"]}</strong>: {item["2"]}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {hasLineChartData && (
        <div className="p-4 md:p-6 bg-white dark:bg-gray-800">
          <div className="w-full">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              {`${statistik?.judul}:`}
            </h3>
            <div className="text-gray-700 dark:text-gray-300">
              {renderYearlySummary()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
