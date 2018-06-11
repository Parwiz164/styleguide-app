import React from "react";
import { render } from "react-dom";
import Router from "./router";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

render(<Router />, document.querySelector("#root"));
