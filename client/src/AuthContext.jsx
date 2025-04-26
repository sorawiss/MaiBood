import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


const baseURL = import.meta.env.VITE_BASE_URL;
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const checkAuth = async () => {
    try {
      console.log('start checking...')
      const response = await fetch(`${baseURL}/authentication`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        setUser(null);
        console.log('AuthContext failed')
        return;
      }

      const data = await response.json();
      setUser(data);
      console.log('AuthContext success')
      return;


    } catch (error) {
      setUser(null);
      console.log('Error in checkAuth:', error);
      return;

    } finally {
      console.log('checkAuth finally');
      setLoading(false);
    }
  };


  useEffect(() => {
    checkAuth();
  }, []);


  async function login(user) {
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }


    const data = await response.json()
    setUser(data.rest);
    return data;
  }


  const logout = async () => {
    await fetch(`${baseURL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };




  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
