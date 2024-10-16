import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProducerSignup = () => {
    const { actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showEmptyInputs, setShowEmptyInputs ] = useState(false);
    const [ showAt, setShowAt ] = useState(false);
    const [ showExists, setShowExists] = useState(false);
    const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        setShowEmptyInputs(false);
        setShowAt(false);
        setShowExists(false);
        setShowSuccessMessage(false);

        if (!email || !password) {
            setShowEmptyInputs(true)
            return;
        }
        if (!email.includes("@")) {
            setShowAt(true)
            return;
        }
    
        const producerExists = await actions.checkProducerExists(email);
            if (producerExists) {
                setShowExists(true)
                return;
            }
            try {
                await actions.producerSignup(email, password); 
                
                setShowSuccessMessage(true); 
                console.log("Signup successful, navigating to login");
                
                setTimeout(() => {
                    navigate("/producer/login"); 
                }, 3000);
            } catch (error) {
                console.error("Signup error:", error);
            };
    }

    return (
        <>
        <div className="container-fluid d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "80vh", backgroundColor: "#f9f9f9" }}>
            <div className="card shadow-lg p-5" style={{ width: "100%", maxWidth: "500px", borderRadius: "15px", backgroundColor: "#ffffff" }}>
                <h2 className="text-center mb-4" style={{ color: "#0b532f", fontWeight: "bold" }}>Regístrate como Productor</h2>
                
                {showEmptyInputs && (
                    <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                        Todas las casillas deben ser rellenadas.
                        <button type="button" onClick={() => setShowEmptyInputs(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
                {showExists && (
                    <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                        Ups! Parece que ya existe una cuenta con este correo.
                        <button type="button" onClick={() => setShowExists(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
                {showAt && (
                    <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                        El correo debe contener un "@".
                        <button type="button" onClick={() => setShowAt(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="signupEmailInput" className="form-label" style={{ fontWeight: "500", fontSize: "14px", color: "#6b6b6b" }}>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="signupEmailInput"
                            placeholder="alguien@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                borderRadius: "10px",
                                border: "1px solid #28a745",
                                padding: "10px",
                                backgroundColor: "#f4f4f4",
                                fontSize: "15px"
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupPasswordInput" className="form-label" style={{ fontWeight: "500", fontSize: "14px", color: "#6b6b6b" }}>Contraseña</label>
                        <input
                            type="password"
                            id="signupPasswordInput"
                            className="form-control"
                            aria-describedby="passwordHelpBlock"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                borderRadius: "10px",
                                border: "1px solid #28a745",
                                padding: "10px",
                                backgroundColor: "#f4f4f4",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                                transition: "all 0.3s ease",
                                fontSize: "15px"
                            }}
                        />
                        <div id="passwordHelpBlock" className="form-text">
                            Te aconsejamos que tu contraseña tenga, al menos, 8 caracteres, con letras en mayúscula y minúscula, números y caracteres especiales.
                        </div>
                    </div>

                    {showSuccessMessage && (
                        <div className="alert alert-success mt-3">
                            ¡Perfecto! Ya te has registrado.
                            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                            <span className="visually-hidden" role="status">Llevándote a la página de login...</span>
                        </div>
                    )}

                    <div className="col-12 d-flex justify-content-between">
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={{
                                borderRadius: "10px",
                                padding: "10px 20px",
                                fontWeight: "bold",
                                backgroundColor: "#0b532f",
                            }}
                        >
                            Registrarse
                        </button>
                        <Link to="/">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                style={{
                                    borderRadius: "10px",
                                    padding: "10px 20px",
                                    fontWeight: "bold",
                                }}
                            >
                                Volver
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};