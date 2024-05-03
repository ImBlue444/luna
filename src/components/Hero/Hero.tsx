'use client'
import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';


type Props = {
    title: any,
    isSubSection: boolean
}

const Hero = (props: Props) => {
    const router = useRouter();

    return (
        <div>
            <div className='flex items-center'>
                {
                    props.isSubSection ?
                        <div className='cursor-pointer hover:bg-base-200 ml-4 p-4 rounded-lg' onClick={() => router.back()}>
                            <FaArrowLeft size={28} />
                        </div>
                        : null
                }
                <main className=" prose">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight p-6">
                        {props.title}
                    </h1>
                </main>
            </div>
        </div>
    )
}

export default Hero