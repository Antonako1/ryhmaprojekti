'use client'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './LoginRegister.module.css';
import * as React from 'react';
import { IUser, UserRoles } from '@/Utils/Interfaces';
import { useAuth } from '@/Utils/context/contextUser';
import { server } from '@/Utils/consts';
import { useRouter } from 'next/navigation';

enum LoginRegisterEnum {
  Login,
  Register
}

const LoginRegister: React.FC = () => {
    const [value, setValue] = React.useState<LoginRegisterEnum>(LoginRegisterEnum.Login);

    const [error, setError] = React.useState<string | null>(null);

    // Login form values
    const [usernameLogin, setUsernameLogin] = React.useState<string>('');
    const [passwordLogin, setPasswordLogin] = React.useState<string>('');

    // Register form values
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [role, setRole] = React.useState<UserRoles>(UserRoles.User);
    const router = useRouter();
    const { login } = useAuth();
    const clear = () => {
        setUsernameLogin('')
        setPasswordLogin('')
        setUsername('')
        setPassword('')
        setPasswordConfirm('')
        setFirstName('')
        setLastName('')
        setRole(UserRoles.User)
    }
    
    const handleLogin = async () => {
    try {
        if(usernameLogin === "" || passwordLogin === "") {
            setError('Invalid username or password');
            return;
        }
        const res = await login(usernameLogin, passwordLogin);
        if(res) {
            setError('Invalid username or password');
            return;
        }
        clear()
        setError(null);
        redirectUser();
    } catch (error) {
      setError('Invalid username or password');
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
        console.log('Registering', { username, password, passwordConfirm, firstName, lastName, role });
        if(username === "" || password === "" || passwordConfirm === "" || firstName === "" || lastName === "") {
            setError('Invalid input');
            return;
        }
        if(password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }
        setError(null);
    } catch (error:any) {
      setError('Invalid input');
      console.error(error.message);
    }
    let fetch_data;
    try {

        await fetch(`${server}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password, role, balance: 0, firstName, lastName }),
        })
        .then((res) => res.json())
        .then(async (data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            console.log(data);
            const res2 = await login(username, password);
            if(res2) {
                setError('Invalid input or user already exists');
                return;
            }
            setError(null);
            clear();
            redirectUser();
        })
        .catch((error:any) => {
            console.error(error);
            setError("Invalid input or user already exists");
        });
    } catch (error:any) {
        setError('Invalid input or user already exists');
        console.error(error);
    };
  };

  const redirectUser = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirect = searchParams.get('redirect');

    if (redirect) {
        router.push(`/${redirect}`);
    } else {
        router.push('/');
    }
  };


  return (
    <div className={styles.LoginRegisterWrapper}>
      <Box component="section" className={styles.LoginRegister}>
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" spacing={5}>
            <Button
              variant="contained"
              style={{ marginBottom: '5dvh', 
                backgroundColor: value === LoginRegisterEnum.Login ? 'black' : 'white', 
                color: value === LoginRegisterEnum.Login ? 'white' : 'black'

            }}
              onClick={() => setValue(LoginRegisterEnum.Login)}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              style={{ marginBottom: '5dvh', 
                backgroundColor: value === LoginRegisterEnum.Register ? 'black' : 'white', 
                color: value === LoginRegisterEnum.Register ? 'white' : 'black'
            }}
              onClick={() => setValue(LoginRegisterEnum.Register)}
            >
              Register
            </Button>
          </Stack>
          <Typography
                variant="h4"
                style={{ marginBottom: '5dvh', color: 'red' }}
            >
                {error}
            </Typography>
          {value === LoginRegisterEnum.Login ? (
            <>
              <TextField
                id="outlined-username-input"
                label="Email"
                type="text"
                style={{ width: '50dvw' }}
                value={usernameLogin}
                onChange={(e) => setUsernameLogin(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                style={{ width: '50dvw', marginTop: '5dvh' }}
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
              />
              <Button
                variant="contained"
                style={{ width: '20dvw', height: '8dvh', backgroundColor: 'black', marginTop: '10dvh' }}
                onClick={handleLogin}
              >
                Log in
              </Button>
            </>
          ) : (
            <>
              <TextField
                id="outlined-username-input"
                label="Email"
                type="text"
                style={{ width: '50dvw' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                style={{ width: '50dvw', marginTop: '5dvh' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="outlined-password-confirm-input"
                label="Confirm Password"
                type="password"
                style={{ width: '50dvw', marginTop: '5dvh' }}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <TextField
                id="outlined-firstname-input"
                label="First Name"
                type="text"
                style={{ width: '50dvw', marginTop: '5dvh' }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                id="outlined-lastname-input"
                label="Last Name"
                type="text"
                style={{ width: '50dvw', marginTop: '5dvh' }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Button
                variant="contained"
                style={{ width: '20dvw', height: '8dvh', backgroundColor: 'black', marginTop: '5dvh' }}
                onClick={handleRegister}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default LoginRegister;