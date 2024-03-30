import React, { useState } from 'react'
import { Tab, Box, Divider, List, Button, Stack, Typography, FormControl, MenuItem } from '@mui/material'
import { Layers, BarChart, Polyline, FolderZip } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './Map.css'
import { styled } from '@mui/styles';
import { makeStyles } from '@mui/styles';

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

const useStyles = makeStyles({
    formControl: {
        marginTop: 0, // Adjust as needed
        marginBottom: 0, // Adjust as needed

    }
})

const CommoditiesLegend = () => {


    const classes = useStyles();

    const [value, setValue] = useState('1');
    const [selectedSensorValue, setSelectedSensorValue] = useState<string>('');
    const sensors: string[] = ['Palm Oil', 'Wood Fibre', 'Cocoa'];

    const data = [5, 4, 3];
    const labels = ['Loss', 'Gain', 'Stable'];


    const categories: string[] = ['Available', 'In Agreement'];

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const handleSensorChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setSelectedSensorValue(event.target.value as string);
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
                    <p>Wood fiber concessions by type - 2021</p>


                    <List >
                        <div className="d-flex gap-2 ">
                            <div style={{
                                backgroundColor:
                                    '#FAA04D'
                                ,
                                borderRadius: '50%', width: '1.5em', height: '1.5em'
                            }}></div>
                            <p style={{ fontWeight: 700 }}>Wood fiber concessions</p>
                        </div>

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p>Oil and gas concessions</p>
                        {
                            categories.map((item) => (
                                <div className="d-flex gap-2 ">
                                    <div style={{
                                        backgroundColor: item === 'Available' ?
                                            '#FAA04D' : '#6F81C0'
                                        ,
                                        borderRadius: '50%', width: '1.5em', height: '1.5em'
                                    }}></div>
                                    <p>{item}</p>
                                </div>
                            ))
                        }

                        <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                        <p>Logging concessions - 2021</p>
                        <div className="d-flex gap-2 ">
                            <div style={{
                                backgroundColor:
                                    '#E92525',

                                borderRadius: '50%', width: '1.5em', height: '1.5em'
                            }}></div>
                            <p>Logging concessions</p>
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



                    
                        <Typography fontFamily="Poppins" fontWeight={'bold'} >Select Commodity</Typography>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={selectedSensorValue}
                                onChange={handleSensorChange}
                                style={{ height: '2em', marginBottom: '1.5em', }}

                            >
                                {sensors.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                     
                        <p style={{ fontWeight: 700 }}> AOI</p>
                        <p>The region's habitat is comprised of Eastern Canadian Forest-Boreal transition. This region has no Intact Forest. The area has a predominantly snowy, humid climate with warm summers. It is part of the Temperate Broadleaf and Mixed Forests biome. The location is predominantly land area. Area of 87.43 kha located in a lowland area</p>

                  

                 

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
                        Download EUDR report
                    </Button>
                   

                </TabPanel>

            </TabContext>
        </Box>
    )
}

export default CommoditiesLegend