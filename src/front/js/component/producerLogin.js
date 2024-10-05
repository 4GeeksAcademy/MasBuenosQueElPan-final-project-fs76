import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProducerLogin = () => {
    const {  actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showEmptyInputs, setShowEmptyInputs ] = useState(false);
    const [ showAt, setShowAt ] = useState(false);
    const [ showExists, setShowExists] = useState(false);
    const [ logingIn, setLoginIn ] = useState(false)
    const navigate = useNavigate()

    // At = @

    useEffect(() => {
        let timer;
        if (showExists) {
            timer = setTimeout(() => {
                setShowExists(false);
            }, 3000); // 
        }
        return () => clearTimeout(timer); 
    }, [showExists])

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
            setLoginIn(true)
            actions.producerLogin(email, password).then(data => {
                // console.log("data from producerlogin", data);
                // console.log("Navigating to producer view");
                if (data.isVerify) {
                    setLoginIn(false)
                    navigate(`/producer/dashboard/${data.producerId}`)
                    
                } else {
                    navigate(`/producer/form/${data.producerId}`)
                }
            return data
            })
            .catch(error => {
                console.error("Error during login:", error);
                alert(error.message);
            });
        })
    }

    return (
        <>
        <div className="container d-block border rounded-3 my-4">
        <h2>Login</h2>
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
                <label htmlFor="loginEmailInput" className="form-label">Email</label>
                <input type="email"
                className="form-control"
                id="loginEmailInput"
                placeholder="Email address"
                value={email}
                onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="loginPasswordInput" className="form-label">Contraseña</label>
                <input type="password"
                id="loginPasswordInput"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
                <Link to="/producer/signup">
                    <span className="">Todavía no tienes cuenta? Háztela aquí!</span>
                </Link>
            </div>
            <button type="submit" onClick={handleLogin} className="signup btn btn-primary mb-2">Login</button>
        {logingIn &&
        <div className="alert alert-success mt-5">Parece que ha salido todo bien! Cargando perfil  
            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
            <span className="visually-hidden" role="status">Espera, que cargo tu perfil!</span>
        </div>
        }
        </div>
        </>
    );
};