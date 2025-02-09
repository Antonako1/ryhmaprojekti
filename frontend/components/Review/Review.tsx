"use client"

import React, { useEffect, useState } from 'react';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';
import { useAuth } from '@/Utils/context/contextUser';
import { server, Types } from '@/Utils/consts';
import { IReview } from '@/Utils/Interfaces';
import AllReviews from '@/components/AllReviews/AllReviews';

interface ReviewProps {
    props: {
        type: Types;
        updateReviews: (value: boolean) => void;
        product_id: number | null;
    };
}
interface review{
  name: string;
  rating: number;
  reviewText: string;
  userId: number | undefined;
  product_id: number | null;
}

const ReviewForm = ({props}:ReviewProps) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState<number | null>(0);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState<string>('');
    const { token, authenticated, user } = useAuth()
    const [reviews, setReviews] =useState<IReview[] | []>([])
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (!name || rating === null || !reviewText) {
        setError('Please fill all fields!');
        return;
      }
      const inputValues:review = {
        name,
        rating,
        reviewText,
        userId: user?.id,
        product_id: props.product_id,
      }
  
      await fetch(`${server}/api/create-review?type=${props.type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(inputValues),
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
      })
      .catch((err) => {
          console.error(err);
          setError(err);
      });
  
      setName('');
      setRating(0);
      setReviewText('');
      setError('');

      props.updateReviews(true);
    };
  
  
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
          backgroundColor: '#f4f4f4', 
        }}
      >
        <Box
          sx={{
            width: 400,
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Give Feedback
          </Typography>
  
          {error && <Typography color="error">{error}</Typography>}
  
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1">Rating</Typography>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                
              />
            </Box>
  
            <TextField
              label="Your Feedback"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
  
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, backgroundColor: 'black' }}
              disabled={!authenticated}
            >
              Submit Feedback
            </Button>
          </form>
        </Box>
        {reviews.length > 0 ? (
          <AllReviews props={{list: reviews}} />
        ) : (
          <></>
        )}
  
      </Box>
    );
  };
  
  export default ReviewForm;