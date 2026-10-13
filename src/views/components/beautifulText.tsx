import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.5,
          onComplete: () => {
            animateTyping();
          },
        }
      );
    }
  }, []);

  const animateTyping = () => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust typing speed here (milliseconds)
  };

  return (
    <div className="text-start mt-8 mb-2">
      <p ref={textRef} className="text-5xl font-bold text-gray-800">
        {displayText}
      </p>
    </div>
  );
};

export default TypingEffect;