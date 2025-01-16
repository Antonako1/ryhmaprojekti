'use client'
import { IAlcoholDetails, ICarDetails, IReview } from "@/Utils/Interfaces";
import styles from "./ItemPage.module.css";
import { useEffect, useState } from "react";
import { server, Types } from "@/Utils/consts";
import { useAuth } from "@/Utils/context/contextUser";
import AllReviews from "../AllReviews/AllReviews";

interface ItemPageProps {
    props: {
        item: ICarDetails | IAlcoholDetails | null;
        error: string | null;
        type: Types;
    };
}

const ItemPage = ({ props }: ItemPageProps) => {
    const [ratingArray, setRatingArray] = useState<number[]>([]);
    const [rating, setRating] = useState<number>(0);
    const [reviewData, setReviewData] = useState<IReview[]|[]>([]);
    const {token, user} = useAuth();
    const averageRating = (ratingArray: number[]) => {
        const sum = ratingArray.reduce((a, b) => a + b, 0);
        const average = sum / ratingArray.length;
        return average;
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${server}/api/reviews?id=${props.item?.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch reviews");
                const reviewsData = await response.json();
                setReviewData(reviewsData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchReviews();
    }, [props.item]);
    
    if (props.error) return <div className={styles.error}>Error: {props.error}</div>;
    if (!props.item || props.item == null) return <div className={styles.error}>Item not found</div>;

    const isCar = props.type === Types.CARS;
    const itemDetails = isCar
    ? (props.item as ICarDetails)
    : (props.item as IAlcoholDetails);

    
    
    const handleWishlistOrCart = async (type:string) => {
        await fetch(`${server}/api/create-cart?type=${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: props.item?.id,
                quantity: 1,
                userId: user?.id,

            }),
        })
        .then(async (res) => await res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error:any) => console.error(error))
    }
    
    const handleCartAdd = async () => {
        await handleWishlistOrCart("CART")
    }
    const handleBuying = async () => {
        handleCartAdd();
        // ...
    }
    const handleWishlist = async () => {
        await handleWishlistOrCart("WISHLIST")
    }
    const handleRating = async () => {
        
    }
    return (
        <div className={styles.itemPage}>
        <h1 className={styles.pageTitle}>
            {isCar 
            ? 
            // @ts-ignore
            `Prime condition ${itemDetails.carMake} ${itemDetails.carModel} (${itemDetails.carYear})` 
            : 
            // @ts-ignore
            `Premium ${itemDetails.alcoholBrand} (${itemDetails.alcoholType}, ${itemDetails.alcoholVolume}L, ${itemDetails.alcoholYear})`
        }
        </h1>
        <div className={styles.innerWrap}>
            <div className={styles.left_side}>
            <img
                src={props.item.productDetails.image}
                alt={props.item.productDetails.name}
                className={styles.productImage}
                />
            </div>
            <div className={styles.right_side}>
            <div className={styles.itemInfo}>
                <h2 className={styles.productName}>
                {props.item.productDetails.name}
                </h2>
                <p className={styles.productBrand}>
                    {/* Ignore warnings */}
                {isCar
                    // @ts-ignore
                    ? `${itemDetails.carMake} ${itemDetails.carModel} (${itemDetails.carYear})`
                    // @ts-ignore
                    : `${itemDetails.alcoholBrand} (${itemDetails.alcoholType}, ${itemDetails.alcoholVolume}L, ${itemDetails.alcoholYear})`}
                </p>
                <p className={styles.productDescription}>
                {props.item.productDetails.description}
                </p>
                <p className={styles.productPrice}>
                Price: {props.item.productDetails.price}€
                </p>
                <p className={styles.productId}>
                Rating: {averageRating([1, 2, 3])}/5
                </p>
                <div className={styles.actionButtons}>
                <button className={styles.addToCartButton} onClick={handleCartAdd}>Add to Cart</button>
                <button className={styles.buyNowButton} onClick={handleBuying}>Buy Now</button>
                <button className={styles.addToWishlistButton} onClick={handleWishlist}>Add to Wishlist</button>
                </div>
            </div>
            </div>
            <AllReviews props={{ list: reviewData }} />
        </div>
        </div>

    );
};

export default ItemPage;
