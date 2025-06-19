import React, { useState, useEffect } from 'react';
import './css/Compose.css';

interface ComposeEmailProps {
  onSend: (subject: string, body: string, to: string, cc: string) => void;
  onSaveDraft: (subject: string, body: string, to: string, cc: string) => void;
  onClose: () => void;
}

export const ComposeEmail: React.FC<ComposeEmailProps> = ({ 
  onSend, 
  onSaveDraft, 
  onClose 
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showBcc, setShowBcc] = useState(false);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (subject || body || to || cc) {
        handleAutosave();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [subject, body, to, cc]);

  const handleAutosave = () => {
    if (!subject && !body && !to && !cc) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSaved(`Draft saved at ${timeString}`);
    
    // Uncomment this if you want actual autosaving functionality
    // onSaveDraft(subject, body, to, cc);
  };

  const handleSend = () => {
    if (!to) return;
    onSend(subject, body, to, cc);
    resetForm();
  };

  const handleSaveDraft = () => {
    onSaveDraft(subject, body, to, cc);
    resetForm();
  };

  const resetForm = () => {
    setSubject('');
    setBody('');
    setTo('');
    setCc('');
    setLastSaved(null);
  };

  return (
    <div className="compose-email">
      <div className="compose-email__header">
        <div className="compose-email__toolbar">
          <button 
            className="compose-email__send-btn" 
            onClick={handleSend}
            disabled={!to}
          >
            <span className="icon">➡️</span> Send
          </button>
          <div className="compose-email__toolbar-actions">
            <button className="toolbar-icon">🔽</button>
          </div>
        </div>
        <div className="compose-email__close-btn">
          <button onClick={onClose}>✖</button>
        </div>
      </div>

      <div className="compose-email__body">
        <div className="compose-email__recipients">
          <div className="recipient-row">
            <label>To</label>
            <div className="input-container">
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder=""
              />
              <div className="bcc-toggle" onClick={() => setShowBcc(!showBcc)}>
                Bcc
              </div>
            </div>
          </div>

          {showBcc && (
            <div className="recipient-row">
              <label>Bcc</label>
              <input type="text" placeholder="" />
            </div>
          )}

          <div className="recipient-row">
            <label>Cc</label>
            <input
              type="text"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder=""
            />
          </div>
        </div>

        <div className="compose-email__subject-container">
          <input
            type="text"
            className="compose-email__subject"
            placeholder="Add a subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          {lastSaved && <div className="draft-saved-text">{lastSaved}</div>}
        </div>

        <div className="compose-email__content">
          <textarea
            className="compose-email__body-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type / to insert files and more"
          />
        </div>
      </div>

      <div className="compose-email__footer">
        <div className="compose-email__footer-left">
          <button className="toolbar-btn" onClick={handleSend} disabled={!to}>
            Send
          </button>
          <button className="toolbar-btn" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>
        <div className="compose-email__footer-right">
          <button className="toolbar-icon">🗑️</button>
        </div>
      </div>
    </div>
  );
};