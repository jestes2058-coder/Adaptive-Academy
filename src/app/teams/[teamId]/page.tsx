"use client";

import React, { use } from 'react';
import { TeamWorkspaceView } from '@/components/TeamWorkspaceView';

export default function TeamWorkspaceDynamicPage({ params }: { params: Promise<{ teamId: string }> }) {
  const resolvedParams = use(params);
  return <TeamWorkspaceView initialTeamId={resolvedParams.teamId} />;
}
