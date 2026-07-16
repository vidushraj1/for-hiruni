export default function Page3DateTime({ dateData, setDateData, onNext }) {
  const isFormValid = dateData.date && dateData.time;

  return (
    <div className="date-card form-card">
      <div className="date-icon">🗓️🐾</div>
      <h1 className="date-title">So... when are you free mage PANA ❤️❤️❤️?</h1>
      
      <div className="date-input-group">
        <label>Pick a Day RATHARAN ❤️❤️❤️</label>
        <input type="date" value={dateData.date} onChange={(e) => setDateData({ ...dateData, date: e.target.value })} />
      </div>

      <div className="date-input-group">
        <label>What Time mage WIFEY ❤️❤️❤️? ⏰</label>
        <select value={dateData.time} onChange={(e) => setDateData({ ...dateData, time: e.target.value })}>
          <option value="" disabled>Select a time...</option>
          <option value="5:00 PM">5:00 PM — This is the right answer</option>
          <option value="6:00 PM">6:00 PM — Meh parakku wadi meka</option>
          <option value="7:00 PM">7:00 PM — Nandamma mata banni</option>
          <option value="8:00 PM">8:00 PM — Hari mama iwarai mage gedara</option>
        </select>
      </div>

      {isFormValid && <button className="date-btn-yes" onClick={onNext} style={{width: '100%'}}> ikmanta, set the date! ❤️❤️❤️</button>}
    </div>
  );
}