export default function Login() {
  return (
    <div style={{ maxWidth: '400px', margin: '64px auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Adaptive.</h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Welcome back to your academic companion.</p>
        </div>

        <form>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="input-field" placeholder="student@university.edu" />
          </div>
          
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <a href="#" style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none' }}>Forgot?</a>
            </div>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>

          <button type="button" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>Sign In</button>
          
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Don't have an account? <a href="/onboarding" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
