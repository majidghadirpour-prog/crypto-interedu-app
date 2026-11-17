
import styles from "./Pagination.module.css";

function Pagination({ page, setPage }) {
  const nextHandler = () => {
    if (page >= 10) return;
    setPage(page + 1);
  };

  const previousHandler = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const pageClass = (pageNumber) =>
    page === pageNumber
      ? `${styles.pageNumber} ${styles.active}`
      : styles.pageNumber;

  const renderPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      className={pageClass(pageNumber)}
      type="button"
      onClick={() => setPage(pageNumber)}
      aria-current={page === pageNumber ? "page" : undefined}
      aria-label={`Go to page ${pageNumber}`}
    >
      {pageNumber}
    </button>
  );

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={styles.navigationButton}
        type="button"
        onClick={previousHandler}
        disabled={page <= 1}
      >
        Previous
      </button>
      <div className={styles.pages}>
        {renderPageButton(1)}
        {renderPageButton(2)}
        {page > 2 && page < 9 && (
          <>
            <span className={styles.ellipsis} aria-hidden="true">...</span>
            {renderPageButton(page)}
          </>
        )}
        <span className={styles.ellipsis} aria-hidden="true">...</span>
        {renderPageButton(9)}
        {renderPageButton(10)}
      </div>
      <button
        className={styles.navigationButton}
        type="button"
        onClick={nextHandler}
        disabled={page >= 10}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
