
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
    backgroundColor: "#173f5f",
    padding: '1em 5em',
    
    // marginBottom: "20px"
  };

  const navLinkStyle = {
    color: "white",
  };

  return (
    <Navbar style={navbarStyle} variant="dark" expand="md">
      <Navbar.Brand href="#home">HYDRAFloods Viewer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
            
            </Nav>
        <Nav className="ml-auto" > {/* Align links to the right with ml-auto */}
          <Nav.Link style={navLinkStyle} href="#home">Home</Nav.Link>
          <Nav.Link style={navLinkStyle} href="#map-viewer">Map Viewer</Nav.Link>
          <Nav.Link style={navLinkStyle} href="#use-cases">Use Cases</Nav.Link>
          <NavDropdown style={navLinkStyle} title="User Materials" id="basic-nav-dropdown">
            <NavDropdown.Item href="#user-manual">User Manual</NavDropdown.Item>
            <NavDropdown.Item href="#github-repository">Github Repository</NavDropdown.Item>
            <NavDropdown.Item href="#it-admin-manual">IT Admin Manual</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link style={navLinkStyle} href="#about">About</Nav.Link>
          <Nav.Link style={navLinkStyle} href="#feedback">Feedback</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigationbar