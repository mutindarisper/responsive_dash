import React, { useState } from 'react'
import ChildComponent from './ChildComponent'
import { Button, Drawer, } from '@mui/material';
// import { useTheme } from '@mui/styles';}
import { makeStyles } from '@mui/styles';

type ParentComponentProps = {
    parentData: string;
}

const drawerWidth = 240;
//   const theme = useTheme()
const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        bottom: 0,
    },
    content: {
        // flexGrow: 1,
        width:'20em',
        height:'15em'

        //   padding: '10em',
    },
});


const ParentComponent = () => {
    const [parentState, setParentState] = useState<string>('Hello from Parent!');
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);



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
                backgroundColor: 'rgba(75,192,192,0.5)',
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
        toggleDrawer()
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    return (
        <div className="parent_data">
            <button onClick={generateRandomSales}>Generate Stats</button>

            <Drawer
                anchor="bottom"
                open={isDrawerOpen}
                onClose={toggleDrawer}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {/* Drawer content goes here */}
                <div className={classes.content}>
                    <ChildComponent parentData={parentState} parentChartData={chartData} />
                </div>
            </Drawer>



        </div>
    )
}

export default ParentComponent