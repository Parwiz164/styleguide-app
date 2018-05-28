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

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PropsRoute exact path="/" component={Layout} />
          <PropsRoute path="/projectpicker" component={ProjectPicker} />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export { PrivateRoute };
