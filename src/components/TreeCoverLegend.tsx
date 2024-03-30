import React, { useState } from 'react'
import { Tab, Box, Slider, Divider, List, Button, Stack, Typography } from '@mui/material'
import { Layers, BarChart, PlayCircleFilled, Polyline, FolderZip } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import './Map.css'
import { styled } from '@mui/styles';
import BarChart1 from './charts/BarChart';
import DoughnutChart from './charts/Doughnut';
import GainBarChart from './charts/GainBarChart';

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
const TreeCoverLegend = () => {
    const [value, setValue] = useState('1');
    

    const data = [5, 4, 3 ];
    const labels = ['Loss', 'Gain', 'Stable'];

 

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff' }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} style={{ marginLeft: '2em' }} >
                        <Tab icon={<Layers style={{ height: '1.5em', width: '2em' }} />} label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.2em'}>Legend</Typography>} value="1" />
                        <Tab icon={<BarChart style={{ height: '1.2em', width: '2em' }} />} label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.2em'}>Analysis</Typography>} value="2" />
                        {/* <Tab icon={<BarChart />} label="Analysis3" value="3" style={{ backgroundColor: value === '2' ? '#086a53' : 'inherit', color: value === '3' ? 'white' : 'inherit' }} style={{ backgroundColor: value === '1' ? '#ddeec6' : 'inherit', color: value === '1' ? '#5b5e57' : 'inherit' }} style={{ backgroundColor: value === '2' ? '#ddeec6' : 'inherit', color: value === '2' ? '#5b5e57' : 'inherit' }}   /> */}
                    </TabList>
                </Box>
                <TabPanel value="1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    <p className="opacity" style={{ fontSize: '1em' }} >Tree cover gain from 2001 - 2023</p>
                    <span className="legend_flex d-flex gap-2">
                        <div style={{ backgroundColor: '#417843', borderRadius: '50%', width: '1em', height: '1em' }}></div>
                        <p>Tree cover gain</p>

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

                        <p className="opacity" style={{ fontSize: '1em' }} >Tree cover loss from 2001 - 2023</p>
                        <span className="legend_flex d-flex gap-2">
                            <div style={{ backgroundColor: '#FAA04D', borderRadius: '50%', width: '1em', height: '1em' }}></div>
                            <p>Tree cover loss</p>

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

                       <div className="netchange_legend">Net Tree cover change 2001 - 2023</div>


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

                    <p style={{fontWeight:700}}>Tree cover loss in AOI</p>
                    <p>From 2000 to 2023, AOI lost
                        20.6 kha of forest cover equal to 0.4% is its total extent.</p>

                    <BarChart1 data={data} labels={labels} />

                    <List >
                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{fontWeight:700}}>Tree cover gain in AOI</p>
                        <p>From 2000 to 2023, AOI gained
                            20.6 kha of forest cover equal to 0.4% is its total extent.</p>

                        <GainBarChart data={data} labels={labels}  />

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{fontWeight:700}}>Net Tree Cover Change</p>
                       
                        <DoughnutChart data={data} labels={labels}  />

                    </List>

                </TabPanel>

            </TabContext>
        </Box>
    )
}

export default TreeCoverLegend