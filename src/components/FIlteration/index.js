import React from "react";
import "./index.scss";

const FilterForm = ({ onChangeHandler, value, onFilterHandler }) => (
  <div className="filter-form">
    <input
      onChange={(event) => onChangeHandler(event)}
      value={value}
      className="filter-form__input input"
    />
    <button onClick={() => onFilterHandler()} className="filter-form__btn btn">
      Search
    </button>
  </div>
);

export { FilterForm };
