import { useState, useEffect } from 'react';
import './CountdownTimer.css';

export default function CountdownTimer({ durationHours = 12 }) {
  const [timeLeft, setTimeLeft] = useState(durationHours * 3600);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hrs = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <div className="countdown-timer">
      <div className="time-block">
        <span className="time-num">{pad(hrs)}</span>
        <span className="time-lbl">HRS</span>
      </div>
      <div className="time-colon">:</div>
      <div className="time-block">
        <span className="time-num">{pad(mins)}</span>
        <span className="time-lbl">MIN</span>
      </div>
      <div className="time-colon">:</div>
      <div className="time-block">
        <span className="time-num">{pad(secs)}</span>
        <span className="time-lbl">SEC</span>
      </div>
    </div>
  );
}
