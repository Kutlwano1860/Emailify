import React from 'react';


interface NavbarProps {
  onNewMail?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onReport?: () => void;
  onSweep?: () => void;
  onMoveTo?: () => void;
  onReply?: () => void;
  onReplyAll?: () => void;
  onForward?: () => void;
  onChat?: () => void;
  onShareToTeams?: () => void;
  onQuickSteps?: () => void;
  onReadUnread?: () => void;
  onPrint?: () => void;

  selectedEmailCount?: number;
  isEmailSelected?: boolean;
  canPerformActions?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewMail,
  onDelete,
  onArchive,
  onReport,
  onSweep,
  onMoveTo,
  onReply,
  onReplyAll,
  onForward,
  onChat,
  onShareToTeams,
  onQuickSteps,
  onReadUnread,
  onPrint,

  selectedEmailCount = 0,
  isEmailSelected = false,
  canPerformActions = true,
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="new-mail-btn" onClick={onNewMail} title="Compose New Email">
          <span className="new-mail-icon">📧</span> New mail
        </button>
        
        <button 
          onClick={onDelete} 
          title="Delete" 
          disabled={!isEmailSelected || !canPerformActions}
          className="nav-btn"
        >
          Delete {selectedEmailCount > 1 ? `(${selectedEmailCount})` : ''}
        </button>
        
        <button 
          onClick={onArchive} 
          title="Archive" 
          disabled={!isEmailSelected || !canPerformActions}
          className="nav-btn"
        >
          Archive
        </button>
        
        <button 
          onClick={onReport} 
          title="Report" 
          disabled={!isEmailSelected || !canPerformActions}
          className="nav-btn"
        >
          Report
        </button>
        
        <button 
          onClick={onSweep} 
          title="Sweep"
          className="nav-btn"
        >
          Sweep
        </button>
        
        <button 
          onClick={onMoveTo} 
          title="Move to" 
          disabled={!isEmailSelected || !canPerformActions}
          className="nav-btn"
        >
          Move to
        </button>
        
        <button 
          onClick={onReply} 
          title="Reply" 
          disabled={!isEmailSelected || !canPerformActions}
          className="nav-btn"
        >
          Reply
        </button>
        
        <button 
          onClick={onReplyAll} 
          title="Reply All" 
          disabled={!isEmailSelected || !canPerformActions}
          className="nav-btn"
        >
          Reply all
        </button>
        
        <button 
          onClick={onForward} 
          title="Forward" 
          disabled={!isEmailSelected || !canPerformActions}
          className="nav-btn"
        >
          Forward
        </button>
        
        <button 
          onClick={onChat} 
          title="Chat"
          className="nav-btn"
        >
          Chat
        </button>
        
        <button 
          onClick={onShareToTeams} 
          title="Share to Teams"
          className="nav-btn"
        >
          Share to Teams
        </button>
        
        <button 
          onClick={onQuickSteps} 
          title="Quick steps"
          className="nav-btn"
        >
          Quick steps
        </button>
        
        <button 
          onClick={onReadUnread} 
          title="Read / Unread" 
          disabled={!isEmailSelected || !canPerformActions}
          className="nav-btn"
        >
          Read / Unread
        </button>
        
        <button 
          onClick={onPrint} 
          title="Print" 
          disabled={!isEmailSelected}
          className="nav-btn"
        >
          Print
        </button>
      </div>
    </nav>
  );
};