import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
    return (
        <div className="mt-5 container">
            <div className="d-flex justify-content-between align-items-center  mt-3" >
                <h2 style={{ fontWeight: "bold", color: "#343a40", marginBottom: "20px" }}>
                    Productos en tu carrito 
                </h2>
                <Link to={`/customer/home/${customer_id}`}>
                    <button className="btn btn-success" style={{ borderRadius: "10px", padding: "10px 20px" }}>
                        Volver
                    </button>
                </Link>
            </div>

            {objectredivedlenght > 0 ? (
                <table className="table table-bordered shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
                    <thead className="thead-dark" style={{ backgroundColor: "#4CAF50", color: "white" }}>
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
                                        <div key={i}>{item.price} €</div>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            ) : (
                <div className="alert alert-info" role="alert">
                    Aún no tienes productos en el carrito.
                </div>
            )}

            <button 
                className="btn btn-success shadow-sm mt-3" 
                onClick={handleFinalizePurchase} 
                style={{ borderRadius: "10px", padding: "10px 20px" }}>
                Finalizar compra
            </button>

            {/* Historial de pedidos (Shipped Orders) */}
            <h2 className="mt-5" style={{ fontWeight: "bold", color: "#343a40", marginBottom: "20px" }}>
                Historial de pedidos:
            </h2>

            {objectshippedlenght > 0 ? (
                <table className="table table-bordered shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
                    <thead className="thead-dark" style={{ backgroundColor: "#8B4513", color: "white" }}>
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
                                <td>{order.total_price} €</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info" role="alert">
                    No tienes pedidos completados.
                </div>
            )}
        </div>
    );
};