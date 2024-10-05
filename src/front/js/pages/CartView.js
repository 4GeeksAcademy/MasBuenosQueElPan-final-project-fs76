import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CartItems = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const loadCartItems = async () => {
            await actions.getCartItems();
        };
        loadCartItems();
    }, [actions]);

    // Calcular el total
    const calculateTotal = () => {
        return store.cart_items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const total = calculateTotal();

    return (
        <div className="container">
            <h1>Elementos del Carrito</h1>
            {store.cart_items.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.cart_items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product_id}</td>
                                <td>{item.quantity}</td>
                                <td>{(item.price).toFixed(2)}€</td>
                                <td>{(item.price * item.quantity).toFixed(2)}€</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => actions.removeCartItem(item.product_id)} // Asegúrate de usar product_id
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* Agregar una fila para el total */}
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'right' }}><strong>Total:</strong></td>
                            <td><strong>{total.toFixed(2)}€</strong></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No se han encontrado elementos en el carrito.
                </div>
            )}
            <br />
            <Link to="/">
                <button className="btn btn-primary my-3">Volver a la página principal</button>
            </Link>
        </div>
    );
};