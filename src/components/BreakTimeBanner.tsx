"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Coffee, Sparkles, X, ArrowRight } from 'lucide-react';

export function BreakTimeBanner({ contextText }: { contextText?: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, rgba(82, 121, 111, 0.08) 0%, rgba(43, 58, 74, 0.05) 100%)', 
      border: '1px solid rgba(82, 121, 111, 0.25)', 
      borderRadius: 'var(--radius-md)', 
      padding: '16px 20px', 
      marginBottom: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(82, 121, 111, 0.15)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Coffee size={20} />
        </div>
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '2px' }}>
            Study Break Opportunity
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {contextText || "You've been focused for a while. Take a 2-minute breath or screen break whenever you're ready."}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link 
          href="/wellbeing" 
          className="btn-primary" 
          style={{ padding: '8px 16px', fontSize: '13px', textDecoration: 'none', background: 'var(--accent-success)' }}
        >
          <Sparkles size={14} /> Take a Break
        </Link>
        <button 
          onClick={() => setDismissed(true)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          title="Dismiss"
          aria-label="Dismiss break suggestion"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
