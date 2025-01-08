"use client"

import React, { useState } from 'react';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';

const ReviewForm: React.FC = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || rating === null || !reviewText) {
      setError('Please fill all fields!');
      return;
    }

    setName('');
    setRating(0);
    setReviewText('');
    setError('');
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
          Write a Review
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
            label="Your Review"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, backgroundColor: 'black' }}
          >
            Submit Review
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ReviewForm;