import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProducerLogin = () => {
    const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showEmptyInputs, setShowEmptyInputs ] = useState(false);
    const [ showAt, setShowAt ] = useState(false);
    const [ showExists, setShowExists] = useState(false);
    const [ logingIn, setLoginIn ] = useState(false);
    const [ incorrectLogin, setIncorrectLogin ] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        let timer;
        if (showExists) {
            timer = setTimeout(() => {
                setShowExists(false);
            }, 3000); // 
        }
        return () => clearTimeout(timer); 
    }, [showExists, actions])

    const handleLogin = (event) => {
        event.preventDefault()

        if (!email || !password) {
            console.log("Input is empty")
            setShowEmptyInputs(true)
            return;
        }
        else if (!email.includes("@")) {
            setShowAt(true)
            return;
        } else console.log("Everything looks fine");

        actions.checkProducerExists(email, password).then(producerExists => {
            if (!producerExists) {
                console.log(producerExists)
                setShowExists(true);
                return;
            }
            
            actions.producerLogin(email, password).then(data => {
                console.log("data from producerlogin", data);
                console.log("Navigating to producer view");
                if (data.access_token) {
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem("producerId", data.producerId)
                    setLoginIn(true)
                }
                if (data.isVerify) {
                    if (!data.is_fill) {
                        console.log(data);
                        console.log(data.is_fill);
                        setLoginIn(true)
                        console.log("i should be navigating to form");
                        navigate(`/producer/form/${data.producerId}`)
                    } else {
                        setLoginIn(true)
                        console.log("i should be navigating to dashboard");
                        navigate(`/producer/dashboard/${data.producerId}`)
                    }
                } else {
                    setIncorrectLogin(true)
                }
            return data
            })
            .catch(error => {
                setLoginIn(false)
                console.error("Error during login:", error);
                alert(error.message);
            });
        })
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center mt-2">
                <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "15px", border: "none" }}>
                    <h2 className="text-center mb-4" style={{ color: "#15a25b", fontWeight: "bold" }}>Iniciar sesión como Productor</h2>
                    
                    {/* Mostrar alertas */}
                    {showEmptyInputs && (
                        <div className="alert alert-warning text-center">Todas las casillas deben ser rellenadas.</div>
                    )}
                    {(showExists || incorrectLogin) && (
                        <div className="alert alert-danger text-center">Email o contraseña incorrectos.</div>
                    )}
                    {showAt && (
                        <div className="alert alert-warning text-center">El email debe contener un @.</div>
                    )}
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="loginEmailInput" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="loginEmailInput"
                                placeholder="Dirección de email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ borderRadius: "8px", padding: "10px" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loginPasswordInput" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="loginPasswordInput"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ borderRadius: "8px", padding: "10px" }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            style={{ borderRadius: "8px", padding: "12px", fontSize: "16px", backgroundColor: "#15a25b", borderColor:"#15a25b" }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#0b532f";
                                e.currentTarget.style.borderColor = "#0b532f";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "#15a25b";
                                e.currentTarget.style.borderColor = "#15a25b";
                            }}
                        >
                            Iniciar Sesión
                        </button>

                        <div className="text-center mt-3">
                            <Link to="/producer/signup" className="text-success">¿Todavía no tienes cuenta? Regístrate aquí</Link>
                        </div>
                    </form>

                    {logingIn && (
                        <div className="alert alert-success text-center mt-4">
                            Cargando perfil... 
                            <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};