'use client'

import { useAuth } from '@/Utils/context/contextUser';
import { UserRoles } from '@/Utils/Interfaces';
import Link from 'next/link';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useEffect } from 'react';

const Header = () => {
  const { user, logout, authenticated } = useAuth();

  return (
    <div>
      {/* AppBar for the fixed header */}
      <AppBar position="sticky" sx={{ backgroundColor: 'red', zIndex: 1000 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            alc and autos
          </Typography>
          <nav>
            <ul style={{ display: 'flex', gap: '1rem', listStyleType: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link href="/">
                  <Button sx={{ color: 'white' }}>Home</Button>
                </Link>
              </li>
              {user?.role === UserRoles.Admin && (
                <li>
                  <Link href="/dashboard">
                    <Button sx={{ color: 'white' }}>Dashboard</Button>
                  </Link>
                </li>
              )}
              {!authenticated && (
                <li>
                  <Link href="/login-register">
                    <Button sx={{ color: 'white' }}>Login</Button>
                  </Link>
                </li>
              )}
              {authenticated && (
                <li>
                  <Button sx={{ color: 'white' }} onClick={logout}>
                    Logout
                  </Button>
                </li>
              )}
              <li>
                <Link href="/reviews">
                  <Button sx={{ color: 'white' }}>Reviews</Button>
                </Link>
              </li>
              <li>
                <Link href="/blog/hello-world">
                  <Button sx={{ color: 'white' }}>Blog Post</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </Toolbar>
      </AppBar>

      {/* Add padding to the main content to ensure it is pushed down */}
      <div style={{ marginTop: '64px' }}> {/* 64px is the default height for AppBar */}
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Header;
