import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LikeChart = ({ posts }) => {
  const chartData = {
    labels: posts.map((post) => post.title),
    datasets: [
      {
        label: "Likes",
        data: posts.map((post) => post.likes.length),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return <Line options={{ responsive: true }} data={chartData} />;
};

export default LikeChart;
