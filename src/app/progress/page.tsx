import { Target, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export default function Progress() {
  return (
    <div style={{ maxWidth: '900px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Progress Tracking</h1>
        <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Focus on meaningful milestones, not decorative metrics.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <CheckCircle size={18} /> Tasks Completed
          </div>
          <div className="font-heading" style={{ fontSize: '2rem', color: 'var(--primary)' }}>24</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>This week</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <Clock size={18} /> Deep Study Time
          </div>
          <div className="font-heading" style={{ fontSize: '2rem', color: 'var(--primary)' }}>12h 45m</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>This week</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <Target size={18} /> Upcoming Deadlines
          </div>
          <div className="font-heading" style={{ fontSize: '2rem', color: 'var(--accent-warning)' }}>3</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>In the next 7 days</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="card">
          <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Subject Mastery</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Applied Physics</span>
                <span style={{ color: 'var(--accent-success)' }}>80% Mastery</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '80%', height: '100%', background: 'var(--accent-success)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Engineering Mathematics</span>
                <span style={{ color: 'var(--accent-warning)' }}>40% Mastery</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '40%', height: '100%', background: 'var(--accent-warning)' }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Computer Architecture</span>
                <span style={{ color: 'var(--primary)' }}>60% Mastery</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: 'var(--primary)' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Recent Milestones</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <TrendingUp size={18} color="var(--primary)" style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Thermodynamics Completed</p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>You bumped your confidence to 4/5.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <TrendingUp size={18} color="var(--primary)" style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Consistency Streak</p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Hit your daily study goal 3 days in a row.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
