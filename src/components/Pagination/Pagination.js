import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DefButton } from "../Buttons/DefButton";
import "./index.scss";

const PaginationTable = ({
  per_page,
  total_data,
  handleClick,
  current_page = 1,
}) => {
  const pageNumbers = [];
  const perBtn = 10;

  for (let i = 1; i <= Math.ceil(total_data / per_page); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <DefButton
        classNames="btn"
        disableButton={current_page <= 1}
        setCurrentPage={() => handleClick(Number(current_page - 1))}
        content="Prev"
      />

      {/* {pageNumbers.map(i => (
        <DefButton
          key={i}
          setCurrentPage={() => handleClick(i)}
          classNames={`btn ${current_page == i ? 'active' : ''}`}
          content={i}
        />
      ))} */}

      <DefButton
        classNames="btn"
        disableButton={current_page >= pageNumbers.length}
        setCurrentPage={() => handleClick(Number(current_page + 1))}
        content="Next"
      />
      <div className="pagination__info">
        <p>{`${current_page}/${pageNumbers.length}`}</p>
      </div>
    </div>
  );
};

export default PaginationTable;
