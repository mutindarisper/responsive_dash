import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedVerticalBarChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Min',
        backgroundColor: '#ffc1d9',
         barPercentage: 0.5,
        data: [10, 20, 30, 40, 50],
      },
      {
        label: 'Max',
        backgroundColor: '#a6365d',
         barPercentage: 0.5,
        data: [15, 25, 35, 45, 55],
      },
      {
        label: 'Mean',
        backgroundColor: '#6f183a',
         barPercentage: 0.5,
        data: [20, 30, 40, 50, 60],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '500px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StackedVerticalBarChart;
