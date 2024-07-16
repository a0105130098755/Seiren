import React from "react";
import "./Pagination.css";

const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
}) => {
  const pages = [];
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={page === activePage ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
