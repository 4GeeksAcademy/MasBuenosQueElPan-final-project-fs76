
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
        actions.getProducer(producerId)
    },[])

    console.log("producerID",producerId);
    

    useEffect(()=>{
        actions.checkToken()
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
     }))
     }
    return (
        <>
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "80vh", backgroundColor: "#f9f9f9" }}>
        <div className="card shadow-lg p-5" style={{ width: "100%", maxWidth: "600px", borderRadius: "15px", backgroundColor: "#ffffff" }}>
            <h1 className="text-center mb-4" style={{ color: "#007bff", fontWeight: "bold" }}>Añade tu Información</h1>
            {producerInfo ? (
                <form onSubmit={handleEdition}>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            value={producerInfo.email || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="emailInput" 
                            disabled 
                            readOnly
                            style={{ 
                                backgroundColor: "#e9ecef", 
                                borderRadius: "10px", 
                                padding: "10px" 
                            }} 
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="brandNameInput" className="form-label">Nombre de la Empresa</label>
                        <input 
                            type="text" 
                            name="brand_name" 
                            value={producerInfo.brand_name || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="brandNameInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userNameInput" className="form-label">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            name="user_name" 
                            value={producerInfo.user_name || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="userNameInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userLastNameInput" className="form-label">Apellido de Usuario</label>
                        <input 
                            type="text" 
                            name="user_last_name" 
                            value={producerInfo.user_last_name || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="userLastNameInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cifInput" className="form-label">CIF de la Empresa</label>
                        <input 
                            type="text" 
                            name="cif" 
                            value={producerInfo.cif || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="cifInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="addressInput" className="form-label">Dirección de la Empresa</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={producerInfo.address || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="addressInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="provinceInput" className="form-label">Provincia</label>
                        <input 
                            type="text" 
                            name="province" 
                            value={producerInfo.province || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="provinceInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="provinceInput" className="form-label">Ciudad</label>
                        <input 
                            type="text" 
                            name="province" 
                            value={producerInfo.city || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="provinceInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="zipCodeInput" className="form-label">Código Postal</label>
                        <input 
                            type="text" 
                            name="zip_code" 
                            value={producerInfo.zip_code || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="zipCodeInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phoneInput" className="form-label">Teléfono</label>
                        <input 
                            type="number" 
                            name="phone" 
                            value={producerInfo.phone || ''} 
                            onChange={handleChange} 
                            className="form-control" 
                            id="phoneInput"
                            style={{ borderRadius: "10px", padding: "10px" }} 
                        />
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-primary me-3" style={{ padding: "10px 20px", borderRadius: "10px" }}>Añadir</button>
                        <button type="button" onClick={handleExit} className="btn btn-secondary" style={{ padding: "10px 20px", borderRadius: "10px" }}>Salir</button>
                    </div>
                </form>
            ) : (
                <p>Ups! Parece que ha habido un problema...</p>
            )}

            {showSuccessMessage && (
                <div className="alert alert-success text-center mt-4" style={{ fontSize: "16px" }}>
                    Información añadida con éxito! 
                    <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                    <span className="visually-hidden" role="status">Llevándote en tractor a Home!...</span>
                </div>
            )}
        </div>
    </div>
</>
    );
};
