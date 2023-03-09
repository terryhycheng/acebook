import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, clickCallback, type, className, id, buttonStyle }) => {
  const checkStyle = () => {
    if (buttonStyle === "outline") {
      // default outline style
      return "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white";
    }
    // default solid style
    return "bg-blue-600 text-white hover:bg-blue-500";
  };

  return (
    <button
      className={`${checkStyle()} w-full rounded-lg p-2 text-sm font-bold transition-all ${className}`}
      type={type === "submit" ? "submit" : "button"}
      onClick={clickCallback}
      id={id}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  clickCallback: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit"]),
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
};

Button.defaultProps = {
  text: "button",
  clickCallback: () => {},
  type: "button",
  className: "",
  buttonStyle: "solid",
};

export default Button;