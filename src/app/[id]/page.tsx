'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Hero from '@/components/Hero/Hero'
import { useParams } from 'next/navigation'
import Steps from '@/components/Hero/Steps'
import axios from 'axios'
import OrderTable from '@/components/tables/OrderTable'
type Props = {}

interface Order {
    order_id: number;
    customer_name: string;
    order_date: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    shipping_address: string;
    shipping_date: string;
    status: string;
}

const page = (props: Props) => {
    const [order, setOrder] = useState<Order>()
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const param = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/single.json');
                setOrder(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className='loading loading-bars loading-lg' /></div>;
    }


    return (
        <div>
            <Hero isSubSection title={order?.product_name} />
            <div className='flex justify-center items-center flex-col'>
                <Steps status={order?.status || "loading"} />
                <div className='my-10 flex gap-4'>
                    <button className="btn btn-error rounded-lg">Indietro</button>
                    <button className="btn btn-info rounded-lg">Avanti</button>
                </div>
            </div>
            <span className=' '>
                <OrderTable order_date={order?.order_date ?? ""} />
            </span>
        </div >
    )
}

{/*    "order_id": 1,X
    "customer_name": "Shay Bowhay",X
    "order_date": "12/20/2022",X
    "product_name": "Tale of Cinema (Geuk jang jeon)",
    "quantity": 96,
    "unit_price": 764.72,
    "total_price": 73413.12,
    "shipping_address": "82 Clyde Gallagher Plaza",
    "shipping_date": "6/1/2022",
    "status": "shipped" 
*/}
export default page
