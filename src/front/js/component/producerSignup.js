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
        if (!email || !password) {
            setShowEmptyInputs(true)
        }
        if (!email.includes("@")) {
            setShowAt(true)
        }
    
        const producerExists = await actions.checkProducerExists(email);
            if (producerExists) {
                setShowExists(true)
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
        <div className="container d-block border rounded-3 my-4">
        <h2>Registrarse</h2>
        {showEmptyInputs &&
            <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                Todas las casillas deben ser rellenadas.
                <button type="button" onClick={()=>setShowEmptyInputs(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }
            {showExists &&
            <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                Ups! Parece que no has escrito bien el email o la contraseña!.
                <button type="button" onClick={()=>setShowExists(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }
            {showAt &&
            <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                Pasaba por aquí para decirte que el email debe llevar el @.
                <button type="button" onClick={()=>setShowAt(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }
            <div className="mb-3">
                <label htmlFor="signupEmailInput" className="form-label">Email</label>
                <input type="email"
                className="form-control"
                id="signupEmailInput"
                placeholder="alguien@example.com"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="signupPasswordInput" className="form-label">Contraseña</label>
                <input type="password"
                id="signupPasswordInput"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>
                <div id="passwordHelpBlock" className="form-text">
                    Te aconsejamos que tu contreaseña tenga, al menos, 8 caracteres, con letras en mayúscula y minúscula, números y caracteres especiales.
                </div>
            </div>
            {showSuccessMessage && 
            <div className="alert alert-success">Perfecto! Ya has te has registrado!
                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                <span className="visually-hidden" role="status">Llevándote a la página Login!...</span>
            </div>
            }
            <button type="submit" onClick={handleSignup} className="signup btn btn-success">Registrase</button>            
            <Link to="/producer/login">
                <button type="button" className="backlogin btn btn-secondary">Volver</button>
            </Link>
        </div>
        </>
    );
};