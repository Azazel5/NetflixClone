import React from "react";
import "./FAQComponent.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const faqComponent = props => {
  return (
    <>
      <div
        className="faqComponent"
        style={{ marginTop: "10px" }}
        onClick={props.faqOpenHandler}
      >
        <div>{props.text}</div>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      {props.boxOpen && (
        <div className="faqComponent" style={{ marginTop: "1.5px" }}>
          {props.boxText}
        </div>
      )}
    </>
  );
};

export default faqComponent;
