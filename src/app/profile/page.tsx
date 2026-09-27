import { User, Settings, Bell, Shield } from 'lucide-react';

export default function Profile() {
  return (
    <div style={{ maxWidth: '800px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Profile Settings</h1>
        <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Manage your personal details and app preferences.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '48px' }}>
        
        {/* Settings Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="nav-item active" style={{ background: 'var(--bg-elevated)', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
            <User size={16} /> Personal Info
          </button>
          <button className="nav-item" style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
            <Settings size={16} /> Preferences
          </button>
          <button className="nav-item" style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
            <Bell size={16} /> Notifications
          </button>
          <button className="nav-item" style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
            <Shield size={16} /> Privacy
          </button>
        </div>

        {/* Settings Content */}
        <div className="card" style={{ padding: '40px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 600 }}>
              S
            </div>
            <div>
              <h2 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Sahil Doe</h2>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>Change Avatar</button>
            </div>
          </div>

          <form>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">First Name</label>
                <input type="text" className="input-field" defaultValue="Sahil" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Last Name</label>
                <input type="text" className="input-field" defaultValue="Doe" />
              </div>
            </div>
            
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Email Address</label>
              <input type="email" className="input-field" defaultValue="sahil@university.edu" disabled style={{ background: 'var(--bg-main)', color: 'var(--text-secondary)' }} />
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Contact support to change your email address.</p>
            </div>

            <div className="form-group" style={{ marginBottom: '32px' }}>
              <label className="form-label">Timezone</label>
              <select className="input-field" defaultValue="Asia/Kolkata (IST)">
                <option>Asia/Kolkata (IST)</option>
                <option>America/New_York (EST)</option>
                <option>Europe/London (GMT)</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button type="button" className="btn-secondary">Discard Changes</button>
              <button type="button" className="btn-primary">Save Profile</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
