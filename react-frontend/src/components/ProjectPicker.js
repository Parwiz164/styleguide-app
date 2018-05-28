import React from "react";
import Api from "../services/api";
import { Form, Button } from "react-bootstrap";
import Auth from "../services/Auth";
import Layout from "./Layout";
import { PrivateRoute } from "./Router";
import App from "./App";
import { Link, Route, Redirect, Switch } from "react-router-dom";

const api = new Api();

class ProjectPicker extends React.Component {
  state = {
    projectName: "Sparta",
    redirect: false
  };

  myInput = React.createRef();
  myPassword = React.createRef();

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
    console.log(page);
    if (page.id !== undefined) {
      Auth.authenticate(page.id, password, this.props.history);
      this.setState({
        redirect: true
      });
    } else {
      alert("page doesnt exits!");
    }
  };

  render() {
    if (this.state.redirect) {
      console.log(" redirected");
      return (
        <div>
          <Link to={`projectpicker/${this.state.projectName}`} />;
          <Switch>
            <PrivateRoute exact path="/projectpicker" component={App} />
            <PrivateRoute exact path="/projectpicker/:pageId" component={App} />
          </Switch>
        </div>
      );
    }

    return (
      <Layout>
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
      </Layout>
    );
  }
}

export default ProjectPicker;
