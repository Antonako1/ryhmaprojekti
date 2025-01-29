'use client'
import { IAlcoholDetails, ICarDetails, IReview } from "@/Utils/Interfaces";
import styles from "./ItemPage.module.css";
import { useEffect, useState } from "react";
import { server, Types } from "@/Utils/consts";
import { useAuth } from "@/Utils/context/contextUser";
import AllReviews from "../AllReviews/AllReviews";
import ReviewForm from "../Review/Review";
import { useRouter } from "next/navigation";

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
    const {token, user, authenticated} = useAuth();
    const [updateReviews, setUpdateReviews] = useState<boolean>(false);
    const router = useRouter();
    const averageRating = (ratingArray: number[]) => {
        const sum = ratingArray.reduce((a, b) => a + b, 0);
        const average = sum / ratingArray.length;
        return Math.round(average * 10) / 10;
    }

    const fetchReviews = async () => {
        await fetch(`${server}/api/get-reviews?type=${props.type === Types.CARS ? "CARS" : "ALCOHOL"}&limit=50&offset=0`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(async (res) => await res.json())
        .then((data) => {
            setReviewData(data.reviews);
            setUpdateReviews(false);
        })
        .catch((error:any) => console.error(error))
    }
    useEffect(() => {
        if(token != null) fetchReviews();
    }, [props.item, updateReviews, token]);

    
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
        alert("Item added to cart")
    }
    const handleBuying = async () => {
        handleCartAdd();
        router.push("/cart");
    }
    const handleWishlist = async () => {
        await handleWishlistOrCart("WISHLIST")
        alert("Item added to wishlist")
    }
  
    return (
      <div className={styles.itemPage}>
        <h1 className={styles.pageTitle}>
          {isCar
            //@ts-ignore
            ? `Prime condition ${itemDetails.carMake} ${itemDetails.carModel} (${itemDetails.carYear})`
            //@ts-ignore
            : `Premium ${itemDetails.alcoholBrand} (${itemDetails.alcoholType}, ${itemDetails.alcoholVolume}L, ${itemDetails.alcoholYear})`}
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
              <h2 className={styles.productName}>{props.item.productDetails.name}</h2>
              <p className={styles.productDescription}>
                {props.item.productDetails.description}
              </p>
              <p className={styles.productPrice}>Price: {props.item.productDetails.price}€</p>
              <p className={styles.productId}>
                Rating: {averageRating(reviewData.map((review) => review.rating))}/5
              </p>
              {
                !authenticated ? 
                    <></>
                    :
                    <div className={styles.actionButtons}>
                        <button onClick={handleCartAdd} className={styles.addToCartButton}>
                        Add to Cart
                        </button>
                        <button onClick={handleWishlist} className={styles.addToWishlistButton}>
                        Add to Wishlist
                        </button>
                        <button className={styles.buyNowButton} onClick={handleBuying}>
                            Buy
                        </button>
                    </div>
              }
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <div className={styles.reviews}>
          <ReviewForm props={{ type: props.type, updateReviews: setUpdateReviews, product_id: props.item.productDetails.product_id  }} />
          <AllReviews props={{ list: reviewData }} />
        </div>
      </div>
    );
  };
  
  export default ItemPage;
  