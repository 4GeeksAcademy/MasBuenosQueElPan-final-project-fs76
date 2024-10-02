import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
// import { ProducerInfoForm } from "../pages/producerInfoForm";
import { useNavigate } from "react-router-dom";

export const ProducerLogin = () => {
    const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showEmptyInputs, setShowEmptyInputs ] = useState(false);
    const [ showAt, setShowAt ] = useState(false);
    const [ showExists, setShowExists] = useState(false);

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

        actions.checkProducerExists(email).then(producerExists => {
            if (!producerExists) {
                console.log(producerExists)
                setShowExists(true);
                return;
            }
            actions.producerLogin(email, password)
            .then((data) => {
                console.log("data from login", data);
                console.log("Navigating to producer view");
                setShowExists(true)
                return;
            })
            .catch(error => {
                console.error("Error during login:", error);
                alert("An error occurred during login. Please try again later.");
            });
        // actions.producerLogin(email, password)
        })
    }

    return (
        <>
        <div className="container d-block border border-radius my-4">
        <h2>Producer Login</h2>
        {showEmptyInputs &&
            <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                All inputs should be filled.
                <button type="button" onClick={()=>setShowEmptyInputs(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }
            {showExists &&
            <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                Email or password incorrect.
                <button type="button" onClick={()=>setShowExists(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }
            {showAt &&
            <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                Email should have @ symbol.
                <button type="button" onClick={()=>setShowAt(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }

            <div className="mb-3">
                <label htmlFor="loginEmailInput" className="form-label">Email address</label>
                <input type="email"
                className="form-control"
                id="loginEmailInput"
                placeholder="Email address"
                value={email}
                onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="loginPasswordInput" className="form-label">Password</label>
                <input type="password"
                id="loginPasswordInput"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
                <Link to="/producer/signup">
                    <span className="">or Sign Up here</span>
                </Link>
            </div>
            <button type="submit" onClick={handleLogin} className="signup btn btn-primary">Login</button>
        </div>
        </>
    );
};