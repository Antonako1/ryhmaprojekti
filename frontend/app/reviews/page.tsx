"use client"

import React, { useEffect, useState } from 'react';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';
import { useAuth } from '@/Utils/context/contextUser';
import { server, Types } from '@/Utils/consts';
import { IReview } from '@/Utils/Interfaces';
import AllReviews from '@/components/AllReviews/AllReviews';
import ReviewForm from '@/components/Review/Review';


const ReviewFormPage: React.FC = () => {
  const { token, authenticated, user } = useAuth()
  const [reviews, setReviews] =useState<IReview[] | []>([])
  const [updateReviews, setUpdateReviews] = useState<boolean>(false);
  const getReviews = async () => {
    await fetch(`${server}/api/get-reviews?type=SITE`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(async (res) => await res.json())
      .then((data) => {
        console.log(data);
        setReviews(data.reviews)
        setUpdateReviews(false);
      })
      .catch((err) => {
        console.error(err);
      });
    }

    useEffect(() => {
      if(token != null) getReviews();
    } , [token, server, updateReviews]);


  return (
    <Box>
      <Typography variant="h4">Leave a review</Typography>
      <ReviewForm props={{type: Types.SITE, updateReviews: setUpdateReviews}} />
      {reviews.length > 0 ? (
        <AllReviews props={{list: reviews}} />
      ) : (
        <></>
      )}

    </Box>
  );
};

export default ReviewFormPage;