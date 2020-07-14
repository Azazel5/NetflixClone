import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/**
 * A custom button component. It has a set color scheme and takes in height, eeight, and image
 * as props. Netflix seems to use a standard button component with different widths.
 */
const button = props => {
  let icon = null;
  if (props.image) {
    icon = (
      <FontAwesomeIcon
        style={{ marginLeft: "5px" }}
        size="xs"
        icon={faChevronRight}
      />
    );
  }
  const ButtonStyle = {
    height: props.height,
    width: props.width,
    backgroundColor: "#e50914",
    color: "#fff",
    borderRadius: "3px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "1rem"
  };

  return (
    <Link to={props.link}>
      <button style={ButtonStyle}>
        {props.children}
        {icon}
      </button>
    </Link>
  );
};

export default button;
