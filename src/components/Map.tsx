import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './Navigationbar';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgress, Tab, Tabs, Box, Stack, FormGroup, Button, MenuItem, FormControl, FormControlLabel, Switch, Divider, List, ListItem } from '@mui/material';
import { Map, Forest, WaterDrop, Pets, Park, Co2, Agriculture, PrecisionManufacturing } from '@mui/icons-material';


import './Map.css'
import { Nav, Navbar, Offcanvas, } from 'react-bootstrap';
import Typography from '@mui/material/Typography';


import Legend from './Legend';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'
import TreeCoverLegend from './TreeCoverLegend';
import LandCoverLegend from './LandCoverLegend';
import BiodiversityLegend from './BiodiversityLegend';
import SoilLegend from './SoilLegend';
import NavBarWrapper from './NavBarWrapper';
import CarbonLegend from './CarbonLegend';
import CommoditiesLegend from './CommoditiesLegend';
import YieldLegend from './YieldLegend';

// const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



let baseurl = "http://66.42.65.87";


const useStyles = makeStyles({
  formControl: {
    marginTop: 0, // Adjust as needed
    marginBottom: 0, // Adjust as needed

  },
  datePicker: {
    '& .MuiInputBase-root': {
      height: '2em', // Adjust the height as needed
      width: '10.5em',
      overflowX: 'hidden',
      overflowY: 'hidden',
      fontSize: '1em',
      borderRadius: '.5em'
    },
  },
  tabLabel: {
    textTransform: 'capitalize',
    fontfamily: 'Poppins',
    fontWeight: '800',
  },
  typography: {
    fontFamily: [
      'Poppins',

      'sans-serif',
    ].join(','),
  },

});


const theme = createTheme({

  palette: {
    primary: {
      main: '#4caf50',
      // Change the primary color to green


    },
  },
});

