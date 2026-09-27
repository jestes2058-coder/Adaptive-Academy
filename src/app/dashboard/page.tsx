import { CheckCircle2, PlayCircle, Brain, Clock, ChevronRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div style={{ maxWidth: '1000px' }}>
      <header style={{ marginBottom: '48px' }}>
        <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Good evening, Sahil.</h1>
        <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>You have 2 hours of available study time tonight.</p>
      </header>

      {/* Hero Task (Next Step) */}
      <div className="card" style={{ marginBottom: '40px', background: 'var(--primary)', color: 'white', border: 'none' }}>
        <p style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px', color: '#94A3B8', fontWeight: 600 }}>Your Next Step</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="font-heading" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '8px' }}>Integration Basics</h2>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#CBD5E1' }}>
                <Clock size={16} /> 25 minutes
              </span>
              <span className="tag-warning" style={{ background: 'rgba(255,255,255,0.1)', color: '#FDBA74' }}>Due Soon + Knowledge Gap</span>
            </div>
          </div>
          <button style={{ 
            background: 'white', 
            color: 'var(--primary)', 
            border: 'none', 
            borderRadius: '50px', 
            padding: '16px 32px', 
            fontSize: '18px', 
            fontWeight: 700, 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <PlayCircle size={24} /> Start Session
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Today's Schedule */}
        <div>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Today's Plan</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', opacity: 0.6 }}>
              <CheckCircle2 color="var(--accent-success)" />
              <div style={{ flex: 1 }}>
                <h4 style={{ textDecoration: 'line-through' }}>Physics Lab Record</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Completed at 4:30 PM</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '2px solid var(--primary)', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%' }}></div>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600 }}>Integration Basics</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Mathematics • 25m</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--border-light)' }}></div>
              <div style={{ flex: 1 }}>
                <h4>Maths Practice Questions</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Mathematics • 30m</p>
              </div>
            </div>
            
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--border-light)' }}></div>
              <div style={{ flex: 1 }}>
                <h4>Finalize Presentation</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Team: Maths Survivors • 20m</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workload Check */}
        <div>
          <div className="card" style={{ padding: '24px' }}>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Workload Awareness</h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Brain color="var(--accent-warning)" />
              <div>
                <p className="font-body" style={{ fontWeight: 600, color: 'var(--accent-warning)', marginBottom: '4px' }}>Overload Detected</p>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>You have 4h 20m of planned work, but only 2h available tonight.</p>
                <button className="btn-secondary" style={{ width: '100%', padding: '8px', fontSize: '14px' }}>Rebalance Plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
