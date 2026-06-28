import { useState, useEffect, useRef } from 'react';

const NO_TEXTS = [
  'No...',
  'Are you sure? 🥺',
  'Really sure?',
  'Think again...',
  'Please? 🥺',
  'Just once? 💗',
];

export default function Page4Forgiveness({ onYes, track }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noIndex, setNoIndex] = useState(0);
  const attemptRef = useRef(0);

  useEffect(() => {
    track('reached the question 🤍', 'She is now at the forgiveness question', 'Page 4 — Forgiveness');
  }, []);

  const dodge = () => {
    attemptRef.current += 1;
    const n = attemptRef.current;
    const nx = (Math.random() - 0.5) * 160;
    const ny = (Math.random() - 0.5) * 120;
    setNoPos({ x: nx, y: ny });
    setNoIndex(prev => (prev + 1) % NO_TEXTS.length);
    return n;
  };

  const handleNoHover = () => {
    const n = dodge();
    track(
      'hovered over No',
      `She moved her finger toward No (attempt ${n})`,
      'Page 4'
    );
  };

  const handleNoClick = () => {
    const n = dodge();
    track(
      `clicked No 😔 (attempt ${n})`,
      `She pressed No for the ${n}th time`,
      'Page 4'
    );
  };

  const handleYesClick = () => {
    onYes();
  };

  return (
    <div className="page">
      <h2 className="forgive-question">Do you forgive me? 🤍</h2>
      <p className="forgive-promise">
        &ldquo;I promise I&rsquo;ll spend every day being worthy of it.&rdquo;
      </p>
      <div className="forgive-buttons">
        <button className="btn-yes" onClick={handleYesClick}>
          Yes, I forgive you 💗
        </button>
        <button
          className="btn-no"
          onClick={handleNoClick}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1)',
          }}
        >
          {NO_TEXTS[noIndex]}
        </button>
      </div>
    </div>
  );
}
