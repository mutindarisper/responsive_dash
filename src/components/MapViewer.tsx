import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './Navigationbar';
import MenuIcon from '@mui/icons-material/Menu'
import LayersIcon from '@mui/icons-material/Layers'
import PublicIcon from '@mui/icons-material/Public';

import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FloodIcon from '@mui/icons-material/Flood';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Slider, FormGroup, FormControlLabel, Checkbox, Switch } from '@mui/material';


import './Map.css'
import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

let baseurl = "http://66.42.65.87";

const accordionStyle = {
  backgroundColor: "#173f5f",
  color: '#fff',
  height: '.5em',
  // padding: '2.5em 1em',

  // marginBottom: "20px"
};

const accordionIconStyle = {

  color: '#fff',

  // padding: '1em 5em',

  // marginBottom: "20px"
};

const useStyles = makeStyles({
  formControl: {
    marginTop: 0, // Adjust as needed
    marginBottom: 0, // Adjust as needed

  },
  datePicker: {
    '& .MuiInputBase-root': {
      height: '2em', // Adjust the height as needed
    },
  },
});

const MapViewer = () => {
  const classes = useStyles();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  let wmsLayer = useRef<L.TileLayer.WMS | null>(null)

  const mapRef = useRef<L.Map | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [selectedYear, setSelectedYear] = useState<string>('');
  let yearwmsString = useRef<string>('');
  const [opacity, setOpacity] = useState<number>(1);

  const options: string[] = ['operational', 'historical'];
  const sensors: string[] = ['sentinel', 'landsat'];

  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedSensorValue, setSelectedSensorValue] = useState<string>('');
  const [navselection, setNavselection] = useState<any>('')





  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)


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
      wmsLayer.current.setOpacity(newValue/100);
      setOpacity(newValue);
    }
  };
  const handleSelect = (selectedKey: any) => {
    console.log('Selected key:', selectedKey);
    setNavselection(selectedKey)

  };


  const addWMSLayerToMap = () => {
    removeWMSLayerFromMap()


    console.log(selectedYear)
    const LulcwmsLayer = L.tileLayer.wms(`${baseurl}:8080/geoserver/LULC/wms?`, {
      // pane: "pane400",
      layers: `LULC:${selectedYear}`,
      crs: L.CRS.EPSG4326,
      styles: "zambezi_lulc",
      format: "image/png",
      transparent: true,
      opacity: 1.0,
    });

    wmsLayer.current = LulcwmsLayer
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


  // const handleLULCLayer = () => {   
  //   console.log(selectedYear)
  //   const LulcwmsLayer = L.tileLayer.wms(`${baseurl}:8080/geoserver/LULC/wms?`, {
  //     // pane: "pane400",
  //     layers: `LULC:${selectedYear}`,
  //     crs: L.CRS.EPSG4326,
  //     styles: "zambezi_lulc",
  //     format: "image/png",
  //     transparent: true,
  //     opacity: 1.0,
  //   });

  //   wmsLayer.current = LulcwmsLayer


  // }
  // handleLULCLayer()


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
      }).setView([-1.2, 33,], 4);
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
      <Navigationbar />
      <div ref={mapContainerRef} style={{ height: '92.5vh', zIndex: 20 }}>
        <Navbar bg="dark" expand="lg" className="flex-column" style={{ maxWidth: '3vw', height: '90vh', zIndex: 500, }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column" style={{ alignItems: 'flex-start', marginTop: '-75vh' }} onSelect={handleSelect}>
              <Nav.Item>
                <Nav.Link eventKey='primary_layers' >
                  <MenuIcon onClick={handleShow} className='menu_icon' />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='secondary_layers'>
                  <LayersIcon className='menu_icon' />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='base_layers' >
                  <PublicIcon className='menu_icon' />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>



        <Offcanvas show={show} backdrop={false} style={{ margin: '4.5em 3.6em', height: '90vh', overflowY: 'auto', width: '25%' }}>
          <Offcanvas.Header  >
            <CloseIcon onClick={handleClose} style={{ marginLeft: '17em', cursor: 'pointer' }} />
            <Offcanvas.Title>

            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {navselection === 'primary_layers' ?

              <div className="selections" style={{ margin: '1.5em', }}>
                <Accordion  >
                  <AccordionSummary
                    style={accordionStyle}
                    expandIcon={<ExpandMoreIcon style={accordionIconStyle} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className="title"><FloodIcon /> Potential Floods Water</p>
                  </AccordionSummary>
                  <AccordionDetails>

                    <Box sx={{ minWidth: 120 }}>


                      <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Potential Floods Water Map" />
                        <p>Checked to overlay flood water area estimated from satellite imagery analysis</p>

                      </FormGroup>

                      <p id="select-label" style={{ marginBottom: '0.5em', fontWeight: '500' }}>Select Mode</p>
                      <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <Select
                          labelId="select-label"
                          id="select"
                          value={selectedValue}
                          onChange={handleModeChange}
                          style={{ height: '2em', marginBottom: '0.5em' }}

                        >
                          {options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <p id="select-label" style={{ marginBottom: '0.5em', fontWeight: '500' }}>Select Sensor</p>
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

                      <p id="select-label" style={{ marginBottom: '0.5em', fontWeight: '500' }}>Select Date (YYYY-MM-DD)</p>

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

                      <Button variant="contained" disableElevation className='my-4' onClick={addWMSLayerToMap}>
                        Request Layer
                      </Button>
                      <p className="opacity">Opacity</p>
                      <Slider aria-label="Default"
                        valueLabelDisplay="auto"
                        value={opacity}
                        onChange={handleOpacityChange}
                        step={1}
                        min={0}
                        max={100} />


                    </Box>


                  </AccordionDetails>
                </Accordion>


                <Accordion >
                  <AccordionSummary
                    style={accordionStyle}
                    expandIcon={<ExpandMoreIcon style={accordionIconStyle} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className="title"> <FloodIcon /> Flood depth map</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>


                <Accordion  >

                  <AccordionSummary
                    style={accordionStyle}
                    expandIcon={<ExpandMoreIcon style={accordionIconStyle} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className="title"> <FloodIcon /> Flood age map</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>


                <Accordion  >
                  <AccordionSummary
                    style={accordionStyle}
                    expandIcon={<ExpandMoreIcon style={accordionIconStyle} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className="title"> <FloodIcon /> Permanent water</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>




                <Accordion  >
                  <AccordionSummary
                    style={accordionStyle}
                    expandIcon={<ExpandMoreIcon style={accordionIconStyle} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className="title"> <FloodIcon /> Precipitation data</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>



                <Accordion  >
                  <AccordionSummary
                    style={accordionStyle}
                    expandIcon={<ExpandMoreIcon style={accordionIconStyle} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className="title"> <FloodIcon /> Raw satellite imagery</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>



              </div>

              : 'boundaries'}



          </Offcanvas.Body>
        </Offcanvas>







      </div>





    </>

  )
}

export default MapViewer