import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('@TodoApp:user');
    const storedToken = localStorage.getItem('@TodoApp:token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.authorization = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/login', { email, password });
      const { user, token } = response.data;

      localStorage.setItem('@TodoApp:user', JSON.stringify(user));
      localStorage.setItem('@TodoApp:token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/api/register', { name, email, password });
      const { user, token } = response.data;

      localStorage.setItem('@TodoApp:user', JSON.stringify(user));
      localStorage.setItem('@TodoApp:token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('@TodoApp:user');
    localStorage.removeItem('@TodoApp:token');
    setUser(null);
    api.defaults.headers.authorization = '';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 