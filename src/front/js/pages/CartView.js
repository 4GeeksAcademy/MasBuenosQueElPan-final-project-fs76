import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CartItems = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                // await actions.getCartItems();
                await actions.getCustomerCarts();
            } catch (err) {
                console.error("Error loading cart items or customer carts", err);
                setError("Hubo un error al cargar los datos.");
            } finally {
                setLoading(false);
            }
        };
        loadCartItems();
    }, []);

    const calculateTotal = () => {
        return store.cart_items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const total = calculateTotal();

    const handleSaveCart = async () => {
        try {
            await actions.saveCart();
            alert("Compra guardada exitosamente!");
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
            alert("No se pudo guardar la compra.");
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

    return (
        <div className="container">
            <h1>Elementos del Carrito</h1>
            {store.cart_items.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id Producto</th>
                            <th scope="col">Nombre Producto</th>
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
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{(item.price).toFixed(2)}€</td>
                                <td>{(item.price * item.quantity).toFixed(2)}€</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => actions.removeCartItem(item.product_id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'right' }}><strong>Total:</strong></td>
                            <td><strong>{total.toFixed(2)}€</strong></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-warning" role="alert">No se han encontrado elementos en el carrito.</div>
            )}

            <br />
            <button className="btn btn-warning" onClick={() => actions.clearCart()}>
                Vaciar Carrito
            </button>
            <button className="btn btn-success" onClick={() => handleSaveCart()}>
                Finalizar Compra
            </button>
            <Link to="/">
                <button className="btn btn-primary my-3">Volver a la página principal</button>
            </Link>

            <h2>Carritos Finalizados</h2>
            {store.customer_carts.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id Carrito</th>
                            <th scope="col">Total Precio</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.customer_carts.map((cart, index) => (
                            <tr key={index}>
                                <td>{cart.id}</td>
                                <td>{cart.total_price.toFixed(2)}€</td>
                                <td>{new Date(cart.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No se han encontrado carritos finalizados.</p>
            )}
        </div>
    );
};