import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { theme } from "../styles";

const { colors } = theme;

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const properties = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "speechiness",
  "valence",
];

const valueCorrections = (chartData) => {
  const correctedData = {};
  for (let key in chartData) {
    correctedData[key] = Math.round(chartData[key] * 100);
  }
  return correctedData;
};

const TrackAnalysis = ({ audioFeatures }) => {
  const [chartData, setChartData] = useState(null);

  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const createDataset = (features) => {
    const dataset = {};
    properties.forEach((prop) => {
      dataset[prop] = features.length
        ? avg(features.map((feat) => feat && feat[prop]))
        : features[prop];
    });
    return dataset;
  };

  useEffect(() => {
    const parseData = () => {
      const dataset = createDataset(audioFeatures);
      setChartData(valueCorrections(dataset));
    };
    parseData();
  }, [audioFeatures]);

  return (
    <>
      {chartData && (
        <Bar
          data={{
            labels: [
              "Acousticness",
              "Danceability",
              "Energy",
              "Instrumentalness",
              "Liveness",
              "Speechiness",
              "Valence",
            ],
            datasets: [
              {
                data: Object.values(chartData),
                backgroundColor: "#1ed760",
                borderColor: "#1ed760",
                borderWidth: 1,
                borderRadius: 10,
              },
            ],
          }}
          height={100}
          options={{
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  color: `${colors.lightGrey}`,
                },
              },
              y: {
                min: 0,
                max: 100,
                display: true,
                grid: {
                  display: false,
                },
                ticks: {
                  stepSize: 20,
                  color: `${colors.lightGrey}`,
                },
              },
            },
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      )}
    </>
  );
};

export default TrackAnalysis;
