export class EmailService {
  static LOCAL_API_URL = 'http://localhost:3001/emails'; // json-server URL
  static API_URL = '/api/emails'; // Backend API URL (handled via proxy)
  
  static async fetchEmails() {
    // Create an array to store errors for better debugging
    const errors: string[] = [];
    
    try {
      // First attempt - try local JSON server
      console.log('Attempting to fetch from JSON server...');
      const localResponse = await fetch(this.LOCAL_API_URL);
      
      if (!localResponse.ok) {
        throw new Error(`Local API Error: ${localResponse.status} ${localResponse.statusText}`);
      }
      
      const data = await localResponse.json();
      console.log('Successfully fetched from JSON server:', data);
      return data;
    } 
    catch (error) {
      // TypeScript-safe error handling
      const localError = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`JSON Server Error: ${localError}`);
      console.warn('JSON server fetch failed, falling back to backend API:', localError);
      
      try {
        // Second attempt - fallback to backend API
        console.log('Attempting to fetch from backend API...');
        const backendResponse = await fetch(this.API_URL);
        
        if (!backendResponse.ok) {
          throw new Error(`Backend API Error: ${backendResponse.status} ${backendResponse.statusText}`);
        }
        
        const data = await backendResponse.json();
        console.log('Successfully fetched from backend API:', data);
        return data;
      } 
      catch (error) {
        // TypeScript-safe error handling
        const backendError = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Backend API Error: ${backendError}`);
        console.error('Error fetching emails from both sources:', errors);
        
        // Return empty array but log detailed errors
        console.error('Complete error details:', {
          localError: errors[0],
          backendError: errors[1],
          message: 'Please make sure both JSON server and backend API are running correctly'
        });
        
        // Return empty array as fallback
        return [];
      }
    }
  }

  static createNewEmail(subject: string, body: string, folder: string, to: string = '', cc: string = '') {
  return {
    id: Date.now(),
    subject,
    sender: 'you@yourdomain.com',
    recipients: to.split(',').map(email => email.trim()).filter(email => email),
    cc: cc.split(',').map(email => email.trim()).filter(email => email),
    body,
    date: new Date().toISOString(),
    avatarUrl: '',
    isRead: true,
    folder,
  };
}
  
  static async saveEmail(email: any) {
    try {
      console.log('Attempting to save email to JSON server:', email);
      const response = await fetch(this.LOCAL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email),
      });
      
      if (!response.ok) {
        throw new Error(`Error saving email: ${response.status} ${response.statusText}`);
      }
      
      const savedEmail = await response.json();
      console.log('Email saved successfully:', savedEmail);
      return savedEmail;
    } 
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to save email:', errorMessage);
      // Return the original email to maintain app functionality
      return email;
    }
  }
}