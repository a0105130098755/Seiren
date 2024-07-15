import { useState, useEffect, useRef } from "react";

const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isActive, timeLeft]);

  const start = () => {
    setTimeLeft(initialTime);
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  return { timeLeft, isActive, start, stop };
};

export default useTimer;

export {};
