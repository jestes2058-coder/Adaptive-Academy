"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MessageSquare, 
  FolderGit2, 
  Activity as ActivityIcon, 
  Plus, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Trash2, 
  ShieldCheck, 
  Lightbulb, 
  ArrowRight, 
  UserPlus, 
  X, 
  Download, 
  FileText, 
  Check, 
  Copy,
  AlertTriangle,
  MoveRight
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { TaskItem, TeamMemberItem } from '@/lib/database.types';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { TeamCheckinCard } from '@/components/TeamCheckinCard';
import { Coffee } from 'lucide-react';

interface TeamWorkspaceViewProps {
  initialTeamId?: string;
}

export function TeamWorkspaceView({ initialTeamId }: TeamWorkspaceViewProps) {
  const { 
    teams, 
    teamMembers, 
    tasks, 
    discussions, 
    activities, 
    resources, 
    user, 
    createTask, 
    updateTaskStatus, 
    deleteTask, 
    sendDiscussionMessage, 
    uploadResource, 
    removeTeamMember, 
    activeTeamId, 
    setActiveTeamId, 
    isLoaded 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'discussion' | 'members' | 'files' | 'activity'>('overview');
  
  // Modals & form state
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // New task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<TaskItem['priority']>('medium');
  const [taskSubject, setTaskSubject] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskAssigneeId, setTaskAssigneeId] = useState('');

  // Discussion state
  const [messageInput, setMessageInput] = useState('');

  // Upload state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'documents' | 'presentations' | 'spreadsheets' | 'images' | 'links'>('documents');
  const [uploadUrl, setUploadUrl] = useState('');

  if (!isLoaded) {
    return (
      <div style={{ maxWidth: '1000px' }}>
        <LoadingSkeleton type="cards" />
      </div>
    );
  }

  // Determine current team
  const targetId = initialTeamId || activeTeamId;
  const currentTeam = teams.find((t) => t.id === targetId) || teams[0];

  if (!currentTeam) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <EmptyState 
          icon={Users}
          title="No team workspace found."
          description="You are not part of any team yet. Join or create a team to start collaborating."
          actionLabel="Go to Teams"
          actionHref="/teams"
        />
      </div>
    );
  }

  const currentMembers = teamMembers.filter((m) => m.team_id === currentTeam.id);
  const currentTasks = tasks.filter((t) => t.team_id === currentTeam.id);
  const currentDiscussions = discussions.filter((d) => d.team_id === currentTeam.id);
  const currentActivities = activities.filter((a) => a.team_id === currentTeam.id);
  const currentResources = resources.filter((r) => r.team_id === currentTeam.id);

  const isOwner = currentTeam.owner_id === user.id;

  // Task Kanban columns
  const todoTasks = currentTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = currentTasks.filter((t) => t.status === 'in_progress');
  const reviewTasks = currentTasks.filter((t) => t.status === 'review');
  const doneTasks = currentTasks.filter((t) => t.status === 'done');

  const teamProgressPct = currentTasks.length > 0 
    ? Math.round((doneTasks.length / currentTasks.length) * 100) 
    : currentTeam.progress_pct;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const assignee = currentMembers.find(m => m.user_id === taskAssigneeId);

    createTask({
      teamId: currentTeam.id,
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      priority: taskPriority,
      subjectName: taskSubject || currentTeam.name,
      dueDate: taskDueDate || new Date(Date.now() + 86400000 * 3).toISOString(),
      assigneeId: assignee ? assignee.user_id : user.id,
      assigneeName: assignee ? assignee.name : user.name,
    });

    setShowCreateTaskModal(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('medium');
    setTaskSubject('');
    setTaskDueDate('');
    setTaskAssigneeId('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    sendDiscussionMessage({
      teamId: currentTeam.id,
      content: messageInput.trim(),
    });

    setMessageInput('');
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    uploadResource({
      title: uploadTitle.trim(),
      fileName: uploadFileName.trim() || `${uploadTitle.replace(/\s+/g, '_')}.pdf`,
      fileType: uploadCategory === 'links' ? 'link' : uploadCategory === 'images' ? 'image' : uploadCategory === 'spreadsheets' ? 'xlsx' : uploadCategory === 'presentations' ? 'pptx' : 'pdf',
      fileSizeBytes: uploadCategory === 'links' ? 0 : 2100000,
      category: uploadCategory,
      teamId: currentTeam.id,
      folder: 'Team Shared',
      url: uploadUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    });

    setShowUploadModal(false);
    setUploadTitle('');
    setUploadFileName('');
    setUploadUrl('');
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(currentTeam.join_code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Workspace Header */}
      <header style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 className="font-brand" style={{ fontSize: '2.4rem', color: 'var(--primary)' }}>
                {currentTeam.name}
              </h1>
              <span className="tag-success">
                {currentMembers.length} Members
              </span>
              {isOwner && (
                <span className="tag-warning" style={{ fontSize: '11px' }}>
                  👑 Owner
                </span>
              )}
            </div>
            <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '700px' }}>
              <strong>Goal:</strong> {currentTeam.goal}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link
              href="/wellbeing"
              className="btn-secondary"
              style={{ padding: '9px 14px', fontSize: '13px', textDecoration: 'none', color: 'var(--accent-success)', borderColor: 'rgba(82, 121, 111, 0.3)' }}
              title="Take a quick 2-minute break"
            >
              <Coffee size={15} /> Break Time
            </Link>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="btn-secondary"
              style={{ padding: '9px 16px', fontSize: '14px' }}
            >
              <UserPlus size={16} /> Invite Members
            </button>
            <Link 
              href="/teams" 
              className="btn-secondary" 
              style={{ padding: '9px 16px', fontSize: '14px', textDecoration: 'none' }}
            >
              <Users size={16} /> Switch Team
            </Link>
          </div>
        </div>

        {/* Workspace Quick Stat Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '14px 20px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {currentMembers.map((m, idx) => (
                <div 
                  key={m.id} 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '13px', 
                    fontWeight: 700,
                    border: '2px solid white',
                    marginLeft: idx > 0 ? '-8px' : '0',
                  }}
                  title={`${m.name} (${m.role})`}
                >
                  {m.name.charAt(0)}
                </div>
              ))}
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {currentMembers.length} collaborators in workspace
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Team Task Progress</span>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{teamProgressPct}% complete</p>
            </div>
            <div style={{ width: '100px', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${teamProgressPct}%`, height: '100%', background: 'var(--accent-success)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Workspace Navigation Tabs */}
      <div className="tabs-header">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <ActivityIcon size={16} /> Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <CheckCircle2 size={16} /> Tasks ({currentTasks.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'discussion' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussion')}
        >
          <MessageSquare size={16} /> Discussion ({currentDiscussions.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <Users size={16} /> Members ({currentMembers.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          <FolderGit2 size={16} /> Files ({currentResources.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          <ActivityIcon size={16} /> Activity
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Left Column: Knowledge Map & Peer Learning */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Team Knowledge Map */}
            <div className="card">
              <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--primary)' }}>
                Team Knowledge Map
              </h2>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                  Integration & Calculus
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>Arun Kumar</span>
                    <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>4/5 (High Confidence)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>Sahil Doe (You)</span>
                    <span style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>2/5 (Needs Review)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>Neha Roy</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>3/5 (Competent)</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                  Differential Equations & Laplace
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>Sahil Doe (You)</span>
                    <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>5/5 (Mastered)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>Arun Kumar</span>
                    <span style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>2/5 (Needs Review)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>Neha Roy</span>
                    <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>4/5 (High Confidence)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Peer Learning Recommendation */}
            <div className="card" style={{ background: 'rgba(82, 121, 111, 0.05)', borderColor: 'rgba(82, 121, 111, 0.25)' }}>
              <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-success)' }}>
                <Lightbulb size={20} /> Peer Learning Opportunity
              </h2>
              <p className="font-body" style={{ color: 'var(--text-primary)', marginBottom: '16px', lineHeight: '1.5', fontSize: '14px' }}>
                <strong>Arun</strong> has high mastery in Integration where you have a knowledge gap. Conversely, you scored 5/5 in Differential Equations where Arun seeks assistance.
              </p>
              <button 
                onClick={() => setActiveTab('discussion')}
                className="btn-primary" 
                style={{ background: 'var(--accent-success)' }}
              >
                Start Discussion in Chat
              </button>
            </div>

            {/* Active Tasks Mini-Board */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
                  Active Team Deliverables
                </h2>
                <button 
                  onClick={() => setActiveTab('tasks')}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  View Kanban Board →
                </button>
              </div>

              {currentTasks.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No active tasks yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentTasks.slice(0, 3).map((task) => (
                    <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 600 }}>{task.title}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Assignee: {task.assignee_name}</p>
                      </div>
                      <span className={task.status === 'done' ? 'tag-success' : task.status === 'in_progress' ? 'tag-primary' : 'tag-neutral'} style={{ fontSize: '11px' }}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Shared Plan & Quick Resources */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Shared Schedule */}
            <div className="card">
              <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--primary)' }}>
                Shared Schedule
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--accent-warning)', fontWeight: 700, textTransform: 'uppercase' }}>Monday • 6:00 PM</span>
                  <p style={{ fontWeight: 600, marginTop: '2px', fontSize: '14px' }}>Group Session: Integration by Parts</p>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>Thursday • 4:30 PM</span>
                  <p style={{ fontWeight: 600, marginTop: '2px', fontSize: '14px' }}>Mock Internal Assessment Review</p>
                </div>
              </div>
            </div>

            {/* Quick Shared Files */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
                  Shared Files
                </h2>
                <button 
                  onClick={() => setActiveTab('files')}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  View All ({currentResources.length})
                </button>
              </div>

              {currentResources.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>No files uploaded yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentResources.slice(0, 3).map((res) => (
                    <div key={res.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                        <FileText size={16} color="var(--primary)" />
                        <span style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                          {res.title}
                        </span>
                      </div>
                      <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                        <Download size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Squad Check-in Widget */}
            <TeamCheckinCard teamId={currentTeam.id} />

          </div>

        </div>
      )}

      {/* TAB 2: TASK KANBAN BOARD */}
      {activeTab === 'tasks' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>
                Team Task Board
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Move tasks across columns as work progresses to keep everyone in sync.
              </p>
            </div>

            <button 
              onClick={() => setShowCreateTaskModal(true)}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              <Plus size={16} /> Create Task
            </button>
          </div>

          {/* Kanban Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'flex-start' }}>
            
            {/* Column 1: TO DO */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--text-secondary)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
                  To Do
                </span>
                <span className="tag-neutral" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {todoTasks.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '120px' }}>
                {todoTasks.map((task) => (
                  <div key={task.id} className="card" style={{ padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span className={task.priority === 'urgent' || task.priority === 'high' ? 'tag-warning' : 'tag-neutral'} style={{ fontSize: '10px', padding: '2px 6px' }}>
                        {task.priority}
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                        title="Delete Task"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>
                        {task.description}
                      </p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {task.assignee_name || 'Unassigned'}
                      </span>
                      <button 
                        onClick={() => updateTaskStatus(task.id, 'in_progress')}
                        className="btn-ghost"
                        style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--primary)' }}
                      >
                        Start <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: IN PROGRESS */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--primary)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)' }}>
                  In Progress
                </span>
                <span className="tag-primary" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {inProgressTasks.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '120px' }}>
                {inProgressTasks.map((task) => (
                  <div key={task.id} className="card" style={{ padding: '16px', borderLeft: '3px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span className={task.priority === 'urgent' || task.priority === 'high' ? 'tag-warning' : 'tag-neutral'} style={{ fontSize: '10px', padding: '2px 6px' }}>
                        {task.priority}
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                        title="Delete Task"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>
                        {task.description}
                      </p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {task.assignee_name}
                      </span>
                      <button 
                        onClick={() => updateTaskStatus(task.id, 'review')}
                        className="btn-ghost"
                        style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--primary)' }}
                      >
                        Review <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: REVIEW */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--accent-warning)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-warning)' }}>
                  Review
                </span>
                <span className="tag-warning" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {reviewTasks.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '120px' }}>
                {reviewTasks.map((task) => (
                  <div key={task.id} className="card" style={{ padding: '16px', borderLeft: '3px solid var(--accent-warning)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span className="tag-warning" style={{ fontSize: '10px', padding: '2px 6px' }}>
                        Needs Verification
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                        title="Delete Task"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>
                        {task.description}
                      </p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {task.assignee_name}
                      </span>
                      <button 
                        onClick={() => updateTaskStatus(task.id, 'done')}
                        className="btn-ghost"
                        style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--accent-success)' }}
                      >
                        Approve ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: DONE */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--accent-success)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-success)' }}>
                  Done
                </span>
                <span className="tag-success" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {doneTasks.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '120px' }}>
                {doneTasks.map((task) => (
                  <div key={task.id} className="card" style={{ padding: '16px', opacity: 0.85, borderLeft: '3px solid var(--accent-success)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span className="tag-success" style={{ fontSize: '10px', padding: '2px 6px' }}>
                        ✓ Completed
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                        title="Delete Task"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'line-through', marginBottom: '6px' }}>
                      {task.title}
                    </h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {task.assignee_name}
                      </span>
                      <button 
                        onClick={() => updateTaskStatus(task.id, 'todo')}
                        className="btn-ghost"
                        style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--text-secondary)' }}
                      >
                        Reopen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: DISCUSSION / CHAT */}
      {activeTab === 'discussion' && (
        <div className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '620px' }}>
          {/* Discussion Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="font-heading" style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>
                {currentTeam.name} Discussion Channel
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Real-time peer messaging & study sync
              </p>
            </div>
            <span className="tag-success" style={{ fontSize: '11px' }}>
              ● Live Channel
            </span>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentDiscussions.length === 0 ? (
              <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-secondary)' }}>
                <p>No messages yet. Say hi to your team to kick off study collaboration!</p>
              </div>
            ) : (
              currentDiscussions.map((msg) => {
                const isMe = msg.user_id === user.id;

                return (
                  <div key={msg.id} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: isMe ? 'var(--primary)' : 'var(--accent-success)', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '14px', 
                      fontWeight: 700,
                      flexShrink: 0 
                    }}>
                      {msg.user_name.charAt(0)}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {msg.user_name}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div style={{ 
                        background: isMe ? 'rgba(43, 58, 74, 0.05)' : 'var(--bg-main)', 
                        padding: '12px 16px', 
                        borderRadius: 'var(--radius-sm)', 
                        border: '1px solid var(--border-light)',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: 'var(--text-primary)',
                        maxWidth: '720px'
                      }}>
                        {msg.content}

                        {msg.attachments && msg.attachments.length > 0 && (
                          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                            {msg.attachments.map((att, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
                                <Paperclip size={12} /> {att.name} ({att.size})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} style={{ padding: '16px 24px', borderTop: '1px solid var(--border-light)', background: 'var(--bg-surface)', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder={`Message ${currentTeam.name}...`} 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
              <Send size={16} /> Send
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: MEMBERS MANAGEMENT */}
      {activeTab === 'members' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>
                Team Members ({currentMembers.length})
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {isOwner ? 'As Team Owner, you can invite peers and manage team roles.' : 'View your squad collaborators and subject proficiencies.'}
              </p>
            </div>

            <button 
              onClick={() => setShowInviteModal(true)}
              className="btn-primary"
              style={{ padding: '10px 18px', fontSize: '14px' }}
            >
              <UserPlus size={16} /> Invite Member
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {currentMembers.map((member) => {
              const isMemberOwner = member.role === 'owner';
              const canRemove = isOwner && member.user_id !== user.id;

              return (
                <div key={member.id} className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div style={{ 
                        width: '44px', 
                        height: '44px', 
                        borderRadius: '50%', 
                        background: 'var(--primary)', 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '18px', 
                        fontWeight: 700 
                      }}>
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {member.name}
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {member.email}
                        </p>
                      </div>
                    </div>

                    <span className={isMemberOwner ? 'tag-warning' : 'tag-neutral'} style={{ fontSize: '11px' }}>
                      {isMemberOwner ? '👑 Owner' : 'Member'}
                    </span>
                  </div>

                  {/* Confidence Topics */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700 }}>
                      Specialties / Confidence:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      {member.confidence_topics.map((t, idx) => (
                        <span key={idx} style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '12px', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                          {t.topic} ({t.score}/5)
                        </span>
                      ))}
                    </div>
                  </div>

                  {canRemove && (
                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => removeTeamMember(currentTeam.id, member.id)}
                        className="btn-danger"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                      >
                        Remove from team
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: FILES / RESOURCES */}
      {activeTab === 'files' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>
                Team Files & Attachments
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Documents, slides, spreadsheets, and links shared within this workspace.
              </p>
            </div>

            <button 
              onClick={() => setShowUploadModal(true)}
              className="btn-primary"
              style={{ padding: '10px 18px', fontSize: '14px' }}
            >
              <Plus size={16} /> Upload Team File
            </button>
          </div>

          {currentResources.length === 0 ? (
            <EmptyState 
              icon={FolderGit2}
              title="No files shared yet."
              description="Upload notes, assignments, research PDFs or formulas to share with your team."
              actionLabel="Upload First File"
              onAction={() => setShowUploadModal(true)}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {currentResources.map((res) => (
                <div key={res.id} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'rgba(43, 58, 74, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={18} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {res.title}
                      </h4>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {res.file_size_formatted} • {res.category}
                      </p>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Uploaded by <strong>{res.uploader_name}</strong>
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: 'auto' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {new Date(res.created_at).toLocaleDateString()}
                    </span>
                    <a 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px', textDecoration: 'none' }}
                    >
                      <Download size={13} /> View / Get
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: ACTIVITY FEED */}
      {activeTab === 'activity' && (
        <div className="card">
          <h2 className="font-heading" style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '24px' }}>
            Workspace Activity Log
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentActivities.map((act) => (
              <div key={act.id} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: act.action_type === 'task_completed' ? 'rgba(82, 121, 111, 0.15)' : 'rgba(43, 58, 74, 0.08)',
                  color: act.action_type === 'task_completed' ? 'var(--accent-success)' : 'var(--primary)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginTop: '2px'
                }}>
                  <ActivityIcon size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                    <strong>{act.user_name}</strong> {act.description}: <em>{act.target_title}</em>
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {new Date(act.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {showCreateTaskModal && (
        <div className="modal-overlay" onClick={() => setShowCreateTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                Add Workspace Task
              </h2>
              <button onClick={() => setShowCreateTaskModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label className="form-label">Task Title *</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Fourier Transform Problem Set 4" 
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description / Instructions</label>
                <textarea 
                  className="input-field" 
                  placeholder="Details on what needs to be solved or verified..." 
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Assignee</label>
                  <select 
                    className="input-field"
                    value={taskAssigneeId}
                    onChange={(e) => setTaskAssigneeId(e.target.value)}
                  >
                    <option value="">Assign to Me ({user.name})</option>
                    {currentMembers.map((m) => (
                      <option key={m.id} value={m.user_id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select 
                    className="input-field"
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowCreateTaskModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVITE MEMBERS MODAL */}
      {showInviteModal && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                Invite Classmates
              </h2>
              <button onClick={() => setShowInviteModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
              Share this invite code with your peers so they can join <strong>{currentTeam.name}</strong> directly from their dashboard.
            </p>

            <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', fontWeight: 700 }}>
                Team Invite Code
              </span>
              <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '3px', color: 'var(--primary)', fontFamily: 'monospace', margin: '12px 0' }}>
                {currentTeam.join_code}
              </div>
              <button 
                onClick={copyInviteCode}
                className="btn-primary" 
                style={{ margin: '0 auto', fontSize: '14px', padding: '8px 18px' }}
              >
                {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                {copiedCode ? 'Code Copied to Clipboard!' : 'Copy Invite Code'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setShowInviteModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD FILE MODAL */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                Share Resource with Team
              </h2>
              <button onClick={() => setShowUploadModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit}>
              <div className="form-group">
                <label className="form-label">Resource Title *</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Fourier Transforms Formula Sheet" 
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  className="input-field"
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                >
                  <option value="documents">Document (PDF / DOCX)</option>
                  <option value="presentations">Presentation (PPTX)</option>
                  <option value="spreadsheets">Spreadsheet (XLSX)</option>
                  <option value="images">Diagram / Image</option>
                  <option value="links">External Link</option>
                </select>
              </div>

              {uploadCategory === 'links' ? (
                <div className="form-group">
                  <label className="form-label">URL *</label>
                  <input 
                    type="url" 
                    className="input-field" 
                    placeholder="https://..." 
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">File Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. formulas_2026.pdf" 
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Upload & Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
