import React from "react";
import Header from "./Header";
import Api from "../services/api";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import SubpaginaContent from "./SubpaginaContent";
import { getSecondPart, stripHTML } from "../services/helpers";
import MogelijkhedenPage from "./MogelijkhedenPage";

class App extends React.Component {
  renderContent = key => {
    return <MogelijkhedenPage page={key} />;
  };

  renderSubpages = key => {
    return (
      <ListGroupItem
        key={key.id}
        onClick={() => {
          this.props.onChange(key);
        }}
      >
        {getSecondPart(key.slug)}
      </ListGroupItem>
    );
  };

  render() {
    var subPages = this.props.subPages.filter(page => {
      return page.slug.indexOf(`${this.props.pageName.toLowerCase()}-`) > -1;
    });

    return (
      <div className={"container"}>
        <div className="col-xs-8 col-xs-offset-2 content">
          {this.props.showContent
            ? this.renderContent(this.props.content)
            : "kies een categorie van rechts "}
        </div>
        <div className="col-xs-2 sidebar">
          <ListGroup>{subPages.map(this.renderSubpages)}</ListGroup>
        </div>
      </div>
    );
  }
}

export default App;
