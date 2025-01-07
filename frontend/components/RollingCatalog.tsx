'use client'
import { useEffect, useState } from "react";
import { IAlcoholDetails, ICarDetails } from "@/Utils/Interfaces";
import { server } from "@/Utils/consts";
import styles from "./RollingCatalog.module.css";

interface RollingCatalogProps {
    props: {
        // TO_FETCH is a string that can only be "ALCOHOL" or "CARS"
        TO_FETCH: "ALCOHOL" | "CARS";
    };
}

const RollingCatalog = ({ props }: RollingCatalogProps) => {
    const [catalogData, setCatalogData] = useState<ICarDetails[] | IAlcoholDetails | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [limit, setLimit] = useState<number>(5);
    const [offset, setOffset] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Construct the URLs
            const fetch_link_all = props.TO_FETCH === "ALCOHOL" 
                ? `${server}/api/get-amount/car` 
                : `${server}/api/get-amount/alcohol`;

            const fetch_link_products = props.TO_FETCH === "ALCOHOL" 
                ? `${server}/api/all-alcohols?limit=${limit}&offset=${offset}` 
                : `${server}/api/all-cars?limit=${limit}&offset=${offset}`;

            const resAll = await fetch(fetch_link_all);
            console.log(resAll);
            if (!resAll.ok) throw new Error("Failed to fetch total amount");
            const dataAll = await resAll.json();
            console.log(dataAll);
            setTotalAmount(dataAll.AmountOfCars || dataAll.AmountOfAlcohols);
            
            // Fetch products
            const resProducts = await fetch(fetch_link_products);
            if (!resProducts.ok) throw new Error("Failed to fetch products");
            const dataProducts = await resProducts.json();
            console.log(dataProducts);
            setCatalogData(dataProducts);

            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [limit, offset, props.TO_FETCH]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error}</h1>;

    return (
        <div>
            <h1>Catalog</h1>
            <div className={styles.catalog}>
                
            </div>
        </div>
    );
};

export default RollingCatalog;
