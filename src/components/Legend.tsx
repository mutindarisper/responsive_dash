import React, { useState } from 'react'
import { Tab, Tabs, Box, Slider } from '@mui/material'
import {Layers, BarChart} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab'

type Props = {
    onOpacityChange:(event: Event, newValue: number | number[]) => void;
}

const Legend = ({onOpacityChange}: Props) => {
    const [value, setValue] = useState('1');
    const [opacity, setOpacity] = useState<number>(100);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#ddd' }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} style={{ marginLeft:'2em' }} >
                        <Tab icon={<Layers />} label="Legend" value="1" style={{ backgroundColor: value === '1' ? '#086a53' : 'inherit', color: value === '1' ? 'white' : 'inherit' }} />
                        <Tab icon={<BarChart />} label="Analysis" value="2" style={{ backgroundColor: value === '2' ? '#086a53' : 'inherit', color: value === '2' ? 'white' : 'inherit' }} />
                        {/* <Tab icon={<BarChart />} label="Analysis3" value="3" style={{ backgroundColor: value === '2' ? '#086a53' : 'inherit', color: value === '3' ? 'white' : 'inherit' }} /> */}
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <p className="opacity">Opacity</p>

                    {/* <Box sx={{ width: 300 }}> */}
                    <Slider 
                        valueLabelDisplay="auto"
                        // value={50}
                        onChange={onOpacityChange}
                        color="success"
                        step={1}
                        min={0}
                        max={100}
                        style={{ width: '10em' }} />
                    {/* </Box> */}
                </TabPanel>
                <TabPanel value="2">Analysis</TabPanel>

            </TabContext>
        </Box>
    )
}

export default Legend