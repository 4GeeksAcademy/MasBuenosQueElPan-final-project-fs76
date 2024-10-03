import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProducerSignup = () => {
    const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return alert("Both email and password must be filled.");
        }
        if (!email.includes("@")) {
            return alert("Email must contain '@'.");
        }
    
        const producerExists = await actions.checkProducerExists(email);
            if (producerExists) {
                return ("User already exists.");
            }
            try {
                await actions.producerSignup(email, password); 
                
                setShowSuccessMessage(true); 
                console.log("Signup successful, navigating to login");
                
                setTimeout(() => {
                //     // `/producer/form/${newProducer.id}`
                //     // "/producer/form"
                    navigate("/producer/login"); 
                }, 3000);
            } catch (error) {
                console.error("Signup error:", error);
            };
    }

    return (
        <>
        <div className="container d-block border border-radius my-4">
        <h2>Producer Signup</h2>
            <div className="mb-3">
                <label htmlFor="signupEmailInput" className="form-label">Email address</label>
                <input type="email"
                className="form-control"
                id="signupEmailInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="signupPasswordInput" className="form-label">Password</label>
                <input type="password"
                id="signupPasswordInput"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be, at least, 8 characters long, contain letters, numbers and special characters.
                </div>
            </div>
            {showSuccessMessage && 
            <div className="alert alert-success">Signup successful!
                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                <span className="visually-hidden" role="status">Loading...</span>
            </div>
            }
            <button type="submit" onClick={handleSignup} className="signup btn btn-success">Sing up</button>            
            <Link to="/producer/login">
                <button type="button" className="backlogin btn btn-secondary">Back to Login</button>
            </Link>
        </div>
        </>
    );
};