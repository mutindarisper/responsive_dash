import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { changeMode } from '../store/map/CounterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const Navigationbar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

 

  const navbarStyle = {
    backgroundColor: theme.palette.mode === 'light' ? "#ddeec6" : '#000',
    padding: '1em 5em',
    fontfamily: 'Poppins',
    fontWeight: '700',
    color: theme.palette.mode === 'light' ? "#5b5e57" : '#fff',

    // marginBottom: "20px"
  };

  const navLinkStyle = {
    color: theme.palette.mode === 'light' ? "#5b5e57" : '#fff',
    fontWeight: '700'
  };

  return (
    <Navbar style={navbarStyle} variant="dark" expand="md">
      <Navbar.Brand href="#home" style={navLinkStyle}>dMRV</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="ml-auto" > {/* Align links to the right with ml-auto */}
          <Nav.Link style={navLinkStyle} href="#home">Home</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/mapviewer">Map</Nav.Link>
          <Nav.Link style={navLinkStyle} href="#use-cases">Dashboard</Nav.Link>
          {/* <NavDropdown style={navLinkStyle} title="User Materials" id="basic-nav-dropdown">
            <NavDropdown.Item href="#user-manual">User Manual</NavDropdown.Item>
            <NavDropdown.Item href="#github-repository">Github Repository</NavDropdown.Item>
            <NavDropdown.Item href="#it-admin-manual">IT Admin Manual</NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link style={navLinkStyle} href="#about">Carbon</Nav.Link>
          <Nav.Link style={navLinkStyle} href="#about">Commodities</Nav.Link>
          <Nav.Link style={navLinkStyle} href="#about">Yield</Nav.Link>
          <Nav.Link style={navLinkStyle} href="#about">Trend</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/">Agriculture</Nav.Link>


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