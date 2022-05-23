import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { theme } from "../styles";

const { colors } = theme;
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const MoodChart = (props) => {
  const [chartShort, setChartShort] = useState(null);
  const [chartLong, setChartLong] = useState(null);

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
      const { featuresShort, featuresLong } = props;
      const datasetShort = createDataset(featuresShort);
      const datasetLong = createDataset(featuresLong);

      setChartShort(valueCorrections(datasetShort));
      setChartLong(valueCorrections(datasetLong));
    };

    parseData();
  }, [props]);

  return (
    <>
      {chartShort && chartLong && (
        <Line
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
                label: "Last Five Songs",
                data: Object.values(chartShort),
                backgroundColor: "#2ab759",
                borderColor: "#2ab759",
                borderWidth: 3,
                tension: 0.25,
              },
              {
                label: "Last Twenty Songs",
                data: Object.values(chartLong),
                backgroundColor: "#aaaaaa",
                borderColor: "#aaaaaa",
                borderWidth: 3,
                tension: 0.25,
              },
            ],
          }}
          height={100}
          options={{
            scales: {
              x: {
                offset: true,
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
            },
          }}
        />
      )}
    </>
  );
};

export default MoodChart;
