import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/customerProductView.css";

export const CustomerProductView = () => {
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const customerLogedIn = store.customerIsLogedIn
    const params = useParams();
    const { product_id } = params;  

    useEffect(() => {
        window.scrollTo(0, 0)
        actions.getProduct(product_id);
        console.log(actions.getCategories());
    }, []);

    const handleAddToCart = () => {
        if (quantity <= 0) {
            alert("La cantidad debe ser al menos 1.");
            return;
        }
        actions.addToCart(product, parseInt(quantity));
        alert(`Añadido ${quantity} ${product.name} al carrito!`);
        setQuantity(1);
    };

    return (
        <div className="jumbotron m-3">
            <hr className="my-4" />
            {store.singleProduct ? (
                <div className="d-flex justify-content-left">
                    <div className="d-flex m-5">
                        <img src={store.singleProduct.categorie_imageUrl} alt={store.singleProduct.name} style={{ height: '200px', objectFit: 'cover' }} />
                    </div>
                    <div className="d-flex align-items-start flex-column m-5">
                        <h2><strong style={{ color: 'black' }}>{store.singleProduct.name || "Cargando..."}</strong></h2>
                        <h4>
                            <span>Precio: </span>
                            <strong style={{ color: 'black' }}>
                                {(store.singleProduct.price && !isNaN(store.singleProduct.price)) ? Number(store.singleProduct.price).toFixed(2) : "0.00"}€
                            </strong>
                        </h4>
                        <p><span>Descripción:</span> <strong style={{ color: 'black' }}>{store.singleProduct.description || "Cargando..."}</strong></p>
                        <p><span>Origen:</span> <strong style={{ color: 'black' }}>{store.singleProduct.origin || "Cargando..."}</strong></p>
                        <p><span>Productor:</span> <strong style={{ color: 'black' }}>{store.singleProduct.producer_brand_name || "Cargando..."}</strong></p>

                        {/* {customerLogedIn ? (  */}
                        {/* <>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                style={{ width: '80px', marginRight: '10px' }}
                            />
                            <button className="btn login" onClick={handleAddToCart}>
                                Añadir al Carrito
                                <div className="arrow-wrapper">
                                    <div className="arrow"></div>
                                </div>
                            </button>
                        </>
                        ) : ( */}
                            <Link to="/customer/Login" className="text-decoration-none">
                                <button className="btn login">Haz Login para obtener tus productos
                                <div className="arrow-wrapper">
                                    <div className="arrow"></div>
                                </div>
                                </button>
                            </Link>
                        {/* )} */}
                    </div>
                </div>
            ) : (
                <p>Cargando producto...</p>
            )}
            <div className="backButtons gap-3 d-flex justify-content-center flex-end btn-small">
                <Link className="text-decoration-none" to={"/"}>
                    <button className="btn backHome">
                       Página principal
                    </button>
                </Link>
                <Link className="text-decoration-none" to={`/productByCategorie/${localStorage.getItem('currentCategorieId')}/products`}>
                    <button className="btn backCategories">
                        Volver a {store.singleProduct.categorie_name}
                    </button>
                </Link>
            </div>
        </div>
    );
};