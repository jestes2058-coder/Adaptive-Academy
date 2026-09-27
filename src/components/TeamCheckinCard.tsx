"use client";

import React, { useState } from 'react';
import { Users, CheckCircle2, Coffee, HelpCircle, Flame, Check } from 'lucide-react';
import { useApp } from '@/lib/store';
import { TeamCheckinStatus } from '@/lib/database.types';

export function TeamCheckinCard({ teamId }: { teamId: string }) {
  const { teamCheckins, setTeamCheckin, user } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<TeamCheckinStatus | null>(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const currentTeamCheckins = teamCheckins.filter(c => c.team_id === teamId);

  const checkinOptions: { status: TeamCheckinStatus; label: string; icon: any; color: string }[] = [
    { status: 'making_progress', label: "We're making progress", icon: Flame, color: 'var(--accent-success)' },
    { status: 'need_help', label: 'Need some help', icon: HelpCircle, color: 'var(--accent-warning)' },
    { status: 'taking_break', label: 'Taking a break', icon: Coffee, color: 'var(--primary)' },
    { status: 'almost_finished', label: 'Almost finished', icon: CheckCircle2, color: 'var(--accent-success)' },
  ];

  const handleSelectStatus = (status: TeamCheckinStatus) => {
    setSelectedStatus(status);
    setTeamCheckin(teamId, status, note);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 className="font-heading" style={{ fontSize: '1.2rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={18} /> Squad Study Check-in
        </h3>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Optional Status
        </span>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Let your teammates know where you are at with today's study session.
      </p>

      {/* 4 Status Option Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '16px' }}>
        {checkinOptions.map((opt) => {
          const Icon = opt.icon;
          const isCurrent = selectedStatus === opt.status;

          return (
            <button
              key={opt.status}
              onClick={() => handleSelectStatus(opt.status)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: isCurrent ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                background: isCurrent ? 'rgba(43, 58, 74, 0.08)' : 'var(--bg-main)',
                color: isCurrent ? 'var(--primary)' : 'var(--text-primary)',
                fontWeight: isCurrent ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={16} color={opt.color} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <p style={{ fontSize: '12px', color: 'var(--accent-success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
          <Check size={14} /> Status updated for your squad!
        </p>
      )}

      {/* Recent Teammate Statuses */}
      {currentTeamCheckins.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700 }}>
            Recent Teammate Updates:
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            {currentTeamCheckins.slice(0, 3).map((chk) => (
              <div key={chk.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', padding: '6px 10px', background: 'var(--bg-main)', borderRadius: '4px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{chk.user_name}</span>
                <span className="tag-neutral" style={{ fontSize: '11px' }}>
                  {chk.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