const apiKey = import.meta.env.VITE_MAPBOX_API_KEY 
const MapView = () => {
  const classes = useStyles();
  const storeMode = useSelector((state: RootState) => state.mode);
  const storeLink = useSelector((state: RootState) => state.link);
  // console.log(storeMode)

  // const theme = useTheme();
  // const colorMode = React.useContext(ColorModeContext);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  let wmsLayer = useRef<L.TileLayer.WMS | null>(null)

  const mapRef = useRef<L.Map | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [selectedYear, setSelectedYear] = useState<string>('');
  // let yearwmsString = useRef<string>('');
  const [opacity, setOpacity] = useState<number>(100);
  const [checked, setChecked] = useState<boolean>(false);

  const options: string[] = ['user-drawn Boundary', 'geoJSON Boundary'];
  const sensors: string[] = ['Soil organic carbon', 'Above ground biomass', 'Below ground biomass'];

  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedSensorValue, setSelectedSensorValue] = useState<string>('');
  const [navselection, setNavselection] = useState<any>('')
  const [isLoading, setLoading] = useState(false)

  const [show, setShow] = useState(false)
  const [showLegend, setshowLegend] = useState(false)

  const [tabvalue, setTabValue] = useState<any>(0);
  let store_link = useRef('')
  let store_mode = useRef('')
  store_link.current = storeLink
  store_mode.current = storeMode


  const handleTabChange = (event: React.SyntheticEvent, newValue: any) => {
    setTabValue(newValue);
    // console.log(newValue)
  };


  const handleShow = () => {
    setShow(true)
    console.log(store_link.current)

  }


  const handleClose = () => setShow(false)

  const handleShowLegend = () => setshowLegend(true)
  const handleCloseLegend = () => setshowLegend(false)


  const handleModeChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    setSelectedValue(event.target.value as string);
  };

  const handleSensorChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    setSelectedSensorValue(event.target.value as string);
  };


  const handleDateChange = (date: Dayjs | null) => {
    // console.log(date)
    if (date) {
      const yearString = date.year().toString(); // Convert the year to a string
      setSelectedYear(yearString); // Set the selected year in state
      // yearwmsString.current = yearString
      // console.log('Selected year:', yearwmsString.current);
    }
    //  else {
    // //   setSelectedYear(''); // Clear the selected year if date is null
    // }


    setSelectedDate(date);
  };

  const handleOpacityChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number' && wmsLayer.current) {
      // Update the opacity of the WMS layer
      wmsLayer.current.setOpacity(newValue / 100);
      setOpacity(newValue);
    }
  };
  const handleSelect = (selectedKey: any) => {
    console.log('Selected key:', selectedKey);
    setNavselection(selectedKey)

  };
  const handlesCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked)
    setChecked(event.target.checked);
  };
  // const handlesProvinceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.checked)
  //   setChecked(event.target.checked);
  // };

  // const handlesDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.checked)
  //   setChecked(event.target.checked);
  // };



  const addWMSLayerToMap = () => {
    removeWMSLayerFromMap()
    setshowLegend(true)


    console.log(selectedYear)
    const LulcwmsLayer = L.tileLayer.wms(`${baseurl}:8080/geoserver/LULC/wms?`, {
      layers: `LULC:${selectedYear}`,
      crs: L.CRS.EPSG4326,
      styles: "zambezi_lulc",
      format: "image/png",
      transparent: true,
      opacity: 1.0,
    });

    wmsLayer.current = LulcwmsLayer

    wmsLayer.current.on('loading', () => {
      setLoading(true)
    });

    wmsLayer.current.on('load', () => {
      setLoading(false)
    });
    if (mapRef.current && wmsLayer.current) {
      // Add the WMS layer to the map

      wmsLayer.current.addTo(mapRef.current);
    }

  }

  const removeWMSLayerFromMap = () => {
    if (mapRef.current && wmsLayer.current) {
      // Remove the WMS layer from the map
      mapRef.current.removeLayer(wmsLayer.current);
    }
  };


  useEffect(() => {


    if (mapContainerRef.current) {
      // Check if a map instance already exists
      if (mapRef.current) {
        // If a map instance exists, remove it and clean up
        mapRef.current.remove();
        mapRef.current = null;
      }
      // console.log(store_mode.current)

      // Create a new map instance
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
      }).setView([-15.280429913912881, 26.978118886920633], 6);
      storeMode === 'light' ? 
   L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
        attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 10,
        id: "mapbox/streets-v11",
        accessToken:apiKey,
    },
).addTo(map)

