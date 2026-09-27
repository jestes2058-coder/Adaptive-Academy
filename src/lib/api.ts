/**
 * Generated OpenAPI & API Client Types for Adaptive Companion
 * Synchronized with Database Schema
 */

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
  Database
} from './database.types';

export type ApiResponse<T> = {
  data: T | null;
  error: { message: string; code?: string } | null;
  status: number;
};

export type ProgressOverviewData = {
  overallProgressPercentage: number;
  completedTasksCount: number;
  totalTasksCount: number;
  activeTasksCount: number;
  upcomingDeadlinesCount: number;
  currentStreakDays: number;
  deepStudyTimeHours: number;
  deepStudyTimeMinutes: number;
  subjectBreakdown: {
    subjectId: string;
    subjectName: string;
    progressPercentage: number;
    category: string;
    status: string;
  }[];
  milestones: MilestoneItem[];
  recentActivities: {
    id: string;
    type: 'task_completed' | 'task_started' | 'deadline_approaching' | 'streak_milestone' | 'team_achievement';
    title: string;
    description: string;
    timestamp: string;
    subjectName?: string;
  }[];
};

export type CreateTeamPayload = {
  name: string;
  description: string;
  goal: string;
  projectTopic?: string;
  category?: string;
  maxMembers: number;
  visibility: 'private' | 'invite_only' | 'discoverable';
  tags: string[];
};

export type JoinTeamPayload = {
  joinCode?: string;
  teamId?: string;
};

export type CreateTaskPayload = {
  teamId?: string | null;
  subjectName: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  estimatedMinutes?: number;
  assigneeId?: string | null;
  assigneeName?: string | null;
};

export type UpdateTaskStatusPayload = {
  taskId: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
};

export type SendDiscussionPayload = {
  teamId: string;
  content: string;
  attachments?: { name: string; url: string; size: string; type: string }[];
};

export type UploadResourcePayload = {
  title: string;
  fileName: string;
  fileType: ResourceItem['file_type'];
  fileSizeBytes: number;
  category: ResourceItem['category'];
  teamId?: string | null;
  folder?: string;
  url?: string;
};

export type UpdateProfilePayload = {
  name?: string;
  bio?: string;
  institution?: string;
  course?: string;
  academicYear?: string;
  location?: string;
  timezone?: string;
  skills?: string[];
  interests?: string[];
  avatarUrl?: string;
};

export interface ApiClient {
  progress: {
    getOverview(): Promise<ApiResponse<ProgressOverviewData>>;
  };
  teams: {
    list(filter?: { discoverableOnly?: boolean }): Promise<ApiResponse<TeamItem[]>>;
    getById(teamId: string): Promise<ApiResponse<TeamItem & { members: TeamMemberItem[]; tasks: TaskItem[]; discussions: DiscussionMessage[]; activities: TeamActivityItem[] }>>;
    create(payload: CreateTeamPayload): Promise<ApiResponse<TeamItem>>;
    join(payload: JoinTeamPayload): Promise<ApiResponse<TeamMemberItem>>;
    leave(teamId: string): Promise<ApiResponse<{ success: boolean }>>;
    removeMember(teamId: string, memberId: string): Promise<ApiResponse<{ success: boolean }>>;
  };
  tasks: {
    list(teamId?: string): Promise<ApiResponse<TaskItem[]>>;
    create(payload: CreateTaskPayload): Promise<ApiResponse<TaskItem>>;
    updateStatus(payload: UpdateTaskStatusPayload): Promise<ApiResponse<TaskItem>>;
    delete(taskId: string): Promise<ApiResponse<{ success: boolean }>>;
  };
  discussions: {
    list(teamId: string): Promise<ApiResponse<DiscussionMessage[]>>;
    send(payload: SendDiscussionPayload): Promise<ApiResponse<DiscussionMessage>>;
  };
  resources: {
    list(params?: { teamId?: string | null; category?: string; search?: string }): Promise<ApiResponse<ResourceItem[]>>;
    upload(payload: UploadResourcePayload): Promise<ApiResponse<ResourceItem>>;
    delete(resourceId: string): Promise<ApiResponse<{ success: boolean }>>;
  };
  profile: {
    get(): Promise<ApiResponse<UserProfile>>;
    update(payload: UpdateProfilePayload): Promise<ApiResponse<UserProfile>>;
  };
  notifications: {
    list(): Promise<ApiResponse<NotificationItem[]>>;
    markAsRead(notificationId: string): Promise<ApiResponse<{ success: boolean }>>;
    markAllAsRead(): Promise<ApiResponse<{ success: boolean }>>;
  };
}
