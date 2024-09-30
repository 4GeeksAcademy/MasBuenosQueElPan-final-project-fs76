import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const EditProducer = () => {
    const { store, actions } = useContext(Context);
    const { producerId } = useParams();
    const [producerInfo, setProducerInfo] = useState({});

    const handleEdition = (e) => {
        e.preventDefault();
        actions.editProducer(producerId, producerInfo)
    }
    const handleChange = (event) => {
       const { id , value } = event.target
       setProducerInfo({...producerInfo, [id]: value
    });
    }
    useEffect(()=>{
        const currentProducer = store.producers.find(producer => producer.id === parseInt(producerId))
        if (currentProducer) {
            setProducerInfo(currentProducer)
        }            
     },[store.producers, producerId])

    return (
        <>
        <h1>Edit producer info</h1>
        {/* {producerInfo ? ( */}
            <form onSubmit={()=>handleEdition()}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input type="text" value={producerInfo.email} onChange={handleChange} className="form-control" id="emailInput"/>
                </div>
            </form>
        {/* // ) : (
        // <p>Loading...</p>
        // )} */}
        </>
    );
};