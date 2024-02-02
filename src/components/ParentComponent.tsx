import React, { useState } from 'react'
import ChildComponent from './ChildComponent'

type ParentComponentProps =  {
    parentData: string;
  }

const ParentComponent = () => {
    const [parentState, setParentState] = useState<string>('Hello from Parent!');
    const monthlySalesData = [
        { month: 'January', sales: 1200 },
        { month: 'February', sales: 1500 },
        { month: 'March', sales: 1800 },
        { month: 'April', sales: 1300 },
        { month: 'May', sales: 2000 },
        { month: 'June', sales: 1700 },
        { month: 'July', sales: 1600 },
        { month: 'August', sales: 1900 },
        { month: 'September', sales: 1400 },
        { month: 'October', sales: 2100 },
        { month: 'November', sales: 1800 },
        { month: 'December', sales: 2200 },
      ];

      const [chartData, setChartData] = useState({
        labels: monthlySalesData.map((entry) => entry.month),
        datasets: [
          {
            label: 'Monthly Sales',
            data: monthlySalesData.map((entry) => entry.sales),
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      });


      const generateRandomSales = () => {
        const updatedData = {
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: monthlySalesData.map(() => Math.floor(Math.random() * 1000)),
            },
          ],
        };
    
        setChartData(updatedData);
      };

  return (
    <div className="parent_data">
        <button onClick={generateRandomSales}>Generate Random Sales</button>
        <ChildComponent parentData={parentState} parentChartData={chartData} />
    </div>
  )
}

export default ParentComponent