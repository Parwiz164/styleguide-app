import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Auth from "../services/auth";

class ProjectPageHeader extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            {" "}
            <a href={"/"}>Styleguide</a>
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
              onClick={() => {
                Auth.signout();
              }}
            >
              Log uit
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default ProjectPageHeader;
