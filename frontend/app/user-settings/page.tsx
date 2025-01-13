'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/Utils/context/contextUser'; 
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Profile: React.FC = () => {
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
      setLoading(false);
    } else {
      const fetchUserData = async () => {
        try {
          const response = await fetch('/api/user'); 
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5" color="error">
          No user data found. Please log in.
        </Typography>
      </Box>
    );
  }

  const { firstName, lastName, email } = userData;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4">User Profile</Typography>
        <Typography variant="h6">First Name: {firstName}</Typography>
        <Typography variant="h6">Last Name: {lastName}</Typography>
        <Typography variant="h6">Email: {email}</Typography>
      </Stack>
    </Box>
  );
};

export default Profile;
