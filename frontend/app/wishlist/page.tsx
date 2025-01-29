'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { IAlcoholDetails, ICarDetails, iCartWishlist, IProduct } from '@/Utils/Interfaces';
import Link from 'next/link';
import { server } from '@/Utils/consts';
import { useAuth } from '@/Utils/context/contextUser';
import { useRouter } from 'next/navigation';

const CartWishlistItem = ({ item }: { item: iCartWishlist }) => {
  const [data, setData] = useState<ICarDetails | IAlcoholDetails | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
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
  const product = { productDetails, moreDetails: _product };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Card sx={{ marginBottom: '1rem' }}>
      <CardContent>
        <Typography variant="h6">Product: {product.productDetails.name}</Typography>
        <Typography variant="body2">Total quantity: {product.productDetails.stock}</Typography>
        <Typography variant="body2">Price: €{product.productDetails.price}</Typography>
        <img
          onClick={() => {
            const idStackLocal = isCar
              // @ts-ignore
              ? product.moreDetails.carDetails.id
              // @ts-ignore
              : product.moreDetails.alcoholDetails.id;
            if (!idStackLocal) return;
            const url = `/${isCar ? 'cars' : 'alcohol'}/${idStackLocal}`;
            router.push(url);
          }}
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
          <Button variant="contained" color="secondary" onClick={async () => {
                      await fetch(`${server}/api/remove-cart-wishlist?type=WISHLIST&productId=${item.productId}`,
                        {
                          method: 'DELETE',
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      ); handleRefresh()
                    }}>
            Remove
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<iCartWishlist[]>([]);
  const { user, token, authenticated } = useAuth();
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: '',
    address: '',
    paymentInfo: '',
  });
  
  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${server}/api/get-cartwishlist?type=WISHLIST&userId=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch wishlist items');
      const cartData = await response.json();

      setItems(cartData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (user?.id) fetchCartItems();
  }, [user?.id, token]);

  const handleSubmitOrder = async () => {
    try {
      console.log('Order details:', formDetails, items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })));
      setOpenCheckoutDialog(false);

      await fetch(`${server}/api/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listing: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity || 1,
          })),
        }),
      })
      .then(async (res) =>await res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
      .finally(() => fetchCartItems());
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (!authenticated)
    return (
      <div>
        <Typography variant="h4">Please login to view your wishlist</Typography>
        <Link href="/login-register?redirect=wishlist">Login</Link>
      </div>
    );

  return (
    <div>
      <Typography variant="h4">Wishlist</Typography>
      {items.length > 0 ? (
        items.map((item) => (
          <React.Fragment key={item.id}>
            <CartWishlistItem item={item} />
            <hr />
          </React.Fragment>
        ))
      ) : (
        <Typography variant="h6">Your wishlist is empty</Typography>
      )}
      <br />
      <Stack direction="row" spacing={2}>
        <Button variant="contained">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Back
          </Link>
        </Button>
      </Stack>
    </div>
  );
};

export default Wishlist;