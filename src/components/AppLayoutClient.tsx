"use client";

import React from "react";
import { AppProvider } from "@/lib/store";
import { Sidebar } from "@/components/Sidebar";

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </AppProvider>
  );
}
