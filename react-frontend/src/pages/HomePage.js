import React from "react";
import HomePageHeader from "../components/HomePageHeader";
import HomePageBody from "../components/HomePageBody";

class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <HomePageHeader {...this.props} />
        <HomePageBody />
      </div>
    );
  }
}

export default HomePage;