:L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }).addTo(map)   
      L.control.scale({ position: 'bottomright' }).addTo(map);
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Save the map instance in the ref for future cleanup
      mapRef.current = map;
    }


    // Cleanup function when the component is unmounted
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }


    };


  }, [storeMode]);


  const handleNavbarClick = (value: string) => {
    console.log('Clicked link:', value);
    setShow(true)
    setTabValue(null)
  };




  return (
    <>
      <ThemeProvider theme={theme}>


        <Navigationbar />



        <div ref={mapContainerRef} style={{ height: '98.5vh', zIndex: 20 }}>


          <Box
            style={{
              position: 'absolute',
              top: '0', /* Adjust top positioning as needed */
              left: '0vw', height: '90vh', zIndex: 1000, backgroundColor: storeMode === 'light' ? '#e5f3d2' : '#484A48',
            }}

            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, }}
          >
            <Tabs
              onClick={handleShow}
              orientation="vertical"
              variant="scrollable"
              value={tabvalue}
              onChange={handleTabChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider', fontWeight: 'bold' }}
              // style={navLinkStyle  style={{color:storeMode === 'light' ? '#4CAF50' : '#fff' }} style={{color:storeMode === 'light' ? '#4CAF50' : '#fff' }}

              style={{ fontWeight: '700' }}
            >
              <Tab icon={<Forest />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Forest Cover</Typography>} value={0} />

              <Tab icon={<Park />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Tree Cover</Typography>} value={1} />
              <Tab icon={<Co2 style={{ height: '2em', width: '2em' }} />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Carbon</Typography>} value={5} />
              <Tab icon={<Map />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Land Use</Typography>} value={2} />
              <Tab icon={<Pets />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Biodiversity</Typography>} value={3} />
              <Tab icon={<WaterDrop />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Soil & Water</Typography>} value={4} />
              <Tab icon={<PrecisionManufacturing style={{ height: '1.5em', width: '1.5em' }} />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Commodities</Typography>} value={6} />
              <Tab icon={<Agriculture style={{ height: '1.5em', width: '1.5em' }} />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Yield</Typography>} value={7} />



            </Tabs>

          </Box>



          <Offcanvas
            show={show}
            backdrop={false}
            onHide={handleClose}
            style={{ margin: '4.5em 8.9em', height: '90vh', overflowY: 'auto', width: '22%', backgroundColor: storeMode === 'light' ? '#f9f9f9' : '#484a48',
            color: storeMode === 'light' ? '#484a48' : '#ddeec6', }}>
            <Offcanvas.Header closeButton  >
              {/* <CloseIcon onClick={handleClose} style={{ marginLeft: '14em', cursor: 'pointer' }} /> */}
              <Offcanvas.Title>

              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ fontFamily: 'Poppins' }}>

              <TabPanel value={tabvalue} index={0} >
                <Typography fontFamily="Poppins" marginBottom={'1em'} fontWeight={'bold'} marginTop={'-2em'} fontSize={'1.5em'}>Forest Cover Change</Typography>

                <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

                <Stack direction="row" spacing={12} >
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >Start</Typography>
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >End</Typography>
                </Stack>


                <Stack direction="row" spacing={2} style={{ marginBottom: '2em' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </Stack>


                <FormGroup style={{ marginBottom: '1em' }}>
                  <FormControlLabel control={<Switch color='warning' onChange={addWMSLayerToMap} />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Forest cover loss</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Forest cover gain</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Net Forest Change</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Forest loss by dominant driver</Typography>} />

                </FormGroup>


                <List >

                  <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                  <Typography fontFamily="Poppins" style={{ fontWeight: 'bold', margin: '.5em' }}>Deforestation Alerts</Typography>

                  <FormGroup>
                    <FormControlLabel control={<Switch color='warning' />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Near realtime alerts</Typography>} />
                    <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Areas to watch</Typography>} />

                  </FormGroup>

                  <Divider variant="middle" component="li" style={{ marginBottom: '1em' }} />
                  <Typography fontFamily="Poppins" style={{ fontWeight: 'bold', margin: '.5em' }}>Fires</Typography>

                  <FormGroup>
                    <FormControlLabel control={<Switch color='warning' />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Fire alerts</Typography>} />
                    <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Areas to watch</Typography>} />
                    <FormControlLabel control={<Switch color='warning' />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Global fire index</Typography>} />
                    <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Tree cover loss due to fires</Typography>} />
                  </FormGroup>

                </List>


              </TabPanel>

              <TabPanel value={tabvalue} index={1}>
                <Typography fontFamily="Poppins" marginBottom={'1em'} fontWeight={'bold'} marginTop={'-2em'} fontSize={'1.5em'}>Tree Cover Change</Typography>

                <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

                <Stack direction="row" spacing={12} >
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >Start</Typography>
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >End</Typography>
                </Stack>


                <Stack direction="row" spacing={2} style={{ marginBottom: '2em' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </Stack>


                <FormGroup style={{ marginBottom: '1em' }}>
                  <FormControlLabel control={<Switch color='warning' />} label={<Typography fontFamily="Poppins" fontWeight={'bold'}>Tree cover loss</Typography>} />
                  <p>From: 2001
                    To: 2023
                    Coverage: Global
                    Source: Hansen</p>
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'}>Tree cover gain</Typography>} />
                  <p>From: 2001
                    To: 2023
                    Coverage: Global
                    Source: Hansen</p>
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'}>Net Tree cover Change</Typography>} />
                  <p>From: 2001
                    To: 2023
                    Coverage: Global
                    Source: Hansen</p>
                </FormGroup>

              </TabPanel>

              <TabPanel value={tabvalue} index={2}>

                <Typography fontFamily="Poppins" marginBottom={'1em'} fontWeight={'bold'} marginTop={'-2em'} fontSize={'1.5em'}>Land Cover</Typography>

                <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

                <Stack direction="row" spacing={12} >
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >Start</Typography>
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >End</Typography>
                </Stack>


                <Stack direction="row" spacing={2} style={{ marginBottom: '2em' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </Stack>

                <FormGroup style={{ marginBottom: '1em' }}>
                  <FormControlLabel control={<Switch onChange={addWMSLayerToMap} />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Forests</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Cropland</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Grassland</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Built-up</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Shrubland</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Wetland</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Bareland</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold' >Water</Typography>} />

                </FormGroup>




              </TabPanel>

              <TabPanel value={tabvalue} index={3}>
                <Typography fontFamily="Poppins" marginBottom={'1em'} fontWeight={'bold'} marginTop={'-2em'} fontSize={'1.5em'}>Biodiversity</Typography>

                <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

                <Stack direction="row" spacing={12} >
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >Start</Typography>
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >End</Typography>
                </Stack>


                <Stack direction="row" spacing={2} style={{ marginBottom: '2em' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </Stack>

                <FormGroup style={{ marginBottom: '1em' }}>
                  <FormControlLabel control={<Switch onChange={addWMSLayerToMap} />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Key Biodiversity Areas</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Biodiversity Hotspots</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Biodiversity loss</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Biodiversity gain</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Biodiversity intactness</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Biodiversity significance</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Alliance for Zero extinction sites</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Endemic Bird Areas</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Tiger conservation landscape</Typography>} />

                </FormGroup>

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
                  Request Analysis
                </Button>
                <Typography fontFamily="Poppins" >Get results via email once ready and download report</Typography>


              </TabPanel>

              <TabPanel value={tabvalue} index={4}>
                <Typography fontFamily="Poppins" marginBottom={'1em'} fontWeight={'bold'} marginTop={'-2em'} fontSize={'1.5em'}>Soil & Water</Typography>

                <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

                <Stack direction="row" spacing={12} >
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >Start</Typography>
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >End</Typography>
                </Stack>


                <Stack direction="row" spacing={2} style={{ marginBottom: '2em' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </Stack>

                <FormGroup style={{ marginBottom: '1em' }}>
                  <FormControlLabel control={<Switch onChange={addWMSLayerToMap} />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Soil Types</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Soil Moisture levels</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Water quality</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight='bold'>Land Use </Typography>} />


                </FormGroup>

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
                  Hydrologic Analysis
                </Button>
                <Typography fontFamily="Poppins" >Get results via email once ready and download report</Typography>

              </TabPanel>

              <TabPanel value={tabvalue} index={5}>
                <Typography fontFamily="Poppins" marginBottom={'1em'} fontWeight={'bold'} marginTop={'-2em'} fontSize={'1.5em'}>Carbon</Typography>

                <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

                <Stack direction="row" spacing={12} >
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >Start</Typography>
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >End</Typography>
                </Stack>


                <Stack direction="row" spacing={2} style={{ marginBottom: '2em' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </Stack>


                <Typography fontFamily="Poppins" fontWeight={'bold'} >Select Biomass</Typography>
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

                <Typography fontFamily="Poppins" fontWeight={'bold'} >Carbon stock</Typography>

                <FormGroup style={{ marginBottom: '1em' }}>
                  <FormControlLabel control={<Switch onChange={addWMSLayerToMap} />} label={<Typography fontFamily="Poppins">Carbon stock loss</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins">Carbon stock gain</Typography>} />

                </FormGroup>

                <Typography fontFamily="Poppins" fontWeight={'bold'} >Select Tree configuration</Typography>
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



              </TabPanel>

              <TabPanel value={tabvalue} index={6}>
                <Typography fontFamily="Poppins" marginBottom={'1em'} fontWeight={'bold'} marginTop={'-2em'} fontSize={'1.5em'}>Commodities</Typography>

                <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

                <Stack direction="row" spacing={12} >
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >Start</Typography>
                  <Typography fontFamily="Poppins" fontWeight={'bold'} >End</Typography>
                </Stack>


                <Stack direction="row" spacing={2} style={{ marginBottom: '2em' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker

                        value={selectedDate}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                        className={classes.datePicker}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </Stack>

                <FormGroup style={{ marginBottom: '1em' }}>
                  <FormControlLabel control={<Switch onChange={addWMSLayerToMap} />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >Logging concessions</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >Mining concessions</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >Oil palm concessions</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >Mapped cocoa plots per square kilometer</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >Palm oil mills</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >RTRS Guides for Responsible Soy Expansion</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >RSPO oil palm concessions</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >Oil and gas concessions</Typography>} />
                  <FormControlLabel control={<Switch />} label={<Typography fontFamily="Poppins" fontWeight={'bold'} >Wood fiber concessions</Typography>} />

                </FormGroup>

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
                  Request Analysis
                </Button>
                <Typography fontFamily="Poppins" >Get results via email once ready and download report</Typography>


              </TabPanel>

              <TabPanel value={tabvalue} index={7}>
                <Typography fontFamily="Poppins" marginBottom={'1em'} fontWeight={'bold'} marginTop={'-2em'} fontSize={'1.5em'}>Predict crop yield</Typography>



                <Typography fontFamily="Poppins" fontWeight={'bold'} >Select crop</Typography>
                <FormControl variant="outlined" className={classes.formControl} fullWidth>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={selectedSensorValue}
                    onChange={(e) => { handleSensorChange(e); addWMSLayerToMap()}}
                    style={{ height: '2em', marginBottom: '1.5em', }}

                  >
                    {sensors.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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

              {/* {
                store_link.current === 'carbon' &&
 
              } */}

            </Offcanvas.Body>
          </Offcanvas>

          {
            isLoading &&
            <CircularProgress
              color="success"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 500 }}
            />
          }



        </div>


        {
          showLegend &&

          <Offcanvas
            show={showLegend}
            onHide={handleCloseLegend}
            backdrop={false}
            style={{ margin: '4.5em 34.9em', height: '90vh', overflowY: 'auto', width: '22%', backgroundColor: storeMode === 'light' ? '#f9f9f9' : '#303230',
            color: storeMode === 'light' ? '#484a48' : '#ddeec6', fontfamily: 'Poppins', }}>
            <Offcanvas.Header closeButton  >
              {/* <ChevronLeftIcon onClick={handleCloseLegend} style={{ marginLeft: '13em', cursor: 'pointer' }} /> */}
              <Offcanvas.Title>

              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{backgroundColor: storeMode === 'light' ? '#f9f9f9' : '#303230',
            color: storeMode === 'light' ? '#484a48' : '#ddeec6',}}>
              {
                tabvalue === 0 ? <Legend onOpacityChange={handleOpacityChange} />
                  : tabvalue === 1 ? <TreeCoverLegend />
                    : tabvalue === 2 ? <LandCoverLegend />
                      : tabvalue === 3 ? <BiodiversityLegend />
                        : tabvalue === 4 ? <SoilLegend />
                          : tabvalue === 5 ? <CarbonLegend /> :
                            tabvalue === 6 ? <CommoditiesLegend /> :
                            tabvalue === 7 ? <YieldLegend />:
                              ''

              }

            </Offcanvas.Body>
          </Offcanvas>

        }



      </ThemeProvider>

    </>

  )
}

export default MapView
