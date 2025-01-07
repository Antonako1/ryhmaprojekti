import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './LoginRegister.module.css';

const LoginRegister = () => {
    return (
        <div className={styles.LoginRegisterWrapper}>
            <Box component="section" className={styles.LoginRegister}>
                <Stack spacing={2} alignItems="center"> 
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
};

export default LoginRegister;