import React from 'react'

type Props = {
    order_id?: number;
    customer_name?: string;
    order_date?: string;
    product_name?: string;
    quantity?: number;
    unit_price?: number;
    total_price?: number;
    shipping_address?: string;
    shipping_date?: string;
    status?: string;
}


const OrderTable = (props: Props) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Assegnato a</th>
                        <th>Data ordine</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th></th>
                        <td>Cy Ganderton</td>
                        <td>{props.order_date}</td>
                        <td>Blue</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>Robby Helling</td>
                        <td>{props.order_date}</td>
                        <td>Blue</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>Shay Bowhay</td>
                        <td>{props.order_date}</td>
                        <td>Blue</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrderTable