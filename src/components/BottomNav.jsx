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

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    if (path === '/games') {
      return (
        location.pathname === '/games' ||
        location.pathname.startsWith('/play/')
      );
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const handleTap = (path) => {
    vibrate(30);
    navigate(path);
  };

  return (
    <nav
      className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-24px)] max-w-[396px] -translate-x-1/2 rounded-[26px] border border-white/70 bg-white/80 p-1.5 shadow-[0_18px_50px_rgba(31,20,24,0.14)] backdrop-blur-2xl safe-area-bottom"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around gap-1">
        {tabs.map((tab) => {
          const active = isActive(tab.path);

          return (
            <button
              key={tab.path}
              type="button"
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
              className={`
                group relative flex min-w-0 flex-1 flex-col items-center justify-center
                rounded-[20px] px-2 py-2.5
                text-[10px] font-semibold
                transition-all duration-200
                ${
                  active
                    ? 'bg-[#171717] text-white shadow-[0_8px_20px_rgba(23,23,23,0.18)]'
                    : 'text-gray-400 hover:bg-[#fff4f6] hover:text-[#ff4d6d]'
                }
              `}
              onClick={() => handleTap(tab.path)}
            >
              <span
                className={`
                  text-xl leading-none transition-transform duration-200
                  ${active ? '-translate-y-0.5 scale-110' : 'group-hover:-translate-y-0.5'}
                `}
              >
                {tab.icon}
              </span>

              <span className="mt-1">
                {tab.label}
              </span>

              {active && (
                <span className="absolute -top-1.5 h-1 w-6 rounded-full bg-[#ff4d6d]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;