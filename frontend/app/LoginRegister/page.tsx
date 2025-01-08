"use client"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './LoginRegister.module.css';
import * as React from 'react';

const LoginRegister: React.FC = () => {
    const [value, setValue] = React.useState(0)

    if (value === 0) {
    return (
        <div className={styles.LoginRegisterWrapper}>
            <Box component="section" className={styles.LoginRegister}>
                <Stack spacing={2} alignItems="center">
                <Stack direction='row' spacing={5}>
                    <Button variant="contained"
                        style={{ marginBottom: '5dvh', backgroundColor: 'black' }}
                        onClick={() => setValue(0)}>
                        Kirjaudu
                        </Button>
                    <Button variant="outlined"
                        style={{ marginBottom: '5dvh', borderColor: 'black', color: 'black' }} 
                        onClick={() => setValue(1)}>
                        Rekisteröidy
                    </Button>
                </Stack> 
                    <TextField
                        id="outlined-username-input"
                        label="Username"
                        type="text"
                        style={{ width: '50dvw' }} 
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        style={{ width: '50dvw', marginTop: '5dvh' }} 
                    />
                    <Button 
                        variant="contained"
                        style={{ width: '20dvw', height: '8dvh' ,backgroundColor: 'black', marginTop: '10dvh' }}
                        >
                        Log in
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

else if (value === 1) {
    return (
        <div className={styles.LoginRegisterWrapper}>
            <Box component="section" className={styles.LoginRegister}>
                <Stack spacing={2} alignItems="center">
                <Stack direction='row' spacing={5}>
                    <Button variant="outlined"
                        style={{ marginBottom: '2dvh', borderColor: 'black', color: 'black' }}
                        onClick={() => setValue(0)}>
                        Kirjaudu
                    </Button>
                    <Button variant="contained"
                        style={{ marginBottom: '2dvh', backgroundColor: 'black' }} 
                        onClick={() => setValue(1)}>
                        Rekisteröidy
                    </Button>
                </Stack> 
                    <TextField
                        id="outlined-username-input"
                        label="Username"
                        type="text"
                        style={{ width: '50dvw' }} 
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        style={{ width: '50dvw', marginTop: '5dvh' }} 
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Confirm password"
                        type="password"
                        style={{ width: '50dvw', marginTop: '5dvh' }} 
                    />
                    <Button 
                        variant="contained"
                        style={{ width: '20dvw', height: '8dvh' ,backgroundColor: 'black', marginTop: '5dvh' }}
                        >
                        Register
                    </Button>
                </Stack>
            </Box>
        </div>
    )
}
};

export default LoginRegister;