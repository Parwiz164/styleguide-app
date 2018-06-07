import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Auth from "../services/Auth";

class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>Styleguide</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className="navbar-nav">
            <NavItem
              style={{
                marginRight: 15
              }}
              componentClass="span"
              onClick={Auth.signout()}
            >
              Log uit
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
