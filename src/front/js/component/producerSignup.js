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

    const handleSignup = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return alert ("inputs must be fill")
        } else if (!email.includes("@")) {
            return alert ("@ must be in the email");
        }
        actions.producerSignup(email, password)
        setShowSuccessMessage(true)

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    return (
        <>
        <div className="container d-block border border-radius">
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
            <div className="alert alert-success">Signup successful! Recharging producers!
                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                <span className="visually-hidden" role="status">Loading...</span>
            </div>
            }
            <button type="submit" onClick={handleSignup} className="signup btn btn-primary">Sing up</button>
        </div>
        </>
    );
};