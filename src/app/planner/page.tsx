"use client";

import { useState } from 'react';
import { Sparkles, Calendar, Book, Users, Loader2, CheckCircle2 } from 'lucide-react';

export default function Planner() {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);
  const [dumpText, setDumpText] = useState("I have a maths exam Friday, haven't understood integration, physics record tomorrow and I have to finish our presentation with Arun and Neha.");

  const handleExtract = () => {
    if (!dumpText.trim()) return;
    setIsExtracting(true);
    setExtracted(false);
    
    // Simulate AI extraction delay for the demo
    setTimeout(() => {
      setIsExtracting(false);
      setExtracted(true);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Study Plan Generator</h1>
        <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Empty your mind. We'll extract what matters and turn it into a realistic plan.</p>
      </header>

      <div className="card" style={{ marginBottom: '48px' }}>
        <h2 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color={isExtracting ? "var(--text-secondary)" : "var(--primary)"} /> 
          Brain Dump
        </h2>
        <textarea 
          className="input-field font-body" 
          style={{ height: '120px', resize: 'vertical', marginBottom: '16px', fontSize: '16px', lineHeight: '1.5' }}
          value={dumpText}
          onChange={(e) => setDumpText(e.target.value)}
          disabled={isExtracting}
          placeholder="What's on your mind?"
        ></textarea>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>AI will extract tasks, deadlines, and knowledge gaps automatically.</span>
          <button 
            className="btn-primary" 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px',
              opacity: isExtracting ? 0.7 : 1,
              cursor: isExtracting ? 'not-allowed' : 'pointer'
            }}
            onClick={handleExtract}
            disabled={isExtracting}
          >
            {isExtracting ? (
              <>
                <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Processing...
              </>
            ) : (
              <>
                <Sparkles size={18} /> Extract Data
              </>
            )}
          </button>
        </div>
      </div>

      {isExtracting && (
        <div style={{ textAlign: 'center', padding: '48px 0', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(43, 58, 74, 0.05)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: 'var(--primary)'
          }}>
            <Sparkles size={32} />
          </div>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Analyzing input...</h3>
          <p className="font-body" style={{ color: 'var(--text-secondary)' }}>Identifying subjects, deadlines, and collaborators.</p>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {extracted && (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 color="var(--accent-success)" size={20} /> Extracted Information
            </h3>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>Edit / Confirm</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* Tasks Column */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', fontWeight: 700 }}>Identified Tasks</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '16px' }}>Physics Lab Record</div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14}/> Due Tomorrow</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Book size={14}/> Physics</span>
                  </div>
                </div>

                <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '16px' }}>Team Presentation</div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14}/> Arun, Neha</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Knowledge Gaps Column */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', fontWeight: 700 }}>Knowledge Gaps</h4>
              
              <div style={{ padding: '16px', background: 'rgba(192, 108, 91, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(192, 108, 91, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--accent-warning)', marginBottom: '8px', fontSize: '16px' }}>Integration</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Book size={14} /> Mathematics (Exam Friday)
                    </div>
                  </div>
                  <span className="tag-warning">Priority</span>
                </div>
              </div>
              
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '24px', lineHeight: '1.6' }}>
                The planning engine will allocate extra time for Integration before Friday's exam, and prioritize the Physics Lab Record for tomorrow.
              </p>
            </div>

          </div>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
