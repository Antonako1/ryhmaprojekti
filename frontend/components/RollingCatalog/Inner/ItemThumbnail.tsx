import { IAlcoholDetails, ICarDetails } from "@/Utils/Interfaces";
import styles from "../RollingCatalog.module.css";

interface ItemThumbnailProps {
    props: {
        item: ICarDetails | IAlcoholDetails;
        handleClick : (id:number) => void;
    };
}

const ItemThumbnail = ({ props }: ItemThumbnailProps) => {
    return (
        <div className={styles.itemThumbnail} onClick={() => props.handleClick(props.item.id)}>
            <img src={props.item.productDetails.image} alt={props.item.productDetails.name} />
            <div className={styles.info}>
                <h3>{props.item.productDetails.name}</h3>
                <p>About: {props.item.productDetails.description}</p>
                <p>{props.item.productDetails.price}€</p>
                <p>Rating: {props.item.id}</p>
            </div>
        </div>
    );
};

export default ItemThumbnail;