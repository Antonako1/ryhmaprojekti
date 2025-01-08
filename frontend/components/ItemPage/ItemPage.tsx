import { IAlcoholDetails, ICarDetails } from "@/Utils/Interfaces";
import styles from "./ItemPage.module.css";
interface ItemPageProps {
    props: {
        item: ICarDetails | IAlcoholDetails | null;
        error: string | null;
    };
}

const ItemPage = ({ props }: ItemPageProps) => {
    if(props.error) return <div>Error: {props.error}</div>
    if(!props.item) return <div>Item not found</div>
    return (
        <div className={styles.itemPage}>
            <h1>Welcome to product section</h1>
            <img src={props.item.productDetails.image} alt={props.item.productDetails.name} />
            <h3>{props.item.productDetails.name}</h3>
            <p>{props.item.productDetails.description}</p>
            <p>{props.item.productDetails.price}€</p>
            <p>{props.item.id}</p>
        </div>
    )
}

export default ItemPage;
