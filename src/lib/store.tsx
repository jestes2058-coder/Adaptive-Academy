"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  UserProfile,
  SubjectItem,
  TaskItem,
  MilestoneItem,
  TeamItem,
  TeamMemberItem,
  DiscussionMessage,
  TeamActivityItem,
  ResourceItem,
  NotificationItem,
  WellbeingMood,
  BreakActivity,
  SupportResource,
  TeamCheckinItem,
  TeamCheckinStatus,
} from './database.types';
import {
  INITIAL_USER,
  INITIAL_SUBJECTS,
  INITIAL_TEAMS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_TASKS,
  INITIAL_MILESTONES,
  INITIAL_DISCUSSIONS,
  INITIAL_ACTIVITIES,
  INITIAL_RESOURCES,
  INITIAL_NOTIFICATIONS,
  INITIAL_BREAK_ACTIVITIES,
  INITIAL_SUPPORT_RESOURCES,
  INITIAL_TEAM_CHECKINS,
} from './mockData';
import {
  CreateTeamPayload,
  CreateTaskPayload,
  SendDiscussionPayload,
  UploadResourcePayload,
  UpdateProfilePayload,
  ProgressOverviewData,
} from './api';

interface AppContextType {
  user: UserProfile;
  updateUser: (data: UpdateProfilePayload) => void;
  subjects: SubjectItem[];
  tasks: TaskItem[];
  createTask: (payload: CreateTaskPayload) => TaskItem;
  updateTaskStatus: (taskId: string, status: TaskItem['status']) => void;
  deleteTask: (taskId: string) => void;
  milestones: MilestoneItem[];
  teams: TeamItem[];
  teamMembers: TeamMemberItem[];
  activeTeamId: string;
  setActiveTeamId: (teamId: string) => void;
  createTeam: (payload: CreateTeamPayload) => TeamItem;
  joinTeamByCode: (code: string) => { success: boolean; message: string; team?: TeamItem };
  joinDiscoverableTeam: (teamId: string) => { success: boolean; message: string };
  leaveTeam: (teamId: string) => void;
  removeTeamMember: (teamId: string, memberId: string) => void;
  discussions: DiscussionMessage[];
  sendDiscussionMessage: (payload: SendDiscussionPayload) => DiscussionMessage;
  activities: TeamActivityItem[];
  resources: ResourceItem[];
  uploadResource: (payload: UploadResourcePayload) => ResourceItem;
  deleteResource: (resourceId: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  progressOverview: ProgressOverviewData;
  wellbeingMood: WellbeingMood | null;
  setWellbeingMood: (mood: WellbeingMood) => void;
  teamCheckins: TeamCheckinItem[];
  setTeamCheckin: (teamId: string, status: TeamCheckinStatus, note?: string) => void;
  breakActivities: BreakActivity[];
  supportResources: SupportResource[];
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY_PREFIX = 'adaptive_app_state_v1_';

function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error loading ${key} from storage:`, err);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [subjects, setSubjects] = useState<SubjectItem[]>(INITIAL_SUBJECTS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [milestones, setMilestones] = useState<MilestoneItem[]>(INITIAL_MILESTONES);
  const [teams, setTeams] = useState<TeamItem[]>(INITIAL_TEAMS);
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>(INITIAL_TEAM_MEMBERS);
  const [activeTeamId, setActiveTeamId] = useState<string>('team_maths_survivors');
  const [discussions, setDiscussions] = useState<DiscussionMessage[]>(INITIAL_DISCUSSIONS);
  const [activities, setActivities] = useState<TeamActivityItem[]>(INITIAL_ACTIVITIES);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [wellbeingMood, setWellbeingMoodState] = useState<WellbeingMood | null>(null);
  const [teamCheckins, setTeamCheckins] = useState<TeamCheckinItem[]>(INITIAL_TEAM_CHECKINS);
  const [breakActivities] = useState<BreakActivity[]>(INITIAL_BREAK_ACTIVITIES);
  const [supportResources] = useState<SupportResource[]>(INITIAL_SUPPORT_RESOURCES);

  // Initialize from LocalStorage on mount
  useEffect(() => {
    setUser(getStoredItem('user', INITIAL_USER));
    setSubjects(getStoredItem('subjects', INITIAL_SUBJECTS));
    setTasks(getStoredItem('tasks', INITIAL_TASKS));
    setMilestones(getStoredItem('milestones', INITIAL_MILESTONES));
    setTeams(getStoredItem('teams', INITIAL_TEAMS));
    setTeamMembers(getStoredItem('team_members', INITIAL_TEAM_MEMBERS));
    setActiveTeamId(getStoredItem('active_team_id', 'team_maths_survivors'));
    setDiscussions(getStoredItem('discussions', INITIAL_DISCUSSIONS));
    setActivities(getStoredItem('activities', INITIAL_ACTIVITIES));
    setResources(getStoredItem('resources', INITIAL_RESOURCES));
    setNotifications(getStoredItem('notifications', INITIAL_NOTIFICATIONS));
    setWellbeingMoodState(getStoredItem('wellbeing_mood', null));
    setTeamCheckins(getStoredItem('team_checkins', INITIAL_TEAM_CHECKINS));
    setIsLoaded(true);
  }, []);

  // Sync back to LocalStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('user', user);
  }, [user, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('tasks', tasks);
  }, [tasks, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('milestones', milestones);
  }, [milestones, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('teams', teams);
  }, [teams, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('team_members', teamMembers);
  }, [teamMembers, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('active_team_id', activeTeamId);
  }, [activeTeamId, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('discussions', discussions);
  }, [discussions, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('activities', activities);
  }, [activities, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('resources', resources);
  }, [resources, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    setStoredItem('notifications', notifications);
  }, [notifications, isLoaded]);

  // Actions
  const updateUser = (data: UpdateProfilePayload) => {
    setUser((prev) => ({
      ...prev,
      ...data,
      skills: data.skills || prev.skills,
      interests: data.interests || prev.interests,
      updated_at: new Date().toISOString(),
    }));
  };

  const createTask = (payload: CreateTaskPayload): TaskItem => {
    const newTask: TaskItem = {
      id: `task_${Date.now()}`,
      user_id: user.id,
      team_id: payload.teamId || null,
      subject_id: null,
      subject_name: payload.subjectName || 'General',
      title: payload.title,
      description: payload.description || '',
      status: 'todo',
      priority: payload.priority || 'medium',
      due_date: payload.dueDate || new Date(Date.now() + 86400000 * 2).toISOString(),
      estimated_minutes: payload.estimatedMinutes || 30,
      assignee_id: payload.assigneeId || user.id,
      assignee_name: payload.assigneeName || user.name,
      assignee_avatar: user.avatar_url,
      completed_at: null,
      created_at: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);

    // Log activity if assigned to team
    if (payload.teamId) {
      const newActivity: TeamActivityItem = {
        id: `act_${Date.now()}`,
        team_id: payload.teamId,
        user_name: user.name,
        user_avatar: user.avatar_url,
        action_type: 'task_created',
        description: 'created a new task',
        target_title: payload.title,
        created_at: new Date().toISOString(),
      };
      setActivities((prev) => [newActivity, ...prev]);
    }

    return newTask;
  };

  const updateTaskStatus = (taskId: string, status: TaskItem['status']) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const isDone = status === 'done';
          const updated = {
            ...t,
            status,
            completed_at: isDone ? new Date().toISOString() : null,
          };

          // If completed, log activity
          if (isDone && t.team_id) {
            const newActivity: TeamActivityItem = {
              id: `act_${Date.now()}`,
              team_id: t.team_id,
              user_name: user.name,
              user_avatar: user.avatar_url,
              action_type: 'task_completed',
              description: 'completed task',
              target_title: t.title,
              created_at: new Date().toISOString(),
            };
            setActivities((acts) => [newActivity, ...acts]);
          }

          return updated;
        }
        return t;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const createTeam = (payload: CreateTeamPayload): TeamItem => {
    const randomCode = `${payload.name.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, 'TEAM')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTeamId = `team_${Date.now()}`;
    const newTeam: TeamItem = {
      id: newTeamId,
      name: payload.name,
      description: payload.description,
      goal: payload.goal,
      project_topic: payload.projectTopic || payload.name,
      category: payload.category || 'Academic Study',
      join_code: randomCode,
      visibility: payload.visibility,
      owner_id: user.id,
      owner_name: user.name,
      max_members: payload.maxMembers || 6,
      member_count: 1,
      progress_pct: 0,
      status: 'active',
      tags: payload.tags.length > 0 ? payload.tags : ['Collaboration', 'Study Group'],
      created_at: new Date().toISOString(),
    };

    const ownerMember: TeamMemberItem = {
      id: `tm_${Date.now()}`,
      team_id: newTeamId,
      user_id: user.id,
      name: `${user.name} (You)`,
      email: user.email,
      role: 'owner',
      avatar_url: user.avatar_url,
      status: 'active',
      joined_at: new Date().toISOString(),
      confidence_topics: [
        { topic: 'Team Lead', score: 5 },
        { topic: user.skills[0] || 'Core Subject', score: 4 },
      ],
    };

    const newActivity: TeamActivityItem = {
      id: `act_${Date.now()}`,
      team_id: newTeamId,
      user_name: user.name,
      user_avatar: user.avatar_url,
      action_type: 'member_joined',
      description: 'created and initialized the team workspace',
      target_title: newTeam.name,
      created_at: new Date().toISOString(),
    };

    setTeams((prev) => [newTeam, ...prev]);
    setTeamMembers((prev) => [ownerMember, ...prev]);
    setActivities((prev) => [newActivity, ...prev]);
    setActiveTeamId(newTeamId);

    return newTeam;
  };

