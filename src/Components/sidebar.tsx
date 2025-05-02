import React from 'react';
import './css/sidebar.css';

export const FOLDERS = {
  INBOX: 'Inbox',
  SENT: 'sent Emails',
  DRAFTS: 'drafts',
  DELETED: 'Deleted items',
  JUNK: 'junk Emails',
  ARCHIVED: 'Archived'
} as const;

export type Folder = typeof FOLDERS[keyof typeof FOLDERS];

export interface SidebarProps {
    selectedFolder: Folder;
    onSelectFolder: (folder: Folder) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({selectedFolder, onSelectFolder }) => {
   const folders: Folder[] = Object.values(FOLDERS);

   return (
    <nav className="sidebar">
      <div className="sidebar__header">
        Emailify
      </div>
      <ul className="sidebar__list">
        {folders.map((folder) => (
          <li key={folder} className="sidebar__list-item">
            <button onClick={() => onSelectFolder(folder)}  className={`sidebar__button ${   selectedFolder === folder ? 'sidebar__button--active' : '' }`}
              aria-current={selectedFolder === folder ? 'page' : undefined} >
              <span className="sidebar__folder-name">{folder}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
