"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Coffee, ArrowRight, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

interface BreakTimerProps {
  initialMinutes?: number;
  onFinish?: () => void;
}

export function BreakTimer({ initialMinutes = 5, onFinish }: BreakTimerProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(initialMinutes);
  const [secondsLeft, setSecondsLeft] = useState<number>(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            if (onFinish) onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, onFinish]);

  const selectDuration = (mins: number) => {
    setIsRunning(false);
    setIsFinished(false);
    setSelectedDuration(mins);
    setSecondsLeft(mins * 60);
  };

  const handleToggle = () => {
    if (isFinished) {
      setSecondsLeft(selectedDuration * 60);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setSecondsLeft(selectedDuration * 60);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const totalSecs = selectedDuration * 60;
  const progressPct = totalSecs > 0 ? Math.round(((totalSecs - secondsLeft) / totalSecs) * 100) : 0;

  return (
    <div className="card" style={{ padding: '32px', textAlign: 'center', maxWidth: '540px', margin: '0 auto' }}>
      
      {/* Duration Selector Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
        {[2, 5, 10, 15].map((mins) => (
          <button
            key={mins}
            onClick={() => selectDuration(mins)}
            disabled={isRunning}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: isRunning ? 'not-allowed' : 'pointer',
              border: selectedDuration === mins ? '1px solid var(--primary)' : '1px solid var(--border-light)',
              background: selectedDuration === mins ? 'rgba(43, 58, 74, 0.08)' : 'var(--bg-surface)',
              color: selectedDuration === mins ? 'var(--primary)' : 'var(--text-secondary)',
              opacity: isRunning && selectedDuration !== mins ? 0.6 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {mins} Min
          </button>
        ))}
      </div>

      {/* Timer Visual Display */}
      <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 24px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ transform: 'rotate(-90deg)', width: '180px', height: '180px' }}>
          <circle cx="90" cy="90" r="76" stroke="var(--border-light)" strokeWidth="8" fill="transparent" />
          <circle
            cx="90"
            cy="90"
            r="76"
            stroke="var(--accent-success)"
            strokeWidth="8"
            strokeDasharray={477.5}
            strokeDashoffset={477.5 - (477.5 * progressPct) / 100}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
        </svg>

        <div style={{ position: 'absolute', textAlign: 'center' }}>
          {isFinished ? (
            <div>
              <CheckCircle2 size={36} color="var(--accent-success)" style={{ margin: '0 auto 4px auto' }} />
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-success)' }}>Break Done</p>
            </div>
          ) : (
            <div>
              <span className="font-heading" style={{ fontSize: '2.4rem', color: 'var(--primary)', fontWeight: 700, lineHeight: 1 }}>
                {formatTime(secondsLeft)}
              </span>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                {isRunning ? 'Pause anytime' : 'Ready'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: isFinished ? '24px' : '0' }}>
        <button 
          onClick={handleToggle}
          className="btn-primary" 
          style={{ padding: '12px 28px', fontSize: '15px' }}
        >
          {isFinished ? (
            <><RotateCcw size={16} /> Take Another Break</>
          ) : isRunning ? (
            <><Pause size={16} /> Pause</>
          ) : (
            <><Play size={16} /> {secondsLeft < selectedDuration * 60 ? 'Resume' : `Start ${selectedDuration}-Min Break`}</>
          )}
        </button>

        {!isFinished && secondsLeft < selectedDuration * 60 && (
          <button 
            onClick={handleReset}
            className="btn-secondary"
            style={{ padding: '12px 18px', fontSize: '14px' }}
            title="Reset timer"
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>

      {/* Return to Study Options */}
      {isFinished && (
        <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', animation: 'fadeIn 0.3s ease' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Refreshed and ready to get back to it?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/progress" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px', textDecoration: 'none' }}>
              <Layers size={14} /> View Progress
            </Link>
            <Link href="/team-workspace" className="btn-primary" style={{ padding: '8px 14px', fontSize: '13px', textDecoration: 'none' }}>
              <BookOpen size={14} /> Return to Workspace <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
