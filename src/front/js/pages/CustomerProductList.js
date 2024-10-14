import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/customerProductList.css";

export const CustomerProductList = () => {
    const { store, actions } = useContext(Context);

    // Obtener productos y categorías al montar el componente
    useEffect(() => {
        actions.getProducts();
        actions.getCategories();
        console.log(store.categories); // Para verificar si las categorías están siendo cargadas
    }, []);

    return (
        <div className="d-flex container my-4">
            {/* Div de Categorías */}
            <div
                className="categories-list p-3"
                style={{
                    width: "25%",
                    backgroundColor: "#f8f9fa", // Color gris claro
                    borderRadius: "5px"
                }}
            >
                <h2>Categorías</h2>
                <div className="list-group">
                    {store.categories.length > 0 ? (
                        store.categories.map((categorie, index) => (
                            <div key={index}>
                                <h5 className="list-group-item">
                                    {categorie.categorie}
                                </h5>
                            </div>
                        ))
                    ) : (
                        <p>No categories found</p>
                    )}
                </div>
            </div>

            {/* Div de Productos */}
            <div className="products-list ml-4" style={{ width: "75%" }}>
                <h2>Nuestros productos</h2>
                <div className="d-flex flex-wrap gap-3">
                    {store.products.length > 0 ? (
                        store.products.map((product, index) => (
                            <div key={index}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img className="class" src={product.categorie_imageUrl} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="Producer">Productor:</p>
                                        <h4 className="brand-name">{product.producer_brand_name}</h4>
                                        <p className="card-title">{product.brief_description}</p>
                                        <p className="card-title">{product.price}€</p>
                                        {/* Cambiar button por Link para la navegación */}
                                        <Link to={"/product/" + product.id} className="btn btn-blue" style={{ margin: "0 auto" }}>

                                            Comprar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
};
