import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

export const AuthContext = createContext();

// Constants
const baseURL = import.meta.env.VITE_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      console.log('Checking authentication...');
      
      const response = await fetch(`${baseURL}/authentication`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Authentication failed');
      }

      const data = await response.json();
      setUser(data);
      console.log('Authentication successful');
      console.log(data)

    } catch (error) {
      console.error('Error in checkAuth:', error);
      setUser(null);
      setError(error.message || 'Network error - please check your connection');
    } finally {
      setLoading(false);
      console.log('Authentication check completed');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.rest);
      return data;

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

      const response = await fetch(`${baseURL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear user state immediately
      setUser(null);
      
      // Clear any cached queries if using React Query
      queryClient.clear();
      
      // Force reload the page to clear any cached state
      window.location.href = '/login';

    } catch (error) {
      console.error('Error during logout:', error);
      setError(error.message || 'Logout failed - please try again');
    } finally {
      setLoading(false);
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    loading,
    error,
    setUser,
    refreshUser: checkAuth
  }), [user, loading, error, checkAuth]);


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
