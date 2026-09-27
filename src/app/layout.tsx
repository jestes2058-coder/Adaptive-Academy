import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  variable: "--font-source-sans"
});

export const metadata: Metadata = {
  title: "Adaptive Academic Companion",
  description: "Your personalized study plan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable}`}>
        <div className="app-layout">
          {/* Sidebar Navigation */}
          <aside className="sidebar">
            <div style={{ marginBottom: '32px', marginTop: '16px' }}>
              <h1 className="font-brand" style={{ fontSize: '28px', color: 'var(--primary)', letterSpacing: '-0.5px' }}>Adaptive.</h1>
              <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Academic Companion</p>
            </div>
            
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/dashboard" className="nav-item">Dashboard</Link>
              <Link href="/subjects" className="nav-item">Subject Management</Link>
              <Link href="/planner" className="nav-item">Study Plan (Brain Dump)</Link>
              <Link href="/progress" className="nav-item">Progress Tracking</Link>
              <div style={{ margin: '16px 0', borderTop: '1px solid var(--border-light)' }}></div>
              <Link href="/team-workspace" className="nav-item">Team Workspace</Link>
              <Link href="/resources" className="nav-item">Resources</Link>
              <div style={{ margin: '16px 0', borderTop: '1px solid var(--border-light)' }}></div>
              <Link href="/profile" className="nav-item">Profile</Link>
              <Link href="/login" className="nav-item" style={{ marginTop: 'auto' }}>Logout</Link>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
