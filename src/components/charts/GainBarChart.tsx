import 'chart.js/auto';
import React from 'react';
import { Bar } from 'react-chartjs-2';

type GainBarChartProps =  {
  data: number[];
  labels: string[];
}

const GainBarChart: React.FC<GainBarChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        // label: 'Bar Chart',
        data: data,
        backgroundColor: '#2F8233',
        barPercentage: 0.5,
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
     
      <Bar data={chartData} options={chartOptions} height={130} width={350} />
    </div>
  );
};

export default GainBarChart;
