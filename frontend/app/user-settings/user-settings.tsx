'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IUser, UserRoles } from '@/Utils/Interfaces';
import { useAuth } from '@/Utils/context/contextUser';
import { server } from '@/Utils/consts';



const UserSettings = () => {
    return (
        <div>
             <TextField id="AccountGmail" label="Account" variant="outlined" />
        </div>
    );
}

export default UserSettings;