import React from 'react';
import './css/sidebar.css';
// import { boolean } from 'yargs';

interface SidebarProps{
    emails: Array<{
        folder : string;
        isRead: boolean;
    }>;
    SelectedFolder: string;
    onSelectFolder: (folder: string) => void;
}

const FOLDERS = ['Inbox', 'sent Emails', 'drafts',  'Deleted items',  'junk Emails',  'Archived'];

export const Sidebar: React.FC<SidebarProps> = ({emails, SelectedFolder, onSelectFolder }) => {

    return (
        <div className="sidebar">
          <ul>
            {FOLDERS.map(folder => {
              const unreadCount = emails.filter(
                email => email.folder === folder && !email.isRead
              ).length;
              // console.log(unreadCount);
              return (
                <li
                  key={folder}
                  className={folder === SelectedFolder ? 'active' : ''}
                >
                  <button onClick={() => onSelectFolder(folder)}>
                    {folder} {unreadCount > 0 && <span>({unreadCount})</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };