import React, { useState } from 'react'
import { Tab, Box, Divider, List, Button, Stack, Typography } from '@mui/material'
import { Layers, BarChart, Polyline, FolderZip } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import './Map.css'
import { styled } from '@mui/styles';

import GainBarChart from './charts/GainBarChart';
import BarChart1 from './charts/BarChart';

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
const CarbonLegend = () => {
    const [value, setValue] = useState('1');

    const data = [5, 4, 3];
    const labels = ['Loss', 'Gain', 'Stable'];


    const categories: string[] = ['Carbon stock gain ', 'Carbon stock loss'];

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff' }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} style={{ marginLeft: '2em' }} >
                        <Tab icon={<Layers style={{ height: '1.5em', width: '2em' }} />} label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.2em'}>Legend</Typography>} value="1" />
                        <Tab icon={<BarChart style={{ height: '1.5em', width: '2em' }} />} label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.2em'}>Analysis</Typography>} value="2" />
                        {/* <Tab icon={<BarChart />} label="Analysis3" value="3" style={{ backgroundColor: value === '2' ? '#086a53' : 'inherit', color: value === '3' ? 'white' : 'inherit' }} style={{ backgroundColor: value === '1' ? '#ddeec6' : 'inherit', color: value === '1' ? '#5b5e57' : 'inherit' }} style={{ backgroundColor: value === '2' ? '#ddeec6' : 'inherit', color: value === '2' ? '#5b5e57' : 'inherit' }}   /> */}
                    </TabList>
                </Box>
                <TabPanel value="1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    <p>Carbon stock gain from 2001 - 2023</p>


                    <List >
                        <div className="d-flex gap-2 ">
                            <div style={{
                                backgroundColor:
                                    '#417843'
                                ,
                                borderRadius: '50%', width: '1.5em', height: '1.5em'
                            }}></div>
                            <p style={{ fontWeight: 700 }}>Carbon stock gain</p>
                        </div>

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <div className="d-flex gap-2 ">
                            <div style={{
                                backgroundColor:
                                    '#FAA04D'
                                ,
                                borderRadius: '50%', width: '1.5em', height: '1.5em'
                            }}></div>
                            <p style={{ fontWeight: 700 }}>Carbon stock loss</p>
                        </div>



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



                    <List >
                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{ fontWeight: 700 }}>Carbon stock loss  in AOI</p>
                        <p>From 2000 to 2023, AOI lost
                            20.6 Mt of carbon due to deforestation </p>

                        <GainBarChart data={data} labels={labels} />

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{ fontWeight: 700 }}>Carbon stock gain  in AOI</p>
                        <p>From 2000 to 2020, AOI gained
                            10.6 Mt of carbon due to mangrove regeneration</p>

                        <BarChart1 data={data} labels={labels} />

                    </List>

                    <Button variant="contained" color="success" className='mb-4'
              
                            style={{
                                textTransform: 'none',
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                fontSize: '1em',
                                height: '3em',
                                //    whiteSpace: 'nowrap',
                                padding: '1em',
                            }}>
                            Request analysis
                        </Button>
                        <p>Get results via email once ready and download report</p>

                </TabPanel>

            </TabContext>
        </Box>
    )
}

export default CarbonLegend