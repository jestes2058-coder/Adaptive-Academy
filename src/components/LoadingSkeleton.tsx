"use client";

import React from 'react';

export function LoadingSkeleton({ type = 'cards' }: { type?: 'cards' | 'table' | 'profile' }) {
  if (type === 'cards') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="skeleton" style={{ height: '36px', width: '250px', marginBottom: '16px' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div className="skeleton" style={{ height: '120px' }}></div>
          <div className="skeleton" style={{ height: '120px' }}></div>
          <div className="skeleton" style={{ height: '120px' }}></div>
        </div>
        <div className="skeleton" style={{ height: '240px', marginTop: '20px' }}></div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="skeleton" style={{ height: '48px' }}></div>
        <div className="skeleton" style={{ height: '64px' }}></div>
        <div className="skeleton" style={{ height: '64px' }}></div>
        <div className="skeleton" style={{ height: '64px' }}></div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div className="skeleton" style={{ width: '80px', height: '80px', borderRadius: '50%' }}></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="skeleton" style={{ height: '24px', width: '200px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '300px' }}></div>
      </div>
    </div>
  );
}
