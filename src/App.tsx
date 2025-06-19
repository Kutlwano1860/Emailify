// import React, { useState, useEffect } from 'react';
// import { ComposeEmail } from './Components/ComposeEmail';
// import { EmailDetail } from './Components/EmailDetail';
// import { EmailList } from './Components/EmailList';
// import { Navbar } from './Components/Navbar';
// import { Sidebar } from './Components/sidebar';
// import { EmailService } from './Components/EmailServices';
// import './App.css';

// export const App: React.FC = () => {
//   const [emails, setEmails] = useState<any[]>([]);
//   const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
//   const [selectedFolder, setSelectedFolder] = useState<string>('Inbox');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isComposeOpen, setIsComposeOpen] = useState(false);

//   useEffect(() => {
//     async function loadEmails() {
//       const fetchedEmails = await EmailService.fetchEmails();
//       setEmails(fetchedEmails);
//     }
//     loadEmails();
//   }, []);

//   const handleSelectEmail = (id: number) => {
//     setSelectedEmailId(id);
//     setEmails(prevEmails =>
//       prevEmails.map(email => (email.id === id ? { ...email, isRead: true } : email))
//     );
//   };

//   const handleSelectFolder = (folder: string) => {
//     setSelectedFolder(folder);
//     setSelectedEmailId(null);
//   };

//  const handleSendEmail = async (subject: string, body: string, to: string, cc: string) => {
//   const newEmail = EmailService.createNewEmail(subject, body, 'sent Emails', to, cc);
//   await EmailService.saveEmail(newEmail);
//   setEmails(prevEmails => [...prevEmails, newEmail]);
//   setIsComposeOpen(false);
// };

// const handleSaveDraft = async (subject: string, body: string, to: string, cc: string) => {
//   const newEmail = EmailService.createNewEmail(subject, body, 'drafts', to, cc);
//   await EmailService.saveEmail(newEmail);
//   setEmails(prevEmails => [...prevEmails, newEmail]);
//   setIsComposeOpen(false);
// };

//   // New: toggle read/unread handler
//   const handleToggleRead = (id: number) => {
//     setEmails(prevEmails =>
//       prevEmails.map(email =>
//         email.id === id ? { ...email, isRead: !email.isRead } : email
//       )
//     );
//   };

//   const filteredEmails = emails
//     .filter(email => email.folder === selectedFolder)
//     .filter(email =>
//       [email.sender, email.subject, email.body]
//         .join(' ')
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase())
//     );

//   const selectedEmail = emails.find(email => email.id === selectedEmailId);

//   return (
//     <div className="app">
//       <header className="app__header">
//         <h1 className="app__title">Malio</h1>
//         <input
//           type="text"
//           className="app__search"
//           placeholder="Search emails..."
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//         />
//       </header>
//       <Navbar
//         onNewMail={() => setIsComposeOpen(true)}
//         selectedEmailCount={selectedEmailId ? 1 : 0}
//         isEmailSelected={!!selectedEmailId}
//       />
//       <main className="app__main">
//         <aside className="app__sidebar">
//           <Sidebar
//             emails={emails}
//             SelectedFolder={selectedFolder}
//             onSelectFolder={handleSelectFolder}
//           />
//         </aside>
//         <section className="app__content">
//           <EmailList
//             email={filteredEmails}
//             onSelectEmail={handleSelectEmail}
//             selectedEmailId={selectedEmailId}
//           />
//           {selectedEmailId && selectedEmail && (
//             <EmailDetail
//               email={selectedEmail}
//               onToggleRead={handleToggleRead}
//             />
//           )}
//         </section>
//         {isComposeOpen && (
//           <ComposeEmail
//             onSend={handleSendEmail}
//             onSaveDraft={handleSaveDraft}
//             onClose={() => setIsComposeOpen(false)}
//           />
//         )}
//       </main>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { ComposeEmail } from './Components/ComposeEmail';
import { EmailDetail } from './Components/EmailDetail';
import { EmailList } from './Components/EmailList';
import { Navbar } from './Components/Navbar';
import { Sidebar } from './Components/sidebar';
import { EmailService } from './Components/EmailServices';
import { EmptyState } from './Components/EmptyState'; // Import the empty state component
import './App.css';

export const App: React.FC = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('Inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  useEffect(() => {
    async function loadEmails() {
      const fetchedEmails = await EmailService.fetchEmails();
      setEmails(fetchedEmails);
    }
    loadEmails();
  }, []);

  const handleSelectEmail = (id: number) => {
    setSelectedEmailId(id);
    setEmails(prevEmails =>
      prevEmails.map(email => (email.id === id ? { ...email, isRead: true } : email))
    );
  };

  const handleSelectFolder = (folder: string) => {
    setSelectedFolder(folder);
    setSelectedEmailId(null); // Clear selected email when changing folders
  };

  const handleSendEmail = async (subject: string, body: string, to: string, cc: string) => {
    const newEmail = EmailService.createNewEmail(subject, body, 'sent Emails', to, cc);
    await EmailService.saveEmail(newEmail);
    setEmails(prevEmails => [...prevEmails, newEmail]);
    setIsComposeOpen(false);
  };

  const handleSaveDraft = async (subject: string, body: string, to: string, cc: string) => {
    const newEmail = EmailService.createNewEmail(subject, body, 'drafts', to, cc);
    await EmailService.saveEmail(newEmail);
    setEmails(prevEmails => [...prevEmails, newEmail]);
    setIsComposeOpen(false);
  };

  const handleToggleRead = (id: number) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === id ? { ...email, isRead: !email.isRead } : email
      )
    );
  };

  const filteredEmails = emails
    .filter(email => email.folder === selectedFolder)
    .filter(email =>
      [email.sender, email.subject, email.body]
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  const selectedEmail = emails.find(email => email.id === selectedEmailId);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Malio</h1>
        <input
          type="text"
          className="app__search"
          placeholder="Search emails..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </header>
      <Navbar
        onNewMail={() => setIsComposeOpen(true)}
        selectedEmailCount={selectedEmailId ? 1 : 0}
        isEmailSelected={!!selectedEmailId}
      />
      <main className="app__main">
        <aside className="app__sidebar">
          <Sidebar
            emails={emails}
            SelectedFolder={selectedFolder}
            onSelectFolder={handleSelectFolder}
          />
        </aside>
        <section className="app__content">
          <EmailList
            email={filteredEmails}
            onSelectEmail={handleSelectEmail}
            selectedEmailId={selectedEmailId}
          />
          
          {/* Show empty state when no email is selected, otherwise show email detail */}
          {selectedEmailId && selectedEmail ? (
            <EmailDetail
              email={selectedEmail}
              onToggleRead={handleToggleRead}
            />
          ) : (
            <EmptyState />
          )}
        </section>
        {isComposeOpen && (
          <ComposeEmail
            onSend={handleSendEmail}
            onSaveDraft={handleSaveDraft}
            onClose={() => setIsComposeOpen(false)}
          />
        )}
      </main>
    </div>
  );
};