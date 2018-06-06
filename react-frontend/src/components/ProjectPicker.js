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
    redirect: false,
    fetchedPage: null,
    loginPage: true
  };

  myInput = React.createRef();
  myPassword = React.createRef();

  componentDidMount() {
    var data = sessionStorage.getItem("ApiTokenValue");
    const localStorageRef = localStorage.getItem(data);
    if (localStorageRef) {
      this.setState({
        redirect: JSON.parse(localStorageRef).redirect
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
      })
      .catch(error => {
        alert(error);
      });

    //  Check if page is received
    if (page !== undefined) {
      Auth.authenticate(page.id, password);
      if (Auth.isAuthenticated) {
        this.setState({
          redirect: true,
          fetchedPage: page
        });
        console.log(page);
      }
    } else {
      alert("Page doesnt exits!");
    }
  };

  handleSignOut() {
    Auth.signout();
    this.setState({
      projectName: "",
      redirect: false,
      pageId: null,
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
    if (this.state.redirect && this.state.fetchedPage !== undefined) {
      return (
        <div>
          <ProjectHeader signOut={this.handleSignOut.bind(this)} />
          <ProjectPage fetchedPage={this.state.fetchedPage} />
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
