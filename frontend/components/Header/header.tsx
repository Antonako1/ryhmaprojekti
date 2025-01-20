'use client'

import { useAuth } from '@/Utils/context/contextUser';
import { UserRoles } from '@/Utils/Interfaces';
import Link from 'next/link';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

const Heederi = () => {
  const { user, logout, authenticated } = useAuth();
  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: 'red', zIndex: 1000 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Alc & Autos
            </Link>
          </Typography>
          <nav>
            <ul style={{ display: 'flex', gap: '1rem', listStyleType: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link href="/">
                  <Button sx={{ color: 'white' }}>Home</Button>
                </Link>
              </li>
              <li>
                <Link href="/cars">
                  <Button sx={{ color: 'white' }}>Cars</Button>
                </Link>
              </li>
              <li>
                <Link href="/alcohols">
                  <Button sx={{ color: 'white' }}>Alcohol</Button>
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
                <>
                  <li>
                    <Link href="/login-register?">
                      <Button sx={{ color: 'white' }}>Login</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login-register?type=register">
                      <Button sx={{ color: 'white' }}>Register</Button>
                    </Link>
                  </li>
                </>
              )}
              {authenticated && (
                <>
                  <li>
                    <Button sx={{ color: 'white' }} onClick={logout}>
                      Logout
                    </Button>
                  </li>
                  <li>
                    <Link href="/cart">
                      <Button sx={{ color: 'white' }}>Cart</Button>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/reviews">
                  <Button sx={{ color: 'white' }}>Reviews</Button>
                </Link>
              </li>
              <li>
                <Link href="/user-settings">
                  <Button sx={{ color: 'white' }}>Profile/Depo</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Heederi;