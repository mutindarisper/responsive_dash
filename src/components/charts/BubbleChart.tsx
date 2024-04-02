import React from 'react';
import { Bubble } from 'react-chartjs-2';

const BubbleChart: React.FC = () => {
  const data = {
    datasets: [
      {
        label: '2016',
        data: [
          { x: 10, y: 20, r: 5 },
          { x: 15, y: 10, r: 10 },
          { x: 25, y: 12, r: 15 },
          { x: 30, y: 25, r: 7 },
          { x: 40, y: 30, r: 8 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Customize bubble color
      },
      {
        label: '2022',
        data: [
          { x: 20, y: 100, r: 5 },
          { x: 10, y: 9, r: 20 },
          { x: 25, y: 90, r: 20 },
          { x: 70, y: 20, r: 50 },
          { x: 60, y: 20, r: 30 },
        ],
        backgroundColor: 'rgba(68, 227, 229, 0.8)', // Customize bubble color
      },
    ],
  };

  const options = {
    scales: {
      xAxis: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 50,
      },
      yAxis: {
        type: 'linear',
        position: 'left',
        min: 0,
        max: 35,
      },
    },
  };

  return (
    // <div style={{ height: '40%', width: '60%' }}>
      <Bubble data={data} height={300} width={450}  />
    // </div>
  );
};

export default BubbleChart;
