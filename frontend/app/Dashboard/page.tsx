'use client'

import AddProduct from "@/components/Add/AddMain";
import RollingCatalog from "@/components/RollingCatalog/RollingCatalog";
import { server } from "@/Utils/consts";

const Dashboard = () => {
    const add_product = async (data:any, link:string) => {
        for(let i = 0; i < 5; i++){
            try {
                const res = fetch(`${server}/api/${link}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.error(err);
                });
            } catch (error) {
                
            }
        }
    }
    const debug1 = async () => {
        add_product({
            name: "Nissan Almera",
            price: 10000,
            stock: 10,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvTkzvNaRYPEc_qAZ0fPrSxo-Zmtga0-jWw&s",
            description: "Mafia car",
            carMake: "Nissan",
            carModel: "Almera, Sedan",
            carYear: 2003,
            carMileage: 0,
        }, "create-car");
    }
    const debug2 = async () => {
        add_product({
            name: "Nakkikosanderi",
            price: 10,
            stock: 10,
            image: "https://media.discordapp.net/attachments/1326099610560630867/1326476341800996895/IMG_0294.jpg?ex=677f90dc&is=677e3f5c&hm=6390f6c94e616c0c222aa97b864b1c685ce633966598daceff76a17d81f73d34&=&format=webp&width=321&height=571",
            description: "bruh",
            alcoholType: "Vodka",
            alcoholBrand: "Koskenkorva",
            alcoholVolume: 40,
            alcoholYear: 2021,
        }, "create-alcohol");
    }
    return (
        <div>
            <RollingCatalog props={{TO_FETCH: "CARS"}}/>
            <RollingCatalog props={{TO_FETCH: "ALCOHOL"}}/>
            <AddProduct props={{TYPE: "CARS"}}/>
            <hr />
            <AddProduct props={{TYPE: "ALCOHOL"}}/>

            <button onClick={debug1}>Debug cars</button>
            <button onClick={debug2}>Debug alcohol</button>
        </div>
    )
}

export default Dashboard;