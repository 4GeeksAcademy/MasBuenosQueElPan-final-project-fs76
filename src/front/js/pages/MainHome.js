import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
// import rigoImageUrl from "../../img/rigo-baby.jpg";
import campo2 from "../../img/campo2.jpg";
import campo3 from "../../img/campo3.jpg";
import campo4 from "../../img/campo4.jpg";
import campo5 from "../../img/campo5.jpg";
import ganaderia from "../../img/ganaderia.jpg";
import ganaderia2 from "../../img/ganaderia2.jpg";
import ganaderia3 from "../../img/ganaderia3.jpg";
import "../../styles/MainHome.css";
import { ProducerLogin } from "../component/producerLogin";
import { CustomerLoginUp } from "../component/customerLogin";

export const MainHome = () => {
    const { store, actions } = useContext(Context);
    const displayLogin = store.displayLogin;
    const navigate = useNavigate()
    const customerIsLogedIn = store.customerIsLogedIn;

    useEffect(() => {
      actions.getCategories();
      actions.getProducts();
  }, []);

  const handleCategoryClick = (categorieId) => {
    localStorage.setItem('currentCategorieId', categorieId);
    navigate(`productByCategorie/${categorieId}/products`);
  };

  const handleAddProductToCart = () => {
    if (customerIsLogedIn) {
      actions.addToCart()
    }
  }

    return (
        <>
        <div id="carouselExampleDark" className="carousel carousel-dark rounded-4 slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="1000">
              <img src={campo2} id="campo2" className="d-block" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h1 className="welcome text-white">¡Bienvenido a <strong>Más Buenos que el Pan!</strong></h1>
                <h4 className="welcome2 text-white">La nueva forma de potenciar el comercio local.</h4>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <img src={ganaderia} className="d-block" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h4 className="pb-2 text-white">Empieza por registrarte si todavía no tienes cuenta: </h4>
                <div className="signupButtons d-inline-flex">
                  <button className="btn btn-primary mb-3 producerSignup" onClick={() => navigate("/producer/signup")}>Productor
                    <div className="arrow-wrapper">
                        <div className="arrow"></div>
                    </div>
                  </button>  {/* onClick={} */}
                  <button className="btn btn-primary mb-3 ms-3 customerSignup" onClick={() => navigate("/customer/singUp")}>Comprador
                    <div className="arrow-wrapper">
                        <div className="arrow"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={campo4} className="d-block" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h2 className="text-black">Encuentra productores y productos cerca de tu zona.</h2>
                <h4 className="text-black">Hemos querido crear esta plataforma para poder ayudarte a conectarte con los productores de la forma más directa posible.</h4>
              </div>
            </div>
            <div className="carousel-item">
              <img src={ganaderia2} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h2 className="text-white">Directo del campo a tu mesa</h2>
                <h4 className="text-white">Productos naturales, que llenan el alma y la tripa</h4>
              </div>
            </div>

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
                {/* Login Productor */}
                {displayLogin ? (
                <>
                    <h3 className="mt-5 mx-5">Volver a {""}
                        <span onClick={() => actions.setDisplayLogin(false)} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
                            Home
                        </span>
                    </h3>
                    <div className="row mt-5">
                        <div className="col-lg-6 mb-4 mb-lg-0 d-flex justify-content-center">
                            <div className="card p-4 shadow-sm" style={{ borderRadius: "15px", width: "100%", maxWidth: "350px", border: "none", backgroundColor: "#e9f7fd" }}>
                                <h4 className="text-center mb-3" style={{ color: "#007bff", fontWeight: "bold" }}>Login Productor</h4>
                                <ProducerLogin />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center">
                            <div className="card p-4 shadow-sm" style={{ borderRadius: "15px", width: "100%", maxWidth: "350px", border: "none", backgroundColor: "#f7f9f7" }}>
                                <h4 className="text-center mb-3" style={{ color: "#28a745", fontWeight: "bold" }}>Login Cliente</h4>
                                <CustomerLoginUp />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {store.categories.length > 0 ? (
                        <div className="container-fluid">
                            <h1 className="my-5" style={{marginLeft: "6%"}}>Categorías</h1>
                            <div className="row">
                                {store.categories.map((categorie) => (
                                    <div key={categorie.id} className="col-sm-6 col-md-4 col-lg-2 mb-4">
                                        <div className="card h-100"
                                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                        style={{
                                          boxShadow: "0 10px 12px rgba(0,0,0,0.3)",
                                          overflow: "hidden",
                                          transition: "transform 0.3s ease-in-out",
                                          cursor: "pointer",
                                          // height: "30%"
                                        }}
                                        onClick={() => handleCategoryClick(categorie.id)}
                                        // onClick={() => actions.getProductsByCategorie(categorie.id)}
                                        >
                                            <img src={categorie.url} className="card-img-top" style={{ height: "120px", objectFit: "cover" }} alt={categorie.categorie} />
                                            <div className="py-3">
                                                <p className="card-title text-center">{categorie.categorie}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>Mostrando categorías</p>
                    )}
                    {store.products.length > 0 ? (
                        <div className="container-fluid">
                            <h1 className="my-5" style={{marginLeft: "6%"}}>Productos</h1>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 ">
                                {store.products.map((product, index) => (
                                    <div key={index} className="col">
                                        <div className="card"
                                            onClick={()=> {
                                            navigate(`/product/${product.id}`)}}
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
                                                <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>{product.categorie_name}</p>
                                                <p className="card-title" style={{ fontWeight: "bold", color: "#333" }}>{product.name}</p>
                                                <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>{product.price} €/kg</p>
                                                {/* <p className="card-text" style={{ color: "#777", fontSize: "13px" }}>{product.brief_description}</p> */}
                                                <p className="card-text text-black" style={{ fontSize: "14px" }}>{product.producer_brand_name}</p>
                                                <button type="button" className="btn d-inline-flex text-black border border-secondary" onClick={()=> {
                                                  console.log(product.id);
                                                  navigate(`/product/${product.id}`)}}
                                                  style={{ borderRadius: "10px", transition: "background-color 0.3s ease" }}
                                                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "grey")}
													                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
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
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                                </svg> */}
                                                </button>
                                                : ""} 
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center mt-2">Actualmente no hay productos para mostrar</p>
                    )}
                </>
            )}
        </>
    );
};