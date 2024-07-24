import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ cardsPerPage, totalCards, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (totalPages === 1 || !totalPages) {
      return;
    }
    const pageElements = [];

    // Previous button
    pageElements.push(
      <li
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        to={`#page=${currentPage > 1 ? currentPage - 1 : ""}`}
        key="previous"
        className="page-item mx-2  md:w-28 md:h-12 w-64 h-10 text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer "
      >
        <Link className="page-link">←</Link>
      </li>
    );

    // First page
    pageElements.push(
      <li
        key={1}
        className="page-item mx-2  md:w-12 md:h-12 w-64 h-10 text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer"
      >
        <Link
          onClick={() => paginate(1)}
          to={`#page=1`}
          className={`page-link ${1 === currentPage ? "font-semibold" : ""}`}
        >
          1
        </Link>
      </li>
    );

    // Start ellipsis
    if (currentPage > 4) {
      pageElements.push(
        <li
          key="start-ellipsis"
          className="page-item mx-2  md:w-12 md:h-12 w-36 h-10 text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer"
        >
          ...
        </li>
      );
    }

    // Pages before current
    for (let i = Math.max(1, currentPage - 1); i < currentPage; i++) {
      pageElements.push(
        <li
          onClick={() => paginate(i)}
          to={`#page=${i}`}
          key={i}
          className="page-item mx-2  md:w-12 md:h-12 w-64 h-10 text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer"
        >
          <Link
            className={`page-link ${
              i === currentPage ? "font-semibold text-white" : "text-white"
            }`}
          >
            {i}
          </Link>
        </li>
      );
    }

    // Current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageElements.push(
        <li
          key={currentPage}
          className="page-item mx-2 md:w-12 md:h-12 w-64 h-10 text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer"
        >
          <Link
            onClick={() => paginate(currentPage)}
            to={`#page=${currentPage}`}
            className={`page-link font-semibold`}
          >
            {currentPage}
          </Link>
        </li>
      );
    }

    // Pages after current
    for (
      let i = currentPage + 1;
      i <= Math.min(currentPage + 1, totalPages - 1);
      i++
    ) {
      pageElements.push(
        <li
          onClick={() => paginate(i)}
          to={`#page=${i}`}
          key={i}
          className="page-item mx-2  md:w-12 md:h-12 w-64 h-10 text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer"
        >
          <Link
            className={`page-link ${
              i === currentPage
                ? "font-semibold text-white"
                : "font-semibold text-white"
            }`}
          >
            {i}
          </Link>
        </li>
      );
    }

    // End ellipsis
    if (currentPage < totalPages - 3) {
      pageElements.push(
        <li
          key="end-ellipsis"
          className="page-item mx-2  md:w-12 md:h-12 w-36 h-10 text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer"
        >
          ...
        </li>
      );
    }

    // Last page
    pageElements.push(
      <li
        onClick={() => paginate(totalPages)}
        to={`#page=${totalPages}`}
        key={totalPages}
        className="page-item mx-2  md:w-12 md:h-12 w-64 h-10 text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer"
      >
        <Link
          className={`page-link ${
            totalPages === currentPage
              ? "font-semibold"
              : "font-semibold text-white"
          }`}
        >
          {totalPages}
        </Link>
      </li>
    );

    // Next button
    pageElements.push(
      <li
        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        to={`#page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
        key="next"
        className="page-item mx-2  md:w-28 md:h-12 w-64 h-10 font-bold  text-center flex items-center justify-center rounded-md bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 cursor-pointer"
      >
        <Link className="page-link">→</Link>
      </li>
    );

    return pageElements;
  };

  return (
    <nav>
      <ul className="pagination flex justify-center items-center gap-1 text-white ">
        {renderPageNumbers()}
      </ul>
    </nav>
  );
};

export default Pagination;
