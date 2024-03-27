import React from 'react'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

type BarChartProps =  {
    data: number[];
    labels: string[];
  }

  

  const DoughnutChart: React.FC<BarChartProps> = ({ data, labels }) => {
    const chartData = {
        labels: labels,
        datasets: [
          {
            // label: 'Bar Chart',
            data: data,
            backgroundColor:['#DA5D1F', 'green', 'purple', 'violet'] ,
            // borderColor: 'rgba(75,192,192,1)',
            // borderWidth: 1,
          },
        ],
      };
      let chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "right",
                margin: 20,
                labels: {
                  fontColor: "#000",
                  fontWeight: "bolder",
                  padding: 10,
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
        },
    }
  return (
    <Doughnut data={chartData} options={chartOptions} />
  )
}

export default DoughnutChart