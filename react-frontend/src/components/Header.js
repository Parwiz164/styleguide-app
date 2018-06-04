import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Huisstijl manual{" "}
            {this.props.projectNaam !== "" ? this.props.projectNaam : ""}{" "}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="navbar-nav">
            <NavItem componentClass="span">
              <Link to={"/projectpicker"}>
                {" "}
                {this.props.loggedIn ? "" : "Log in"}
              </Link>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem
              style={{
                marginRight: 15
              }}
            >
              {this.props.status}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Header.propTypes = {
  tagline: PropTypes.string
};

export default Header;
