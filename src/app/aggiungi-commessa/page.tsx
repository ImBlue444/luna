
'use client'
import React, { useLayoutEffect } from 'react'
import AddOrderForm from '@/components/forms/AddOrderForm'
import { useState } from 'react';
import { isAuthenticated } from '@/utils/Auth/Auth';
import { redirect } from 'next/navigation';

type Props = {}

function Page({ }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        const isAuth = isAuthenticated();
        if (!isAuth) {
            redirect("/login")
        } else setIsLoading(false);
    }, [])


    if (isLoading) {
        return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
    } else {
        return (<div className="flex justify-center flex-col"><AddOrderForm /></div>)
    };
}

export default Page