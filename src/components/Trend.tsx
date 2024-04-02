import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './Navigationbar'
import { Col, Container, Row } from 'react-bootstrap'
import { Typography, SelectChangeEvent,  } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import GainBarChart from './charts/GainBarChart';
import DoughnutChart from './charts/Doughnut';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'
import SelectionsPanel from './SelectionsPanel';
import LineChart from './charts/LineChart';

type Props = {}

const theme = createTheme({

    palette: {
        primary: {
            main: '#4caf50',
            // Change the primary color to green


        },
    },
});
const apiKey = import.meta.env.VITE_MAPBOX_API_KEY 

const Trend = (props: Props) => {
    const storeMode = useSelector((state: RootState) => state.mode);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string>('')
    const [selectedDataset, setSelectedDataset] = useState<string>('')
    const [selectedBand, setSelectedBand] = useState<string>('')
    const [boundary, setBoundary] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2012-04-17'))
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs('2022-04-17'))
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedEndYear, setSelectedEndYear] = useState<string>('');
    const [statistic, setStatistic] = useState<string>('')

    const data = [5, 4, 3, 1, 10, 2, 3.5, 0.5];
    const labels = ['2010', '2013', '2016', '2019', '2021', '2022', '2024'];
    const handleBoundary = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setBoundary(event.target.value as string);
    };

    const handleTheme = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setSelectedTheme(event.target.value as string);
    };
    const handleDataset = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setSelectedDataset(event.target.value as string);
    };
    
    const handleBand = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setSelectedBand(event.target.value as string);
    };

    const handleStatistic = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setStatistic(event.target.value as string);
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


        setSelectedDate(date as Dayjs);
    };
    const handleEndDateChange = (date: Dayjs | null) => {
        // console.log(date)
        if (date) {
            const yearString = date.year().toString(); // Convert the year to a string
            setSelectedEndYear(yearString); // Set the selected year in state
            // yearwmsString.current = yearString
            // console.log('Selected year:', yearwmsString.current);
        }
        //  else {
        // //   setSelectedYear(''); // Clear the selected year if date is null
        // }


        setSelectedEndDate(date as Dayjs);
    };

    const handleAnalysis = (event:any) => {
        console.log('run analysis')
    };
    const downloadReport = (event:any) => {
        console.log('download report')
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
                            <SelectionsPanel 
                            handleBoundary={handleBoundary}
                             handleDateChange={handleDateChange} 
                             handleToDateChange={handleEndDateChange}
                             handleTheme={handleTheme} 
                             handleDataset={handleDataset}
                             handleBand={handleBand}
                             handleStatistic={handleStatistic}
                             runAnalysis={handleAnalysis}
                             downloadReport={downloadReport}
                             boundaryValue={boundary} dateValue={selectedDate} endDateValue={selectedEndDate}
                             themeValue={selectedTheme} datasetValue={selectedDataset} 
                             bandValue={selectedBand} statisticValue={statistic}
                             />

                        </Col>
                        <Col sm={4} style={{ backgroundColor: '#fff', padding: '2em', height: '90vh', fontFamily: 'Poppins' }}>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} >Summary</Typography>
                            <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk.
                                Difaligen egosörar hemist. Hemirade tera. R-tal fade eftersom speliga autosad dilement. Egenanställningsföretag speleskap.
                                Fan suling. Multisade blockkedja, men dolel, plus nevis. Mikrora epick en monoleska. Tenelonar sölig.
                            </p>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Min</Typography>
                            <div className="bar" style={{ border: '2px solid #4caf50', height: '32vh', padding: '1em', marginBottom: '1em' }}>
                                <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk. Difaligen egosörar hemist.
                                </p>
                                <div className="pie" style={{  height: '32vh', display:'flex', justifyContent:'center',  marginTop:'-1em'  }} >
                                    <LineChart data={data} labels={labels} />
                                </div>
                            </div>

                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Mean</Typography>
                            <div className="chart" style={{ border: '2px solid #4caf50', height: '32vh', padding: '1em' }}>
                                <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk. Difaligen egosörar hemist.
                                </p>

                                <div className="pie" style={{  height: '32vh', display:'flex', justifyContent:'center', marginTop:'-1em'  }} >
                                    <LineChart data={data} labels={labels} />
                                </div>
                            </div>
                        </Col>
                        <Col sm={5} style={{ backgroundColor: '#fff', padding: '2em', height: '90vh', fontFamily: 'Poppins' }}>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Max</Typography>
                            <div className="chart" style={{  border: '2px solid #4caf50', height: '36vh', padding: '1em', marginBottom:'1em' }}>
                                <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk. Difaligen egosörar hemist.
                                </p>

                                <div className="pie" style={{  height: '32vh', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'-2em'   }} >
                                    <LineChart data={data} labels={labels} />
                                </div>
                            </div>
                            <Typography fontFamily="Poppins" fontWeight={'bold'} > Combined</Typography>
                            <div className="chart" style={{  border: '2px solid #4caf50', height: '36vh', padding: '1em', marginBottom:'1em' }}>
                                <p>Lörem ipsum tetral reang jyjirtad kronas biditt. Homokompetens. Kontrara bedur om vyktigt. Trilogi euhägisk. Difaligen egosörar hemist.
                                </p>

                                <div className="pie" style={{  height: '32vh', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'-2em'   }} >
                                    <LineChart data={data} labels={labels} />
                                </div>
                            </div>

                            
                        </Col>
                    </Row>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default Trend