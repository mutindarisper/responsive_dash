
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";




const Navigationbar = () => {
  // return (
  //   <div className="div-navigation">
  //     <div className="nav-navbar">
  //       <div className="list-navbar-nav">
  //         <div className="link-nav-link">
  //           <div className="text-wrapper">Feedback</div>
  //         </div>
  //         <div className="div-wrapper">
  //           <div className="text-wrapper">About</div>
  //         </div>
  //         <div className="link-navbardropdown">
  //           <div className="span" />
  //           <div className="text-wrapper">User Materials</div>
  //         </div>
  //         <div className="div">
  //           <div className="text-wrapper">Use Cases</div>
  //         </div>
  //         <div className="link-nav-link-2">
  //           <div className="text-wrapper">Map Viewer</div>
  //         </div>
  //         <div className="link-nav-link-3">
  //           <div className="text-wrapper-2">Home</div>
  //         </div>
  //       </div>
  //       <div className="text-wrapper-3">HYDRAFloods Viewer</div>
  //     </div>
  //   </div>
  // );
  const navbarStyle = {
    backgroundColor: "#ddeec6",
    padding: '1em 5em',
    fontfamily: 'Poppins',
    fontWeight:'700',
    color: "#5b5e57",

    // marginBottom: "20px"
  };

  const navLinkStyle = {
    color: "#5b5e57",
    fontWeight:'700'
  };

  return (
    <Navbar style={navbarStyle} variant="dark" expand="md">
      <Navbar.Brand href="#home" style={navLinkStyle}>dMRV</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="ml-auto" > {/* Align links to the right with ml-auto */}
          <Nav.Link style={navLinkStyle} href="#home">Home</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/mapviewer">Map Viewer</Nav.Link>
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
          <Nav.Link style={navLinkStyle} href="#about">Agriculture</Nav.Link>


        </Nav>
        <Nav className="me-auto">

        </Nav>

        <Nav className="ml-auto">

          <Nav.Link style={navLinkStyle} href="/signup">Search</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/signup">Notifications</Nav.Link>
          <Nav.Link style={navLinkStyle} href="/signup">Account</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigationbar