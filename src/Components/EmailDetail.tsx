import React from 'react';
import './css/EmailDetail.css';

interface EmailDetailProps {
  email: {
    id: number;
    sender: string;
    subject: string;
    body: string;
    date: string;
    avatarUrL?: string; // Optional for fallback
    isRead: boolean;
    folder: string;
  };
  onToggleRead: (id: number) => void;
  onDelete?: () => void; // Optional, remove if unused
}

const formatDate = (datestring: string): string => {
  const date = new Date(datestring);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const EmailDetail: React.FC<EmailDetailProps> = ({ email, onToggleRead }) => {
  const avatarFallback = email.sender
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="email-detail">
      {/* Header Section */}
      <div className="email-detail__header">
        {email.avatarUrL ? (
          <img src={email.avatarUrL} alt={`Avatar of ${email.sender}`} className="avatar" />
        ) : (
          <div className="avatar-fallback">{avatarFallback}</div>
        )}
        <div className="email-info">
          <h2 className="email-subject">{email.subject || 'No Subject'}</h2>
          <p className="email-sender">{email.sender || 'Unknown Sender'}</p>
          <p className="email-date">{formatDate(email.date) || 'No Date Provided'}</p>
        </div>
      </div>

      {/* Body Section */}
      <div className="email-body">{email.body || 'No content available.'}</div>

      {/* Toggle Read/Unread Button */}
      <button
        className="toggle-read-button"
        onClick={() => onToggleRead(email.id)}
        aria-label={`Mark email as ${email.isRead ? 'unread' : 'read'}`}
      >
        {email.isRead ? 'Mark as Unread' : 'Mark as Read'}
      </button>
    </div>
  );
};
