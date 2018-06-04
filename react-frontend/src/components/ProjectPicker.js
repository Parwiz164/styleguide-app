import React from "react";
import Api from "../services/api";
import { Form, Button } from "react-bootstrap";
import Auth from "../services/Auth";
import Layout from "./Layout";
import { PrivateRoute } from "./Router";
import App from "./App";
import { Link, Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header";

const api = new Api();

class ProjectPicker extends React.Component {
  state = {
    projectName: "",
    redirect: false,
    pageId: null,
    subPages: null,
    content: {
      title: {
        rendered: "kies een categorie van rechts"
      }
    },
    showContent: false,
    signedIn: false
  };

  myInput = React.createRef();
  myPassword = React.createRef();

  componentDidMount() {
    var data = sessionStorage.getItem("ApiTokenValue");
    const localStorageRef = localStorage.getItem(data);
    if (localStorageRef) {
      this.setState({
        projectName: JSON.parse(localStorageRef).projectName,
        redirect: JSON.parse(localStorageRef).redirect,
        pageId: JSON.parse(localStorageRef).pageId,
        subPages: JSON.parse(localStorageRef).subPages,
        content: JSON.parse(localStorageRef).content,
        showContent: JSON.parse(localStorageRef).showContent
      });
    }
  }

  componentDidUpdate() {
    var data = sessionStorage.getItem("ApiTokenValue");
    localStorage.setItem(data, JSON.stringify(this.state));
  }

  goToProject = async event => {
    //  Stop the form from submitting
    event.preventDefault();
    //  get the text from that input
    const projectName = this.myInput.current.value;
    const password = this.myPassword.current.value;

    let page;
    await api
      .page({
        name: projectName
      })
      .then(result => {
        page = result[0];
        return result;
      })
      .catch(error => {
        alert(error);
      });

    await api
      .subPages({ name: projectName })
      .then(result => {
        const pages = result;
        this.setState({
          subPages: pages,
          projectName: projectName
        });
      })
      .catch(error => {
        alert(error);
      });

    if (page.id !== undefined) {
      Auth.authenticate(page.id, password, this.props.history);
      this.setState({
        redirect: true,
        pageId: page.id,
        signedIn: true
      });
    } else {
      alert("page doesnt exits!");
    }
  };

  changeContentHandler = page => {
    let content = { ...this.state.content };

    content = page;

    this.setState({
      content: content,
      showContent: true
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <div className="container">
          <Header projectNaam={this.state.projectName} />
          <App
            pageName={this.state.projectName}
            pageId={this.state.pageId}
            subPages={this.state.subPages}
            showContent={this.state.showContent}
            content={this.state.content}
            onChange={this.changeContentHandler}
          />
        </div>
      );
    }

    return (
      <div className="container">
        <Header
          projectNaam={this.state.projectName}
          status={this.state.signedIn ? "Log uit" : ""}
        />
        <Form className="store-selector" onSubmit={this.goToProject}>
          <h2>Voer een project naam in</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Project naam"
          />
          <input
            type="text"
            ref={this.myPassword}
            required
            placeholder="Wachtwoord"
          />
          <Button type="submit">Ga naar project →</Button>
        </Form>
      </div>
    );
  }
}

export default ProjectPicker;