  const joinTeamByCode = (code: string): { success: boolean; message: string; team?: TeamItem } => {
    const trimmed = code.trim().toUpperCase();
    const team = teams.find((t) => t.join_code.toUpperCase() === trimmed);
    if (!team) {
      return { success: false, message: 'Invalid team invite code. Please check and try again.' };
    }

    const alreadyMember = teamMembers.some((m) => m.team_id === team.id && m.user_id === user.id);
    if (alreadyMember) {
      setActiveTeamId(team.id);
      return { success: true, message: `You are already a member of ${team.name}!`, team };
    }

    if (team.member_count >= team.max_members) {
      return { success: false, message: 'This team has reached its maximum member capacity.' };
    }

    const newMember: TeamMemberItem = {
      id: `tm_${Date.now()}`,
      team_id: team.id,
      user_id: user.id,
      name: `${user.name} (You)`,
      email: user.email,
      role: 'member',
      avatar_url: user.avatar_url,
      status: 'active',
      joined_at: new Date().toISOString(),
      confidence_topics: [
        { topic: user.skills[0] || 'Peer Contributor', score: 4 },
      ],
    };

    setTeams((prev) =>
      prev.map((t) => (t.id === team.id ? { ...t, member_count: t.member_count + 1 } : t))
    );
    setTeamMembers((prev) => [...prev, newMember]);
    setActiveTeamId(team.id);

    const newActivity: TeamActivityItem = {
      id: `act_${Date.now()}`,
      team_id: team.id,
      user_name: user.name,
      user_avatar: user.avatar_url,
      action_type: 'member_joined',
      description: 'joined the team via code',
      target_title: team.name,
      created_at: new Date().toISOString(),
    };
    setActivities((prev) => [newActivity, ...prev]);

    return { success: true, message: `Successfully joined ${team.name}!`, team };
  };

