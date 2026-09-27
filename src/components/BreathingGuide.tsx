"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';

export function BreathingGuide({ onComplete }: { onComplete?: () => void }) {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [totalSeconds, setTotalSeconds] = useState(120); // 2 minutes default
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setCompleted(true);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });

        setPhaseSeconds((prev) => {
          if (prev <= 1) {
            // Cycle phases
            setPhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold';
              if (currentPhase === 'Hold') return 'Exhale';
              if (currentPhase === 'Exhale') return 'Rest';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalSeconds, onComplete]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
    setCompleted(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('Inhale');
    setPhaseSeconds(4);
    setTotalSeconds(120);
    setCompleted(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 16px' }}>
      
      {/* Animated Breathing Circle */}
      <div style={{ 
        position: 'relative', 
        width: '220px', 
        height: '220px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '20px auto 28px auto'
      }}>
        {/* Outer Glow Ring */}
        <div style={{
          position: 'absolute',
          width: phase === 'Inhale' || phase === 'Hold' ? '210px' : '150px',
          height: phase === 'Inhale' || phase === 'Hold' ? '210px' : '150px',
          borderRadius: '50%',
          background: 'rgba(82, 121, 111, 0.15)',
          transition: isRunning ? 'all 4s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.5s ease',
        }} />

        {/* Inner Solid Breathing Bubble */}
        <div style={{
          width: phase === 'Inhale' || phase === 'Hold' ? '160px' : '110px',
          height: phase === 'Inhale' || phase === 'Hold' ? '160px' : '110px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary) 0%, #3B536B 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(43, 58, 74, 0.18)',
          transition: isRunning ? 'all 4s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.5s ease',
          zIndex: 2,
        }}>
          {completed ? (
            <>
              <CheckCircle2 size={32} color="var(--accent-success)" />
              <span style={{ fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>Reset Done</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.5px' }}>
                {isRunning ? phase : 'Ready'}
              </span>
              {isRunning && (
                <span style={{ fontSize: '14px', opacity: 0.8, marginTop: '2px' }}>
                  {phaseSeconds}s
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Timer & Instructions */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '4px' }}>
          {completed ? 'Session Complete' : `Box Breathing • ${formatTime(totalSeconds)} remaining`}
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-primary)', maxWidth: '380px' }}>
          {phase === 'Inhale' && 'Breathe in slowly through your nose...'}
          {phase === 'Hold' && 'Gently hold your breath calmly...'}
          {phase === 'Exhale' && 'Release smoothly through your mouth...'}
          {phase === 'Rest' && 'Pause naturally before the next breath...'}
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button 
          onClick={handleToggle}
          className="btn-primary" 
          style={{ padding: '10px 24px', fontSize: '14px' }}
        >
          {isRunning ? <><Pause size={16} /> Pause</> : <><Play size={16} /> {totalSeconds < 120 && !completed ? 'Resume' : 'Start 2-Min Reset'}</>}
        </button>

        <button 
          onClick={handleReset}
          className="btn-secondary"
          style={{ padding: '10px 16px', fontSize: '14px' }}
          title="Reset timer"
        >
          <RotateCcw size={16} />
        </button>
      </div>

    </div>
  );
}
