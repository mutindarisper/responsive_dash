import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './Navigationbar';

// import AccordionActions from '@mui/material/AccordionActions';
// import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgress, Tab, Tabs } from '@mui/material';
import { Map, Forest,  WaterDrop, Pets } from '@mui/icons-material';


import './Map.css'
import { Nav, Navbar, Offcanvas, Stack } from 'react-bootstrap';
import Typography from '@mui/material/Typography';

import mapbox from '../assets/images/basemap.png';
import Legend from './Legend';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'

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

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
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
      width: '9.5em',
      overflowX: 'hidden',
      overflowY: 'hidden',
      fontSize: '1em',
      borderRadius: '1em'
    },
  },
  tabLabel: {
    textTransform: 'capitalize',
    fontfamily: 'Poppins',
    fontWeight: '800',
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

const MapView = () => {
  const classes = useStyles();
  const storeMode = useSelector((state: RootState) => state.mode);
  console.log(storeMode)


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
  const sensors: string[] = ['sentinel', 'landsat'];

  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedSensorValue, setSelectedSensorValue] = useState<string>('');
  const [navselection, setNavselection] = useState<any>('')
  const [isLoading, setLoading] = useState(false)

  const [show, setShow] = useState(false)
  const [showLegend, setshowLegend] = useState(false)

  const [tabvalue, setTabValue] = useState(0);



  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };


  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleShowLegend = () => setshowLegend(true)
  const handleCloseLegend = () => setshowLegend(false)


  const handleModeChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    setSelectedValue(event.target.value as string);
  };

  const handleSensorChange = (event: SelectChangeEvent) => {
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

      // Create a new map instance
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
      }).setView([-15.280429913912881, 26.978118886920633], 6);
      L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }).addTo(map);
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


  }, []);



  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigationbar />
        {/* <div className="counter" style={{ position:'absolute', top:'30vh',left:'20vw', padding:'3em', zIndex: 2000 }}>
        <Counter />
        </div> */}

        <div ref={mapContainerRef} style={{ height: '98.5vh', zIndex: 20 }}>
         

          <Box
            style={{
              position: 'absolute',
              top: '0', /* Adjust top positioning as needed */
              left: '0vw', height: '90vh', zIndex: 1000, backgroundColor: storeMode === 'light' ? '#e5f3d2' : '#000',
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
              // style={navLinkStyle}
              style={{ fontWeight: '700' }}
            >
              <Tab icon={<Forest style={{color:storeMode === 'light' ? '#5b5e57' : '#fff' }}  onClick={addWMSLayerToMap} />} label={<Typography fontWeight="bold" fontFamily={'Poppins'}  color={storeMode === 'light' ? '#5b5e57' : '#fff'}  className={classes.tabLabel}>Forest Cover</Typography>} {...a11yProps(4)} />
              <Tab icon={<Forest style={{color:storeMode === 'light' ? '#5b5e57' : '#fff' }} />} label={<Typography fontWeight="bold" fontFamily={'Poppins'}  color={storeMode === 'light' ? '#5b5e57' : '#fff'}  className={classes.tabLabel}>Tree Cover</Typography>} {...a11yProps(1)} />
              <Tab icon={<Map style={{color:storeMode === 'light' ? '#5b5e57' : '#fff' }} />} label={<Typography fontWeight="bold" fontFamily={'Poppins'}  color={storeMode === 'light' ? '#5b5e57' : '#fff'}  className={classes.tabLabel}>Land Use</Typography>} {...a11yProps(1)} />
              <Tab icon={<Pets style={{color:storeMode === 'light' ? '#5b5e57' : '#fff' }} />} label={<Typography fontWeight="bold" fontFamily={'Poppins'}  color={storeMode === 'light' ? '#5b5e57' : '#fff'}  className={classes.tabLabel}>Biodiversity</Typography>} {...a11yProps(3)} />
              <Tab icon={<WaterDrop style={{color:storeMode === 'light' ? '#5b5e57' : '#fff' }} />} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={storeMode === 'light' ? '#5b5e57' : '#fff'}  className={classes.tabLabel}>Soil & Water</Typography>} {...a11yProps(4)} />


            </Tabs>

          </Box>



          <Offcanvas show={show} backdrop={false} style={{ margin: '4.5em 8.4em', height: '90vh', overflowY: 'auto', width: '20%', backgroundColor: '#f9f9f9', fontfamily: 'Poppins', }}>
            <Offcanvas.Header  >
              <CloseIcon onClick={handleClose} style={{ marginLeft: '14em', cursor: 'pointer' }} />
              <Offcanvas.Title>

              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <TabPanel value={tabvalue} index={0}>
                Item One
              </TabPanel>
              <TabPanel value={tabvalue} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={tabvalue} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={tabvalue} index={3}>
                Item Four
              </TabPanel>
              <TabPanel value={tabvalue} index={4}>
                Item Five
              </TabPanel>
              <TabPanel value={tabvalue} index={5}>
                Item Six
              </TabPanel>
              <TabPanel value={tabvalue} index={6}>
                Item Seven
              </TabPanel>
              {/* {navselection === 'treecover' || 'landuse'|| 'carbonstock' || 'biodiversity' || 'soil' ?

              <div className="selections" style={{ padding: '0', }}>
                <Box sx={{ minWidth: 120 }}>

                  <p id="select-label" style={{ marginBottom: '0.5em', fontWeight: '500' }}>Select Boundary</p>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={selectedValue}
                      onChange={handleModeChange}
                      style={{ height: '2em', marginBottom: '0.5em', }}

                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <p id="select-label" style={{ marginBottom: '0.5em', fontWeight: '500' }}>Select Dataset</p>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={selectedSensorValue}
                      onChange={handleSensorChange}
                      style={{ height: '2em', marginBottom: '0.5em', }}

                    >
                      {sensors.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <p id="select-label" style={{ marginBottom: '0.5em', fontWeight: '500' }}>Select Band</p>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={selectedSensorValue}
                      onChange={handleSensorChange}
                      style={{ height: '2em', marginBottom: '0.5em', }}

                    >
                      {sensors.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Stack direction="horizontal" style={{ gap: '8em', marginBottom: '-1em' }}>
                    <p id="select-label" style={{ fontWeight: '500' }}>Start Date</p>
                    <p id="select-label" style={{ fontWeight: '500' }}>End Date</p>
                  </Stack>



                  <Stack direction="horizontal" style={{ marginBottom: '.5em' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                      <div className="wrap">
                        <DemoContainer components={['DatePicker', 'DatePicker']}     >
                          <DatePicker

                            value={selectedDate}
                            onChange={handleDateChange}
                            format="YYYY-MM-DD"
                            className={classes.datePicker}
                          />
                        </DemoContainer>
                      </div>

                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="wrap2">
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                          <DatePicker

                            value={selectedDate}
                            onChange={handleDateChange}
                            format="YYYY-MM-DD"
                            className={classes.datePicker}
                          />
                        </DemoContainer>
                      </div>
                    </LocalizationProvider>

                  </Stack>

                  <p id="select-label" style={{ marginTop: '1.5em', fontWeight: '500' }}>Select Statistics</p>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={selectedSensorValue}
                      onChange={handleSensorChange}
                      style={{ height: '2em', marginBottom: '0.5em', }}

                    >
                      {sensors.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>




                  <Button variant="contained" style={{ backgroundColor: '#086a53' }} disableElevation className='my-4' onClick={addWMSLayerToMap} startIcon={<Settings />}>
                    Run
                  </Button>




                </Box>



              </div>

              : navselection === 'secondary_layers' ?
                <div className="boundaries">
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked
                      checked={checked}
                      onChange={handlesCountryChange}
                    />} label="Country Boundary" />
                    <FormControlLabel required control={<Switch />} label="Province Boundary" />
                    <FormControlLabel control={<Switch />} label="District Boundary" />
                  </FormGroup>

                </div>
                :

                <div className="baselayers" style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                  <Card sx={{ display: 'flex', }}>

                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={mapbox}
                      alt="Mapbox"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                          Mapbox Dark map
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          MapBox World Dark Streets Map
                        </Typography>
                      </CardContent>



                    </Box>
                  </Card>

                  <Card sx={{ display: 'flex' }}>

                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={mapbox}
                      alt="Mapbox"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                          Mapbox Dark map
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          MapBox World Dark Streets Map
                        </Typography>
                      </CardContent>



                    </Box>
                  </Card>

                  <Card sx={{ display: 'flex' }}>

                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={mapbox}
                      alt="Mapbox"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                          Mapbox Dark map
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          MapBox World Dark Streets Map
                        </Typography>
                      </CardContent>



                    </Box>
                  </Card>

                  <Card sx={{ display: 'flex' }}>

                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={mapbox}
                      alt="Mapbox"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                          Mapbox Dark map
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          MapBox World Dark Streets Map
                        </Typography>
                      </CardContent>



                    </Box>
                  </Card>

                  <Card sx={{ display: 'flex' }}>

                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={mapbox}
                      alt="Mapbox"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                          Mapbox Dark map
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          MapBox World Dark Streets Map
                        </Typography>
                      </CardContent>



                    </Box>
                  </Card>
                </div>

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

          <Offcanvas show={showLegend} backdrop={false} style={{ margin: '4.5em 32.5em', height: '40vh', overflowY: 'auto', width: '15%', backgroundColor: '#fff', fontfamily: 'Poppins', }}>
            <Offcanvas.Header  >
              <ChevronLeftIcon onClick={handleCloseLegend} style={{ marginLeft: '10em', cursor: 'pointer' }} />
              <Offcanvas.Title>

              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Legend onOpacityChange={handleOpacityChange} />
            </Offcanvas.Body>
          </Offcanvas>

        }



      </ThemeProvider>

    </>

  )
}

export default MapView

// export default function ToggleColorMode() {
//   const storeMode = useSelector((state: RootState) => state.mode);
//   const dispatch: AppDispatch = useDispatch();
//   const [mode, setMode] = React.useState<'light' | 'dark'>('light');
//   const colorMode = React.useMemo(
//     () => ({
//       toggleColorMode: () => {
//         // console.log(mode)
//         setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
       

        
//       },
      
//     }),
//     [],
//   );

//   const theme = React.useMemo(
//     () => 
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),

      
//     [mode],
//   );

  
  

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <Navigationbar />
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }