
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Product } from "./ViewProducts";

export const ProducerView = () => {

    const { actions, store } = useContext(Context);
    const { producerId } = useParams();
    const navigate = useNavigate();
    const [ cautionDeleting, setCautionDeleting ] = useState(false);
    
    const autenticate = store.isLogedIn;

    if (!autenticate){
        return <Navigate to="/producer/login" />
    }

    useEffect(() => {
        actions.getProducer(producerId);
        actions.getProducts()
    }, [producerId]);
    
    const handleCautionDelete = () => {
        setCautionDeleting(true) 
    }
    
    const handleDelete = () => {
        actions.deleteProduct(id)
        
    }
    const handleEdit = () => {
        console.log("go to edit product view");
        
    }

    return (
        <>
        <h1 className="my-3">This is the producer view</h1>
        {/* <button type="button" className="btn btn-danger" onClick={()=> actions.producerLogout()}>Log out</button> */}
        {store.producers.map((producer, index) => 
        <div key={index}>
            <h3>Nombre de la compañía: {producer.brand_name || "no brand_name"}</h3>
            <h1>Hola, {producer.user_name || "no username"} {producer.user_last_name || "no user_last_name"}!</h1>
            <Link to={"/producer/form/" + producer.id}>
                <button type="button" className="edit btn btn-warning">Edita tu información o de la empresa aquí</button>
            </Link>

            {store.products.length > 0 ? (
                <Product />
            ) : (
                <button className="btn btn-primary" onClick={()=>navigate(`/producer/dashboard/${producerId}/newproduct`)()}>Añade nuevos productos</button>
            )}
            </div>

        )} 
        
        </>

    )
};
