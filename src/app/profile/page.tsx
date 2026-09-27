"use client";

import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  FolderGit2, 
  Users2, 
  Plus, 
  X, 
  Edit3, 
  Check, 
  Clock, 
  Mail, 
  MapPin, 
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

export default function ProfilePage() {
  const { 
    user, 
    updateUser, 
    tasks, 
    teams, 
    resources, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    isLoaded 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'notifications' | 'preferences' | 'privacy'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form state
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editInstitution, setEditInstitution] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editAcademicYear, setEditAcademicYear] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editTimezone, setEditTimezone] = useState('');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newInterestInput, setNewInterestInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [interestsList, setInterestsList] = useState<string[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Preference switches
  const [dailyFocusHours, setDailyFocusHours] = useState('2.5');
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);
  const [notifyTeams, setNotifyTeams] = useState(true);
  const [notifyResources, setNotifyResources] = useState(true);

  if (!isLoaded) {
    return (
      <div style={{ maxWidth: '1000px' }}>
        <LoadingSkeleton type="profile" />
      </div>
    );
  }

  // Derived statistics from actual data
  const completedTasksCount = tasks.filter(t => t.status === 'done').length;
  const userTeamsCount = teams.length;
  const resourcesSharedCount = resources.filter(r => r.uploader_id === user.id).length;
  const unreadNotifications = notifications.filter(n => !n.is_read);

  const startEditing = () => {
    setEditName(user.name);
    setEditBio(user.bio);
    setEditInstitution(user.institution);
    setEditCourse(user.course);
    setEditAcademicYear(user.academic_year);
    setEditLocation(user.location);
    setEditTimezone(user.timezone);
    setSkillsList([...user.skills]);
    setInterestsList([...user.interests]);
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: editName.trim() || user.name,
      bio: editBio.trim(),
      institution: editInstitution.trim(),
      course: editCourse.trim(),
      academicYear: editAcademicYear.trim(),
      location: editLocation.trim(),
      timezone: editTimezone.trim(),
      skills: skillsList,
      interests: interestsList,
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const addSkill = () => {
    if (newSkillInput.trim() && !skillsList.includes(newSkillInput.trim())) {
      setSkillsList([...skillsList, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const addInterest = () => {
    if (newInterestInput.trim() && !interestsList.includes(newInterestInput.trim())) {
      setInterestsList([...interestsList, newInterestInput.trim()]);
      setNewInterestInput('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterestsList(interestsList.filter(i => i !== interestToRemove));
  };

  return (
    <div style={{ maxWidth: '1050px' }}>
      {/* Header */}
      <header style={{ marginBottom: '32px' }}>
        <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '6px' }}>
          Student Profile & Settings
        </h1>
        <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Manage your academic identity, skills, peer collaboration stats, and preferences.
        </p>
      </header>

      {/* Main Profile Identity Card */}
      <div className="card" style={{ marginBottom: '32px', padding: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ 
              width: '84px', 
              height: '84px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--primary) 0%, #1E293B 100%)', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '32px', 
              fontWeight: 700,
              boxShadow: 'var(--shadow-subtle)'
            }}>
              {user.name.charAt(0)}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>
                  {user.name}
                </h2>
                <span className="tag-success" style={{ fontSize: '12px' }}>
                  Student
                </span>
              </div>
              
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                {user.course}
              </p>
              
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <GraduationCap size={15} /> {user.institution}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={15} /> {user.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={15} /> {user.timezone}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={startEditing}
            className="btn-primary" 
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            <Edit3 size={15} /> Edit Profile
          </button>
        </div>

        {/* Bio statement */}
        <p className="font-body" style={{ color: 'var(--text-primary)', marginTop: '20px', fontSize: '14px', lineHeight: '1.6', background: 'var(--bg-main)', padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
          {user.bio}
        </p>

        {/* 4 Statistics Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginTop: '24px' }}>
          <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
              Tasks Completed
            </span>
            <p className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--primary)', marginTop: '4px' }}>
              {completedTasksCount}
            </p>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
              Teams Joined
            </span>
            <p className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--primary)', marginTop: '4px' }}>
              {userTeamsCount}
            </p>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
              Resources Shared
            </span>
            <p className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--primary)', marginTop: '4px' }}>
              {resourcesSharedCount}
            </p>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-warning)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={14} /> Active Streak
            </span>
            <p className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--accent-warning)', marginTop: '4px' }}>
              {user.streak_days} Days
            </p>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div style={{ background: 'rgba(82, 121, 111, 0.1)', color: 'var(--accent-success)', padding: '12px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(82, 121, 111, 0.2)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
          <CheckCircle2 size={18} /> Profile updated successfully!
        </div>
      )}

      {/* Two Column Settings Tabs & Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
        
        {/* Left Navigation Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            style={{ width: '100%', textAlign: 'left', border: 'none', background: activeTab === 'profile' ? 'var(--bg-elevated)' : 'transparent', cursor: 'pointer' }}
          >
            <User size={16} /> Skills & Interests
          </button>
          <button 
            className={`nav-item ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
            style={{ width: '100%', textAlign: 'left', border: 'none', background: activeTab === 'academic' ? 'var(--bg-elevated)' : 'transparent', cursor: 'pointer' }}
          >
            <GraduationCap size={16} /> Academic Record
          </button>
          <button 
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
            style={{ width: '100%', textAlign: 'left', border: 'none', background: activeTab === 'notifications' ? 'var(--bg-elevated)' : 'transparent', cursor: 'pointer' }}
          >
            <Bell size={16} /> Notifications
            {unreadNotifications.length > 0 && (
              <span style={{ marginLeft: 'auto', background: 'var(--accent-warning)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '8px' }}>
                {unreadNotifications.length}
              </span>
            )}
          </button>
          <button 
            className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
            style={{ width: '100%', textAlign: 'left', border: 'none', background: activeTab === 'preferences' ? 'var(--bg-elevated)' : 'transparent', cursor: 'pointer' }}
          >
            <Settings size={16} /> Study Preferences
          </button>
          <button 
            className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
            style={{ width: '100%', textAlign: 'left', border: 'none', background: activeTab === 'privacy' ? 'var(--bg-elevated)' : 'transparent', cursor: 'pointer' }}
          >
            <Shield size={16} /> Privacy & Security
          </button>
        </div>

        {/* Right Content Panel */}
        <div>
          
          {/* TAB 1: SKILLS & INTERESTS */}
          {activeTab === 'profile' && (
            <div className="card">
              <h3 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '20px' }}>
                Academic Skills & Subject Knowledge
              </h3>

              <div style={{ marginBottom: '28px' }}>
                <label className="form-label" style={{ marginBottom: '10px', display: 'block' }}>
                  Demonstrated Competencies (Used for team knowledge matching)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {user.skills.map((skill) => (
                    <span key={skill} className="tag-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                <h3 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '14px' }}>
                  Research & Extracurricular Interests
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {user.interests.map((interest) => (
                    <span key={interest} className="tag-neutral" style={{ padding: '6px 14px', fontSize: '13px' }}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC RECORD */}
          {activeTab === 'academic' && (
            <div className="card">
              <h3 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '20px' }}>
                Academic Landscape
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Institution</span>
                  <p style={{ fontWeight: 600, fontSize: '15px', marginTop: '4px' }}>{user.institution}</p>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Degree / Course</span>
                  <p style={{ fontWeight: 600, fontSize: '15px', marginTop: '4px' }}>{user.course}</p>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Academic Standing</span>
                  <p style={{ fontWeight: 600, fontSize: '15px', marginTop: '4px' }}>{user.academic_year}</p>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Registered Email</span>
                  <p style={{ fontWeight: 600, fontSize: '15px', marginTop: '4px' }}>{user.email}</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Enrolled Teams & Study Cohorts
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {teams.map((t) => (
                    <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '14px' }}>{t.name}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t.goal}</p>
                      </div>
                      <span className="tag-neutral" style={{ fontSize: '11px' }}>
                        {t.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS CENTER */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>
                  Activity & Notifications Center
                </h3>
                {unreadNotifications.length > 0 && (
                  <button 
                    onClick={markAllNotificationsAsRead}
                    className="btn-ghost"
                    style={{ fontSize: '13px', color: 'var(--primary)' }}
                  >
                    Mark All as Read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {notifications.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No notifications right now.</p>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      style={{ 
                        padding: '16px', 
                        borderRadius: 'var(--radius-sm)', 
                        border: '1px solid var(--border-light)',
                        background: notif.is_read ? 'var(--bg-main)' : 'var(--bg-surface)',
                        borderLeft: notif.is_read ? '1px solid var(--border-light)' : '3px solid var(--primary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: notif.is_read ? 600 : 700, color: 'var(--text-primary)' }}>
                            {notif.title}
                          </span>
                          {!notif.is_read && (
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-warning)' }}></span>
                          )}
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                          {notif.message}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                          {new Date(notif.created_at).toLocaleString()}
                        </p>
                      </div>

                      {notif.link && (
                        <a 
                          href={notif.link} 
                          className="btn-ghost" 
                          style={{ padding: '6px 10px', fontSize: '12px', color: 'var(--primary)' }}
                        >
                          View <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: STUDY PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="card">
              <h3 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '20px' }}>
                Study & Focus Preferences
              </h3>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Target Daily Deep Focus Hours</label>
                <select 
                  className="input-field" 
                  value={dailyFocusHours}
                  onChange={(e) => setDailyFocusHours(e.target.value)}
                >
                  <option value="1.5">1.5 Hours / Day (Light Study)</option>
                  <option value="2.5">2.5 Hours / Day (Recommended Balanced)</option>
                  <option value="4.0">4.0 Hours / Day (Intensive Exam Prep)</option>
                </select>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Used by the study planner engine to calculate realistic daily workloads and avoid study burnout.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Notification Delivery Settings
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
                    <input 
                      type="checkbox" 
                      checked={notifyDeadlines} 
                      onChange={(e) => setNotifyDeadlines(e.target.checked)} 
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>Notify me 24 hours before assignment deadlines</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
                    <input 
                      type="checkbox" 
                      checked={notifyTeams} 
                      onChange={(e) => setNotifyTeams(e.target.checked)} 
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>Notify me when a team member posts a discussion message or assigns a task</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
                    <input 
                      type="checkbox" 
                      checked={notifyResources} 
                      onChange={(e) => setNotifyResources(e.target.checked)} 
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>Notify me when new shared resources are uploaded in my teams</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
                    <input 
                      type="checkbox" 
                      defaultChecked={true} 
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>Suggest a gentle 2-minute break after 50 minutes of continuous study</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PRIVACY & SECURITY */}
          {activeTab === 'privacy' && (
            <div className="card">
              <h3 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '20px' }}>
                Privacy & Collaboration Controls
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Profile Visibility
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Visible only to enrolled classmates and verified peer study teams.
                  </p>
                  <span className="tag-success" style={{ fontSize: '12px' }}>
                    ✓ Protected Student Session
                  </span>
                </div>

                <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Data & Resource Storage
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    All personal resources and uploaded notes are backed by Supabase Storage with granular role-based security policies.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="font-heading" style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>
                Edit Profile
              </h2>
              <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location / City</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bio Statement</label>
                <textarea 
                  className="input-field" 
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Institution / University</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={editInstitution}
                    onChange={(e) => setEditInstitution(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Course / Degree</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={editCourse}
                    onChange={(e) => setEditCourse(e.target.value)}
                  />
                </div>
              </div>

              {/* Skills Editor */}
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Skills (Press Add)</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Linear Algebra, Python, C++" 
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                  />
                  <button type="button" onClick={addSkill} className="btn-secondary" style={{ padding: '8px 16px' }}>
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {skillsList.map((s) => (
                    <span key={s} className="tag-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {s}
                      <button type="button" onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', padding: 0 }}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests Editor */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Interests (Press Add)</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Robotics, AI, Competitive Coding" 
                    value={newInterestInput}
                    onChange={(e) => setNewInterestInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInterest(); } }}
                  />
                  <button type="button" onClick={addInterest} className="btn-secondary" style={{ padding: '8px 16px' }}>
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {interestsList.map((i) => (
                    <span key={i} className="tag-neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {i}
                      <button type="button" onClick={() => removeInterest(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 0 }}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
