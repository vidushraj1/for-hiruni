// DateApp.jsx
import { useState } from 'react';
import { useTelegramTracker } from './hooks/useTelegramTracker';
import PetalCanvas from './components/PetalCanvas';
import Page1Question from './components/date/Page1Question';
import Page2Success from './components/date/Page2Success';
import Page3DateTime from './components/date/Page3DateTime';
import Page4Food from './components/date/Page4Food';
import Page5Final from './components/date/Page5Final';
import './styles/date.css';

export default function DateApp() {
  const [step, setStep] = useState(1);
  const [dateData, setDateData] = useState({ date: '', time: '' });
  const { sendRawMessage, track } = useTelegramTracker();

  // no more page-open tracking — only clicks below

  const handleYes = () => {
    sendRawMessage(`🌸 <b>She said YES to the date!</b> 🌸\n\nMoving to confirmation...`);
    setStep(2);
  };

  const handlePage2Next = () => {
    track('Clicked "lets GO"', '', 'Page2');
    setStep(3);
  };

  const handleTimeSubmit = () => {
    sendRawMessage(`📅 <b>Date & Time Selected!</b>\n\n<b>Date:</b> ${dateData.date}\n<b>Time:</b> ${dateData.time}`);
    setStep(4);
  };

  const handleFoodSelect = (selectedFood) => {
    sendRawMessage(
      `🚨 <b>FINAL DATE CONFIRMED!</b> 🚨\n\n` +
      `📅 <b>Date:</b> ${dateData.date}\n` +
      `⏰ <b>Time:</b> ${dateData.time}\n` +
      `🍝 <b>Food:</b> ${selectedFood}`
    );
    setStep(5);
  };

  return (
    <div className="date-app-shell">
      <PetalCanvas />
      <div className="date-content-wrapper">
        {step === 1 && <Page1Question onYes={handleYes} track={track} />}
        {step === 2 && <Page2Success onNext={handlePage2Next} />}
        {step === 3 && <Page3DateTime dateData={dateData} setDateData={setDateData} onNext={handleTimeSubmit} />}
        {step === 4 && <Page4Food onSelect={handleFoodSelect} />}
        {step === 5 && <Page5Final />}
      </div>
    </div>
  );
}