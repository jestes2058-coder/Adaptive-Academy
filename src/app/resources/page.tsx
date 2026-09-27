import { UploadCloud, FileText, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export default function Resources() {
  return (
    <div style={{ maxWidth: '900px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Shared Resources</h1>
        <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Files, links, and notes shared by your team members.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        
        {/* Upload/Add Resource */}
        <div className="card" style={{ padding: '32px' }}>
          <h2 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Add Resource</h2>
          
          <div style={{ 
            border: '2px dashed var(--border-light)', 
            borderRadius: 'var(--radius-md)', 
            padding: '32px 16px', 
            textAlign: 'center',
            marginBottom: '24px',
            cursor: 'pointer',
            background: 'var(--bg-main)'
          }}>
            <UploadCloud size={32} color="var(--primary)" style={{ marginBottom: '12px' }} />
            <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Click to upload file</p>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>PDF, DOCX, or Images</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>OR Add Link</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <input type="url" className="input-field" placeholder="https://..." />
          </div>
          <button className="btn-primary" style={{ width: '100%' }}>Save Link</button>
        </div>

        {/* Resource List */}
        <div className="card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="font-heading" style={{ fontSize: '1.25rem' }}>Team Library</h2>
            <select className="input-field" style={{ width: 'auto', padding: '8px 12px', fontSize: '14px' }}>
              <option>All Teams</option>
              <option>Maths Survivors</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(43, 58, 74, 0.05)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <FileText size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>Integration Formula Sheet.pdf</h4>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span>Added by Arun</span>
                  <span>Maths Survivors</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(82, 121, 111, 0.1)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-success)' }}>
                <LinkIcon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>YouTube: MIT OpenCourseWare PDEs</h4>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span>Added by Neha</span>
                  <span>Maths Survivors</span>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
