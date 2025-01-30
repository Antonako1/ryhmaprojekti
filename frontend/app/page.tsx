'use client'
import React from "react";
import { Container, Typography,  Grid, Card, CardContent } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to ALC & AUTOS – Where Luxury Meets Luck!
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Looking for the ultimate shopping and entertainment experience? You’ve come to the right place!
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                High-End & Affordable Autos 
              </Typography>
              <Typography variant="body1">
                Find your dream car or a reliable ride at unbeatable prices.🚗
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Premium Alcohol Selection
              </Typography>
              <Typography variant="body1">
                Order top-shelf spirits and craft brews, delivered to your door.🍺
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Exciting Gambling Options 
              </Typography>
              <Typography variant="body1">
                Take a spin on our casino games and win big!🤑🎰
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
