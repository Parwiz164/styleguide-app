import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import MogelijkhedenPage from "../pages/MogelijkhedenPage";
import OverzichtPage from "../pages/OverzichtPage";
import OnlinePage from "../pages/OnlinePage";
import OfflinePage from "../pages/OfflinePage";
import TintenPage from "../pages/TintenPage";
import ToepassingPage from "../pages/ToepassingPage";
import VolletintenPage from "../pages/VolletintenPage";

class ProjectPage extends React.Component {
  renderContent = page => {
    // eslint-disable-next-line
    switch (page.slug) {
      case "mogelijkheden":
        return <MogelijkhedenPage page={page} />;
        // eslint-disable-next-line
        break;
      case "overzicht":
        //TODO
        return <OverzichtPage page={page} />;
        // eslint-disable-next-line
        break;
      case "online":
        //TODO
        return <OnlinePage page={page} />;
        // eslint-disable-next-line
        break;
      case "offline":
        //TODO
        return <OfflinePage page={page} />;
        // eslint-disable-next-line
        break;
      case "toepassing":
        //TODO
        return <ToepassingPage page={page} />;
        // eslint-disable-next-line
        break;
      case "tinten":
        //TODO
        return <TintenPage page={page} />;
        // eslint-disable-next-line
        break;
      case "volletinten":
        //TODO
        return <VolletintenPage page={page} />;
        // eslint-disable-next-line
        break;
    }
  };

  renderSubpages = page => {
    if (page.children) {
      return page.children.map(child => {
        return (
          <ListGroup key={child.id}>
            {" "}
            <ListGroupItem className="listgroupitem-parent">
              {child.title.rendered}
            </ListGroupItem>{" "}
            {child.children
              ? child.children.map(child => {
                  return (
                    <ListGroupItem
                      className="listgroupitem-child"
                      onClick={() => this.props.onChange(child)}
                      key={child.id}
                    >
                      {child.title.rendered}
                    </ListGroupItem>
                  );
                })
              : null}{" "}
          </ListGroup>
        );
      });
    }
  };

  render() {
    return (
      <div className={"container"}>
        <div className="col-xs-8 content">
          {this.props.showContent
            ? this.renderContent(this.props.content)
            : "kies een categorie van rechts "}
        </div>

        <div className="col-xs-2 col-xs-offset-2 sidebar">
          {this.renderSubpages(this.props.fetchedPage[0])}
        </div>
      </div>
    );
  }
}

export default ProjectPage;
