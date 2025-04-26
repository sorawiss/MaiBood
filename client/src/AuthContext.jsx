import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


const baseURL = import.meta.env.VITE_BASE_URL;
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const checkAuth = async () => {
    try {
      const response = await fetch(`${baseURL}/authentication`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data);

    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log('checkAuth');
    checkAuth();
    console.log('checked')
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
    setUser(data);
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
