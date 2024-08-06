import React, { useState, useEffect } from 'react';

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust typing speed here (milliseconds)

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  return (
    <div className="text-start mt-8 mb-2">
      <p className='text-4xl font-bold text-gray-800'>{displayText}</p>
    </div>
  );
};

export default TypingEffect;
