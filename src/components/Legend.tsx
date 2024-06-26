import React, { useState } from 'react'
import { Tab, Tabs, Box, Slider, Divider, List, Button, Stack, Typography } from '@mui/material'
import { Layers, BarChart, PlayCircleFilled, Polyline, FolderZip } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import './Map.css'
import { styled } from '@mui/styles';
import BarChart1 from './charts/BarChart';
import DoughnutChart from './charts/Doughnut';
import GainBarChart from './charts/GainBarChart';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'
type Props = {
    onOpacityChange: (event: Event, newValue: number | number[]) => void;
}

type CategoryColorMap = {
    [key: string]: string;
}

const colors = ['red', 'green', 'blue', 'yellow'];
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
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const Legend = ({ onOpacityChange }: Props) => {
    const [value, setValue] = useState('1');
   
    const storeMode = useSelector((state: RootState) => state.mode);
    const [opacity, setOpacity] = useState<number>(100);

    const data = [5, 4, 3 ];
    const labels = ['Loss', 'Gain', 'Stable'];

    const landuse = ['Forestry', 'Agriculture', 'Commodity driven deforestation', 'Urbanization', 'Wildfire']
    const categories: string[] = ['Forestry', 'Agriculture', 'Commodity driven deforestation', 'Urbanization', 'Wildfire'];
    const categoryColors: CategoryColorMap = {
        Forestry: '#417843',
        Agriculture: '#F4B1E6',
        'Commodity driven deforestation': '#B1D396',
        Urbanization: '#E92525',
        Wildfire: '#DA5D1F'
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: storeMode === 'light' ? '#f9f9f9' : '#303230',
        color: storeMode === 'light' ? '#484a48' : '#ddeec6', }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider',   }}>
                    <TabList onChange={handleChange} style={{ marginLeft: '2em',  }} >
                        <Tab icon={<Layers style={{ height: '1.5em', width: '2em' }} />} label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.2em'} color={ storeMode === 'light' ? '#484a48' : '#ddeec6'}>Legend</Typography>} value="1" />
                        <Tab icon={<BarChart style={{ height: '1.5em', width: '2em' }} />} label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.2em'} color={ storeMode === 'light' ? '#484a48' : '#ddeec6'}>Analysis</Typography>} value="2" />
                        {/* <Tab icon={<BarChart />} label="Analysis3" value="3" style={{ backgroundColor: value === '2' ? '#086a53' : 'inherit', color: value === '3' ? 'white' : 'inherit' }} style={{ backgroundColor: value === '1' ? '#ddeec6' : 'inherit', color: value === '1' ? '#5b5e57' : 'inherit' }} style={{ backgroundColor: value === '2' ? '#ddeec6' : 'inherit', color: value === '2' ? '#5b5e57' : 'inherit' }}   /> */}
                    </TabList>
                </Box>
                <TabPanel value="1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    <p className="opacity" style={{ fontSize: '1em' }} >Forest cover gain from 2001 - 2023</p>
                    <span className="legend_flex d-flex gap-2">
                        <div style={{ backgroundColor: '#417843', borderRadius: '50%', width: '1em', height: '1em' }}></div>
                        <p>Forest cover gain</p>

                    </span>

                    <p>Timeseries</p>
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

                    <List >

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />

                        <p className="opacity" style={{ fontSize: '1em' }} >Forest cover loss from 2001 - 2023</p>
                        <span className="legend_flex d-flex gap-2">
                            <div style={{ backgroundColor: '#FAA04D', borderRadius: '50%', width: '1em', height: '1em' }}></div>
                            <p>Forest cover loss</p>

                        </span>
                        <p>Timeseries</p>
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

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />

                        {
                            landuse.map((item) => (
                                <div className="d-flex  gap-2 ">
                                    <div style={{
                                        backgroundColor: item === 'Forestry' ?
                                            '#417843' : item === 'Agriculture' ? '#F4B1E6' :
                                                item === 'Commodity driven deforestation' ? '#B1D396' :
                                                    item === 'Urbanization' ? '#E92525' :
                                                        '#DA5D1F'
                                        ,
                                        borderRadius: '50%', width: '1.5em', height: '1.5em'
                                    }}></div>
                                    <p>{item}</p>
                                </div>
                            ))
                        }


                    </List>


                </TabPanel>
                <TabPanel value="2" style={{ fontFamily: 'Poppins', }}>
                    <Stack direction="row" spacing={4} className='mb-4' >

                        <Button variant="contained" color="success" startIcon={<Polyline style={{ height: '1.5em', width: '1.5em' }} />}
                            style={{
                                textTransform: 'none',
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                fontSize: '1em',
                                height: '3em',
                                //    whiteSpace: 'nowrap',
                                padding: '2em 2.5em',
                            }}>
                            Draw Polygon
                        </Button>

                        <Button component="label"
                            color='success'
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<FolderZip style={{ height: '1.5em', width: '1.5em' }} />}
                            style={{
                                textTransform: 'none', fontFamily: 'Poppins', fontWeight: 700, fontSize: '1em',
                                height: '3em',

                                padding: '2em 2.5em',
                                // whiteSpace: 'nowrap'
                            }}
                        >
                            Upload Shapefile
                            <VisuallyHiddenInput type="file" />
                        </Button>

                    </Stack>

                    <p style={{fontWeight:700}}>Forest cover loss in AOI</p>
                    <p>From 2000 to 2023, AOI lost
                        20.6 kha of forest cover equal to 0.4% is its total extent.</p>

                    <BarChart1 data={data} labels={labels} />

                    <List >
                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{fontWeight:700}}>Forest cover gain in AOI</p>
                        <p>From 2000 to 2023, AOI gained
                            20.6 kha of forest cover equal to 0.4% is its total extent.</p>

                        <GainBarChart data={data} labels={labels}  />

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{fontWeight:700}}>Net Forest Change</p>
                       
                        <DoughnutChart data={data} labels={labels}  />

                    </List>

                </TabPanel>

            </TabContext>
        </Box>
    )
}

export default Legend