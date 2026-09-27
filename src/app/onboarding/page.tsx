export default function Onboarding() {
  return (
    <div style={{ maxWidth: '600px', margin: '48px auto' }}>
      <h1 className="font-heading" style={{ fontSize: '2.5rem', marginBottom: '12px', textAlign: 'center' }}>Welcome to Adaptive</h1>
      <p className="font-body" style={{ color: 'var(--text-secondary)', marginBottom: '40px', textAlign: 'center' }}>
        Let's set up your academic profile so we can personalize your study plans.
      </p>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>1. Basic Information</h2>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">First Name</label>
            <input type="text" className="input-field" placeholder="Sahil" />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Last Name</label>
            <input type="text" className="input-field" placeholder="Doe" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Timezone</label>
          <select className="input-field">
            <option>Asia/Kolkata (IST)</option>
            <option>America/New_York (EST)</option>
            <option>Europe/London (GMT)</option>
          </select>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h2 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>2. Current Workload</h2>
        <p className="font-body" style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          How manageable is your workload right now?
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" style={{ flex: 1 }}>Comfortable</button>
          <button className="btn-primary" style={{ flex: 1 }}>Manageable</button>
          <button className="btn-secondary" style={{ flex: 1 }}>Heavy</button>
          <button className="btn-secondary" style={{ flex: 1, borderColor: 'var(--accent-warning)', color: 'var(--accent-warning)' }}>Overloaded</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a href="/dashboard" className="btn-primary" style={{ textDecoration: 'none' }}>Complete Profile</a>
      </div>
    </div>
  );
}
