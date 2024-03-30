
import  React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav} from "react-bootstrap";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {  useNavigate, useLocation } from 'react-router-dom';

import { changeLink, changeMode } from '../store/map/CounterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'

// import './Navbar.css'

import { makeStyles } from '@mui/styles';

type MyNavbarProps =  {
  
  onClick: (value: string) => void;
  
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

   const NavBarWrapper: React.FC<MyNavbarProps> = ({  onClick  }) => {
    
  const theme = useTheme();
  const storeLink = useSelector((state: RootState) => state.link);
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const colorMode = React.useContext(ColorModeContext);

  let link = React.useRef('')

 

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
  const handleClick = ( linkValue:string) => {
    console.log('Clicked Link Value:', linkValue);
    onClick(linkValue);
    link.current = linkValue;
    dispatch(changeLink(linkValue));
    

    console.log(storeLink)
   
    // You can perform any action you want with the clicked link value
  };

 
  


  return (


    <Navbar style={navbarStyle} variant="dark" expand="md">
      <Navbar.Brand href="#home" style={navLinkStyle}>dMRV</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">



        <Nav className="ml-auto" > {/* Align links to the right with ml-auto */}

          <Nav.Link style={navLinkStyle} href="/" >Home</Nav.Link>
          <Nav.Link style={navLinkStyle} eventKey="map" href="/mapviewer">Map</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/dashboard">Dashboard</Nav.Link>
          {/* <Nav.Link style={navLinkStyle} onClick={() => {handleClick( 'carbon') } }>Carbon</Nav.Link>
          <Nav.Link style={navLinkStyle} onClick={() => handleClick( 'commodities')}>Commodities</Nav.Link>
          <Nav.Link style={navLinkStyle} onClick={() => handleClick( 'yield')}>Yield</Nav.Link> */}
          <Nav.Link style={navLinkStyle} onClick={() => handleClick( 'trend')}>Trend</Nav.Link>
          <Nav.Link style={navLinkStyle} onClick={() => handleClick( 'agriculture')}>Agriculture</Nav.Link>



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

export default NavBarWrapper