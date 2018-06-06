import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { getSecondPart, getSecondPartTwo } from "../services/helpers";
import MogelijkhedenPage from "../pages/MogelijkhedenPage";

class ProjectPage extends React.Component {
  renderContent = page => {
    // eslint-disable-next-line
    switch (getSecondPart(page.slug)) {
      case "mogelijkheden":
        return <MogelijkhedenPage page={page} />;
        // eslint-disable-next-line
        break;
      case "overzicht":
        //TODO
        return "";
        // eslint-disable-next-line
        break;
      case "online":
        //TODO
        return "";
        // eslint-disable-next-line
        break;
      case "offline":
        //TODO
        return "";
        // eslint-disable-next-line
        break;
      case "toepassing":
        //TODO
        return "";
        // eslint-disable-next-line
        break;
      case "tinten":
        //TODO
        return "";
        // eslint-disable-next-line
        break;
    }
  };

  renderSubpages = page => {
    return (
      <ListGroupItem
        key={page.id}
        onClick={() => {
          this.props.onChange(page);
        }}
      >
        {getSecondPart(page.slug)}
      </ListGroupItem>
    );
  };

  render() {
    var subPages = this.props.subPages.filter(page => {
      return page.slug.indexOf(`${this.props.pageName.toLowerCase()}-`) > -1;
    });

    return (
      <div className={"container"}>
        <div className="col-xs-8 content">
          {this.props.showContent
            ? this.renderContent(this.props.content)
            : "kies een categorie van rechts "}
        </div>
        <div className="col-xs-2 col-xs-offset-2 sidebar">
          <ListGroup>{subPages.map(this.renderSubpages)}</ListGroup>
        </div>
      </div>
    );
  }
}

export default ProjectPage;
