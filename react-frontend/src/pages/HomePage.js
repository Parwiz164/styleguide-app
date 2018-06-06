import React from "react";
import HomePageHeader from "../components/HomePageHeader";
import PageContent from "../components/PageContent";

class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <HomePageHeader {...this.props} />
        <PageContent />
      </div>
    );
  }
}

export default HomePage;
