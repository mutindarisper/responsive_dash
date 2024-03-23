import React, { useState } from 'react'
import { Tab, Tabs, Box, Slider, Divider } from '@mui/material'
import { Layers, BarChart, PlayCircleFilled } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab'

type Props = {
    onOpacityChange: (event: Event, newValue: number | number[]) => void;
}

const marks = [
    {
      value: 0,
      label: '2010',
    },
    {
      value: 30,
      label: '2015',
    },
    {
      value: 60,
      label: '2020',
    },
    {
      value: 100,
      label: '2024',
    },
  ];
  
  function valuetext(value: number) {
    return `${value}`;
  }
const Legend = ({ onOpacityChange }: Props) => {
    const [value, setValue] = useState('1');
    const [opacity, setOpacity] = useState<number>(100);

    const landuse = ['Forestry', 'Agriculture', 'Commodity driven deforestation', 'Urbanization', 'Wildfire']

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff' }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} style={{ marginLeft: '2em' }} >
                        <Tab icon={<Layers />} label="Legend" value="1" />
                        <Tab icon={<BarChart />} label="Analysis" value="2" />
                        {/* <Tab icon={<BarChart />} label="Analysis3" value="3" style={{ backgroundColor: value === '2' ? '#086a53' : 'inherit', color: value === '3' ? 'white' : 'inherit' }} style={{ backgroundColor: value === '1' ? '#ddeec6' : 'inherit', color: value === '1' ? '#5b5e57' : 'inherit' }} style={{ backgroundColor: value === '2' ? '#ddeec6' : 'inherit', color: value === '2' ? '#5b5e57' : 'inherit' }}   /> */}
                    </TabList>
                </Box>
                <TabPanel value="1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    <p className="opacity" style={{fontSize: '1em'}} >Forest cover gain from 2001 - 2023</p>
                    <span className="legend_flex d-flex gap-2">
                        <div style={{ backgroundColor: '#417843', borderRadius: '50%', width: '1em', height: '1em' }}></div>
                        <p>Forest cover gain</p>

                    </span>
                    <div className="timeseries legend_flex d-flex gap-4">
                        <PlayCircleFilled />
                        <Box sx={{ width: 300 }}>
                            <Slider
                                aria-label="Custom marks"
                                defaultValue={20}
                                getAriaValueText={valuetext}
                                step={10}
                                valueLabelDisplay="auto"
                                marks={marks}
                            />
                        </Box>
                    </div>

                    <Divider variant="middle" component="li" style={{marginBottom:'1em'}} />

                    <p className="opacity" style={{fontSize: '1em'}} >Forest cover loss from 2001 - 2023</p>
                    <span className="legend_flex d-flex gap-2">
                        <div style={{ backgroundColor: '#faa04d', borderRadius: '50%', width: '1em', height: '1em' }}></div>
                        <p>Forest cover loss</p>

                    </span>
                    <div className="timeseries legend_flex d-flex gap-4">
                        <PlayCircleFilled />
                        <Box sx={{ width: 300 }}>
                            <Slider
                                aria-label="Custom marks"
                                defaultValue={20}
                                getAriaValueText={valuetext}
                                step={10}
                                valueLabelDisplay="auto"
                                marks={marks}
                            />
                        </Box>
                    </div>

                    <Divider variant="middle" component="li" style={{marginBottom:'1em'}} />

                    {
                        landuse.map((item) => (
                            <div className="d-flex  gap-2 ">
                            <div style={{ backgroundColor: '#417843', borderRadius: '50%', width: '1.5em', height: '1.5em' }}></div>
                             <p>{item}</p>
                             </div>
                        ))
                    }
                    {/* <div className="landuse d-flex flex-column gap-2">
                        <div style={{ backgroundColor: '#417843', borderRadius: '50%', width: '1.5em', height: '1.5em' }}></div>
                        <div style={{ backgroundColor: '#F4B1E6', borderRadius: '50%', width: '1.5em', height: '1.5em' }}></div>
                        <div style={{ backgroundColor: '#B1D396', borderRadius: '50%', width: '1.5em', height: '1.5em' }}></div>
                        <div style={{ backgroundColor: '#E92525', borderRadius: '50%', width: '1.5em', height: '1.5em' }}></div>
                        <div style={{ backgroundColor: '#DA5D1F', borderRadius: '50%', width: '1.5em', height: '1.5em' }}></div>
                    </div> */}

                   
                </TabPanel>
                <TabPanel value="2">Analysis</TabPanel>

            </TabContext>
        </Box>
    )
}

export default Legend