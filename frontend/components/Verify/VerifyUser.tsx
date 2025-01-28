'use client'

import { server } from "@/Utils/consts";
import { useAuth } from "@/Utils/context/contextUser";
import { useEffect } from "react";

const VerifyUser = () => {
    const { authenticated, token, logout, user } = useAuth();
    useEffect(() => {
        if (authenticated) {
            async function fetchUser() {
            await fetch(server+"/api/verify-token", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(async (res) => res.json())
            .then(async (data) => {
                console.log("Verify:", data)
                if (data.error) {
                    logout();
                }
            })
            .catch((error) => {
                console.error(error);
                logout();
            }); 

        }
            fetchUser();
        }
    }, [authenticated, token]);
    return <></>
}   

export default VerifyUser;