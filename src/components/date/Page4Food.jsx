import { useState } from 'react';

export default function Page4Food({ onSelect }) {
  const [customFood, setCustomFood] = useState('');

  const foods = [
    { name: 'Sushi', emoji: '🍣' },
    { name: 'Burgers', emoji: '🍔' },
    { name: 'Pasta', emoji: '🍝' },
    { name: 'Tacos', emoji: '🌮' },
    { name: 'Ramen', emoji: '🍜' },
    { name: 'Dessert', emoji: '🍦' } // Added an even number so the grid looks perfect
  ];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customFood.trim()) {
      onSelect(customFood.trim());
    }
  };

  return (
    <div className="date-card">
      <h1 className="date-title">What are we feeling mage SUDU ❤️❤️❤️? 🍝✨</h1>
      
      {/* Preset Grid */}
      <div className="date-food-grid">
        {foods.map(f => (
          <button key={f.name} className="date-food-btn" onClick={() => onSelect(f.name)}>
            <span className="date-food-emoji">{f.emoji}</span>
            <span className="date-food-name">{f.name}</span>
          </button>
        ))}
      </div>

      {/* Custom Food Input */}
      <div className="custom-food-container">
        <label>Or type your own craving:</label>
        <form onSubmit={handleCustomSubmit} className="custom-food-form">
          <input 
            type="text" 
            placeholder="e.g. Kottu, Pizza..." 
            value={customFood}
            onChange={(e) => setCustomFood(e.target.value)}
          />
          <button type="submit" className="date-btn-yes custom-submit-btn">
            Set karanda ❤️
          </button>
        </form>
      </div>

    </div>
  );
}