import React from "react";
import Api from "../services/api";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Auth from "../services/Auth";
import ProjectPage from "./ProjectPage";
import HomePageHeader from "./HomePageHeader";
import ProjectHeader from "./ProjectHeader";

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
    loginPage: true
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

  changeContentHandler = page => {
    let content = { ...this.state.content };

    content = page;

    this.setState({
      content: content,
      showContent: true
    });
  };

  componentWillUnmount() {
    this.setState({
      loginPage: false
    });
  }

  handleLogin = async event => {
    //  Stop the form from submitting
    event.preventDefault();

    //  Get the text from that input
    const projectName = this.myInput.value;
    const password = this.myPassword.value;

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

    //  Check if page is received
    if (page !== undefined) {
      Auth.authenticate(page.id, password);

      await api
        .subPages({ name: projectName })
        .then(result => {
          const pages = result;
          this.setState({
            subPages: pages,
            projectName: projectName,
            pageId: page.id,
            signedIn: true
          });
        })
        .catch(error => {
          alert("Cant get subpages");
        });
    } else {
      alert("Page doesnt exits!");
    }

    if (Auth.isAuthenticated) {
      this.setState({
        redirect: true
      });
    }
  };

  handleSignOut() {
    Auth.signout();
    this.setState({
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
      loginPage: true
    });
  }

  render() {
    if (this.state.redirect && this.state.projectName !== undefined) {
      return (
        <div>
          <ProjectHeader
            projectNaam={this.state.projectName}
            signOut={this.handleSignOut.bind(this)}
          />
          <ProjectPage
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
        <HomePageHeader
          projectNaam={this.state.projectName}
          loginPage={this.state.loginPage}
        />
        <div className="Login">
          <form onSubmit={this.handleLogin}>
            <FormGroup controlId="projectname" bsSize="large">
              <ControlLabel>Voer een project naam in</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                inputRef={ref => {
                  this.myInput = ref;
                }}
                required
                placeholder="Project naam"
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="text"
                inputRef={ref => {
                  this.myPassword = ref;
                }}
                required
                placeholder="Wachtwoord"
              />
            </FormGroup>
            <Button block bsSize="large" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProjectPicker;
