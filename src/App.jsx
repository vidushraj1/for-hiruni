import { useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from './emailConfig';
import { useEmailTracker } from './hooks/useEmailTracker';
import PetalCanvas from './components/PetalCanvas';
import PageDots from './components/PageDots';
import NavigationButtons from './components/NavigationButtons';
import Page1Hero from './components/pages/Page1Hero';
import Page2Letter from './components/pages/Page2Letter';
import Page3BibleVerse from './components/pages/Page3BibleVerse';
import Page4Forgiveness from './components/pages/Page4Forgiveness';
import CelebrationOverlay from './components/CelebrationOverlay';
import './styles/global.css';
import './styles/app.css';

const TOTAL_PAGES = 4;

const PAGE_LABELS = [
  '',
  'Page 1 — Hero',
  'Page 2 — Letter',
  'Page 3 — Bible Verse',
  'Page 4 — Forgiveness',
];

const EVENT_NAMES = [
  '',
  'moved past the cover',
  'read your letter 📖',
  'read the Bible verse 🙏',
];

const EVENT_DETAILS = [
  '',
  'She left the hero page',
  'She finished reading your personal letter',
  'She read 1 Corinthians 13',
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const { track } = useEmailTracker();

  // useEffect(() => {
  //   try {
  //     emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
  //   } catch (_) {
  //     // Silent
  //   }
  //   track('opened your letter 💌', 'Hiruni opened your apology website', 'Page 1 — Hero');
  // }, []);

  // Escape key dismisses celebration overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showCelebration) {
        setShowCelebration(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCelebration]);

  const goToNext = useCallback(() => {
    if (currentPage < TOTAL_PAGES) {
      const nextPage = currentPage + 1;
      track(
        EVENT_NAMES[currentPage],
        EVENT_DETAILS[currentPage],
        `${PAGE_LABELS[currentPage]} → ${PAGE_LABELS[nextPage]}`
      );
      setCurrentPage(nextPage);
    }
  }, [currentPage, track]);

  const goToPrev = useCallback(() => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      track(`went back to page ${prevPage}`, 'She navigated back', `Page ${prevPage}`);
      setCurrentPage(prevPage);
    }
  }, [currentPage, track]);

  const handleYes = useCallback(() => {
    track('said YES 💗🎉', 'SHE FORGAVE YOU. She clicked YES.', 'Page 4');
    setShowCelebration(true);
  }, [track]);

  return (
    <div className="app-shell">
      <PetalCanvas />
      <PageDots total={TOTAL_PAGES} current={currentPage} />
      <div
        className="page-slider"
        style={{ transform: `translateX(-${(currentPage - 1) * 100}vw)` }}
      >
        <Page1Hero />
        <Page2Letter />
        <Page3BibleVerse />
        <Page4Forgiveness onYes={handleYes} track={track} />
      </div>
      <NavigationButtons
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onNext={goToNext}
        onPrev={goToPrev}
      />
      {showCelebration && <CelebrationOverlay />}
    </div>
  );
}

export default App;
