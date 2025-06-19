// permissions.ts - Email Application Permissions System

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
  MODERATOR = 'moderator'
}

export enum Permission {
  // Email Permissions
  READ_EMAIL = 'read_email',
  WRITE_EMAIL = 'write_email',
  DELETE_EMAIL = 'delete_email',
  SEND_EMAIL = 'send_email',
  FORWARD_EMAIL = 'forward_email',
  REPLY_EMAIL = 'reply_email',
  ARCHIVE_EMAIL = 'archive_email',
  MARK_READ_UNREAD = 'mark_read_unread',
  
  // Folder Permissions
  CREATE_FOLDER = 'create_folder',
  DELETE_FOLDER = 'delete_folder',
  RENAME_FOLDER = 'rename_folder',
  ACCESS_SHARED_FOLDERS = 'access_shared_folders',
  
  // Attachment Permissions
  DOWNLOAD_ATTACHMENTS = 'download_attachments',
  UPLOAD_ATTACHMENTS = 'upload_attachments',
  DELETE_ATTACHMENTS = 'delete_attachments',
  
  // Search Permissions
  SEARCH_EMAILS = 'search_emails',
  ADVANCED_SEARCH = 'advanced_search',
  
  // Administrative Permissions
  MANAGE_USERS = 'manage_users',
  VIEW_USER_EMAILS = 'view_user_emails',
  SYSTEM_SETTINGS = 'system_settings',
  VIEW_ANALYTICS = 'view_analytics',
  EXPORT_DATA = 'export_data',
  
  // Security Permissions
  CHANGE_PASSWORD = 'change_password',
  ENABLE_2FA = 'enable_2fa',
  VIEW_AUDIT_LOGS = 'view_audit_logs',
  
  // Draft Permissions
  SAVE_DRAFTS = 'save_drafts',
  AUTO_SAVE_DRAFTS = 'auto_save_drafts',
  
  // Contact Permissions
  MANAGE_CONTACTS = 'manage_contacts',
  IMPORT_CONTACTS = 'import_contacts',
  EXPORT_CONTACTS = 'export_contacts'
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // Full access to all permissions
    Permission.READ_EMAIL,
    Permission.WRITE_EMAIL,
    Permission.DELETE_EMAIL,
    Permission.SEND_EMAIL,
    Permission.FORWARD_EMAIL,
    Permission.REPLY_EMAIL,
    Permission.ARCHIVE_EMAIL,
    Permission.MARK_READ_UNREAD,
    Permission.CREATE_FOLDER,
    Permission.DELETE_FOLDER,
    Permission.RENAME_FOLDER,
    Permission.ACCESS_SHARED_FOLDERS,
    Permission.DOWNLOAD_ATTACHMENTS,
    Permission.UPLOAD_ATTACHMENTS,
    Permission.DELETE_ATTACHMENTS,
    Permission.SEARCH_EMAILS,
    Permission.ADVANCED_SEARCH,
    Permission.MANAGE_USERS,
    Permission.VIEW_USER_EMAILS,
    Permission.SYSTEM_SETTINGS,
    Permission.VIEW_ANALYTICS,
    Permission.EXPORT_DATA,
    Permission.CHANGE_PASSWORD,
    Permission.ENABLE_2FA,
    Permission.VIEW_AUDIT_LOGS,
    Permission.SAVE_DRAFTS,
    Permission.AUTO_SAVE_DRAFTS,
    Permission.MANAGE_CONTACTS,
    Permission.IMPORT_CONTACTS,
    Permission.EXPORT_CONTACTS
  ],
  
  [UserRole.MODERATOR]: [
    // Most permissions except user management and system settings
    Permission.READ_EMAIL,
    Permission.WRITE_EMAIL,
    Permission.DELETE_EMAIL,
    Permission.SEND_EMAIL,
    Permission.FORWARD_EMAIL,
    Permission.REPLY_EMAIL,
    Permission.ARCHIVE_EMAIL,
    Permission.MARK_READ_UNREAD,
    Permission.CREATE_FOLDER,
    Permission.DELETE_FOLDER,
    Permission.RENAME_FOLDER,
    Permission.ACCESS_SHARED_FOLDERS,
    Permission.DOWNLOAD_ATTACHMENTS,
    Permission.UPLOAD_ATTACHMENTS,
    Permission.DELETE_ATTACHMENTS,
    Permission.SEARCH_EMAILS,
    Permission.ADVANCED_SEARCH,
    Permission.VIEW_ANALYTICS,
    Permission.EXPORT_DATA,
    Permission.CHANGE_PASSWORD,
    Permission.ENABLE_2FA,
    Permission.SAVE_DRAFTS,
    Permission.AUTO_SAVE_DRAFTS,
    Permission.MANAGE_CONTACTS,
    Permission.IMPORT_CONTACTS,
    Permission.EXPORT_CONTACTS
  ],
  
  [UserRole.USER]: [
    // Standard user permissions
    Permission.READ_EMAIL,
    Permission.WRITE_EMAIL,
    Permission.SEND_EMAIL,
    Permission.FORWARD_EMAIL,
    Permission.REPLY_EMAIL,
    Permission.ARCHIVE_EMAIL,
    Permission.MARK_READ_UNREAD,
    Permission.CREATE_FOLDER,
    Permission.RENAME_FOLDER,
    Permission.DOWNLOAD_ATTACHMENTS,
    Permission.UPLOAD_ATTACHMENTS,
    Permission.SEARCH_EMAILS,
    Permission.CHANGE_PASSWORD,
    Permission.ENABLE_2FA,
    Permission.SAVE_DRAFTS,
    Permission.AUTO_SAVE_DRAFTS,
    Permission.MANAGE_CONTACTS,
    Permission.IMPORT_CONTACTS
  ],
  
  [UserRole.GUEST]: [
    // Limited read-only permissions
    Permission.READ_EMAIL,
    Permission.SEARCH_EMAILS,
    Permission.DOWNLOAD_ATTACHMENTS,
    Permission.CHANGE_PASSWORD
  ]
};

