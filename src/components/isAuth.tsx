"use client";
import { isAuthenticated } from "@/utils/Auth/Auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const auth = isAuthenticated();


        useEffect(() => {
            console.log(isAuthenticated())
        }, []);


        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}