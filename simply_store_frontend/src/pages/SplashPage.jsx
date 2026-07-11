import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';

export default function SplashPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 1200; // 1.2s loading
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, prev + increment);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="splash-page">
      <div className="splash-card">
        <h1 className="splash-logo">Simply Store</h1>
        <p className="splash-tagline">Everything You Need. Simply.</p>

        {progress >= 100 ? (
          <button 
            className="btn btn-primary btn-lg splash-btn fade-in" 
            onClick={() => navigate('/login')}
            id="enter-store-btn"
          >
            Enter Store
          </button>
        ) : (
          <div className="splash-loader-container">
            <div className="splash-loader-header">
              <span className="splash-loader-label">LOADING</span>
              <span className="splash-loader-pct">{Math.round(progress)}%</span>
            </div>
            <div className="splash-progress-track">
              <div 
                className="splash-progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
