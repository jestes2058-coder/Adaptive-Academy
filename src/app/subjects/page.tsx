import { BookOpen, AlertCircle } from "lucide-react";

export default function Subjects() {
  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Subjects & Knowledge</h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Map your academic landscape so we can plan effectively.</p>
        </div>
        <button className="btn-primary">Add Subject</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Subject Card 1 */}
        <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(43, 58, 74, 0.05)', borderRadius: 'var(--radius-sm)', color: 'var(--primary)' }}>
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Engineering Mathematics</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Current Topic: Fourier Series</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Confidence:</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2].map(i => <div key={i} style={{ width: '20px', height: '6px', background: 'var(--accent-warning)', borderRadius: '2px' }}></div>)}
                  {[3, 4, 5].map(i => <div key={i} style={{ width: '20px', height: '6px', background: 'var(--border-light)', borderRadius: '2px' }}></div>)}
                </div>
                <span style={{ fontSize: '13px', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={14} /> 2/5 (Basic)
                </span>
              </div>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>Edit</button>
        </div>

        {/* Subject Card 2 */}
        <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(43, 58, 74, 0.05)', borderRadius: 'var(--radius-sm)', color: 'var(--primary)' }}>
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Applied Physics</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Current Topic: Thermodynamics</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Confidence:</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4].map(i => <div key={i} style={{ width: '20px', height: '6px', background: 'var(--accent-success)', borderRadius: '2px' }}></div>)}
                  {[5].map(i => <div key={i} style={{ width: '20px', height: '6px', background: 'var(--border-light)', borderRadius: '2px' }}></div>)}
                </div>
                <span style={{ fontSize: '13px', color: 'var(--accent-success)' }}>4/5 (Confident)</span>
              </div>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>Edit</button>
        </div>

      </div>
    </div>
  );
}
