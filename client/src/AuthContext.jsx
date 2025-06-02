import { createContext, useState, useEffect, useMemo } from 'react';
import { mockUser } from './mockData';

export const AuthContext = createContext();

// Constants
const baseURL = import.meta.env.VITE_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(mockUser);
      return { rest: mockUser };
    } catch (error) {
      setError(error.message || 'Login failed - please try again');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setLoading(true);
      // Simulate logout delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      setError(error.message || 'Logout failed - please try again');
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    loading,
    error,
    setUser,
    refreshUser: () => Promise.resolve(mockUser)
  }), [user, loading, error]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
