'use client'

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { IUser } from '../Interfaces';
import { server } from '../consts';
interface UserContextType {
  user: IUser | null;
  token: string | null;
  login:  (
    email: string,
    password: string,
  ) => any;
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
  const login = async (
    email: string,
    password: string,
  ) => {
    
    const login = {
      email: email,
      password: password,
    }
    setAuthenticated(false);
    await fetch(`${server}/api/get-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setUser(data.user);
        setToken(data.token);
        setAuthenticated(true);
        return "";
    })
    .catch((error:any) => {
      console.error(error);
      return error;
    })
    ;
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login,
      logout,
      setUser,
      token,
      authenticated,
      }}>
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
