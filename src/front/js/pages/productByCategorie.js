import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
// import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/customerProductView.css";

export const ProductByCategorie = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const { categorieId, productId } = useParams();

    useEffect(() => {
        const fetchProductsByCategorie = async () => {
            window.scrollTo(0, 0)
            const storedCategorieId = localStorage.getItem('currentCategorieId');
            const idToUse = storedCategorieId || categorieId;
            await actions.getProductsByCategorie(idToUse); 
            actions.getCategories();
        }
        fetchProductsByCategorie();
  }, []);

  const categorieName = store.categories.find(c => c.id === parseInt(categorieId))?.categorie || "Categoría no encontrada";
  
    return (
        <>
        {store.productsByCategorie && store.productsByCategorie.length > 0 ? (
            <div className="container-fluid text-center gap-3">
                <h1 className="my-5 ms-5">{categorieName}</h1>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 ">
                    {store.productsByCategorie.map((product, index) => (
                        <div key={index} className="col">
                            <div className="card"
                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                style={{
                                    height: "400px",
                                    borderRadius: "12px",
                                    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                                    overflow: "hidden",
                                    transition: "transform 0.3s ease-in-out",
                                    cursor: "pointer",
                                }}>
                                <img src={product.categorie_imageUrl} className="card-img-top" alt="Cargando imagen..." style={{ height: "120px", objectFit: "cover" }} />
                                <div className="card-body" style={{ padding: "10px" }}>
                                    <h5 className="card-title" style={{ fontWeight: "bold", color: "#333" }}>{product.name}</h5>
                                    <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>Precio: {product.price} €/kg</p>
                                    <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>Origen: {product.origin}</p>
                                    <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>{product.brief_description}</p>
                                    <p className="card-text text-black" style={{ fontSize: "14px" }}>{product.producer_brand_name}</p>
                                    <button type="button" className="btn btn-info d-inline-flex" onClick={()=> navigate(`/product/${product.id}`)} style={{ borderRadius: "10px", transition: "background-color 0.3s ease" }}>
                                        Detalles
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        style={{ borderRadius: "10px", transition: "background-color 0.3s ease", marginLeft: "10px" }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        ) : (
            <p className="text-center mt-2">Actualmente no hay productos para mostrar</p>
        )}
        <div className="d-flex justify-content-center mt-4">
            <button className="btn backHome d-flex" onClick={()=> navigate("/")}>Volver</button>
        </div>
        </>
    );
};