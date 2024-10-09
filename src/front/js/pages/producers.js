import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { ProducerLogin } from "../component/producerLogin";
import { ProducerSignup } from "../component/producerSignup";

export const Producers = () => {
    const { store, actions } = useContext(Context);
    const [ showSignup, setShowSignup ] = useState(false)
    useEffect(()=>{
        actions.getProducers();
     },[])
    return (
        <>
            <div>
                
                {showSignup ? (
                    <ProducerSignup onBackToLogin={() => setShowSignup(false)} />
                ) : (
                    <ProducerLogin onSignup={() => setShowSignup(true)} />
                )}
                
                {/* {showSignup ? (
                    <ProducerSignup onBackToLogin={() => setShowSignup(false)} />
                ) : (
                    <>
                        <h2>Producer Login</h2>
                        <div className="mb-3">
                            <label htmlFor="loginEmailInput" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="loginEmailInput" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loginPasswordInput" className="form-label">Password</label>
                            <input type="password" id="loginPasswordInput" className="form-control" aria-describedby="passwordHelpBlock" />
                        </div>
                        <div className="mb-3">
                            <span className="" onClick={() => setShowSignup(true)} style={{ cursor: 'pointer', color: 'blue' }}>
                                or Sign Up here
                            </span>
                        </div>
                        <button type="submit" className="signup btn btn-primary">Login</button>
                    </>
                )} */}
            </div>
        
            {/* <h2>Producer List</h2>
            <div className="container d-inline-flex my-4 gap-3">
            {store.producers.length > 0 ? (
                store.producers.map((producer, index) => 
                    <div key={index}>
                        <h3>{producer.brand_name || "no brand_name"}</h3>
                        <p>{producer.email}</p>
                        <p>{producer.user_name || "no username"} {producer.user_last_name || "no user_last_name"}</p>
                        <p>{producer.address || "no address"}</p>
                        <p>{producer.phone || "no phone"}</p>
                        <button type="button" className="delete btn btn-danger" onClick={()=>actions.deleteProducer(producer.id)}>Delete</button>
                        <Link to={"/producer/edit/" + producer.id}>
                            <button type="button" className="edit btn btn-warning">Edit</button>
						</Link>
                        
                    </div>
                )
            ) : (
                <p>No producers found</p>
            )}
            </div> */}
        </>
    );
};
