'use client'

import { IAlcoholDetails, ICarDetails } from "@/Utils/Interfaces";
import styles from "./ItemPage.module.css";
import { useState } from "react";
import { Types } from "@/Utils/consts";

interface ItemPageProps {
  props: {
    item: ICarDetails | IAlcoholDetails | null;
    error: string | null;
<<<<<<< Updated upstream
    type: Types
=======
    type: Types;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

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
            <h1 className={styles.pageTitle}>Looking for some <i>{props.item.productDetails.name}</i>?</h1>
            <div className={styles.innerWrap}>
                <div className={styles.productWrap}>
                    <div className={styles.left_side}>
                        <img
                        src={props.item.productDetails.image}
                        alt={props.item.productDetails.name}
                        className={styles.productImage}
                        />
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.itemInfo}>
                            <p className={styles.productDescription}>{props.item.productDetails.description}</p>
                                <span className={styles.productName}>{props.item.productDetails.name}</span>
                                <span className={styles.productBrand}>{
                                props.item.
                                }</span>
                            </p>
                            <p className={styles.productPrice}>Price: {props.item.productDetails.price}€</p>
                            <p className={styles.productId}>Rating: {averageRating([1,2,3])}/5</p>
                        </div>
                    </div>
                </div>
=======
    return (
        <div className={styles.itemPage}>
        <h1 className={styles.pageTitle}>Looking for some <i>{props.item.productDetails.name}</i>?</h1>
        <div className={styles.innerWrap}>
            <img
            src={props.item.productDetails.image}
            alt={props.item.productDetails.name}
            className={styles.productImage}
            />
            <div className={styles.itemInfo}>
                <h2 className={styles.productTitle}>{props.item.productDetails.name}</h2>
                <p className={styles.productDescription}>
                    {props.item.productDetails.description}
                </p>
                <p className={styles.productPrice}>Price: {props.item.productDetails.price}€</p>
                <p className={styles.productId}>Rating: {averageRating([1,2,3])}/5</p>

>>>>>>> Stashed changes
            </div>
        </div>
    );
};

export default ItemPage;
