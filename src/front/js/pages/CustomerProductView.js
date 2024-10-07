import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const CustomerProductView = () => {
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const params = useParams();

    const defaultImageUrl = "https://example.com/imagen-predeterminada.jpg"; // Cambia esto a una URL válida

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/product/${parseInt(params.product_id)}`);
                const data = await response.json();

                console.log(data);

                if (data && data.name) {
                    setProduct(data);
                } else {
                    console.error("Data inválida", data);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [params.product_id]);

    const handleAddToCart = () => {
        if (quantity <= 0) {
            alert("La cantidad debe ser al menos 1.");
            return;
        }
        actions.addToCart(product, parseInt(quantity));
        alert(`Añadido ${quantity} ${product.name} al carrito!`);
        setQuantity(1); // Resetear la cantidad a 1
    };

    return (
        <div className="jumbotron m-3">
            <hr className="my-4" />
            <div className="d-flex justify-content-left">
                <div className="d-flex m-5">
                    {product.name ? (
                        <img src={rigoImageUrl} />
                    ) : (
                        <p>Cargando imagen...</p>
                    )}
                </div>
                <div className="d-flex align-items-start flex-column m-5">
                    <p><span>Nombre:</span> <strong style={{ color: 'black' }}>{product.name || "Cargando..."}</strong></p>
                    <p>
                        <span>Precio:</span>
                        <strong style={{ color: 'black' }}>
                            {(product.price && !isNaN(product.price)) ? Number(product.price).toFixed(2) : "0.00"}€
                        </strong>
                    </p>
                    <p><span>Descripción:</span> <strong style={{ color: 'black' }}>{product.description || "Cargando..."}</strong></p>
                    <p><span>Origen:</span> <strong style={{ color: 'black' }}>{product.origin || "Cargando..."}</strong></p>

                    <div className="d-flex align-items-center">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            style={{ width: '80px', marginRight: '10px' }}
                        />
                        <button className="btn btn-primary" onClick={handleAddToCart}>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
            <Link className="d-flex justify-content-center flex-end" to="/">
                <span className="btn btn-dark btn-lg d-flex justify-content-center flex-end" role="button">
                    Inicio
                </span>
            </Link>
        </div>
    );
};