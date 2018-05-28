import React from "react";
import { getSecondPart } from "../services/helpers";

const SubpaginaContent = props => {
  return (
    <div>
      <h2>
        {props.content !== null
          ? getSecondPart(props.content.title.rendered)
          : null}
      </h2>
      <div>
        {props.content !== null
          ? getSecondPart(props.content.content.rendered)
          : null}
      </div>
    </div>
  );
};

export default SubpaginaContent;
