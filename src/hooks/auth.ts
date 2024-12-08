import { useState } from 'react';

interface User {
  id?: string;
  email?: string;
  // Add other user properties as needed
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const signOut = () => {
    setUser(null);
    // Add your sign out logic here
  };

  return {
    user,
    signOut,
    // Add other auth methods as needed
  };
}; 