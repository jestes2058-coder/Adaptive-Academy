"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Target, 
  Flame, 
  Calendar, 
  ChevronRight, 
  Filter, 
  CheckCircle,
  Circle,
  Sparkles,
  Award,
  Layers,
  X
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { MilestoneItem } from '@/lib/database.types';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { BreakTimeBanner } from '@/components/BreakTimeBanner';

export default function ProgressPage() {
  const { progressOverview, tasks, milestones, updateTaskStatus, isLoaded } = useApp();
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);

  if (!isLoaded) {
    return (
      <div style={{ maxWidth: '1000px' }}>
        <LoadingSkeleton type="cards" />
      </div>
    );
  }

  // Filter tasks based on selected subject/category
  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory === 'all') return true;
    return task.subject_name.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const overallPct = progressOverview.overallProgressPercentage;
  const completedCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;

  return (
    <div style={{ maxWidth: '1050px' }}>
      {/* Header */}
      <header style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '6px' }}>
              Progress Tracking
            </h1>
            <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              See how your work is moving forward.
            </p>
          </div>

          {/* Time Filter Pills */}
          <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <button
              onClick={() => setTimeFilter('all')}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background: timeFilter === 'all' ? 'var(--primary)' : 'transparent',
                color: timeFilter === 'all' ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFilter('week')}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background: timeFilter === 'week' ? 'var(--primary)' : 'transparent',
                color: timeFilter === 'week' ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background: timeFilter === 'month' ? 'var(--primary)' : 'transparent',
                color: timeFilter === 'month' ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
            >
              This Month
            </button>
          </div>
        </div>
      </header>

      {/* Gentle Break-Time Banner */}
      <BreakTimeBanner contextText="You have made solid progress across your deliverables. Take a short 2-minute reset whenever you need to recharge." />

      {/* Main Progress Visualization Hero */}
      <div 
        className="card" 
        style={{ 
          marginBottom: '32px', 
          background: 'linear-gradient(135deg, var(--primary) 0%, #1A2735 100%)', 
          color: 'white', 
          border: 'none',
          padding: '36px'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="tag-warning" style={{ background: 'rgba(216, 142, 117, 0.2)', color: '#F8B4A0' }}>
                Academic Momentum
              </span>
              <span style={{ fontSize: '13px', color: '#CBD5E1' }}>
                {completedCount} / {totalCount} tasks completed
              </span>
            </div>
            
            <h2 className="font-heading" style={{ fontSize: '2.8rem', color: 'white', marginBottom: '8px', lineHeight: 1.1 }}>
              {overallPct}% Completed
            </h2>
            <p className="font-body" style={{ color: '#E2E8F0', fontSize: '15px', maxWidth: '520px', lineHeight: 1.5, marginBottom: '20px' }}>
              You are maintaining a strong pace ahead of the upcoming mathematics internal assessment and physics laboratory deadline.
            </p>

            {/* Overall Progress Bar */}
            <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '6px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${overallPct}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, var(--accent-success), #78998C)', 
                  borderRadius: '6px',
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                }}
              />
            </div>
          </div>

          {/* Progress Circular Dial Simulation */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ position: 'relative', width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ transform: 'rotate(-90deg)', width: '96px', height: '96px' }}>
                <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.15)" strokeWidth="8" fill="transparent" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="var(--accent-success)"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * overallPct) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>{overallPct}%</span>
              </div>
            </div>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginTop: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Term Progress
            </span>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Completed Tasks
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(82, 121, 111, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="font-heading" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '4px' }}>
            {completedCount}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--accent-success)', fontWeight: 600 }}>
            {totalCount > 0 ? `${Math.round((completedCount / totalCount) * 100)}% of planned tasks` : '0%'}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Active In-Flight
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(43, 58, 74, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={18} />
            </div>
          </div>
          <div className="font-heading" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '4px' }}>
            {progressOverview.activeTasksCount}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Tasks in progress or review
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Upcoming Deadlines
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(192, 108, 91, 0.1)', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={18} />
            </div>
          </div>
          <div className="font-heading" style={{ fontSize: '2rem', color: 'var(--accent-warning)', marginBottom: '4px' }}>
            {progressOverview.upcomingDeadlinesCount}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--accent-warning)', fontWeight: 600 }}>
            Due within next 7 days
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Study Streak
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(216, 142, 117, 0.15)', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={18} />
            </div>
          </div>
          <div className="font-heading" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '4px' }}>
            {progressOverview.currentStreakDays} Days
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Daily learning goal met
          </div>
        </div>
      </div>

      {/* Two Column Layout: Subject Mastery Breakdown + Milestone Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px', marginBottom: '40px' }}>
        
        {/* Left Column: Progress Breakdown by Subject */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>
                Progress by Subject
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Mastery metrics derived from your active assignments
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {progressOverview.subjectBreakdown.map((subject) => {
              const color = subject.progressPercentage >= 75 
                ? 'var(--accent-success)' 
                : subject.progressPercentage >= 50 
                ? 'var(--primary)' 
                : 'var(--accent-warning)';

              return (
                <div key={subject.subjectId} style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
                        {subject.subjectName}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                        • {subject.category}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color }}>
                        {subject.progressPercentage}%
                      </span>
                      <span className={subject.progressPercentage >= 75 ? 'tag-success' : subject.progressPercentage >= 50 ? 'tag-primary' : 'tag-warning'} style={{ fontSize: '11px', padding: '2px 8px' }}>
                        {subject.status}
                      </span>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${subject.progressPercentage}%`, 
                        height: '100%', 
                        background: color, 
                        borderRadius: '4px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Quick Task Tracker */}
          <div style={{ marginTop: '28px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Active Task Checklist
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredTasks.slice(0, 4).map((task) => {
                const isDone = task.status === 'done';
                return (
                  <div 
                    key={task.id}
                    onClick={() => updateTaskStatus(task.id, isDone ? 'todo' : 'done')}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '12px 16px', 
                      background: isDone ? 'rgba(82, 121, 111, 0.05)' : 'var(--bg-main)', 
                      border: isDone ? '1px solid rgba(82, 121, 111, 0.2)' : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isDone ? (
                      <CheckCircle2 size={18} color="var(--accent-success)" />
                    ) : (
                      <Circle size={18} color="var(--text-muted)" />
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                        {task.title}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {task.subject_name} • {isDone ? 'Completed' : `Due ${new Date(task.due_date).toLocaleDateString()}`}
                      </p>
                    </div>
                    <span className={task.priority === 'urgent' || task.priority === 'high' ? 'tag-warning' : 'tag-neutral'} style={{ fontSize: '11px' }}>
                      {task.priority}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Milestone Timeline & Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Milestone Timeline */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
                Milestone Timeline
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {milestones.map((ms, index) => {
                const isCompleted = ms.status === 'completed';
                const isInProgress = ms.status === 'in_progress';

                return (
                  <div 
                    key={ms.id} 
                    onClick={() => setSelectedMilestone(ms)}
                    style={{ 
                      display: 'flex', 
                      gap: '14px', 
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Timeline Node Icon */}
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: isCompleted ? 'rgba(82, 121, 111, 0.15)' : isInProgress ? 'rgba(43, 58, 74, 0.12)' : 'var(--bg-elevated)',
                      color: isCompleted ? 'var(--accent-success)' : isInProgress ? 'var(--primary)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px',
                      flexShrink: 0
                    }}>
                      {isCompleted ? <CheckCircle2 size={16} /> : isInProgress ? <Clock size={16} /> : <Circle size={16} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {ms.title}
                        </h4>
                        <span className={isCompleted ? 'tag-success' : isInProgress ? 'tag-primary' : 'tag-neutral'} style={{ fontSize: '11px', padding: '2px 8px' }}>
                          {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Upcoming'}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {ms.completed_tasks_count} of {ms.tasks_count} deliverables • {ms.category}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '16px' }}>
              Recent Progress Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {progressOverview.recentActivities.map((act) => (
                <div key={act.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: act.type === 'streak_milestone' ? 'rgba(216, 142, 117, 0.15)' : 'rgba(82, 121, 111, 0.12)',
                    color: act.type === 'streak_milestone' ? 'var(--accent-warning)' : 'var(--accent-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    {act.type === 'streak_milestone' ? <Flame size={14} /> : <TrendingUp size={14} />}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {act.title}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Milestone Details Modal */}
      {selectedMilestone && (
        <div className="modal-overlay" onClick={() => setSelectedMilestone(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className={selectedMilestone.status === 'completed' ? 'tag-success' : selectedMilestone.status === 'in_progress' ? 'tag-primary' : 'tag-neutral'} style={{ marginBottom: '8px' }}>
                  {selectedMilestone.status.toUpperCase()}
                </span>
                <h2 className="font-heading" style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>
                  {selectedMilestone.title}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Category: {selectedMilestone.category}
                </p>
              </div>
              <button 
                onClick={() => setSelectedMilestone(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <X size={20} />
              </button>
            </div>

            <p className="font-body" style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-primary)', marginBottom: '24px' }}>
              {selectedMilestone.description}
            </p>

            <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>Milestone Completion:</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{selectedMilestone.progress_pct}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${selectedMilestone.progress_pct}%`, height: '100%', background: 'var(--accent-success)', borderRadius: '4px' }} />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                Target Deadline: {new Date(selectedMilestone.due_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setSelectedMilestone(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
