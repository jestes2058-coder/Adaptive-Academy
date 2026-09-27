"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={28} />
      </div>
      <h3 className="font-heading" style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--primary)' }}>
        {title}
      </h3>
      <p className="font-body" style={{ color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: actionLabel ? '24px' : '0', fontSize: '15px', lineHeight: '1.5' }}>
        {description}
      </p>
      {actionLabel && (
        actionHref ? (
          <a href={actionHref} className="btn-primary">
            {actionLabel}
          </a>
        ) : (
          <button onClick={onAction} className="btn-primary">
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
