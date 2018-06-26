import React from "react";
import { getSecondPart, stripHTML } from "../services/helpers";

const MogelijkhedenPage = props => (
  <div className="row">
    <h2>{getSecondPart(props.page.title.rendered)}</h2>
    <p>{stripHTML(props.page.content.rendered)}</p>
    <div className="col-xs-12">
      {props.page.acf.afbeelding_met_toelichting_en_keuze != null
        ? props.page.acf.afbeelding_met_toelichting_en_keuze.map(element => {
            return (
              <div className="col-xs-4" key="element.id">
                {" "}
                <img src={element.afbeelding.url} alt="" />{" "}
                <h1>{element.toelichting}</h1>
                <p>{element.wel_of_niet}</p>
              </div>
            );
          })
        : null}
    </div>
  </div>
);
export default MogelijkhedenPage;
