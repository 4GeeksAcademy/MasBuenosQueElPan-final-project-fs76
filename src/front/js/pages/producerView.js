import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useParams } from "react-router-dom";

export const ProducerView = () => {

    const { actions, store } = useContext(Context)
    const { producerId } = useParams()
    const autenticate = store.isLogedIn

    // const loggedInProducer = store.producers[0]; // Assuming you stored the logged-in producer in the first index

    if (!autenticate){
        return <Navigate to="/producer/login" />
    }

    useEffect(() => {
        actions.getProducer(producerId); 
    }, []);    


    return (
        <>
        <h1>This is the producer view</h1>
        <button type="button" className="btn btn-danger" onClick={()=> actions.producerLogout()}>Log out</button>
        {store.producers.map((producer, index) => 
                    <div key={index}>
                        <h3>COMPANY NAME: {producer.brand_name || "no brand_name"}</h3>
                        <h1>Hello {producer.user_name || "no username"} {producer.user_last_name || "no user_last_name"}</h1>
                        <Link to={"/producer/form/" + producer.id}>
                            <button type="button" className="edit btn btn-warning">Edit</button>
						</Link>
                    </div>
        )}
        </>
    )
};