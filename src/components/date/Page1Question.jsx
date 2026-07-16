// Page1Question.jsx
import { useState, useRef } from 'react';
import catQuestion from '../../assets/cat-question.GIF';

const NO_PHRASES = [
  "Aney please baba, thawa parak hithanna... 🥺",
  "Epaaa, 'No' kiyanna epa baba... 🥺",
  "Mage raththaran baba neda, 'Yes' click karanna ko... 🥺",
  "Aiyooo aye parak hithala balanna... 🥺",
  "Baha baha, 'No' obanna denne naaa... 🥺",
  "Aney duka hithenawa baba, epa... 🥺",
  "Mata adarei nam 'No' click karanna epa... 🥺",
  "Pissuda baba? Aye parak hithanna... 🥺",
  "Aney mage sudu baba neda... pleaseee... 🥺",
  "Eththatama epada? Aye poddak hithamu... 🥺",
  "Aney epa baba, 'Yes' thama oneee... 🥺",
  "Mata duka hithei baba, aye hithanna... 🥺"
];

export default function Page1Question({ onYes, track }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noText, setNoText] = useState("No...");
  const groupRef = useRef(null);
  const attemptRef = useRef(0);

  const dodgeButton = () => {
    attemptRef.current += 1;
    const container = groupRef.current;
    let maxX = 70, maxY = 45;
    if (container) {
      const rect = container.getBoundingClientRect();
      maxX = Math.max(30, rect.width / 2 - 55);
      maxY = Math.max(20, rect.height / 2 - 25);
    }
    const nx = (Math.random() - 0.5) * 2 * maxX;
    const ny = (Math.random() - 0.5) * 2 * maxY;
    setNoPos({ x: nx, y: ny });
    setNoText(NO_PHRASES[Math.floor(Math.random() * NO_PHRASES.length)]);
  };

  const handleNoClick = () => {
    // if it's ever actually tapped, dodge again and let baba know
    dodgeButton();
    track?.('Tried to click No 😤', noText, 'Page1');
  };

  return (
    <div className="date-card">
      <img src={catQuestion} alt="Cat" className="date-gif" />
      <h1 className="date-title">Will you go on a date with me BABA? ❤️❤️❤️</h1>

      <div className="date-btn-group" ref={groupRef} style={{ position: 'relative', overflow: 'visible' }}>
        <button className="date-btn-yes" onClick={onYes}>
          Yes, I will 💗
        </button>
        <button
          className="date-btn-no"
          onClick={handleNoClick}
          onMouseEnter={dodgeButton}
          onTouchStart={dodgeButton}
          style={{
            position: 'relative',
            zIndex: 10,
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1)',
            whiteSpace: 'nowrap',
          }}
        >
          {noText}
        </button>
      </div>
    </div>
  );
}