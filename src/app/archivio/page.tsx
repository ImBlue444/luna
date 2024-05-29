'use client'
import { isAuthenticated } from '@/utils/Auth/Auth';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        const isAuth = isAuthenticated();
        if (!isAuth) {
            redirect("/")
        } else setIsLoading(false);
    }, [])


    if (isLoading) {
        return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
    } else {
        return (<div className="flex justify-center flex-col">Archivio</div>)
    };
}

export default Page