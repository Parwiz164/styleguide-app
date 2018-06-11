import React from "react";
import Api from "../services/api";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Auth from "../services/Auth";
import ProjectPage from "./ProjectPage";
import HomePageHeader from "./HomePageHeader";
import ProjectHeader from "./ProjectHeader";

class ProjectPicker extends React.Component {
  state = {
    redirect: false,
    fetchedPage: null,
    loginPage: true,
    projecDetails: null,
    isLoading: false,
    content: "",
    showContent: false
  };

  myInput = React.createRef();
  myPassword = React.createRef();

  componentDidMount() {
    var data = sessionStorage.getItem("ApiTokenValue");

    const localStorageRef = localStorage.getItem(data);
    if (localStorageRef) {
      this.setState({
        redirect: JSON.parse(localStorageRef).redirect,
        fetchedPage: JSON.parse(localStorageRef).fetchedPage,
        loginPage: JSON.parse(localStorageRef).loginPage,
        projecDetails: JSON.parse(localStorageRef).projecDetails,
        content: JSON.parse(localStorageRef).content,
        showContent: JSON.parse(localStorageRef).showContent
      });
    }
  }

  componentWillReceiveProps(props) {
    const { refresh, id } = this.props;
    if (props.refresh !== refresh) {
      this.fetchShoes(id).then(this.refreshShoeList);
    }
  }

  componentDidUpdate() {
    var data = sessionStorage.getItem("ApiTokenValue");
    if (data !== null) {
      localStorage.setItem(data, JSON.stringify(this.state));
    }
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

    // Switch to loading page
    this.setState({ isLoading: true });
    //  Get the text from that input
    const projectName = this.myInput.value;
    const password = this.myPassword.value;

    // Getting page based on input
    const api = new Api();
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
        this.setState({
          isLoading: false
        });
      });

    //  Check if page is received and exists
    if (page !== undefined) {
      await Auth.authenticate(page.id, password);

      var pageWithChildren = await this.childrenFunction([page]).then(
        result => {
          this.setState({
            isLoading: false
          });
          return result;
        }
      );
      if (Auth.isAuthenticated) {
        this.setState({
          isLoading: false,
          redirect: true,
          fetchedPage: pageWithChildren,
          loginPage: false
        });
      }
    } else {
      alert("Page doesnt exits!");
      this.setState({
        isLoading: false
      });
    }
  };

  async childrenFunction(pages) {
    let childrenData;
    for (var i in pages) {
      childrenData = await this.getChildren(pages[i].id).then(result => {
        if (result.length) {
          return this.childrenFunction(result);
        }
      });
      pages[i].children = childrenData;
    }
    return pages;
  }

  async getChildren(pageId) {
    let api = new Api();
    return await api
      .children({
        id: pageId
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        alert(error);
      });
  }

  handleProjectDetailts = key => {
    this.setState({
      projecDetails: key
    });
  };

  render() {
    // Show loading page if data is being fetched
    if (this.state.isLoading) {
      return (
        <div className="container">
          <HomePageHeader
            projectNaam={this.state.projectName}
            loginPage={this.state.loginPage}
          />
          ... IS LOADING!
        </div>
      );
    }

    // Getting the projectdetails and pass them to to projectpage
    if (this.state.redirect && this.state.fetchedPage !== null) {
      return (
        <div className="container">
          <ProjectHeader />
          <ProjectPage
            fetchedPage={this.state.fetchedPage}
            handleDetails={this.handleProjectDetailts.bind(this)}
            onChange={this.changeContentHandler}
            content={this.state.content}
            showContent={this.state.showContent}
          />
        </div>
      );
    }

    // Login page
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
