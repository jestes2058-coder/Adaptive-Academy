import { Users, Lightbulb, Link as LinkIcon, Download } from 'lucide-react';
import Link from 'next/link';

export default function TeamWorkspace() {
  return (
    <div style={{ maxWidth: '1000px' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Maths Survivors</h1>
            <span className="tag-success">3 Members</span>
          </div>
          <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Shared Goal: Mathematics Internal (October 3)</p>
        </div>
        <Link href="/team-join" className="btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={16} /> Switch Teams
        </Link>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Knowledge Map */}
          <div className="card">
            <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Team Knowledge Map</h2>
            
            {/* Topic 1 */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Integration</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Arun</span><span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>4/5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Neha (You)</span><span style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>2/5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Rahul</span><span style={{ color: 'var(--primary)', fontWeight: 600 }}>3/5</span>
                </div>
              </div>
            </div>

            {/* Topic 2 */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Differential Equations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Arun</span><span style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>2/5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Neha (You)</span><span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>5/5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Rahul</span><span style={{ color: 'var(--primary)', fontWeight: 600 }}>3/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Peer Learning Recommendations */}
          <div className="card" style={{ background: 'rgba(82, 121, 111, 0.05)', borderColor: 'rgba(82, 121, 111, 0.2)' }}>
            <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-success)' }}>
              <Lightbulb size={20} /> Peer Learning Opportunity
            </h2>
            <p className="font-body" style={{ color: 'var(--text-primary)', marginBottom: '16px', lineHeight: '1.5' }}>
              <strong>Arun</strong> is strong in Integration, while you are struggling. 
              Conversely, you are strong in Differential Equations, which Arun needs help with.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" style={{ background: 'var(--accent-success)' }}>Propose Exchange Session</button>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Shared Plan */}
          <div className="card">
            <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Shared Team Plan</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Monday</span>
                <p style={{ fontWeight: 600, marginTop: '4px' }}>Group Session: Integration</p>
              </div>
              <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Thursday</span>
                <p style={{ fontWeight: 600, marginTop: '4px' }}>Mock Test Discussion</p>
              </div>
            </div>
          </div>

          {/* Quick Resources */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="font-heading" style={{ fontSize: '1.25rem' }}>Resources</h2>
              <Link href="/resources" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View All</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
                  <LinkIcon size={14} color="var(--text-secondary)" /> Integration Formula Sheet
                </div>
                <Download size={14} color="var(--primary)" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
