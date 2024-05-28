
'use client'
import React from 'react'
import AddOrderForm from '@/components/forms/AddOrderForm'
import { useState } from 'react';

type Props = {}

function Page({ }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
    } else {
        return (<div className="flex justify-center flex-col"><AddOrderForm /></div>)
    };
}

export default Page