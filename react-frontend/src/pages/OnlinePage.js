import React from "react";
import { getSecondPart, stripHTML } from "../services/helpers";

const OnlinePage = props => (
  <div className="row">
    <h2>{getSecondPart(props.page.title.rendered)}</h2>
    <p>{stripHTML(props.page.content.rendered)}</p>
  </div>
);
export default OnlinePage;
