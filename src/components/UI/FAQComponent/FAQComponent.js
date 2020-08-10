import React from "react";
import "./FAQComponent.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const faqComponent = props => {
  const {faqOpenHandler, text, boxOpen, boxText} = props 
  return (
    <>
      <div
        className="faqComponent"
        onClick={faqOpenHandler}
      >
        <div>{text}</div>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      {boxOpen && (
        <div className="faqComponent" style={{ marginTop: "1.5px" }}>
          {boxText}
        </div>
      )}
    </>
  );
};

export default faqComponent;
