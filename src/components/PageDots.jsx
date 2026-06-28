export default function PageDots({ total, current }) {
  return (
    <div className="page-dots" aria-label={`Page ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`dot ${i + 1 === current ? 'active' : ''}`} />
      ))}
    </div>
  );
}
