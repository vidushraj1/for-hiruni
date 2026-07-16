import { useState, useCallback } from 'react';
import { useTelegramTracker } from './hooks/useTelegramTracker';
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
const PAGE_LABELS = ['', 'Page 1', 'Page 2', 'Page 3', 'Page 4'];
const EVENT_NAMES = ['', 'moved past cover', 'read letter', 'read verse'];
const EVENT_DETAILS = ['', 'Left hero page', 'Read letter', 'Read 1 Cor 13'];

export default function ApologyApp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const { track } = useTelegramTracker();

  const goToNext = useCallback(() => {
    if (currentPage < TOTAL_PAGES) {
      const nextPage = currentPage + 1;
      track(EVENT_NAMES[currentPage], EVENT_DETAILS[currentPage], `${PAGE_LABELS[currentPage]} → ${PAGE_LABELS[nextPage]}`);
      setCurrentPage(nextPage);
    }
  }, [currentPage, track]);

  const goToPrev = useCallback(() => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      track(`went back`, `Navigated back to Page ${prevPage}`, `Page ${prevPage}`);
      setCurrentPage(prevPage);
    }
  }, [currentPage, track]);

  const handleYes = useCallback(() => {
    track('said YES 💗🎉', 'SHE FORGAVE YOU.', 'Page 4');
    setShowCelebration(true);
  }, [track]);

  return (
    <div className="app-shell">
      <PetalCanvas />
      <PageDots total={TOTAL_PAGES} current={currentPage} />

      <div className="page-slider" style={{ transform: `translateX(-${(currentPage - 1) * 100}vw)` }}>
        <Page1Hero />
        <Page2Letter />
        <Page3BibleVerse />
        <Page4Forgiveness onYes={handleYes} track={track} />
      </div>

      <NavigationButtons currentPage={currentPage} totalPages={TOTAL_PAGES} onNext={goToNext} onPrev={goToPrev} />
      {showCelebration && <CelebrationOverlay />}
    </div>
  );
}