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
    const [ hoveredButtonId, setHoveredButtonId ] = useState(null);
    const customerIsLogedIn = store.customerIsLogedIn
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
        {store.productsByCategorie.length > 0 ? (
            <div className="container-fluid text-center gap-3">
                <h1 className="my-5 ms-5">{categorieName}</h1>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 ">
                    {store.productsByCategorie.map((product, index) => (
                        <div key={index} className="col">
                            <div className="card"
                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                style={{
                                    height: "350px",
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
                                    <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>{product.brief_description}</p>
                                    <p className="card-text text-black" style={{ fontSize: "14px" }}>{product.producer_brand_name}</p>
                                    <button type="button" className="btn d-inline-flex text-black border border-secondary" onClick={()=> {
                                        console.log(product.id);
                                        navigate(`/product/${product.id}`)}}
                                        style={{ borderRadius: "10px", transition: "background-color 0.3s ease" }}
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                        </svg>
                                    </button>
                                    {customerIsLogedIn ? 
                                    <button
                                    type="button"
                                    className="btn text-white text-bold"
                                    onClick={() => handleAddProductToCart(product.id)}
                                    style={{ backgroundColor: "#1ec63d", borderRadius: "10px", transition: "background-color 0.3s ease", marginLeft: "10px"}}
                                    ><strong>Add to cart +</strong> 
                                    </button>
                                    : ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        ) : (
            <p className="text-center my-5">Actualmente no hay productos para mostrar</p>
        )}
        <div className="d-flex justify-content-center my-5">
            <button className="btn backHome d-flex mb-5" onClick={()=> navigate("/")}>Volver</button>
        </div>
        </>
    );
};