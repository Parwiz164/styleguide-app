import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Api from "../services/api";
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
    var contentPages = this.props.subPages.reduce(function(filtered, option) {
      if (option.slug.includes(getSecondPart(page.slug))) {
        filtered.push(option);
      }
      return filtered;
    }, []);

    return (
      <ListGroupItem
        key={page.id}
        onClick={() => {
          this.props.onChange(page);
        }}
      >
        {console.log(this.props.subPages)}
        {getSecondPart(page.slug)}
        <ListGroup>
          {contentPages.map(content => {
            return (
              <ListGroupItem key={content.id}>
                {content.title.rendered}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </ListGroupItem>
    );
  };

  render() {
    // var subPages = this.props.subPages.filter(page => {
    //   return page.slug.indexOf(`${this.props.pageName.toLowerCase()}-`) > -1;
    // });

    // var reduced = subPages.reduce(function(filtered, option) {
    //   if (!option.title.rendered.includes("&#8211;")) {
    //     filtered.push(option);
    //   }
    //   return filtered;
    // }, []);
    return (
      <div className={"container"}>
        <div className="col-xs-8 content">
          {this.props.showContent
            ? this.renderContent(this.props.content)
            : "kies een categorie van rechts "}
        </div>

        <div className="col-xs-2 col-xs-offset-2 sidebar" />
      </div>
    );
  }
}

export default ProjectPage;
