import React, { useEffect, useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CornerUpLeft,
  Home,
  Play,
  Pause,
  Info,
  Sliders,
  Tv,
} from 'lucide-react';

interface TvRemoteControlProps {
  onDirection: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onSelect: () => void;
  onBack: () => void;
  onHome: () => void;
  onTogglePlay: () => void;
  onToggleInfo: () => void;
}

export const TvRemoteControl: React.FC<TvRemoteControlProps> = ({
  onDirection,
  onSelect,
  onBack,
  onHome,
  onTogglePlay,
  onToggleInfo,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Global Remote Control Keyboard Event Listener (TV Remote D-Pad Standard)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onDirection('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          onDirection('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onDirection('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          onDirection('right');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onSelect();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          onBack();
          break;
        case 'h':
        case 'H':
          onHome();
          break;
        case 'p':
        case 'P':
          onTogglePlay();
          break;
        case 'i':
        case 'I':
          onToggleInfo();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDirection, onSelect, onBack, onHome, onTogglePlay, onToggleInfo]);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#151515',
          border: '1px solid #E50914',
          borderRadius: '30px',
          padding: '10px 18px',
          color: '#FF2B36',
          fontWeight: 700,
          fontSize: '12px',
          cursor: 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.9), 0 0 15px rgba(229, 9, 20, 0.3)',
        }}
      >
        <Tv size={16} />
        <span>Show Remote Simulator</span>
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '180px',
      backgroundColor: 'rgba(13, 13, 13, 0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid #303030',
      borderRadius: '24px',
      padding: '16px 12px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.9), 0 0 25px rgba(229, 9, 20, 0.25)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
    }}>
      {/* Remote Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 4px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E50914' }} />
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.5px' }}>
            TV REMOTE
          </span>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          style={{ background: 'none', border: 'none', color: '#B3B3B3', fontSize: '11px', cursor: 'pointer' }}
        >
          Min
        </button>
      </div>

      {/* D-Pad Controller */}
      <div style={{
        width: '128px',
        height: '128px',
        borderRadius: '50%',
        backgroundColor: '#050505',
        border: '2px solid #303030',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Up */}
        <button
          onClick={() => onDirection('up')}
          title="ArrowUp"
          style={{
            position: 'absolute',
            top: '6px',
            background: 'none',
            border: 'none',
            color: '#B3B3B3',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <ChevronUp size={24} />
        </button>

        {/* Down */}
        <button
          onClick={() => onDirection('down')}
          title="ArrowDown"
          style={{
            position: 'absolute',
            bottom: '6px',
            background: 'none',
            border: 'none',
            color: '#B3B3B3',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <ChevronDown size={24} />
        </button>

        {/* Left */}
        <button
          onClick={() => onDirection('left')}
          title="ArrowLeft"
          style={{
            position: 'absolute',
            left: '6px',
            background: 'none',
            border: 'none',
            color: '#B3B3B3',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right */}
        <button
          onClick={() => onDirection('right')}
          title="ArrowRight"
          style={{
            position: 'absolute',
            right: '6px',
            background: 'none',
            border: 'none',
            color: '#B3B3B3',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* OK / Select Center Button */}
        <button
          onClick={onSelect}
          title="Enter / Select"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E50914 0%, #7F0000 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(229, 9, 20, 0.6)',
          }}
        >
          OK
        </button>
      </div>

      {/* Function Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 8px' }}>
        <button
          onClick={onBack}
          title="Back (Escape)"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#1C1C1C',
            border: '1px solid #303030',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CornerUpLeft size={16} />
        </button>

        <button
          onClick={onHome}
          title="Home Menu"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#1C1C1C',
            border: '1px solid #303030',
            color: '#FF2B36',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Home size={16} />
        </button>

        <button
          onClick={onTogglePlay}
          title="Play/Pause (P)"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#1C1C1C',
            border: '1px solid #303030',
            color: '#E50914',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Play size={14} fill="#E50914" />
        </button>
      </div>

      <div style={{ fontSize: '10px', color: '#B3B3B3', textAlign: 'center' }}>
        Use Keyboard Arrows + Enter
      </div>
    </div>
  );
};
