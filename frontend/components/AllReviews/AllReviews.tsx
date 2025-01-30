import { IReview } from "@/Utils/Interfaces";
import { TextField, Button, Rating, Box, Typography, Stack, Card, CardContent } from '@mui/material';
import { relative } from "path";

interface AllReviewsProps {
    props: {
        list: IReview[] | [];
    }
}

const AllReviews = ({props}: AllReviewsProps) => {
    console.log("Current reviews: ", props.list, "Length: ", props.list.length);
    if (props.list.length < 1) return <Typography variant="h6">No reviews yet!</Typography>;

    return (
        <Box
            sx={{
                display: 'flex',  
                justifyContent: 'center',  
                alignItems: 'center',  
                height: '100vh',  
                padding: 2,  
            }}
        >
            <Box
                sx={{
                    maxHeight: "400px",
                    height: "400px",
                    overflow: "scroll",
                    width: '100%',  
                    maxWidth: '600px',  
                    paddingRight: 1,
                }}
            >
                <Stack spacing={2}>
                    {props.list.map((review: IReview, index: number) => {
                        console.log("Review: ", review);
                        return (
                            <Card key={index} sx={{ boxShadow: 3, borderRadius: 2, bgcolor: '#f9f9f9' }}>
                                <CardContent>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Rating value={review.rating} readOnly />
                                        <Typography variant="body1" fontWeight="bold" color="alert">
                                            {review.name}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" color="textSecondary" mt={1}>
                                        {review.review}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Stack>
            </Box>
        </Box>
    );
};

export default AllReviews;
