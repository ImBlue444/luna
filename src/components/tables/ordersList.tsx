
'use client'
import React, { useState, useEffect } from 'react'
import Order from '../elements/Order';
import axios from 'axios';

type Props = {};


const OrdersList = (props: Props) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/orders')
            .then(function (response) {
                setOrders(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        console.log(orders)

    }, [orders])


    return (
        <div className='flex flex-col gap-14'>
            {orders.map((order, index) => <div key={index}><Order orderData={order} /></div>)}
        </div>
    )
}

export default OrdersList