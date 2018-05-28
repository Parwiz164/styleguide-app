import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = props => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>Huisstijl manual</Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav className="navbar-nav">
        <NavItem componentClass="span">
          <Link to="/projectpicker">
            <strong>{props.tagline}</strong>
          </Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired
};

export default Header;
