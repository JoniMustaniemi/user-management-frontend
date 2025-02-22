import React from "react";
import styles from "./Paginator.module.css";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={styles.arrowButton}
      >
        <i className="fas fa-caret-left"></i>
      </button>

      <span className={styles.pageIndicator}>
        <span className={styles.pageValue}>{currentPage}</span> /
        <span className={styles.pageValue}>{totalPages}</span>
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
      >
        <i className="fas fa-caret-right"></i>
      </button>
    </div>
  );
};

export default Paginator;
