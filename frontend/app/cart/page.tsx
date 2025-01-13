'use client'

import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, TextField, Stack } from '@mui/material';
import { iCartWishlist } from '@/Utils/Interfaces';
import Link from 'next/link';

const Cart: React.FC = () => {
  const [items, setItems] = useState<iCartWishlist[]>([]); 

  return (
    <>
      <Typography variant="h4">Shopping Cart</Typography>

      {items.map(item => (
        <Card key={item.id}>
          <CardContent>
            <Typography variant="h6">Product: ${item.productId}</Typography>
            <Typography variant="body2">Total quantity: ${item.quantity}</Typography>
            <Stack>
              <TextField
                value={item.quantity}
                onChange={() => {}}
                disabled
              />
            </Stack>
          </CardContent>
        </Card>
      ))}
      <Button variant='contained'><Link href="/">Back</Link></Button>
      <Button variant="contained">Checkout</Button>
    </>
  );
};

export default Cart;