import { Users, UserPlus, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function TeamJoin() {
  return (
    <div style={{ maxWidth: '800px', margin: '48px auto' }}>
      <header style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Collaboration</h1>
        <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Peer learning is powerful. Join a squad or start your own.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Join Team */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(43, 58, 74, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'var(--primary)' }}>
            <UserPlus size={32} />
          </div>
          <h2 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Join a Team</h2>
          <p className="font-body" style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>
            Have an invite code from your classmates? Enter it here to sync up.
          </p>
          
          <div className="form-group" style={{ width: '100%', marginBottom: '24px' }}>
            <input type="text" className="input-field" placeholder="Enter Invite Code" style={{ textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <button className="btn-secondary" style={{ flex: 1, padding: '12px 0' }}><QrCode size={18} /></button>
            <Link href="/team-workspace" className="btn-primary" style={{ flex: 3, textAlign: 'center', textDecoration: 'none' }}>Join</Link>
          </div>
        </div>

        {/* Create Team */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(82, 121, 111, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'var(--accent-success)' }}>
            <Users size={32} />
          </div>
          <h2 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Create a Team</h2>
          <p className="font-body" style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>
            Set a shared academic goal and invite friends to tackle it together.
          </p>
          
          <div className="form-group" style={{ width: '100%', textAlign: 'left' }}>
            <label className="form-label">Team Name</label>
            <input type="text" className="input-field" placeholder="E.g. Maths Survivors" />
          </div>
          
          <button className="btn-primary" style={{ width: '100%', marginTop: 'auto' }}>Create Team</button>
        </div>

      </div>
    </div>
  );
}
