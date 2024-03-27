import 'chart.js/auto';
import React from 'react';
import { Bar } from 'react-chartjs-2';

type BarChartProps =  {
  data: number[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        // label: 'Bar Chart',
        data: data,
        backgroundColor: '#DA5D1F',
        // borderColor: 'rgba(75,192,192,1)',
        // borderWidth: 1,
      },
    ],
  };

  let chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        
      },
    },
}
    


  return (
    <div>
     
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
