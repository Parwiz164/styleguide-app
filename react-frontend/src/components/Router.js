import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProjectPicker from "./ProjectPicker";
import App from "./App";
import NotFound from "./NotFound";
import Auth from "../services/Auth";
import Api from "../services/api";
import Layout from "./Layout";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return Auth.isAuthenticated ? (
          renderMergedProps(component, routeProps, rest)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location }
            }}
          />
        );
      }}
    />
  );
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

class Router extends React.Component {
  state = {
    pages: []
  };

  async componentDidMount() {
    let api = new Api();

    await api
      .pages()
      .then(result => {
        const pages = result;
        this.setState({
          pages
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <BrowserRouter basename="frontend/">
        <Switch>
          <PropsRoute
            exact
            path="/"
            component={Layout}
            fetchData={this.state.pages}
          />
          <PropsRoute
            exact
            path="/projectpicker"
            component={ProjectPicker}
            fetchData={this.state.pages}
          />
          <PrivateRoute
            exact
            path="/project/:pageId"
            component={App}
            fetchData={this.state.pages}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
