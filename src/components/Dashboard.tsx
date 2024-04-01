import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './Navigationbar'
import { Col, Container, Row } from 'react-bootstrap'
import { Typography, FormControl, Select, SelectChangeEvent, MenuItem, Stack, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CloudDownload, Settings } from '@mui/icons-material';
import GainBarChart from './charts/GainBarChart';
import DoughnutChart from './charts/Doughnut';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'

type Props = {}
const useStyles = makeStyles({
    formControl: {
        marginTop: 0, // Adjust as needed
        marginBottom: 0, // Adjust as needed

    },
    datePicker: {
        '& .MuiInputBase-root': {
            height: '2em', // Adjust the height as needed
            width: '12.5em',
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

const Dashboard = (props: Props) => {
    const classes = useStyles();
    const storeMode = useSelector((state: RootState) => state.mode);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    let wmsLayer = useRef<L.TileLayer.WMS | null>(null)

    const mapRef = useRef<L.Map | null>(null);
    const options: string[] = ['user-drawn Boundary', 'geoJSON Boundary'];
    const [selectedSensorValue, setSelectedSensorValue] = useState<string>('');
    const [boundary, setBoundary] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2022-04-17'))
    const [selectedYear, setSelectedYear] = useState<string>('');

    const data = [5, 4, 3];
    const labels = ['Loss', 'Gain', 'Stable'];
    const handleBoundary = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setBoundary(event.target.value as string);
    };

    const handleTheme = (event: SelectChangeEvent) => {
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



    return (
        <>
            <ThemeProvider theme={theme}>
                <Navigationbar />
                <Container fluid  >
                    <Row>
                        <Col sm={3} style={{ backgroundColor: '#eee', padding: '2em', height: '90vh', fontFamily: 'Poppins' }}>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Boundary</Typography>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={boundary}
                                    onChange={(e) => { handleBoundary(e) }}
                                    style={{ height: '2em', marginBottom: '1.5em', }}

                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Select Theme</Typography>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={boundary}
                                    onChange={(e) => { handleBoundary(e) }}
                                    style={{ height: '2em', marginBottom: '1.5em', }}

                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Select Dataset</Typography>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={boundary}
                                    onChange={(e) => { handleBoundary(e) }}
                                    style={{ height: '2em', marginBottom: '1.5em', }}

                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Select Band</Typography>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={boundary}
                                    onChange={(e) => { handleBoundary(e) }}
                                    style={{ height: '2em', marginBottom: '1.5em', }}

                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Typography fontFamily="Poppins" fontWeight={'bold'} marginBottom={'1em'} >Select date</Typography>

                            <Stack direction="row" spacing={23} >
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
                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Select Statistic</Typography>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={boundary}
                                    onChange={(e) => { handleBoundary(e) }}
                                    style={{ height: '2em', marginBottom: '1.5em', }}

                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Stack>
                                <Button size='large' variant="contained" color="success" className='mb-4'
                                    startIcon={<Settings style={{ height: '1.5em', width: '1.5em' }} />}

                                    style={{
                                        textTransform: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 700,
                                        fontSize: '1em',
                                        height: '3em',
                                        //    whiteSpace: 'nowrap',
                                        padding: '1em',
                                    }}>
                                    RUN
                                </Button>
                                <Button size='large' variant="contained" color="success" className='mb-4'
                                    startIcon={<CloudDownload style={{ height: '1.5em', width: '1.5em' }} />}

                                    style={{
                                        textTransform: 'none',
                                        fontFamily: 'Poppins',
                                        fontWeight: 700,
                                        fontSize: '1em',
                                        height: '3em',
                                        //    whiteSpace: 'nowrap',
                                        padding: '1em',
                                    }}>
                                    Download Report
                                </Button>


                            </Stack>

                        </Col>
                        <Col sm={4} style={{ backgroundColor: '#fff', padding: '2em', height: '90vh', fontFamily: 'Poppins' }}>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} >Summary</Typography>
                            <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk.
                                Difaligen egosörar hemist. Hemirade tera. R-tal fade eftersom speliga autosad dilement. Egenanställningsföretag speleskap.
                                Fan suling. Multisade blockkedja, men dolel, plus nevis. Mikrora epick en monoleska. Tenelonar sölig.
                            </p>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Combined</Typography>
                            <div className="bar" style={{ border: '2px solid #4caf50', height: '32vh', padding: '1em', marginBottom: '1em' }}>
                                <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk. Difaligen egosörar hemist.
                                </p>
                                <GainBarChart data={data} labels={labels} />
                            </div>

                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Mean</Typography>
                            <div className="chart" style={{ border: '2px solid #4caf50', height: '32vh', padding: '1em' }}>
                                <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk. Difaligen egosörar hemist.
                                </p>

                                <GainBarChart data={data} labels={labels} />
                            </div>
                        </Col>
                        <Col sm={5} style={{ backgroundColor: '#fff', padding: '2em', height: '90vh', fontFamily: 'Poppins' }}>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Net Change</Typography>
                            <div className="chart" style={{  border: '2px solid #4caf50', height: '36vh', padding: '1em', marginBottom:'1em' }}>
                                <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk. Difaligen egosörar hemist.
                                </p>

                                <div className="pie" style={{  height: '32vh', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'-2em'   }} >
                                    <DoughnutChart data={data} labels={labels} />
                                </div>
                            </div>

                            <div ref={mapContainerRef}  id="map" style={{ height: '47vh' }}></div>
                        </Col>
                    </Row>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default Dashboard