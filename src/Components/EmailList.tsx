import React, { useState } from 'react';
import './css/Emaillist.css';

export interface Email {
  id: number;
  sender: string;
  subject: string;
  body: string;
  date: string;
  avatarUrL?: string; // Optional field for avatar URL
  isRead: boolean;
  folder: string;
}

export interface EmailListProps {
  email: Email[];
  onSelectEmail: (id: number) => void;
  selectedEmailId: number | null;
}

const fallbackImageUrl = '/assets/default-avatar.png'; // Local fallback image

// Reusable ImageWithFallback Component
const ImageWithFallback: React.FC<{
  src: string | null;
  fallback: string;
  alt: string;
  className?: string;
}> = ({ src, fallback, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(src);

  return (
    <img
      src={imgSrc || fallback}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
};

// EmailList Component
export const EmailList: React.FC<EmailListProps> = ({
  email,
  onSelectEmail,
  selectedEmailId,
}) => {
  const formatDate = (datestring: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(datestring).toLocaleDateString(undefined, options);
  };

  if (!email || email.length === 0) {
    return (
      <div className="email-list__empty">
        <i className="fas fa-inbox email-list__empty-icon"></i>
        <p>No emails in this folder.</p>
      </div>
    );
  }

  return (
    <div role="listbox" className="email-list">
      {email.map((emailItem) => (
        <button
          key={emailItem.id}
          onClick={() => onSelectEmail(emailItem.id)}
          role="option"
          className={`email-list__item ${
            selectedEmailId === emailItem.id ? 'email-list__item--selected' : ''
          }`}
          aria-selected={selectedEmailId === emailItem.id}
          aria-labelledby={`email-${emailItem.id}-sender email-${emailItem.id}-subject`}
        >
          <ImageWithFallback
            src={emailItem.avatarUrL ?? null}
            fallback={fallbackImageUrl}
            alt={`Avatar of ${emailItem.sender}`}
            className="email-list__avatar"
          />
          <div className="email-list__content">
            <div className="email-list__header">
              <p
                id={`email-${emailItem.id}-sender`}
                className={`email-list__sender ${
                  emailItem.isRead
                    ? 'email-list__sender--read'
                    : 'email-list__sender--unread'
                }`}
              >
                {emailItem.sender}
              </p>
              <p className="email-list__date">{formatDate(emailItem.date)}</p>
            </div>
            <p
              id={`email-${emailItem.id}-subject`}
              className={`email-list__subject ${
                emailItem.isRead
                  ? 'email-list__subject--read'
                  : 'email-list__subject--unread'
              }`}
            >
              {emailItem.subject}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
