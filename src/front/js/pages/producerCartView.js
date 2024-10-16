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
            <h2>Pedidos para tus productos:</h2>
            <Link to={`/customer/home/${producerId}`}>
                <button className="btn btn-primary">Atrás</button>
            </Link>
            {shippedOrders && shippedOrders.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id Pedido</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Productos</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shippedOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.order_id}</td>
                                <td>{new Date(order.date_created).toLocaleDateString()}</td>
                                <td>{order.customer_id}</td>
                                <td>
                                    {order.items.map((item, i) => (
                                        <div key={i}>
                                            {item.product_name} - {item.quantity} unidades
                                        </div>
                                    ))}
                                </td>
                                <td>{order.total_price}</td>
                                <td>{order.status}</td>
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
                <h5>No tienes pedidos pendientes.</h5>
            )}

            {/* Pedidos Terminados */}
            <h2>Pedidos terminados:</h2>
            {store.doneOrders && store.doneOrders.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id Pedido</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Productos</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.doneOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.order_id}</td>
                                <td>{new Date(order.date_created).toLocaleDateString()}</td>
                                <td>{order.customer_name}</td>
                                <td>
                                    {order.items.map((item, i) => (
                                        <div key={i}>
                                            {item.product_name} - {item.quantity} unidades
                                        </div>
                                    ))}
                                </td>
                                <td>{order.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h5>No tienes pedidos terminados.</h5>
            )}
        </div>
    );
};