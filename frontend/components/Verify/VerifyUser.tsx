'use client'

import { server } from "@/Utils/consts";
import { useAuth } from "@/Utils/context/contextUser";
import { useEffect } from "react";

const VerifyUser = () => {
    const { authenticated, token, logout } = useAuth();
    useEffect(() => {
        console.log(authenticated);
        if (authenticated) {
            async function fetchUser() {
            const response = await fetch(server+"/api/verify-token", {
                method: "GET",
                headers: {
                "Authorization": `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if (data.error) {
                console.error(data.error);
                logout();
            } else {
                console.log(data);
            }
            }
            fetchUser();
        }
    }, [authenticated, token]);
    return <></>
}   

export default VerifyUser;