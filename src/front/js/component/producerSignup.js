import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const ProducerSignup = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <div className="container d-block border border-radius">
        <h2>Producer Signup</h2>
            <div className="mb-3">
                <label htmlFor="signupEmailInput" className="form-label">Email address</label>
                <input type="email" className="form-control" id="signupEmailInput" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
            <label htmlFor="signupPasswordInput" className="form-label">Password</label>
                <input type="password" id="signupPasswordInput" className="form-control" aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be, at least, 8 characters long, contain letters, numbers and special characters.
                </div>
            </div>
            <button type="submit" className="signup btn btn-primary">Sing up</button>
            {/* <button type="button" className="delete btn btn-danger">Delete</button>
            <button type="button" className="edit btn btn-warning">Edit</button> */}
        </div>
            {/* <h2>Producer List</h2>
            {store.producers.length > 0 ? (
                store.producers.map((producer, index) => 
                    <div key={index}>
                        <h3>{producer.brand_name}</h3>
                        <p>{producer.email}</p>
                        <p>{producer.user_name} {producer.user_last_name}</p>
                        <p>{producer.address}</p>
                        <p>{producer.phone}</p>
                    </div>
                )
            ) : (
                <p>No producers found</p>
            )} */}
        </>
    );
};