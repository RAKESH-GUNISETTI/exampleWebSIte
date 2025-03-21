
import React, { useState, useEffect } from "react";

interface TypewriterEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
  loop?: boolean;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = "",
  loop = true,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    let timeout: NodeJS.Timeout;

    if (isTyping && !isPaused) {
      if (displayText.length < texts[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(texts[currentIndex].substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsTyping(false);
        }, pauseTime);
      }
    } else if (!isTyping && !isPaused) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Always loop through texts when loop is true
        if (loop) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setIsTyping(true);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [texts, currentIndex, displayText, isTyping, isPaused, typingSpeed, deletingSpeed, pauseTime, loop]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      {displayText}
      <span className="border-r-2 border-primary h-[1em] ml-1 animate-blink"></span>
    </span>
  );
};

export default TypewriterEffect;
