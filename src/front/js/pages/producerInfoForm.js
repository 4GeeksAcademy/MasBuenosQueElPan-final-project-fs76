
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";


export const ProducerInfoForm = () => {
    const { store, actions } = useContext(Context);
    const { producerId } = useParams()
    const navigate = useNavigate();
    const [ producerInfo, setProducerInfo ] = useState({});
    const [ showSuccessMessage, setShowSuccessMessage ] = useState(false)

    useEffect(()=>{
        const currentProducer = store.producers.find(producer => producer.id === parseInt(producerId))
        // console.log("currentProducer in form", currentProducer)
        if (currentProducer) {
            setProducerInfo(currentProducer)
        } else console.log("no info to return");
        // console.log("producerId", producerId);
        // console.log("producerInfo", producerInfo);
        
        
     },[store.producers, producerId])//  
    
     
    const handleEdition = (e) => {
        e.preventDefault();
        actions.addProducerInfo(producerId, producerInfo)
        setShowSuccessMessage(true);
        setTimeout(() => {
            navigate(`/producer/dashboard/${localStorage.getItem("producerId")}`);
        }, 2000);
    }
    const handleExit = () => {
        navigate(`/producer/dashboard/${localStorage.getItem("producerId")}`)
     }
     const handleChange = (event) => {
        const { name , value } = event.target
        // console.log("name from handleChange", name);
        // console.log("value from handleChange", value);
        setProducerInfo((prevInfo) => ({...prevInfo, [name]: value
     }));
     }

    return (
        <>
        <h1>Añade aquí tu información</h1>
        {producerInfo ? (
            <form onSubmit={handleEdition}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <input type="text" name="email" value={producerInfo.email || ''} onChange={handleChange} className="form-control" id="emailInput" disabled readOnly/>
                </div>
                <div className="mb-3">
                    <label htmlFor="brandNameInput" className="form-label">Nombre de la empresa</label>
                    <input type="text" name="brand_name" value={producerInfo.brand_name || ''} onChange={handleChange} className="form-control" id="brandNameInput"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="userNameInput" className="form-label">Nombre de usuario</label>
                    <input type="text" name="user_name" value={producerInfo.user_name || ''} onChange={handleChange} className="form-control" id="userNameInput"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="userLastNameInput" className="form-label">Apellido de usuario</label>
                    <input type="text" name="user_last_name" value={producerInfo.user_last_name || ''} onChange={handleChange} className="form-control" id="userLastNameInput"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cifInput" className="form-label">CIF de la empresa</label>
                    <input type="text" name="cif" value={producerInfo.cif || ''} onChange={handleChange} className="form-control" id="cifInput"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">Dirección de la empresa</label>
                    <input type="text" name="address" value={producerInfo.address || ''} onChange={handleChange} className="form-control" id="addressInput"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="provinceInput" className="form-label">Ciudad/Provincia</label>
                    <input type="text" name="province" value={producerInfo.province || ''} onChange={handleChange} className="form-control" id="provinceInput"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="zipCodeInput" className="form-label">Código postal</label>
                    <input type="text" name="zip_code" value={producerInfo.zip_code || ''} onChange={handleChange} className="form-control" id="zipCodeInput"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneInput" className="form-label">Teléfono</label>
                    <input type="number" name="phone" value={producerInfo.phone || ''} onChange={handleChange} className="form-control" id="phoneInput"/>
                </div>
                <div className="col-auto mb-3">
                    <button type="submit" className="btn btn-primary me-3">Añadir</button>
                    <button type="button" onClick={handleExit} className="btn btn-secondary">Salir</button>
                </div>
            </form>
        ) : (
        <p>Ups! Parece que ha habido un problema...</p>
        )}
        {showSuccessMessage &&
        <div className="alert alert-success">Información añadida con éxito! 
            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
            <span className="visually-hidden" role="status">Llevándote en tractor a Home!...</span>
        </div>
        }
        </>
    );
};
