"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Coffee, 
  Sparkles, 
  Wind, 
  Eye, 
  Activity, 
  Droplet, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Clock, 
  HeartHandshake, 
  Layers, 
  HelpCircle,
  X,
  Compass
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { WellbeingMood, BreakActivity } from '@/lib/database.types';
import { BreathingGuide } from '@/components/BreathingGuide';
import { BreakTimer } from '@/components/BreakTimer';
import { TeamCheckinCard } from '@/components/TeamCheckinCard';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

export default function WellbeingPage() {
  const { 
    wellbeingMood, 
    setWellbeingMood, 
    breakActivities, 
    supportResources, 
    activeTeamId, 
    isLoaded 
  } = useApp();

  const [activeToolTab, setActiveToolTab] = useState<'breathing' | 'timer' | 'activities' | 'resources'>('breathing');
  const [selectedActivity, setSelectedActivity] = useState<BreakActivity | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isLoaded) {
    return (
      <div style={{ maxWidth: '1000px' }}>
        <LoadingSkeleton type="cards" />
      </div>
    );
  }

  const moodOptions: { mood: WellbeingMood; label: string; emoji: string; advice: string }[] = [
    { 
      mood: 'calm', 
      label: 'Calm', 
      emoji: '🌿', 
      advice: "You are in a centered mindset. A brief 2-minute posture stretch can sustain your smooth momentum." 
    },
    { 
      mood: 'okay', 
      label: 'Okay', 
      emoji: '🌤️', 
      advice: "A steady baseline. Consider a quick hydration pause or eye rest before tackling the next section." 
    },
    { 
      mood: 'tired', 
      label: 'Tired', 
      emoji: '☕', 
      advice: "Your eyes and focus may benefit from stepping away from screens for a 5-minute movement break." 
    },
    { 
      mood: 'stressed', 
      label: 'Stressed', 
      emoji: '🌊', 
      advice: "Take a gentle pause. A 2-minute box breathing cycle can help regulate tension and restore focus." 
    },
    { 
      mood: 'overwhelmed', 
      label: 'Overwhelmed', 
      emoji: '🍃', 
      advice: "Break complex goals into small individual steps. Step away for 5 minutes before returning to one single task." 
    },
    { 
      mood: 'need_break', 
      label: 'Need a break', 
      emoji: '🛋️', 
      advice: "Give yourself permission to pause completely for 10 minutes without thinking about assignments." 
    },
  ];

  const currentMoodObj = moodOptions.find(m => m.mood === wellbeingMood);

  const filteredActivities = breakActivities.filter(a => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  return (
    <div style={{ maxWidth: '1050px' }}>
      
      {/* Header */}
      <header style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="tag-success" style={{ fontSize: '12px' }}>
            Optional Study Support
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="var(--accent-success)" /> 100% Private to You
          </span>
        </div>
        <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>
          Pause. Reset. Continue.
        </h1>
        <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px', lineHeight: '1.5' }}>
          Study breaks sustain long-term cognitive clarity. Choose what helps you recharge before getting back to your work.
        </p>
      </header>

      {/* 1. Private Well-being Check-in Banner */}
      <div className="card" style={{ marginBottom: '36px', padding: '28px 32px', background: 'var(--bg-surface)' }}>
        <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '6px' }}>
          How are you feeling right now?
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Select a reflection to receive low-pressure, gentle suggestions. (Never shared with teammates or mentors).
        </p>

        {/* Mood Selection Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {moodOptions.map((opt) => {
            const isSelected = wellbeingMood === opt.mood;

            return (
              <button
                key={opt.mood}
                onClick={() => setWellbeingMood(opt.mood)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                  background: isSelected ? 'rgba(43, 58, 74, 0.08)' : 'var(--bg-main)',
                  color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gentle Suggestion Box if Mood Selected */}
        {currentMoodObj && (
          <div style={{ background: 'rgba(82, 121, 111, 0.08)', border: '1px solid rgba(82, 121, 111, 0.2)', borderRadius: 'var(--radius-sm)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={20} color="var(--accent-success)" />
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {currentMoodObj.advice}
              </p>
            </div>
            <button 
              onClick={() => setActiveToolTab('breathing')}
              className="btn-primary" 
              style={{ padding: '6px 14px', fontSize: '13px', background: 'var(--accent-success)' }}
            >
              Start Reset
            </button>
          </div>
        )}
      </div>

      {/* 2. Interactive Reset Tools Tabs */}
      <div className="tabs-header">
        <button 
          className={`tab-btn ${activeToolTab === 'breathing' ? 'active' : ''}`}
          onClick={() => setActiveToolTab('breathing')}
        >
          <Wind size={16} /> 2-Minute Box Breathing
        </button>
        <button 
          className={`tab-btn ${activeToolTab === 'timer' ? 'active' : ''}`}
          onClick={() => setActiveToolTab('timer')}
        >
          <Clock size={16} /> Break Timer
        </button>
        <button 
          className={`tab-btn ${activeToolTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveToolTab('activities')}
        >
          <Compass size={16} /> Break Activities ({breakActivities.length})
        </button>
        <button 
          className={`tab-btn ${activeToolTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveToolTab('resources')}
        >
          <BookOpen size={16} /> Campus & Academic Support
        </button>
      </div>

      {/* TAB 1: BREATHING GUIDE */}
      {activeToolTab === 'breathing' && (
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px', marginBottom: '40px' }}>
          <div className="card">
            <h3 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '8px', textAlign: 'center' }}>
              2-Minute Box Breathing
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '380px', margin: '0 auto 16px auto' }}>
              4 seconds inhale • 4 seconds hold • 4 seconds exhale • 4 seconds rest
            </p>
            <BreathingGuide />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h4 className="font-heading" style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '10px' }}>
                Why deliberate breathing works
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
                Slow, structured breathing activates the parasympathetic nervous system, easing mental fatigue and helping you refocus with a clearer perspective.
              </p>
              <div style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Tip: Keep your shoulders relaxed and spine gently upright.
                </span>
              </div>
            </div>

            {/* Squad Checkin Mini Card */}
            <TeamCheckinCard teamId={activeTeamId} />
          </div>
        </div>
      )}

      {/* TAB 2: BREAK TIMER */}
      {activeToolTab === 'timer' && (
        <div style={{ marginBottom: '40px' }}>
          <BreakTimer initialMinutes={5} />
        </div>
      )}

      {/* TAB 3: BREAK ACTIVITIES */}
      {activeToolTab === 'activities' && (
        <div>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'all', label: 'All Activities' },
              { id: 'breathing', label: 'Breathing' },
              { id: 'movement', label: 'Movement & Stretch' },
              { id: 'screen_reset', label: 'Screen Relief' },
              { id: 'hydration', label: 'Hydration' },
              { id: 'reflection', label: 'Micro-Reflection' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: selectedCategory === cat.id ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                  background: selectedCategory === cat.id ? 'rgba(43, 58, 74, 0.08)' : 'var(--bg-surface)',
                  color: selectedCategory === cat.id ? 'var(--primary)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '24px' }}>
            {filteredActivities.map((act) => (
              <div key={act.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className="tag-neutral" style={{ fontSize: '11px', textTransform: 'capitalize' }}>
                    {act.category.replace('_', ' ')}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {act.duration_minutes} Mins
                  </span>
                </div>

                <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '8px' }}>
                  {act.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px', flex: 1 }}>
                  {act.description}
                </p>

                {/* Steps preview */}
                <div style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700 }}>
                    Steps:
                  </span>
                  <ul style={{ paddingLeft: '18px', marginTop: '4px', fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                    {act.steps.slice(0, 2).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                    {act.steps.length > 2 && (
                      <li style={{ color: 'var(--text-secondary)', listStyleType: 'none', marginTop: '2px' }}>
                        +{act.steps.length - 2} more steps...
                      </li>
                    )}
                  </ul>
                </div>

                <button 
                  onClick={() => setSelectedActivity(act)}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '8px', fontSize: '13px', marginTop: 'auto' }}
                >
                  View Activity Guide
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CAMPUS & ACADEMIC SUPPORT RESOURCES */}
      {activeToolTab === 'resources' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '4px' }}>
              Academic & Peer Support Resources
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Non-clinical academic, peer mentoring, study methodology, and library support channels.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {supportResources.map((res) => (
              <div key={res.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <span className="tag-primary" style={{ fontSize: '11px', alignSelf: 'flex-start', marginBottom: '12px' }}>
                  {res.category}
                </span>

                <h4 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '8px' }}>
                  {res.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px', flex: 1 }}>
                  {res.description}
                </p>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {res.availability}
                  </span>
                  <Link href={res.url} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', textDecoration: 'none' }}>
                    Access →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Return to Study Flow Card */}
      <div className="card" style={{ marginTop: '40px', padding: '28px 32px', background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '4px' }}>
              Ready to get back to it?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Return smoothly to your study plans, tasks, or team workspace.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/progress" className="btn-secondary" style={{ padding: '10px 18px', fontSize: '14px', textDecoration: 'none' }}>
              <Layers size={16} /> View Progress
            </Link>
            <Link href="/team-workspace" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px', textDecoration: 'none' }}>
              <BookOpen size={16} /> Team Workspace <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="tag-neutral" style={{ marginBottom: '6px' }}>
                  {selectedActivity.category.replace('_', ' ').toUpperCase()} • {selectedActivity.duration_minutes} MINS
                </span>
                <h2 className="font-heading" style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>
                  {selectedActivity.title}
                </h2>
              </div>
              <button onClick={() => setSelectedActivity(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
              {selectedActivity.description}
            </p>

            <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Follow these simple steps:
              </h4>
              <ol style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.8' }}>
                {selectedActivity.steps.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setSelectedActivity(null)}>
                Close
              </button>
              <button className="btn-primary" onClick={() => { setSelectedActivity(null); setActiveToolTab('timer'); }}>
                Start Timer for this Activity
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
