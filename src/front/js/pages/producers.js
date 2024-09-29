import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ProducerLogin } from "../component/producerLogin";
import { ProducerSignup } from "../component/producerSignup";

export const Producers = () => {
    const { store, actions } = useContext(Context);
    useEffect(()=>{
        actions.getProducers();
        // actions.producerSignup();
        // actions.producerLogin();
     },[])

    return (
        <>
        <div className="container d-inline-flex my-4 gap-3">
            <ProducerSignup />
            <ProducerLogin />
        </div>
            <h2>Producer List</h2>
            {store.producers.length > 0 ? (
                store.producers.map((producer, index) => 
                    <div key={index}>
                        <h3>{producer.brand_name}</h3>
                        <p>{producer.email}</p>
                        <p>{producer.user_name} {producer.user_last_name}</p>
                        <p>{producer.address}</p>
                        <p>{producer.phone}</p>
                        <button type="button" className="delete btn btn-danger">Delete</button>
                        <button type="button" className="edit btn btn-warning">Edit</button>
                    </div>
                )
            ) : (
                <p>No producers found</p>
            )}
        </>
    );
};
