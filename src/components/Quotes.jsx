// Quotes.js
import React, { useState } from 'react';
import './Quotes.css'; // Import your custom CSS file

function Quotes() {
  const [quote, setQuote] = useState({});
  const [animeName, setAnimeName] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  const fetchQuote = async () => {
    try {
      const response = await fetch(`https://animechan.xyz/api/random/anime?title=${encodeURIComponent(animeName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
      setShowAnimation(true); // Show animation when new quote is fetched
      setTimeout(() => setShowAnimation(false), 10000); // Hide animation after 1.5 seconds
    } catch (error) {
      console.error('Error fetching quote:', error.message);
    }
  };

  const handleInputChange = (event) => {
    setAnimeName(event.target.value);
  };

  return (
    <div className="container">
        <div className="input-container">
            <input type="text" value={animeName} onChange={handleInputChange} placeholder="Enter Anime Name" />
            <button onClick={fetchQuote}>Generate Quote</button>
        </div>
      {quote.quote && (
        <div className={`quote-container ${showAnimation ? 'bubble' : ''}`}>
          <blockquote>{quote.quote}</blockquote>
          <p className="character">{quote.character}</p>
          <p className="anime">{quote.anime}</p>
        </div>
      )}
    </div>
  );
}

export default Quotes;
