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
            >
              <Link to={"/projectpicker"}>
                {" "}
                {this.props.loginPage ? "" : "Log in"}
              </Link>
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
