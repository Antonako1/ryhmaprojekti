"use client";
import { server } from "@/Utils/consts";
import { useState } from "react";
import { useAuth } from "@/Utils/context/contextUser";
const Depo = () => {
    const [error, setError] = useState<string | null>(null);
    const { token, user } = useAuth();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        await fetch(`${server}/transaction?type=DEPO`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: 0,
                user_id: user?.id,
                quantity: 0,
                moneySpent: e.target[0].value
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => {
            if(err.message) setError(err.message);
            else setError("Internal Server Error");
            console.log(err)
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Amount" />
            <button>Deposit</button>
        </form>
    )
}

export default Depo;