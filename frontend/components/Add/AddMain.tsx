'use client'

import { useState } from "react";
import AddAlcohol from "./AddAlcohol";
import AddCar from "./AddCar";
import styles from "./AddItem.module.css"
import { IAlcoholDetails, ICarDetails } from "@/Utils/Interfaces";
import { server, Types } from "@/Utils/consts";
import { useAuth } from "@/Utils/context/contextUser";


interface AddProductProps {
    props: {
        TYPE: Types;
    };
}

const AddProduct = ({ props }: AddProductProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ICarDetails | IAlcoholDetails | null>(null);
    const { token } = useAuth();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        
        const inputValues = Object.fromEntries(formData.entries());
        if(props.TYPE === Types.ALCOHOL) setData(inputValues as unknown as IAlcoholDetails)
        else if(props.TYPE === Types.CARS) setData(inputValues as unknown as ICarDetails)
        ;
        const link = props.TYPE === Types.ALCOHOL ? "create-alcohol" : "create-car";
        const res = fetch(`${server}/api/${link}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(inputValues),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError(err);
            setLoading(false);
        });
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    
    return(
        <div>
            <h2>{props.TYPE === Types.ALCOHOL ? "Add Alcohol" : "Add Car"}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" required />

                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name="stock" required />

                <label htmlFor="image">Image</label>
                <input type="text" id="image" name="image" required />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" required />
                {props.TYPE === Types.ALCOHOL ? (
                    <AddAlcohol />
                ) : (
                    <AddCar />
                )}
            </form>
        </div>
    )
}

export default AddProduct;