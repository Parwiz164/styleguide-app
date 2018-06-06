import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Styleguide{" "}
            {this.props.projectNaam !== "" ? this.props.projectNaam : ""}{" "}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className="navbar-nav">
            <NavItem
              style={{
                marginRight: 15
              }}
              componentClass="span"
              onClick={this.props.signOut}
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
