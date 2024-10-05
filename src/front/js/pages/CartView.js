import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const CartItems = () => {
    const { store, actions } = useContext(Context);

    // Cargar los elementos del carrito cuando se monta el componente
    useEffect(() => {
        const loadCartItems = async () => {
            await actions.getCartItems();
        };
        loadCartItems();
    }, [actions]);

    return (
        <div className="container">
            <h1>Elementos del Carrito</h1>
            {store.cart_items && store.cart_items.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
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
                                <td>{item.price.toFixed(2)}€</td>
                                <td>{(item.price * item.quantity).toFixed(2)}€</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => actions.removeCartItem(item.id)} // Acción de eliminar
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
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