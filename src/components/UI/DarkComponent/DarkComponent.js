import React from "react";

const darkComponentTextAlignStyles = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center'
}

const darkComponent = props => {
  const { topText, fontSize, bottomText, image } = props
  return (
    <>
      <div style={darkComponentTextAlignStyles}>
        {topText && (
          <h3 style={{ fontSize: fontSize }}>{topText}</h3>
        )}
        {bottomText && (
          <h3 style={{ fontSize: fontSize }}>{bottomText}</h3>
        )}
      </div>

      {image && <img src={image} alt="dark component" />}
    </>
  );
};

export default darkComponent;
