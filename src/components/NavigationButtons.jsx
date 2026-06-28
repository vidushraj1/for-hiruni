export default function NavigationButtons({ currentPage, totalPages, onNext, onPrev }) {
  return (
    <div className="nav-bar">
      {currentPage > 1 && (
        <button className="btn-back" onClick={onPrev} aria-label="Go back">
          ← Back
        </button>
      )}
      {currentPage < totalPages && (
        <button className="btn-next" onClick={onNext} aria-label="Next page">
          Next →
        </button>
      )}
    </div>
  );
}
