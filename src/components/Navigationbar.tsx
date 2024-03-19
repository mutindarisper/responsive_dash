import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { changeMode } from '../store/map/CounterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'
// import './Navbar.css'

import { Tabs, Tab, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({


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



const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const Navigationbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const colorMode = React.useContext(ColorModeContext);

  const history = useNavigate();
  const location = useLocation();

  const handleTabChange = (event:any, newValue:any) => {
    history(`${newValue}`);
  };



  const navbarStyle = {
    backgroundColor: theme.palette.mode === 'light' ? "#ddeec6" : '#484A48',
    padding: '1em 5em',
    fontfamily: 'Poppins',
    fontWeight: '700',
    color: theme.palette.mode === 'light' ? "#5b5e57" : '#ddeec6',

    // marginBottom: "20px"
  };

  const navLinkStyle = {
    color: theme.palette.mode === 'light' ? "#5b5e57" : '#d9dcd6',
    fontWeight: '700'
  };


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (


    <Navbar style={navbarStyle} variant="dark" expand="md">
      <Navbar.Brand href="#home" style={navLinkStyle}>dMRV</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">



        <Nav className="ml-auto" > {/* Align links to the right with ml-auto */}

          {/* <Nav.Link style={navLinkStyle} href="/" >Home</Nav.Link>
          <Nav.Link style={navLinkStyle} eventKey="map" href="/mapviewer">Map</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/dashboard">Dashboard</Nav.Link> */}



          <Box sx={{ marginTop: '-.5vh' }}>
            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example" >
              {/* <Link to={'/'}> </Link> */}
              <Tab value="/" sx={tabStyle(location.pathname === '/')}  label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={theme.palette.mode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Home</Typography>} {...a11yProps(4)} />
              <Tab  value="/dashboard" sx={tabStyle(location.pathname === '/dashboard')} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={theme.palette.mode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Dashboard</Typography>} {...a11yProps(4)} />
              <Tab  value="/mapviewer" sx={tabStyle(location.pathname === '/mapviewer')} label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={theme.palette.mode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Map</Typography>} {...a11yProps(4)} />
              <Tab   label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={theme.palette.mode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Carbon</Typography>} {...a11yProps(4)} />
              <Tab label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={theme.palette.mode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Commodities</Typography>} {...a11yProps(4)} />
              <Tab label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={theme.palette.mode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Yield</Typography>} {...a11yProps(4)} />
              <Tab label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={theme.palette.mode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Trend</Typography>} {...a11yProps(4)} />
              <Tab label={<Typography fontWeight="bold" fontFamily={'Poppins'} color={theme.palette.mode === 'light' ? '#5b5e57' : '#d9dcd6'} className={classes.tabLabel}>Agriculture</Typography>} {...a11yProps(4)} />
            </Tabs>
          </Box>

        

        </Nav>
        <Nav className="me-auto">

        </Nav>

        <Nav className="ml-auto">

          <Nav.Link style={navLinkStyle} href="/signup">Search</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/signup">Notifications</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/signup">Account</Nav.Link>
          <Nav.Link style={navLinkStyle} >
            {theme.palette.mode} mode
          </Nav.Link>

          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>



        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


const tabStyle = (isActive:any) => ({
  borderBottom: isActive ? '2px solid green' : 'transparent',
});
// export default Navigationbar

export default function ToggleColorMode() {
  const storeMode = useSelector((state: RootState) => state.mode);
  const dispatch: AppDispatch = useDispatch();
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        // console.log(mode)
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));



      },

    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#4caf50',
            // Change the primary color to green


          },
          mode,
        },
      }),


    [mode],
  );

  const showMode = () => {
    console.log(theme.palette.mode)
    dispatch(changeMode(theme.palette.mode));

  }
  showMode()


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Navigationbar />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}