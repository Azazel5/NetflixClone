import React from "react";

const darkComponent = props => {
  const {topText, fontSize, buttonText, bottomText, image} = props 
  return (
    <>
      {topText && (
        <h3 style={{ fontSize: fontSize }}>{topText}</h3>
      )}
      {buttonText && (
        <h3 style={{ fontSize: fontSize }}>{bottomText}</h3>
      )}
      {image && <img src={image} alt="dark component" />}
    </>
  );
};

export default darkComponent;
