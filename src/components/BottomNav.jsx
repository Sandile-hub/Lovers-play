import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vibrate } = useApp();

  const tabs = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/create', label: 'Create', icon: '✨' },
    { path: '/games', label: 'Games', icon: '🎮' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ];

  const handleTap = (path) => {
    vibrate(30);
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-pink/10 safe-area-bottom" style={{ maxWidth: '420px', margin: '0 auto' }}>
      <div className="flex items-center justify-around py-2 px-1">
        {tabs.map((t) => {
          const active = location.pathname === t.path;
          return (
            <button
              key={t.path}
              className={`nav-tab ${active ? 'active' : ''}`}
              onClick={() => handleTap(t.path)}
            >
              <span className="icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;