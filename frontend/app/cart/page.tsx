'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, TextField, Stack } from '@mui/material';
import { IAlcoholDetails, ICarDetails, iCartWishlist, IProduct } from '@/Utils/Interfaces';
import Link from 'next/link';
import { server } from '@/Utils/consts';
import { useAuth } from '@/Utils/context/contextUser';

const CartWishlistItem = ({ item }: { item: iCartWishlist }) => {
  const [data, setData] = useState<ICarDetails | IAlcoholDetails | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    setData(null);
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${server}/api/get-product?id=${item.productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch product details');
        const productData = await response.json();
        setData(productData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [item.productId, token]);
  
  if (!data) return <Typography variant="h6">Loading...</Typography>;
  
  const isCar = 'carMake' in data;
  const _product = isCar ? (data as ICarDetails) : (data as IAlcoholDetails);
  const productDetails: IProduct = _product as unknown as IProduct;
  const moreDetails = isCar ? (data as ICarDetails) : (data as IAlcoholDetails);
  const product = { productDetails, moreDetails };
  if(!product.productDetails) return <Typography variant="h6">Loading...</Typography>;
  return (
    <Card sx={{ marginBottom: '1rem' }}>
      <CardContent>
        <Typography variant="h6">Product: {product.productDetails.name}</Typography>
        <Typography variant="body2">Total quantity: {product.productDetails.stock}</Typography>
        <Typography variant="body2">Price: €{product.productDetails.price}</Typography>
        <img
          style={{
            width: '300px',
            height: '200px',
            objectFit: 'cover',
            marginBottom: '1rem',
          }}
          src={product.productDetails.image}
          alt={product.productDetails.name}
        />
        <Stack direction="row" spacing={2}>
          <TextField label="Quantity" type="number" size="small" />
          <Button variant="contained">Buy</Button>
          <Button variant="contained" color="secondary">
            Remove
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Cart: React.FC = () => {
  const [items, setItems] = useState<iCartWishlist[]>([]);
  const { user, token, authenticated } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${server}/api/get-cartwishlist?type=CART&userId=${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch cart items');
        const cartData = await response.json();
        setItems(cartData);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.id) fetchCartItems();
  }, [user?.id, token]);

  if (!authenticated)
    return (
      <div>
        <Typography variant="h4">Please login to view your cart</Typography>
        <Link href="/login-register?redirect=cart">Login</Link>
      </div>
    );

  return (
    <div>
      <Typography variant="h4">Shopping Cart</Typography>
      {items.length > 0 ? (
        items.map((item) => (
          <React.Fragment key={item.id}>
            <CartWishlistItem item={item} />
            <hr />
          </React.Fragment>
        ))
      ) : (
        <Typography variant="h6">Your cart is empty</Typography>
      )}
      <br />
      <Stack direction="row" spacing={2}>
        <Button variant="contained">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Back
          </Link>
        </Button>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Stack>
    </div>
  );
};

export default Cart;
