'use client';

import React, { useState } from 'react';
import { useAuth } from '@/Utils/context/contextUser';
import { server } from '@/Utils/consts';
import './Settings.css'; 
import Link from 'next/link';

const UserSettings: React.FC = () => {
  const { user, token, setUser, authenticated } = useAuth();
  const [deposit, setDeposit] = useState(0);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: '',
  });

  if(!authenticated) {
    return(
       <div>
          <p>Not logged in</p>
            <Link href="/login-register?redirect=user-settings">
              Login
            </Link>
            <br/>
            <Link href="/login-register?redirect=user-settings&type=register">
              Register
            </Link>
       </div>
    )
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const res = await fetch(`${server}/api/update-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      alert('Profile updated successfully');
      setUser(data.user);
    } catch (error: any) {
      console.error(error.message);
      alert('Error updating profile: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Firstname</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Lastname</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <button type="submit" className="form-button">
          Save
        </button>
      </form>
      <br />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch(`${server}/api/deposit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ deposit }),
          })
          .then(async (res) => await res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
        }}
      >
        <div className="form-group">
          <label htmlFor="deposit">Deposit</label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            value={deposit}
            onChange={(e) => setDeposit(+e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Deposit
        </button>
      </form>
    </div>
  );
};

export default UserSettings;