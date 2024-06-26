import React from "react";
import "./Pagination.css"; // 스타일링을 위한 CSS 파일

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages).keys()];

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 === currentPage}
          className={`pagination-button ${
            page + 1 === currentPage ? "active" : ""
          }`}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
