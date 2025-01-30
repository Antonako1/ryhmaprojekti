'use client'

import AddProduct from "@/components/Add/AddMain";
import RollingCatalog from "@/components/RollingCatalog/RollingCatalog";
import { server, Types } from "@/Utils/consts";
import { useAuth } from "@/Utils/context/contextUser";
import { UserRoles } from "@/Utils/Interfaces";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { token, user } = useAuth();
    const router = useRouter();
    if(user?.role !== UserRoles.Admin){
        return (
            <div>
                <h1>Access denied</h1>
                <button>
                    {/* <a href="/">Home</a> */}
                </button>
                <button>
                    <a href="/login-register?redirect=dashboard">Login</a>
                </button>
            </div>
        )
    }
    console.log(token);
    
    const add_product = async (data:any, link:string) => {
        for(let i = 0; i < 5; i++){
            try {
                const headers:any = {
                    "Content-Type": "application/json",
                };
                if (token) headers["Authorization"] = `Bearer ${token}`;
                
                console.log(headers);
                await fetch(`${server}/api/${link}`, {
                    method: "POST",
                    headers,
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
            name: "Mercedes-Benz A",
            price: 10000,
            stock: 10,
            image: "https://cdn.motor1.com/images/mgl/487Bo/s1/four-generations-of-mercedes-a-class.webp",
            description: "Mafia car",
            carMake: "Mercedes-Benz",
            carModel: "A",
            carYear: 2003,
            carMileage: 0,
        }, "create-car");
    }
    const debug2 = async () => {
        add_product({
            name: "Nakkikosanderi Old generation",
            price: 10,
            stock: 10,
            image: "https://media.discordapp.net/attachments/1326099610560630867/1334409735276855398/IMG_0275.jpg?ex=679c6d69&is=679b1be9&hm=41728c068bd621a9e2c08c8e12677edd7ac5b085f8fc0e2e505bc69d54486a03&=&format=webp&width=321&height=571",
            description: "bruh",
            alcoholType: "Vodka",
            alcoholBrand: "Koskenkorva",
            alcoholVolume: 40,
            alcoholYear: 2021,
        }, "create-alcohol");
    }

    const debug3 = async () => {
        const res = fetch(`${server}/api/set-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }
    return (
        <div>
            <RollingCatalog props={{TO_FETCH: Types.CARS}}/>
            <RollingCatalog props={{TO_FETCH: Types.ALCOHOL}}/>
            <AddProduct props={{TYPE: Types.CARS}}/>
            <hr />
            <AddProduct props={{TYPE: Types.ALCOHOL}}/>

            <button onClick={debug1}>Debug cars</button>
            <button onClick={debug2}>Debug alcohol</button>
            <button onClick={debug3}>Debug user</button>
        </div>
    )
}

export default Dashboard;