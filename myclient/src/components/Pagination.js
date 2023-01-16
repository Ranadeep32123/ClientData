import React from "react";
import { useState } from "react";

export const Pagination = ({ totalpost, postPerPage, paginate }) => {
  const pageNumbers = [];
  let showPage = [];

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(3);

  for (let i = 1; i <= Math.ceil(totalpost.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  showPage = pageNumbers.slice(firstIndex, lastIndex);

  // console.log(pageNumbers.length);

  const incrementPage = () => {
    if (lastIndex === pageNumbers.length + 2) {
      setFirstIndex(0);
      setLastIndex(3);
    } else {
      setFirstIndex(firstIndex + 1);
      setLastIndex(lastIndex + 1);
      // console.log(firstIndex, lastIndex);
    }
  };

  const decrementPage = () => {
    if (firstIndex === 0) {
      setFirstIndex(0);
      setLastIndex(3);
    } else {
      setFirstIndex(firstIndex - 1);
      setLastIndex(lastIndex - 1);
    }
  };

  return (
    <nav aria-label="..." className="fixed-bottom">
      <ul className="pagination pagination-sm justify-content-center">
        <li className="page-item">
          <a
            onClick={decrementPage}
            className="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {showPage.map((number) => (
          <li key={number} className="page-item ">
            <a
              onClick={() => paginate(number)}
              className="page-link"
              href="#"
              tabIndex="-1"
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            onClick={incrementPage}
            className="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
