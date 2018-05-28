import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = props => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/"> Huisstijl manual </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem>
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
