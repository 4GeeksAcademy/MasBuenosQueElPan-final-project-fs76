import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { ProducerLogin } from "../component/producerLogin";
import { CustomerLoginUp } from "../component/customerLogin";

export const MainHome = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", backgroundColor: "#f7f7f7" }}>
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
                </div>
                {/* Login Productor */}
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
            </div>
        </div>
        </>
    );
};
