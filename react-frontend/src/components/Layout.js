import React from "react";
import Header from "./Header";
import PageContent from "./PageContent";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";

class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <Header {...this.props} />

        {this.props.children === undefined ? (
          <PageContent />
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

export default Layout;