  const joinDiscoverableTeam = (teamId: string): { success: boolean; message: string } => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) {
      return { success: false, message: 'Team not found.' };
    }

    const alreadyMember = teamMembers.some((m) => m.team_id === team.id && m.user_id === user.id);
    if (alreadyMember) {
      setActiveTeamId(team.id);
      return { success: true, message: `You are already a member of ${team.name}!` };
    }

    if (team.member_count >= team.max_members) {
      return { success: false, message: 'This team is currently full.' };
    }

    const newMember: TeamMemberItem = {
      id: `tm_${Date.now()}`,
      team_id: team.id,
      user_id: user.id,
      name: `${user.name} (You)`,
      email: user.email,
      role: 'member',
      avatar_url: user.avatar_url,
      status: 'active',
      joined_at: new Date().toISOString(),
      confidence_topics: [
        { topic: user.skills[0] || 'Contributor', score: 4 },
      ],
    };

    setTeams((prev) =>
      prev.map((t) => (t.id === team.id ? { ...t, member_count: t.member_count + 1 } : t))
    );
    setTeamMembers((prev) => [...prev, newMember]);
    setActiveTeamId(team.id);

    const newActivity: TeamActivityItem = {
      id: `act_${Date.now()}`,
      team_id: team.id,
      user_name: user.name,
      user_avatar: user.avatar_url,
      action_type: 'member_joined',
      description: 'joined the team',
      target_title: team.name,
      created_at: new Date().toISOString(),
    };
    setActivities((prev) => [newActivity, ...prev]);

    return { success: true, message: `Successfully joined ${team.name}!` };
  };

  const leaveTeam = (teamId: string) => {
    setTeamMembers((prev) => prev.filter((m) => !(m.team_id === teamId && m.user_id === user.id)));
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, member_count: Math.max(1, t.member_count - 1) } : t))
    );
    const remainingTeams = teams.filter((t) => t.id !== teamId);
    if (remainingTeams.length > 0) {
      setActiveTeamId(remainingTeams[0].id);
    }
  };

  const removeTeamMember = (teamId: string, memberId: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, member_count: Math.max(1, t.member_count - 1) } : t))
    );
  };

  const sendDiscussionMessage = (payload: SendDiscussionPayload): DiscussionMessage => {
    const newMessage: DiscussionMessage = {
      id: `disc_${Date.now()}`,
      team_id: payload.teamId,
      user_id: user.id,
      user_name: `${user.name} (You)`,
      user_avatar: user.avatar_url,
      content: payload.content,
      created_at: new Date().toISOString(),
      attachments: payload.attachments || null,
    };

    setDiscussions((prev) => [...prev, newMessage]);

    const newActivity: TeamActivityItem = {
      id: `act_${Date.now()}`,
      team_id: payload.teamId,
      user_name: user.name,
      user_avatar: user.avatar_url,
      action_type: 'discussion_posted',
      description: 'posted a message in discussion',
      target_title: payload.content.slice(0, 30) + '...',
      created_at: new Date().toISOString(),
    };
    setActivities((prev) => [newActivity, ...prev]);

    return newMessage;
  };

  const uploadResource = (payload: UploadResourcePayload): ResourceItem => {
    const newResource: ResourceItem = {
      id: `res_${Date.now()}`,
      title: payload.title,
      file_name: payload.fileName,
      file_type: payload.fileType,
      file_size_bytes: payload.fileSizeBytes,
      file_size_formatted:
        payload.fileSizeBytes > 1000000
          ? `${(payload.fileSizeBytes / 1000000).toFixed(1)} MB`
          : payload.fileSizeBytes > 0
          ? `${Math.round(payload.fileSizeBytes / 1000)} KB`
          : 'External Link',
      storage_path: `resources/${payload.category}/${payload.fileName}`,
      url: payload.url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploader_id: user.id,
      uploader_name: user.name,
      team_id: payload.teamId || null,
      team_name: payload.teamId ? teams.find((t) => t.id === payload.teamId)?.name || 'Team' : null,
      folder: payload.folder || 'General',
      category: payload.category,
      is_shared: !!payload.teamId,
      created_at: new Date().toISOString(),
    };

    setResources((prev) => [newResource, ...prev]);

    if (payload.teamId) {
      const newActivity: TeamActivityItem = {
        id: `act_${Date.now()}`,
        team_id: payload.teamId,
        user_name: user.name,
        user_avatar: user.avatar_url,
        action_type: 'resource_uploaded',
        description: 'uploaded a resource',
        target_title: payload.title,
        created_at: new Date().toISOString(),
      };
      setActivities((prev) => [newActivity, ...prev]);
    }

    return newResource;
  };

  const deleteResource = (resourceId: string) => {
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  // Compute connected Progress data from actual tasks & milestones
  const progressOverview = useMemo<ProgressOverviewData>(() => {
    const totalTasksCount = tasks.length;
    const completedTasksCount = tasks.filter((t) => t.status === 'done').length;
    const activeTasksCount = tasks.filter((t) => t.status === 'in_progress' || t.status === 'review').length;
    const overallProgressPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

    // Upcoming deadlines: tasks not done due in next 7 days
    const now = new Date().getTime();
    const next7Days = now + 7 * 24 * 60 * 60 * 1000;
    const upcomingDeadlinesCount = tasks.filter((t) => {
      if (t.status === 'done') return false;
      const due = new Date(t.due_date).getTime();
      return due >= now && due <= next7Days;
    }).length;

    // Subject breakdown
    const subjectMap: Record<string, { total: number; done: number; category: string }> = {};
    subjects.forEach((s) => {
      subjectMap[s.name] = { total: 0, done: 0, category: s.category };
    });

    tasks.forEach((t) => {
      const sName = t.subject_name || 'Other';
      if (!subjectMap[sName]) {
        subjectMap[sName] = { total: 0, done: 0, category: 'General' };
      }
      subjectMap[sName].total += 1;
      if (t.status === 'done') {
        subjectMap[sName].done += 1;
      }
    });

    const subjectBreakdown = Object.entries(subjectMap).map(([name, data]) => {
      const pct = data.total > 0 ? Math.round((data.done / data.total) * 100) : 75;
      return {
        subjectId: name,
        subjectName: name,
        progressPercentage: pct,
        category: data.category,
        status: pct >= 80 ? 'Mastered' : pct >= 50 ? 'In Progress' : 'Needs Focus',
      };
    });

    // Recent activities compiled from tasks and activities
    const recentActivities: ProgressOverviewData['recentActivities'] = [
      ...tasks
        .filter((t) => t.completed_at)
        .map((t) => ({
          id: `prog_act_${t.id}`,
          type: 'task_completed' as const,
          title: `Completed: ${t.title}`,
          description: `${t.subject_name} • Marked finished`,
          timestamp: t.completed_at || t.created_at,
          subjectName: t.subject_name,
        })),
      {
        id: 'streak_1',
        type: 'streak_milestone' as const,
        title: '5-Day Study Streak Active',
        description: 'Consistent daily problem solving goal achieved.',
        timestamp: new Date().toISOString(),
      },
    ].slice(0, 6);

    return {
      overallProgressPercentage,
      completedTasksCount,
      totalTasksCount,
      activeTasksCount,
      upcomingDeadlinesCount,
      currentStreakDays: user.streak_days,
      deepStudyTimeHours: 14,
      deepStudyTimeMinutes: 30,
      subjectBreakdown,
      milestones,
      recentActivities,
    };
  }, [tasks, subjects, milestones, user.streak_days]);

  const setWellbeingMood = (mood: WellbeingMood) => {
    setWellbeingMoodState(mood);
    setStoredItem('wellbeing_mood', mood);
  };

  const setTeamCheckin = (teamId: string, status: TeamCheckinStatus, note?: string) => {
    const newCheckin: TeamCheckinItem = {
      id: `tc_${Date.now()}`,
      team_id: teamId,
      user_id: user.id,
      user_name: user.name,
      status,
      note,
      created_at: new Date().toISOString(),
    };

    setTeamCheckins((prev) => [newCheckin, ...prev.filter(c => !(c.team_id === teamId && c.user_id === user.id))]);

    // Also log to team activities so teammates see the status
    const statusLabels: Record<TeamCheckinStatus, string> = {
      making_progress: 'is making steady progress on assigned tasks',
      need_help: 'requested peer support / guidance on an assignment',
      taking_break: 'stepped away for a short study break',
      almost_finished: 'is wrapping up final deliverable checks',
    };

    const newActivity: TeamActivityItem = {
      id: `act_${Date.now()}`,
      team_id: teamId,
      user_name: user.name,
      user_avatar: user.avatar_url,
      action_type: 'discussion_posted',
      description: 'updated status',
      target_title: statusLabels[status],
      created_at: new Date().toISOString(),
    };

    setActivities((prev) => [newActivity, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        subjects,
        tasks,
        createTask,
        updateTaskStatus,
        deleteTask,
        milestones,
        teams,
        teamMembers,
        activeTeamId,
        setActiveTeamId,
        createTeam,
        joinTeamByCode,
        joinDiscoverableTeam,
        leaveTeam,
        removeTeamMember,
        discussions,
        sendDiscussionMessage,
        activities,
        resources,
        uploadResource,
        deleteResource,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        progressOverview,
        wellbeingMood,
        setWellbeingMood,
        teamCheckins,
        setTeamCheckin,
        breakActivities,
        supportResources,
        isLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
