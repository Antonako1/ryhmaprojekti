"use client"

import React, { useEffect, useState } from 'react';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';
import { useAuth } from '@/Utils/context/contextUser';
import { server } from '@/Utils/consts';

interface review{
  name: string;
  rating: number;
  reviewText: string;
  userId: number | undefined;
}

const ReviewForm: React.FC = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState<string>('');
  const { token, authenticated, user } = useAuth()
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
      userId: user?.id
    }

    await fetch(`${server}/api/create-review`, {
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

    await getReviews()
  };


const getReviews = async () => {
  await fetch(`${server}/api/get-reviews?type=SITE`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
      // setError(err);
    });
  }

useEffect(() => {
  if(token != null) getReviews();
} , [token])


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
    </Box>
  );
};

export default ReviewForm;