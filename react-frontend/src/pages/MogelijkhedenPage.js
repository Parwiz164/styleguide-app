import React from "react";
import { getSecondPart, stripHTML } from "../services/helpers";

const MogelijkhedenPage = props => (
  <div className="row">
    <h2>{getSecondPart(props.page.title.rendered)}</h2>
    <p>{stripHTML(props.page.content.rendered)}</p>
    <div className="col-xs-12">
      {props.page.acf.afbeelding_met_keuze.map(element => {
        <div className="col-xs-4">
          {" "}
          adfs
          <img src={element.afbeelding.url} alt="" />{" "}
        </div>;
      })}
    </div>
  </div>
);
export default MogelijkhedenPage;
