'use client'
import { useEffect, useState } from "react";
import { IAlcoholDetails, ICarDetails } from "@/Utils/Interfaces";
import { server } from "@/Utils/consts";
import styles from "./RollingCatalog.module.css";
import ItemThumbnail from "./Inner/ItemThumbnail";
import { useRouter } from "next/navigation";

interface RollingCatalogProps {
    props: {
        TO_FETCH: "ALCOHOL" | "CARS";
    };
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

const RollingCatalog = ({ props }: RollingCatalogProps) => {
    const [catalogData, setCatalogData] = useState<ICarDetails[] | IAlcoholDetails[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [limit, setLimit] = useState<number>(5);              // Catalog items per page
    const [offset, setOffset] = useState<number>(0);            // Catalog items offset
    const [totalAmount, setTotalAmount] = useState<number>(0);  // Total amount of catalog items
    const [prevDisabled, setPrevDisabled] = useState<boolean>(true);
    const router = useRouter();

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetch_link_products = props.TO_FETCH === "ALCOHOL" 
                ? `${server}/api/all-alcohol?limit=${limit}&offset=${offset}` 
                : `${server}/api/all-cars?limit=${limit}&offset=${offset}`;
            const resProducts = await fetch(fetch_link_products);
            if (!resProducts.ok) throw new Error("Failed to fetch products");
            const dataProducts = await resProducts.json();
            setTotalAmount(dataProducts.total);
            setCatalogData(props.TO_FETCH === "ALCOHOL" ? dataProducts.alcohols : dataProducts.cars);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    };
    console.log(catalogData);
    useEffect(() => {
        fetchData();
    }, [limit, offset, props.TO_FETCH]);

    const handleNavigation = (direction: "PREV" | "NEXT") => {
        if(direction === "PREV" && offset - limit >= 0){
            setOffset(offset - limit);
        }
        else if(direction === "NEXT" && offset + limit < totalAmount){
            setOffset(offset + limit);
        }
    };

    useEffect(() => {
        setPrevDisabled(offset === 0);
    }, [offset]);

    const handleImageClick = (id: number) => {
        
        if(props.TO_FETCH === "ALCOHOL"){
            router.push(`/alcohols/${id}`);
        } else {
            router.push(`/cars/${id}`);
        }
    };

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error}</h1>;

    return (
        <div>
            <h1>Catalog</h1>
            <div className={styles.catalog}>
                {
                    catalogData.map((item: ICarDetails | IAlcoholDetails) => (
                        <ItemThumbnail key={item.id} props={{ item, handleClick: handleImageClick }}  />
                    ))
                }
            </div>
            
            <div className={styles.paginationContainer}>
                <p>Showing {offset + 1} - {Math.min(offset + limit, totalAmount)} of {totalAmount} items</p>
                <div className={styles.pagination}>
                    <button onClick={() => handleNavigation("PREV")} disabled={prevDisabled}>Previous page</button>
                    <button onClick={() => handleNavigation("NEXT")} disabled={offset + limit >= totalAmount}>Next page</button>
                </div>

                <label htmlFor="limit">Items per page:</label>
                <select id="limit" value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
                    {
                        ITEMS_PER_PAGE_OPTIONS.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export default RollingCatalog;
