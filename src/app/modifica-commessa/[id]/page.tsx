'use client'
import { isAuthenticated } from '@/utils/Auth/Auth';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react'
import AdminOrderForm from '@/components/forms/AdminOrderForm';

type Props = {}

export default function Page({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        const isAuth = isAuthenticated();
        if (!isAuth) {
            redirect("/login")
        } else setIsLoading(false);
    }, [])


    if (isLoading) {
        return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
    } else {
        return (<div><AdminOrderForm orderId={params.id} /></div>)
    };
}
