'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { formattaNumero } from '@/utils/functions';

type Props = {};

interface Orders {
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

const statusHandler = (status: string) => {
    if (status === "delivered") {
        return <div className="badge badge-success rounded-md font-medium text-white">Completato</div>;
    } else if (status === "pending") {
        return <div className="badge badge-warning rounded-md font-medium text-white">In attesa</div>;
    } else if (status === "processing") {
        return <div className="badge badge-info rounded-md font-medium text-white">In corso</div>;
    } else if (status === "shipped") {
        return <div className='badge badge-secondary rounded-md font-medium text-white'>Annullato</div>;
    }
};

const OrdersTable = (props: Props) => {
    const [data, setData] = useState<Orders[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/data.json');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Calcola l'indice iniziale e finale degli elementi per la pagina corrente
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calcola il numero totale di pagine
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Funzione per cambiare pagina
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className='loading loading-bars loading-lg' /></div>;
    }

    return (
        <>
            <div className=' prose text-center mx-auto'>
                <h2>Ordini</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className=' text-lg font-semibold'></th>
                            <th className=' text-lg font-semibold'>ID</th>
                            <th className=' text-lg font-semibold'>Nome</th>
                            <th className=' text-lg font-semibold'>Data</th>
                            <th className=' text-lg font-semibold'>Prezzo totale</th>
                            <th className=' text-lg font-semibold'>Stato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((e: Orders) => (
                            <tr className="hover" key={e.order_id}>
                                <th></th>
                                <th>{e.order_id}</th>
                                <td>{e.customer_name}</td>
                                <td>{e.order_date}</td>
                                <td>{formattaNumero(e.total_price)}</td>
                                <td><Link href={"/" + e.order_id}>{statusHandler(e.status)}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center my-2'>
                <div className="join">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrdersTable;
