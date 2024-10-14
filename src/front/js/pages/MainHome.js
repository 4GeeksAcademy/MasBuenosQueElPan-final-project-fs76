import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

    useEffect(() => {
      actions.getCategories();
      actions.getProducts()
  }, []);


    return (
        <>
        <div id="carouselExampleDark" className="carousel carousel-dark slide w-75">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
            {/* <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button> */}
            {/* <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5" aria-label="Slide 6"></button> */}
            {/* <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="6" aria-label="Slide 7"></button> */}
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src={campo2} id="campo2" className="d-block" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h5 className="text-black">¡Bienvenido a Más Buenos que el Pan!</h5>
                <p className="text-black">La nueva forma de potenciar el comercio local.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={ganaderia} className="d-block" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Encuentra productores y productos cerca de tu zona.</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={campo4} className="d-block" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Aquí puedes ver </h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={ganaderia2} className="d-block w-100" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h5>4 slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
            {/* <div className="carousel-item">
              <img src={ganaderia3} className="d-block" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h5>6 slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
            <div className="carousel-item">
              <img src={campo5} className="d-block" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h5>7 slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div> */}
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




            {/* <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", backgroundColor: "#f7f7f7" }}>
            <div className="card p-5 shadow-lg" style={{ width: "100%", maxWidth: "900px", borderRadius: "20px", backgroundColor: "#fff" }}>
                <div className="text-center">
                    <h1 className="mb-4" style={{ color: "#007bff", fontWeight: "bold" }}>
                        Bienvenido a <span style={{ color: "#28a745" }}>Mas Buenos que el Pan</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-emoji-smile-fill ms-2" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
                        </svg>
                    </h1>
                    <h3 className="mb-4" style={{ color: "#6c757d", fontWeight: "lighter" }}>La nueva forma de potenciar el comercio local</h3>
                    <p style={{ color: "#6c757d" }}>Para hacer tu experiencia única, a continuación logeate o, si no tienes cuenta, puedes crear una nueva...</p>
                </div> */}
                {/* Login Productor */}
                {displayLogin===true ? 
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
              {/* Login Cliente */}
                  <div className="col-lg-6 d-flex justify-content-center">
                    <div className="card p-4 shadow-sm" style={{ borderRadius: "15px", width: "100%", maxWidth: "350px", border: "none", backgroundColor: "#f7f9f7" }}>
                        <h4 className="text-center mb-3" style={{ color: "#28a745", fontWeight: "bold" }}>Login Cliente</h4>
                        <CustomerLoginUp />
                    </div>
                  </div>
              </div>
              </>
              :
              (store.products.length > 0 ? 
                <>
                <h1 className="mt-5 ms-5">Productos</h1>
                <div className="container-grid d-inline-flex text-center mt-3 ms-5 gap-3">
                  {store.products.length > 0 && store.products.map((product, index) => (
                    <div key={index} className="card col-4"
                      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                      style={{
                        // width: "200px",
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
                          <p className="card-text" style={{color:"#777", fontSize: "14px"}}>Categoría: {product.categorie_name}</p>
                          <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>Precio: {product.price} €/kg</p>
                          <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>Origen: {product.origin}</p>
                          <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>{product.brief_description}</p>
                          <p className="card-text text-black" style={{ fontSize: "14px" }}>{product.producer_brand_name}</p>
                          <button type="button" 
                            className="btn btn-info" 
                            style={{ borderRadius: "10px", transition: "background-color 0.3s ease" }} 
                          >
                            Details
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-warning" 
                            style={{ borderRadius: "10px", transition: "background-color 0.3s ease", marginLeft: "10px" }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      ))}
                  </div>
                  </>
                  :
                <p>Mostrando productos</p>
                )
                }
        </>
    );
};
