import React, { useState } from 'react'
import { Tab, Box, Divider, List, Button, Stack, Typography } from '@mui/material'
import { Layers, BarChart, Polyline, FolderZip } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import './Map.css'
import { styled } from '@mui/styles';

import GainBarChart from './charts/GainBarChart';

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
const YieldLegend = () => {
    const [value, setValue] = useState('1');
  
    const data = [5, 4, 3 ];
    const labels = ['Loss', 'Gain', 'Stable'];

  
    const categories: string[] = ['Tea', 'Coffee', 'Rice'];
  
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
                {
                            categories.map((item) => (
                                <div className="d-flex gap-2 ">
                                    <div style={{
                                        backgroundColor: item === 'Tea' ?
                                            '#417843' : item === 'Coffee' ? '#AE7036' :
                                              '#6FD3AF'
                                        ,
                                        borderRadius: '50%', width: '1.5em', height: '1.5em'
                                    }}></div>
                                    <p>{item}</p>
                                </div>
                            ))
                        }



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
                        <p style={{fontWeight:700}}>Tea yield estimation</p>
                        <p>Tea yield for AOI is estimated at 2.5 tonnes </p>

                     

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{fontWeight:700}}>Coffee yield estimation</p>
                        <p>Coffee yield for AOI is estimated at 4.5 tonnes </p>

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                       
                        <p style={{fontWeight:700}}>Rice yield estimation</p>
                        <p>Rice yield for AOI is estimated at 4.5 tonnes </p>

                        <GainBarChart data={data} labels={labels}  />

                    </List>

                </TabPanel>

            </TabContext>
        </Box>
    )
}

export default YieldLegend