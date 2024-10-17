import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";

export const ProducerCart = () => {
    const { store, actions } = useContext(Context);
    const { producerId } = useParams();

    useEffect(() => {
        actions.getProducerOrders(producerId);
        actions.getDoneOrders(producerId); 
        actions.verifyCustomerToken()
    }, [producerId]);

    // Filtrar solo las órdenes con estado "shipped"
    const shippedOrders = store.producerOrders.filter(order => order.status === "shipped");

    return (
        <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ fontWeight: "bold", color: "#4CAF50" }}>Pedidos para tus productos:</h2>
        <Link to={`/producer/dashboard/${producerId}`}>
            <button className="btn btn-secondary" style={{
                backgroundColor: "#6c757d", 
                borderRadius: "10px", 
                padding: "10px 20px", 
                border: "none", 
                fontWeight: "bold"
            }}>Atrás</button>
        </Link>
    </div>

    {shippedOrders && shippedOrders.length > 0 ? (
        <table className="table table-hover shadow-sm" style={{ borderRadius: "15px", backgroundColor: "#fff" }}>
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Id Pedido</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Productos</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                {shippedOrders.map((order, index) => (
                    <tr key={index} style={{ backgroundColor: "#f9f9f9", borderBottom: "2px solid #dee2e6" }}>
                        <td>{order.order_id}</td>
                        <td>{new Date(order.date_created).toLocaleDateString()}</td>
                        <td>{order.customer_id}</td>
                        <td>
                            {order.items.map((item, i) => (
                                <div key={i}>{item.product_name} - {item.quantity} unidades</div>
                            ))}
                        </td>
                        <td>{order.total_price}€</td>
                        <td><span className="badge bg-info">{order.status}</span></td>
                        <td>
                            {order.status === "shipped" && (
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`order-${order.order_id}`}
                                        onChange={() => actions.markOrderAsDone(order.order_id, producerId)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`order-${order.order_id}`}
                                    >
                                        Marcar como hecho
                                    </label>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <div className="alert alert-info" role="alert">No tienes pedidos pendientes.</div>
    )}

    {/* Pedidos Terminados */}
    <h2 className="mt-4" style={{ fontWeight: "bold", color: "#8B4513" }}>Pedidos terminados:</h2>
    {store.doneOrders && store.doneOrders.length > 0 ? (
        <table className="table table-hover shadow-sm" style={{ borderRadius: "15px", backgroundColor: "#fff" }}>
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Id Pedido</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Productos</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                {store.doneOrders.map((order, index) => (
                    <tr key={index} style={{ backgroundColor: "#f9f9f9", borderBottom: "2px solid #dee2e6" }}>
                        <td>{order.order_id}</td>
                        <td>{new Date(order.date_created).toLocaleDateString()}</td>
                        <td>{order.customer_name}</td>
                        <td>
                            {order.items.map((item, i) => (
                                <div key={i}>{item.product_name} - {item.quantity} unidades</div>
                            ))}
                        </td>
                        <td>{order.total_price}€</td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <div className="alert alert-info" role="alert">No tienes pedidos terminados.</div>
    )}
</div>
    );
};