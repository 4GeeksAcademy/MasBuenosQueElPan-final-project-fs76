import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const CustomerProductView = () => {
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    const { productId } = useParams();
    const { categorieId } = useParams();
    console.log(productId);
    console.log(product.id);
    

    useEffect(() => {
        actions.getProduct(productId)
        // const fetchProduct = async () => {
        //     try {
        //         const response = await fetch(`${process.env.BACKEND_URL}/api/product/${productId}`);
        //         const data = await response.json();

        //         console.log(data);

        //         if (data) {
        //             setProduct(data);
        //         } else {
        //             console.error("Data inválida", data);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching product:", error);
        //     }
        // };

        // fetchProduct();
    }, []);

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
            {store.products && store.products.length > 0  ? (
                (store.products.map((product, index) => 
                    <div className="d-flex justify-content-left" key={index}>
                        <div className="d-flex m-5">
                            <img src={product.categorie_imageUrl} alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                        </div>
                        <div className="d-flex align-items-start flex-column m-5">
                            <h2><strong style={{ color: 'black' }}>{product.name || "Cargando..."}</strong></h2>
                            <h4>
                                <span>Precio: </span>
                                <strong style={{ color: 'black' }}>
                                    {(product.price && !isNaN(product.price)) ? Number(product.price).toFixed(2) : "0.00"}€
                                </strong>
                            </h4>
                            <p><span>Descripción:</span> <strong style={{ color: 'black' }}>{product.description || "Cargando..."}</strong></p>
                            <p><span>Origen:</span> <strong style={{ color: 'black' }}>{product.origin || "Cargando..."}</strong></p>
                            <p><span>Productor:</span> <strong style={{ color: 'black' }}>{product.producer_brand_name || "Cargando..."}</strong></p>
                            <p><span>Origen:</span> <strong style={{ color: 'black' }}>{product.origin || "Cargando..."}</strong></p>
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
                    )
                )
            ) : (
                <p>Cargando producto...</p> // Mensaje mientras se carga el producto
            )}
            <Link className="d-flex justify-content-center flex-end" to={`productByCategorie/${categorieId}/products`}>
                <span className="btn btn-dark btn-lg d-flex justify-content-center flex-end" role="button">
                    Volver
                </span>
            </Link>
        </div>
    );
};