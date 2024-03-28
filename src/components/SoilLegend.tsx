import React, { useState } from 'react'
import { Tab, Box, Divider, List, Button, Stack, Typography } from '@mui/material'
import { Layers, BarChart, Polyline, FolderZip, EmailOutlined } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import './Map.css'
import { styled } from '@mui/styles';

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
const SoilLegend = () => {
    const [value, setValue] = useState('1');



    const categories: string[] = ['Sandy', 'Loamy Soils', 'Clay soils', 'Silt'];
    const water_categories: string[] = ['Dissolved oxygen', 'Nutrients', 'Pollutants'];

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff' }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} style={{ marginLeft: '2em' }} >
                        <Tab icon={<Layers style={{ height: '1.5em', width: '2em' }} />} label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.5em'}>Legend</Typography>} value="1" />
                        <Tab icon={<BarChart style={{ height: '1.5em', width: '2em' }} />} label={<Typography fontFamily="Poppins" textTransform={'none'} fontSize={'1.5em'}>Analysis</Typography>} value="2" />
                        {/* <Tab icon={<BarChart />} label="Analysis3" value="3" style={{ backgroundColor: value === '2' ? '#086a53' : 'inherit', color: value === '3' ? 'white' : 'inherit' }} style={{ backgroundColor: value === '1' ? '#ddeec6' : 'inherit', color: value === '1' ? '#5b5e57' : 'inherit' }} style={{ backgroundColor: value === '2' ? '#ddeec6' : 'inherit', color: value === '2' ? '#5b5e57' : 'inherit' }}   /> */}
                    </TabList>
                </Box>

                <TabPanel value="1" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                    <p>Soil Types</p>
                    {
                        categories.map((item) => (
                            <div className="d-flex gap-2 ">
                                <div style={{
                                    backgroundColor: item === 'Sandy' ?
                                        '#417843' : item === 'Loamy Soils' ? '#F4B1E6' :
                                            item === 'Clay soils' ? '#B1D396' : '#C7C7C7',
                                    borderRadius: '50%', width: '1.5em', height: '1.5em'
                                }}></div>
                                <p>{item}</p>
                            </div>
                        ))
                    }
                    <List >
                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p>Water Quality</p>
                        {
                        water_categories.map((item) => (
                            <div className="d-flex gap-2 ">
                                <div style={{
                                    backgroundColor: item === 'Dissolved oxygen' ?
                                        '#417843' : item === 'Nutrients' ? '#F4B1E6' : '#C7C7C7',
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



                    <List >
                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{ fontWeight: 700 }}>Soil degradation  for AOI</p>
                        <p>Soil erosion,  in AOI  lead to a 20% soil loss. </p>



                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{ fontWeight: 700 }}>Biodiversity loss  for AOI</p>
                        <p>Wildfires,  in AOI  lead to a 40% decrease in biodiversity.</p>


                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{ fontWeight: 700 }}>Water quality  for AOI</p>
                        <p>Growth of algal blooms  in AOI  lead to a 40% decrease in water quality.</p>

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p style={{ fontWeight: 700 }}>Alerts</p>
                        <Button variant="contained" color="success" className='mb-4'
                            startIcon={<EmailOutlined style={{ height: '1.5em', width: '1.5em' }} />}
                            style={{
                                textTransform: 'none',
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                fontSize: '1em',
                                height: '3em',
                                //    whiteSpace: 'nowrap',
                                padding: '1em',
                            }}>
                            Email Results
                        </Button>

                    </List>

                </TabPanel>

            </TabContext>
        </Box>
    )
}

export default SoilLegend