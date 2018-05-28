import React from "react";
import Api from "../services/api";
import { Form, Button } from "react-bootstrap";
import Auth from "../services/Auth";
import Layout from "./Layout";
const api = new Api();

class ProjectPicker extends React.Component {
  myInput = React.createRef();
  myPassword = React.createRef();

  goToProject = event => {
    //  Stop the form from submitting
    event.preventDefault();
    //  get the text from that input
    const projectName = this.myInput.current.value;
    const password = this.myPassword.current.value;

    var pages = this.props.fetchData;

    var page = pages.find(project => {
      return project.title.rendered === projectName;
    });

    console.log(page);
    if (page !== undefined) {
      Auth.authenticate(page.id, password, this.props.history);
    } else {
      alert("page doesnt exits!");
    }
  };

  render() {
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
