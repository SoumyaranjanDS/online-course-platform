import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.getMe();
        if (response.success && response.data) {
          setUser(response.data);
          setRole(response.data.role);
        }
      } catch (error) {
        setUser(null);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (data) => {
    const response = await authService.login(data);
    if (response.success && response.data) {
      setUser(response.data);
      setRole(response.data.role);
    }
    return response;
  };

  const signup = async (data) => {
    const response = await authService.signup(data);
    if (response.success && response.data) {
      setUser(response.data);
      setRole(response.data.role);
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};