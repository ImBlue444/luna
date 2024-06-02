import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Order {
    activity: {
        [key: string]: Activity;
        ricezioneAlluminio: Activity;
        ricezioneVetri: Activity;
        taglio: Activity;
        lavorazione: Activity;
        assemblaggio: Activity;
        installazioneVetri: Activity;
        imballaggio: Activity;
        trasporto: Activity;
        consegnaInstallazione: Activity;
    };
    _id: string;
    orderName: string;
    materialShelf: string;
    priority: number;
    urgency: string;
    orderManager: string;
    __v: number;
}

interface Activity {
    expire: string;
    status: string;
    note: string;
    completed: string | null;
    activityManager: string;
}

type Props = {
    orderId: string
}
const AdminOrderForm = (props: Props) => {
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}` + "/orders/" + props.orderId)
            .then((res) => {
                setOrdersData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });


    }, [])
    return (
        <div>

        </div>
    )
}

export default AdminOrderForm