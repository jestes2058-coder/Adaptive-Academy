"use client";

import React, { useState, useRef } from 'react';
import { 
  FolderGit2, 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  Presentation, 
  Table, 
  FileArchive, 
  Video, 
  Link as LinkIcon, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Trash2, 
  Share2, 
  Eye, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  LayoutGrid,
  List,
  FolderPlus,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { ResourceItem } from '@/lib/database.types';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

export default function ResourcesPage() {
  const { resources, teams, user, uploadResource, deleteResource, isLoaded } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeOwnership, setActiveOwnership] = useState<'all' | 'personal' | 'team'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');

  // Modals & Upload state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null);

  // Upload dropzone state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadTargetTeamId, setUploadTargetTeamId] = useState<string>('');
  const [uploadCategoryType, setUploadCategoryType] = useState<ResourceItem['category']>('documents');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Link modal state
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTeamId, setLinkTeamId] = useState('');

  if (!isLoaded) {
    return (
      <div style={{ maxWidth: '1000px' }}>
        <LoadingSkeleton type="cards" />
      </div>
    );
  }

  // Filter and sort resources
  const filteredResources = resources.filter((res) => {
    // Ownership filter
    if (activeOwnership === 'personal' && res.team_id !== null) return false;
    if (activeOwnership === 'team' && res.team_id === null) return false;

    // Category filter
    if (activeCategory !== 'all' && res.category !== activeCategory) return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchFileName = res.file_name.toLowerCase().includes(q);
      const matchUploader = res.uploader_name.toLowerCase().includes(q);
      const matchFolder = res.folder.toLowerCase().includes(q);
      if (!matchTitle && !matchFileName && !matchUploader && !matchFolder) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'size') return b.file_size_bytes - a.file_size_bytes;
    return 0;
  });

  const getFileIcon = (type: ResourceItem['file_type']) => {
    switch (type) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText size={20} color="var(--primary)" />;
      case 'ppt':
      case 'pptx':
        return <Presentation size={20} color="var(--accent-warning)" />;
      case 'xls':
      case 'xlsx':
        return <Table size={20} color="var(--accent-success)" />;
      case 'image':
        return <ImageIcon size={20} color="#78716C" />;
      case 'zip':
        return <FileArchive size={20} color="#64748B" />;
      case 'video':
        return <Video size={20} color="var(--accent-warning)" />;
      case 'link':
        return <LinkIcon size={20} color="var(--accent-success)" />;
      default:
        return <FileText size={20} color="var(--text-secondary)" />;
    }
  };

  const handleFileUploadSimulated = (file: File) => {
    setUploadProgress(10);
    setUploadedFileName(file.name);

    // Determine category based on extension
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    let category: ResourceItem['category'] = 'documents';
    let fileType: ResourceItem['file_type'] = 'pdf';

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
      category = 'images';
      fileType = 'image';
    } else if (['ppt', 'pptx'].includes(ext)) {
      category = 'presentations';
      fileType = 'pptx';
    } else if (['xls', 'xlsx', 'csv'].includes(ext)) {
      category = 'spreadsheets';
      fileType = 'xlsx';
    } else if (['mp4', 'mov', 'webm'].includes(ext)) {
      category = 'videos';
      fileType = 'video';
    } else if (['zip', 'rar', 'tar', 'gz'].includes(ext)) {
      category = 'archives';
      fileType = 'zip';
    } else if (['doc', 'docx'].includes(ext)) {
      category = 'documents';
      fileType = 'docx';
    }

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 100;
        if (prev >= 90) {
          clearInterval(interval);
          
          // Complete upload
          uploadResource({
            title: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
            fileName: file.name,
            fileType,
            fileSizeBytes: file.size || 1850000,
            category,
            teamId: uploadTargetTeamId ? uploadTargetTeamId : null,
            folder: category === 'documents' ? 'Notes & Syllabus' : 'General',
            url: fileType === 'image' 
              ? 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80'
              : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          });

          setUploadSuccess(true);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUploadSimulated(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUploadSimulated(e.target.files[0]);
    }
  };

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkTitle.trim() || !linkUrl.trim()) return;

    uploadResource({
      title: linkTitle.trim(),
      fileName: linkTitle.trim().replace(/\s+/g, '_'),
      fileType: 'link',
      fileSizeBytes: 0,
      category: 'links',
      teamId: linkTeamId ? linkTeamId : null,
      folder: 'Web Links',
      url: linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`,
    });

    setShowLinkModal(false);
    setLinkTitle('');
    setLinkUrl('');
    setLinkTeamId('');
  };

  const resetUploadState = () => {
    setShowUploadModal(false);
    setUploadProgress(null);
    setUploadSuccess(false);
    setUploadedFileName('');
  };

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-brand" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '6px' }}>
            Resources
          </h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Everything you need, organized in one place.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowLinkModal(true)}
            className="btn-secondary"
            style={{ padding: '11px 18px', fontSize: '14px' }}
          >
            <LinkIcon size={16} /> Add Link
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="btn-primary"
            style={{ padding: '11px 22px', fontSize: '14px' }}
          >
            <UploadCloud size={16} /> Upload Resource
          </button>
        </div>
      </header>

      {/* Filter and Search Controls Bar */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Top row: Search, Sort & View Mode */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search resources by title, uploader, or folder..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
            </div>

            {/* Ownership Filter */}
            <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <button 
                onClick={() => setActiveOwnership('all')}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: activeOwnership === 'all' ? 'var(--primary)' : 'transparent',
                  color: activeOwnership === 'all' ? 'white' : 'var(--text-secondary)',
                }}
              >
                All
              </button>
              <button 
                onClick={() => setActiveOwnership('personal')}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: activeOwnership === 'personal' ? 'var(--primary)' : 'transparent',
                  color: activeOwnership === 'personal' ? 'white' : 'var(--text-secondary)',
                }}
              >
                Personal
              </button>
              <button 
                onClick={() => setActiveOwnership('team')}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: activeOwnership === 'team' ? 'var(--primary)' : 'transparent',
                  color: activeOwnership === 'team' ? 'white' : 'var(--text-secondary)',
                }}
              >
                Team Shared
              </button>
            </div>

            {/* Sort By Dropdown */}
            <select 
              className="input-field" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{ width: 'auto', padding: '10px 14px', fontSize: '13px' }}
            >
              <option value="date">Sort: Latest Added</option>
              <option value="name">Sort: Alphabetical</option>
              <option value="size">Sort: File Size</option>
            </select>

            {/* Grid / List View Toggle */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button 
                onClick={() => setViewMode('grid')}
                className={`btn-ghost ${viewMode === 'grid' ? 'active' : ''}`}
                style={{ padding: '8px', background: viewMode === 'grid' ? 'var(--bg-elevated)' : 'transparent' }}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`btn-ghost ${viewMode === 'list' ? 'active' : ''}`}
                style={{ padding: '8px', background: viewMode === 'list' ? 'var(--bg-elevated)' : 'transparent' }}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'documents', label: 'Documents (PDF/Doc)' },
              { id: 'presentations', label: 'Presentations (PPT)' },
              { id: 'spreadsheets', label: 'Spreadsheets (XLS)' },
              { id: 'images', label: 'Images / Diagrams' },
              { id: 'links', label: 'Web References' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: activeCategory === cat.id ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                  background: activeCategory === cat.id ? 'rgba(43, 58, 74, 0.08)' : 'var(--bg-surface)',
                  color: activeCategory === cat.id ? 'var(--primary)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Resources Content Display */}
      {filteredResources.length === 0 ? (
        <EmptyState 
          icon={FolderGit2}
          title="No resources found."
          description="No files match your current filters. Upload lecture notes, assignment PDFs, or external links to build your academic library."
          actionLabel="Upload Resource"
          onAction={() => setShowUploadModal(true)}
        />
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '24px' }}>
          {filteredResources.map((res) => {
            const isShared = !!res.team_id;
            const canDelete = res.uploader_id === user.id;

            return (
              <div key={res.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Card Top Banner */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'rgba(43, 58, 74, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getFileIcon(res.file_type)}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span className={isShared ? 'tag-primary' : 'tag-neutral'} style={{ fontSize: '11px' }}>
                      {isShared ? `Shared: ${res.team_name}` : 'Personal'}
                    </span>
                    {canDelete && (
                      <button 
                        onClick={() => deleteResource(res.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                        title="Delete Resource"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-heading" style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px', lineHeight: '1.3' }}>
                  {res.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', fontFamily: 'monospace' }}>
                  {res.file_name}
                </p>

                {/* Metadata details */}
                <div style={{ background: 'var(--bg-main)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span>{res.file_size_formatted}</span>
                  <span>{res.folder}</span>
                  <span>{new Date(res.created_at).toLocaleDateString()}</span>
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '14px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    By {res.uploader_name}
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setPreviewResource(res)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      <Eye size={13} /> Preview
                    </button>
                    <a 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '12px', textDecoration: 'none' }}
                    >
                      {res.file_type === 'link' ? <ExternalLink size={13} /> : <Download size={13} />}
                      {res.file_type === 'link' ? 'Open' : 'Get'}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 20px' }}>Name</th>
                  <th style={{ padding: '14px 20px' }}>Category</th>
                  <th style={{ padding: '14px 20px' }}>Size</th>
                  <th style={{ padding: '14px 20px' }}>Uploaded By</th>
                  <th style={{ padding: '14px 20px' }}>Association</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((res) => (
                  <tr key={res.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {getFileIcon(res.file_type)}
                      <div>
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{res.title}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{res.file_name}</p>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                      {res.category}
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                      {res.file_size_formatted}
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {res.uploader_name}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span className={res.team_id ? 'tag-primary' : 'tag-neutral'} style={{ fontSize: '11px' }}>
                        {res.team_id ? res.team_name : 'Personal'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          onClick={() => setPreviewResource(res)}
                          className="btn-ghost"
                          style={{ padding: '6px 10px', fontSize: '12px' }}
                        >
                          <Eye size={14} />
                        </button>
                        <a 
                          href={res.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-ghost"
                          style={{ padding: '6px 10px', fontSize: '12px' }}
                        >
                          <Download size={14} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UPLOAD DRAG-AND-DROP MODAL */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={resetUploadState}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 className="font-heading" style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>
                  Upload Academic Resource
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Files are securely stored and indexed for study collaboration.
                </p>
              </div>
              <button onClick={resetUploadState} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Sharing Destination Selector */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Destination / Ownership</label>
              <select 
                className="input-field" 
                value={uploadTargetTeamId}
                onChange={(e) => setUploadTargetTeamId(e.target.value)}
              >
                <option value="">Personal Library (Only You)</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    Team: {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Drag & Drop Box */}
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: isDragging ? '2px dashed var(--primary)' : '2px dashed var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '40px 24px',
                textAlign: 'center',
                background: isDragging ? 'rgba(43, 58, 74, 0.04)' : 'var(--bg-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '20px',
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.zip,.mp4"
              />

              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(43, 58, 74, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <UploadCloud size={28} />
              </div>

              <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '4px', color: 'var(--primary)' }}>
                Drop files here, or <span style={{ textDecoration: 'underline' }}>Browse</span>
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Supported: PDF, DOCX, PPTX, XLSX, PNG/JPG, ZIP, Video
              </p>
            </div>

            {/* Progress Bar / Success Feedback */}
            {uploadProgress !== null && (
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600 }}>{uploadedFileName}</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{uploadProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--accent-success)', borderRadius: '3px', transition: 'width 0.2s ease' }} />
                </div>
                {uploadSuccess && (
                  <p style={{ fontSize: '13px', color: 'var(--accent-success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                    <CheckCircle2 size={16} /> File successfully uploaded and indexed!
                  </p>
                )}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn-secondary" onClick={resetUploadState}>
                {uploadSuccess ? 'Done' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD LINK MODAL */}
      {showLinkModal && (
        <div className="modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                Add Web Reference
              </h2>
              <button onClick={() => setShowLinkModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateLink}>
              <div className="form-group">
                <label className="form-label">Resource Title *</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. MIT OCW: Linear Algebra Lecture Series" 
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL *</label>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://..." 
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Destination</label>
                <select 
                  className="input-field"
                  value={linkTeamId}
                  onChange={(e) => setLinkTeamId(e.target.value)}
                >
                  <option value="">Personal Library</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      Team: {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowLinkModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Web Reference
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESOURCE PREVIEW MODAL */}
      {previewResource && (
        <div className="modal-overlay" onClick={() => setPreviewResource(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="tag-neutral" style={{ marginBottom: '6px' }}>
                  {previewResource.category.toUpperCase()} • {previewResource.file_size_formatted}
                </span>
                <h2 className="font-heading" style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>
                  {previewResource.title}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Uploaded by {previewResource.uploader_name} on {new Date(previewResource.created_at).toLocaleDateString()}
                </p>
              </div>
              <button onClick={() => setPreviewResource(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Preview Body based on file type */}
            <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '24px', minHeight: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              {previewResource.file_type === 'image' ? (
                <img 
                  src={previewResource.url} 
                  alt={previewResource.title} 
                  style={{ maxWidth: '100%', maxHeight: '360px', objectFit: 'contain', borderRadius: 'var(--radius-sm)' }}
                />
              ) : previewResource.file_type === 'pdf' ? (
                <div style={{ textAlign: 'center', width: '100%', padding: '20px', background: 'white', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
                  <FileText size={48} color="var(--primary)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>PDF Document Viewer</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 16px auto' }}>
                    {previewResource.title} ({previewResource.file_size_formatted}) is ready for download and local annotation.
                  </p>
                  <a href={previewResource.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
                    <Download size={14} /> Open in PDF Reader
                  </a>
                </div>
              ) : previewResource.file_type === 'link' ? (
                <div style={{ textAlign: 'center' }}>
                  <LinkIcon size={40} color="var(--accent-success)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>External Web Resource</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    {previewResource.url}
                  </p>
                  <a href={previewResource.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
                    <ExternalLink size={14} /> Launch in New Tab
                  </a>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  {getFileIcon(previewResource.file_type)}
                  <h4 style={{ fontSize: '15px', fontWeight: 600, marginTop: '12px', marginBottom: '6px' }}>
                    {previewResource.file_name}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Standard download file • {previewResource.file_size_formatted}
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setPreviewResource(null)}>
                Close Preview
              </button>
              <a 
                href={previewResource.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                <Download size={14} /> Download File
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
