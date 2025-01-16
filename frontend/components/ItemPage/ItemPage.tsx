'use client'
import { IAlcoholDetails, ICarDetails } from "@/Utils/Interfaces";
import styles from "./ItemPage.module.css";
import { useState } from "react";
import { Types } from "@/Utils/consts";

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
    
    const averageRating = (ratingArray: number[]) => {
        const sum = ratingArray.reduce((a, b) => a + b, 0);
        const average = sum / ratingArray.length;
        return average;
    }
    
    if (props.error) return <div className={styles.error}>Error: {props.error}</div>;
    if (!props.item) return <div className={styles.error}>Item not found</div>;
    
    const isCar = props.type === Types.CARS;
    const itemDetails = isCar
    ? (props.item as ICarDetails)
    : (props.item as IAlcoholDetails);
    
    
    const handleCartAdd = async () => {
        
    }
    const handleBuying = async () => {
        handleCartAdd();
        // ...
    }
    const handleWishlist = async () => {
        
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
                <button className={styles.addToCartButton}>Add to Cart</button>
                <button className={styles.buyNowButton}>Buy Now</button>
                <button className={styles.addToWishlistButton}>Add to Wishlist</button>
                </div>
            </div>
            </div>
        </div>
        </div>

    );
};

export default ItemPage;
