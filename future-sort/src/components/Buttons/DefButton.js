import React from "react";
import "./index.scss";

const DefButton = ({ classNames, setCurrentPage, disableButton, content }) => {
  return (
    <button
      className={`${classNames} ${disableButton ? "button--dis" : ""}`}
      onClick={() => setCurrentPage()}
      disabled={disableButton}
    >
      {content}
    </button>
  );
};

export { DefButton };
