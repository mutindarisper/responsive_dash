import 'chart.js/auto';
import React from 'react';
import { Line } from 'react-chartjs-2';

type BarChartProps =  {
  data: number[];
  labels: string[];
}

const LineChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        // label: 'Bar Chart',
        data: data,
        backgroundColor: '#DA5D1F',
        borderColor: '#1eb301',
   
        borderWidth: 3,
        tension: 0.5
        // barPercentage: 0.5,
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
     
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
