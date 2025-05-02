import React from 'react';
import './css/Emaillist.css';

export interface Email {
    id: number;
    sender: string;
    subject: string;
    body: string;
    date: string;
    avatarUrL: string;
    isRead: boolean;
    folder: string;
}

export interface EmailListProps {
    email: Email[];
    onSelectEmail: (id: number) => void;
    selectedEmailid: number | null;
}

export const EmailList: React.FC<EmailListProps> = ({
    email, onSelectEmail, selectedEmailid,
}) => {

    function formatDate  (datestring: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(datestring).toLocaleDateString(undefined, options);
    }


    return (
        <div role="listbox" className="email-list">
          {email.length === 0 ? (
            <div className="email-list__empty">
              <i className="fas fa-inbox email-list__empty-icon"></i>
              <p>No emails in this folder.</p>
            </div>
          ) : (
            email.map((email) => (
              <button key={email.id}
                onClick={() => onSelectEmail(email.id)}
                role="option"
                className={`email-list__item ${selectedEmailid === email.id ? 'email-list__item--selected' : ''}`} aria-selected={selectedEmailid === email.id}
              >
                <img
                  src={email.avatarUrL || 'https://via.placeholder.com/40'}
                  alt={`Avatar of ${email.sender}`} className="email-list__avatar" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                  }}
                />
                <div className="email-list__content">
                  <div className="email-list__header">
                    <p className={`email-list__sender ${ email.isRead ? 'email-list__sender--read' : 'email-list__sender--unread' }`} > {email.sender}
                    </p>
                    <p className="email-list__date">{formatDate(email.date)}</p>
                  </div>
                  <p className={`email-list__subject ${ email.isRead ? 'email-list__subject--read' : 'email-list__subject--unread'}`} > {email.subject}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      );
    };