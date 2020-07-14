import React from "react";

const darkComponent = props => {
  return (
    <>
      {props.topText && (
        <h3 style={{ fontSize: props.fontSize }}>{props.topText}</h3>
      )}
      {props.buttonText && (
        <h3 style={{ fontSize: props.fontSize }}>{props.bottomText}</h3>
      )}
      {props.image && <img src={props.image} alt="dark component" />}
    </>
  );
};

export default darkComponent;
