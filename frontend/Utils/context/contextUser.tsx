'use client'

import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { IUser } from '../Interfaces';
import { server } from '../consts';

interface UserContextType {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  setUser: (user: IUser) => void;
  authenticated: boolean;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    const savedAuthenticated = localStorage.getItem('authenticated');

    if (savedUser && savedToken && savedAuthenticated) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setAuthenticated(savedAuthenticated === 'true');
    }
  }, []);

  const login = async (email: string, password: string): Promise<any> => {
    const loginData = {
      email,
      password,
    };
    setAuthenticated(false);

    try {
      const res = await fetch(`${server}/api/get-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log(data);
      setUser(data.user);
      setToken(data.token);
      setAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('authenticated', 'true');

      return null;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    setToken(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authenticated');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        token,
        authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
