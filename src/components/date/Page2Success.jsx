// Page2Success.jsx
import spongebobShock from '../../assets/spongebob-shock.gif';
export default function Page2Success({ onNext }) {
  return (
    <div className="date-card">
      <img src={spongebobShock} alt="Shocked" className="date-gif" />
      <h1 className="date-title">WAIT YOU ACTUALLY SAID YES?? Thank you BABA ❤️❤️❤️ 😭</h1>
      <p className="date-subtext">I was so ready for you to say no BABA 😭</p>
      <button className="date-btn-yes" onClick={onNext}>okay okay lets GO ❤️! ➔</button>
    </div>
  );
}