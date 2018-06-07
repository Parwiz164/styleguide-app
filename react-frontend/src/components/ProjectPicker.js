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
    loginPage: true,
    projecDetails: null,
    isLoading: false
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
        projecDetails: JSON.parse(localStorageRef).projecDetails
      });
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
    this.setState({ isLoading: true });
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
        // page = {
        //   ...this.childrenFunction(objInArray).map(result => {
        //     console.log(result);
        //     return result;
        //   })[0]
        // };
      })
      .catch(error => {
        alert(error);
      });

    // this.childrenFunction(page).then(result => {});
    // console.log(page);
    // console.log(this.childrenFunction(page));

    //  Check if page is received
    if (page !== undefined) {
      await Auth.authenticate(page.id, password);

      var pageWithChildren = await this.childrenFunction([page]).then(
        result => {
          return result;
        }
      );
      if (Auth.isAuthenticated) {
        this.setState({
          isLoading: false,
          redirect: true,
          fetchedPage: page
        });
      }
    } else {
      alert("Page doesnt exits!");
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
    let newArray;

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
    console.log(key);
  };

  render() {
    {
      if (this.state.redirect && this.state.fetchedPage !== null) {
        return !this.state.isLoading ? (
          <div>
            <ProjectHeader />
            <ProjectPage
              fetchedPage={this.state.fetchedPage}
              handleDetails={this.handleProjectDetailts.bind(this)}
            />
          </div>
        ) : (
          <p>is Loading... </p>
        );
      }
    }

    // if (this.state.redirect && this.state.fetchedPage !== null) {
    //   return (
    //     <div>
    //       <ProjectHeader signOut={this.handleSignOut.bind(this)} />
    //       <ProjectPage
    //         fetchedPage={this.state.fetchedPage}
    //         handleDetails={this.handleProjectDetailts.bind(this)}
    //       />
    //     </div>
    //   );
    // }

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
