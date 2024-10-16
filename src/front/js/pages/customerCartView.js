import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { object } from "prop-types";

export const CustomerCartView = () => {
    const { store, actions } = useContext(Context);
    const { customer_id } = useParams();

    // Fetch orders when component loads
    useEffect(() => {
        actions.getCustomerCart(customer_id);
        actions.getOrderHistory(customer_id)
    }, [customer_id]);

    const handleFinalizePurchase = () => {
        fetch(`${process.env.BACKEND_URL}/api/finalize_purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id: customer_id,
                orders: store.customerCartInfo.received_orders,  // Orders currently in the cart
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al finalizar la compra");
            }
            return response.json();
        })
        .then(data => {
            alert("Compra finalizada con éxito");
            // Actualiza tanto el carrito como el historial de pedidos
            actions.getCustomerCart(customer_id);
            actions.getOrderHistory(customer_id);  
        })
        .catch(error => {
            console.error("Error al finalizar la compra:", error);
            alert("Hubo un problema al finalizar la compra.");
        });
    };
	const objectredivedlenght = store.customerCartInfo?.received_orders?.length || 0;
    const objectshippedlenght = store.orderHistory?.shipped_orders?.length || 0;
    console.log(objectredivedlenght)
    console.log(store.orderHistory)
    return (
        <div className="mt-5 container">
            <h2>Productos en tu carrito (estado: Recibido):</h2>
            <br></br>
            {objectredivedlenght > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id Pedido</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio Total</th>
                        </tr>
                    </thead>
                    {store.customerCartInfo.received_orders.map((carrito, index) => (
                        <tbody key={index} className="table-group-divider">
                            <tr>
                                <td>{carrito.order_id}</td>
                                <td>
                                    {carrito.items.map((item, i) => (
                                        <div key={i}>{item.product_name}</div>
                                    ))}
                                </td>
                                <td>
                                    {carrito.items.map((item, i) => (
                                        <div key={i}>{item.quantity}</div>
                                    ))}
                                </td>
                                <td>
                                    {carrito.items.map((item, i) => (
                                        <div key={i}>{item.price}</div>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            ) : (
                <h5>Aún no tienes productos en el carrito.</h5>
            )}
            <button className="btn btn-primary" onClick={handleFinalizePurchase}>
                Finalizar compra
            </button>

            {/* Historial de pedidos (Shipped Orders) */}
            <h2 className="mt-4">Historial de pedidos:</h2>
            {objectshippedlenght > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id Pedido</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio Total</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.orderHistory.shipped_orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.order_id}</td>
                                <td>
                                    {order.items.map((item, i) => (
                                        <div key={i}>{item.product_name}</div>
                                    ))}
                                </td>
                                <td>{order.total_price}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h5>No tienes pedidos completados.</h5>
            )}
        </div>
    );
};