import React, { useState } from 'react';
import { ComposeEmail } from './Components/ComposeEmail';
import { EmailDetail } from './Components/EmailDetail';
import { EmailList } from './Components/EmailList';
import { Sidebar, Folder } from './Components/sidebar';
import './App.css';

export const App: React.FC = () => {
  // Initial email data
  const initialEmails = [
    {
      id: 1,
      sender: 'Alice Johnson',
      subject: 'Meeting Reminder',
      body: 'Hi, just a reminder about the meeting scheduled for tomorrow at 10 AM. Please be prepared with your reports.',
      date: '2024-06-01T09:00:00Z',
      avatarUrl: 'https://placehold.co/40x40/png?text=AJ&font=roboto&fontSize=20&bg=4F46E5&fg=ffffff',
      isRead: false,
      folder: 'Inbox',
    },
    {
      id: 2,
      sender: 'Bob Smith',
      subject: 'Project Update',
      body: 'The project is progressing well. We have completed the initial phase and are moving to the testing phase next week.',
      date: '2024-05-31T14:30:00Z',
      avatarUrl: 'https://placehold.co/40x40/png?text=BS&font=roboto&fontSize=20&bg=EF4444&fg=ffffff',
      isRead: true,
      folder: 'sent Emails',
    },
    {
      id: 3,
      sender: 'Carol Lee',
      subject: 'Invitation to Webinar',
      body: 'You are invited to attend our upcoming webinar on web development trends in 2024. Register soon to reserve your spot.',
      date: '2024-05-30T16:45:00Z',
      avatarUrl: 'https://placehold.co/40x40/png?text=CL&font=roboto&fontSize=20&bg=10B981&fg=ffffff',
      isRead: false,
      folder: 'drafts',
    },
    {
      id: 4,
      sender: 'David Kim',
      subject: 'Invoice Attached',
      body: 'Please find attached the invoice for the services rendered last month. Let me know if you have any questions.',
      date: '2024-05-29T11:20:00Z',
      avatarUrl: 'https://placehold.co/40x40/png?text=DK&font=roboto&fontSize=20&bg=F59E0B&fg=ffffff',
      isRead: true,
      folder: 'Deleted items',
    },
    {
      id: 5,
      sender: 'Eva Green',
      subject: 'Holiday Schedule',
      body: 'The office will be closed from July 1st to July 5th for the holiday. Please plan your work accordingly.',
      date: '2024-05-28T08:15:00Z',
      avatarUrl: 'https://placehold.co/40x40/png?text=EG&font=roboto&fontSize=20&bg=8B5CF6&fg=ffffff',
      isRead: false,
      folder: 'junk Emails',
    },
    {
      id: 6,
      sender: 'Frank Moore',
      subject: 'New Policy Update',
      body: 'We have updated our company policies regarding remote work. Please review the attached document carefully.',
      date: '2024-05-27T13:50:00Z',
      avatarUrl: 'https://placehold.co/40x40/png?text=FM&font=roboto&fontSize=20&bg=3B82F6&fg=ffffff',
      isRead: true,
      folder: 'Archived',
    },
  ];

  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder>('Inbox');

  // Find the currently selected email
  const selectedEmail = emails.find(email => email.id === selectedEmailId) || null;
  
  // Filter emails based on selected folder
  const filteredEmails = emails.filter(email => email.folder === selectedFolder);

  // Handle email selection
  const handleSelectEmail = (id: number) => {
    setSelectedEmailId(id);
    setEmails(prevEmails =>
      prevEmails.map(email => (email.id === id ? { ...email, isRead: true } : email))
    );
  };

  // Handle folder selection
  const handleSelectFolder = (folder: Folder) => {
    setSelectedFolder(folder);
    setSelectedEmailId(null);
  };

  // Handle sending a new email
  const handleSendEmail = (subject: string, body: string) => {
    const newEmail = {
      id: emails.length + 1,
      subject,
      sender: 'you@you.com',
      body,
      date: new Date().toISOString(),
      avatarUrl: 'https://via.placeholder.com/40',
      isRead: false,
      folder: 'sent Emails'
    };
    setEmails([...emails, newEmail]);
  };

  // Refresh emails (reset to initial data)
  const refreshEmails = () => {
    setEmails(initialEmails);
    setSelectedEmailId(null);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Emailify</h1>
        <button 
          type="button" 
          className="app__refresh-btn" 
          aria-label="Refresh emails"
          onClick={refreshEmails}
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </header>
      <main className="app__main">
        <aside className="app__sidebar">
          <Sidebar 
            selectedFolder={selectedFolder} 
            onSelectFolder={handleSelectFolder} 
          />
          <ComposeEmail onsend={handleSendEmail} />
          <EmailList 
            email={filteredEmails.map(email => ({...email, avatarUrL: email.avatarUrl}))}
            onSelectEmail={handleSelectEmail}
            selectedEmailid={selectedEmailId}
          />
        </aside>
        <section className="app__content">
          <EmailDetail email={selectedEmail ? {...selectedEmail, avatarUrL: selectedEmail.avatarUrl} : null} />
        </section>
      </main>
    </div>
  );
};


