import React from "react";
import Header from "./Header";
import Api from "../services/api";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import SubpaginaContent from "./SubpaginaContent";
import { getSecondPart, stripHTML } from "../services/helpers";

class App extends React.Component {
  state = {
    pageName: {},
    subPages: [],
    content: {
      title: {
        rendered: "kies een categorie van rechts"
      }
    },
    showContent: false
  };

  async componentDidMount() {
    let api = new Api();

    let page = this.props.pageName;

    await api
      .subPages({ name: this.state.pageName })
      .then(result => {
        const pages = result;
        this.setState({
          pages
        });
      })
      .catch(error => {
        alert(error);
      });

    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.pageId);

    if (localStorageRef) {
      this.setState({
        pageName: JSON.parse(localStorageRef).pageName,
        subPages: JSON.parse(localStorageRef).subPages,
        content: JSON.parse(localStorageRef).content
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.pageId,
      JSON.stringify(this.state)
    );
  }

  handleClick = page => {
    let content = { ...this.state.content };

    content = page;

    this.setState({
      content: content,
      showContent: true
    });
  };

  renderContent = key => {
    return (
      <React.Fragment>
        <h2>{getSecondPart(key.title.rendered)}</h2>
        <p>{stripHTML(key.content.rendered)}</p>
      </React.Fragment>
    );
  };

  renderSubpages = key => {
    return (
      <ListGroupItem
        key={key.id}
        onClick={() => {
          this.handleClick(key);
        }}
      >
        {getSecondPart(key.slug)}
      </ListGroupItem>
    );
  };

  render() {
    // var subPages = this.props.fetchData.filter(page => {
    //   return (
    //     page.slug.indexOf(`${this.props.match.params.pageId.toLowerCase()}-`) >
    //     -1
    //   );
    // });

    return (
      <div className={"container"}>
        <Header className="header" tagline={this.props.match.params.pageId} />
        <div className="col-xs-8 col-xs-offset-2 content">
          {this.state.showContent
            ? this.renderContent(this.state.content)
            : "kies een categorie van rechts =>"}
        </div>
        <div className="col-xs-2 sidebar">
          {/* <ListGroup>{subPages.map(this.renderSubpages)}</ListGroup> */}
        </div>
      </div>
    );
  }
}

export default App;
