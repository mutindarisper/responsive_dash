import React from 'react'
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale);

type ChildComponentProps  = {
    parentData: string;
   parentChartData:any
}

const ChildComponent = ({parentData, parentChartData}: ChildComponentProps) => {
    const options = {
        scales: {
          x: { title: { display: true, text: 'Months' } },
          y: { title: { display: true, text: 'Sales' }, beginAtZero: true },
        },
      };
    
  return (
    <div style={{height:'20vh', width:'40vw'}} >
    <p>Child Component Received: {parentData}</p>
    <Bar data={parentChartData} options={options} />
  </div>
  )
}

export default ChildComponent