// Email-specific permissions
export interface EmailPermissions {
  canRead: boolean;
  canReply: boolean;
  canForward: boolean;
  canDelete: boolean;
  canArchive: boolean;
  canMarkAsRead: boolean;
  canDownloadAttachments: boolean;
}

// Folder-specific permissions
export interface FolderPermissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canShare: boolean;
}

// Permission checker class
export class PermissionManager {
  private static instance: PermissionManager;
  private currentUser: User | null = null;

  private constructor() {}

  public static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  public setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public hasPermission(permission: Permission): boolean {
    if (!this.currentUser || !this.currentUser.isActive) {
      return false;
    }

    const rolePermissions = ROLE_PERMISSIONS[this.currentUser.role] || [];
    return rolePermissions.includes(permission);
  }

  public hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  public hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }

  public getEmailPermissions(emailId: string): EmailPermissions {
    return {
      canRead: this.hasPermission(Permission.READ_EMAIL),
      canReply: this.hasPermission(Permission.REPLY_EMAIL),
      canForward: this.hasPermission(Permission.FORWARD_EMAIL),
      canDelete: this.hasPermission(Permission.DELETE_EMAIL),
      canArchive: this.hasPermission(Permission.ARCHIVE_EMAIL),
      canMarkAsRead: this.hasPermission(Permission.MARK_READ_UNREAD),
      canDownloadAttachments: this.hasPermission(Permission.DOWNLOAD_ATTACHMENTS)
    };
  }

  public getFolderPermissions(folderId: string): FolderPermissions {
    return {
      canView: this.hasPermission(Permission.READ_EMAIL),
      canCreate: this.hasPermission(Permission.CREATE_FOLDER),
      canEdit: this.hasPermission(Permission.RENAME_FOLDER),
      canDelete: this.hasPermission(Permission.DELETE_FOLDER),
      canShare: this.hasPermission(Permission.ACCESS_SHARED_FOLDERS)
    };
  }

  public canAccessFolder(folderName: string): boolean {
    // System folders that everyone can access
    const publicFolders = ['Inbox', 'Sent Items', 'Drafts', 'Deleted Items'];
    
    if (publicFolders.includes(folderName)) {
      return this.hasPermission(Permission.READ_EMAIL);
    }

    // Custom folders require folder creation permission
    return this.hasPermission(Permission.CREATE_FOLDER);
  }

  public canPerformBulkActions(): boolean {
    return this.hasAnyPermission([
      Permission.DELETE_EMAIL,
      Permission.ARCHIVE_EMAIL,
      Permission.MARK_READ_UNREAD
    ]);
  }

  public getMaxAttachmentSize(): number {
    // Size in MB based on user role
    switch (this.currentUser?.role) {
      case UserRole.ADMIN:
        return 100;
      case UserRole.MODERATOR:
        return 50;
      case UserRole.USER:
        return 25;
      case UserRole.GUEST:
        return 5;
      default:
        return 0;
    }
  }

  public getMaxEmailsPerDay(): number {
    switch (this.currentUser?.role) {
      case UserRole.ADMIN:
        return -1; // Unlimited
      case UserRole.MODERATOR:
        return 1000;
      case UserRole.USER:
        return 500;
      case UserRole.GUEST:
        return 10;
      default:
        return 0;
    }
  }
}

// Permission decorator for component methods
export function RequirePermission(permission: Permission) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const permissionManager = PermissionManager.getInstance();
      
      if (!permissionManager.hasPermission(permission)) {
        console.warn(`Access denied: Missing permission ${permission}`);
        throw new Error(`Insufficient permissions to perform this action`);
      }
      
      return method.apply(this, args);
    };
  };
}

// Permission hook for React components
export function usePermissions() {
  const permissionManager = PermissionManager.getInstance();
  
  return {
    hasPermission: (permission: Permission) => permissionManager.hasPermission(permission),
    hasAnyPermission: (permissions: Permission[]) => permissionManager.hasAnyPermission(permissions),
    hasAllPermissions: (permissions: Permission[]) => permissionManager.hasAllPermissions(permissions),
    getCurrentUser: () => permissionManager.getCurrentUser(),
    getEmailPermissions: (emailId: string) => permissionManager.getEmailPermissions(emailId),
    getFolderPermissions: (folderId: string) => permissionManager.getFolderPermissions(folderId),
    canAccessFolder: (folderName: string) => permissionManager.canAccessFolder(folderName),
    canPerformBulkActions: () => permissionManager.canPerformBulkActions(),
    getMaxAttachmentSize: () => permissionManager.getMaxAttachmentSize(),
    getMaxEmailsPerDay: () => permissionManager.getMaxEmailsPerDay()
  };
}

// Default configuration
export const DEFAULT_PERMISSIONS_CONFIG = {
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  passwordMinLength: 8,
  requireTwoFactor: false,
  allowGuestAccess: true,
  maxStoragePerUser: 1024 * 1024 * 1024, // 1GB in bytes
  allowedEmailDomains: [], // Empty array means all domains allowed
  blockedEmailDomains: ['tempmail.com', '10minutemail.com']
};

// Export singleton instance
export const permissionManager = PermissionManager.getInstance();