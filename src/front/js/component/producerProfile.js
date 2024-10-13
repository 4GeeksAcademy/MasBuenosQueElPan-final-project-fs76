import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProducerProfile = () => {
	const { store, actions } = useContext(Context);
    const {producerId} = useParams()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [brandName, setBrandName] = useState("")
    const [cif, setCif] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [province, setProvince] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        actions.checkToken()
        actions.getProducer(producerId)
        // fetch(`${process.env.BACKEND_URL}/api/producer/${producerId}`)
        // .then((response)=> response.json())
        // .then((data)=>{
        //     setEmail(data.email)
        //     setName(data.user_name)
        //     setLastName(data.user_last_name)
        //     setBrandName(data.brand_name)
        //     setCif(data.cif)
        //     setAddress(data.address)
        //     setPhone(data.phone)
        //     setZipcode(data.zip_code)
        //     setProvince(data.province)
    
        // })
    },[producerId])
    useEffect(() => {
        const producer = store.producersInfo; // Asegúrate de que esto sea un objeto, no un array
        console.log(producer);
        
        if (producer) {
            setEmail(producer.email);
            setName(producer.user_name);
            setLastName(producer.user_last_name);
            setBrandName(producer.brand_name);
            setCif(producer.cif);
            setAddress(producer.address);
            setPhone(producer.phone);
            setZipcode(producer.zip_code);
            setProvince(producer.province);
        }
    }, [store.producersInfo]);
    const handleSaveEditInfo = (event) =>{
        event.preventDefault()
        const updatedInfo={
            brand_name: brandName,
            user_name: name,
            user_last_name: lastName,
            cif: cif,
            address: address,
            province: province,
            zip_code: zipcode,
            phone: phone,
        }
        actions.editProducer(producerId, updatedInfo)
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            navigate(`/producer/dashboard/${producerId}`); 
        }, 2000); 
        
    }

	return (
		<div className="container mt-5">
            {store.producersInfo.map((producer, index) => 
            <>
            <h1 className="text-center mb-4" key={index} style={{ fontSize: "32px", fontWeight: "bold", color: "#007bff" }}>
                Hola, <span>{producer.user_name}</span>, aquí puedes editar tu información y la de tu empresa.
            </h1>
            <div className="card" style={{ padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                {/* Información de usuario */}
                <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-user-circle fa-2x" style={{ color: "#007bff", marginRight: "10px" }}></i>
                    <h3 style={{ fontWeight: "600", color: "#333" }}>Información de usuario</h3>
                </div>
                <form onSubmit={handleSaveEditInfo}>
                    <div className="mb-4">
                        <label htmlFor="emailInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Email</label>
                        <input type="email" className="form-control" id="emailInput" value={producer.email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", transition: "box-shadow 0.3s" }}
                            onFocus={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'}
                            onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'}/>
                    </div>

                    <hr/>

                    {/* Información personal */}
                    <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-address-card fa-2x" style={{ color: "#007bff", marginRight: "10px" }}></i>
                        <h3 style={{ fontWeight: "600", color: "#333" }}>Información personal</h3>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nameInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Nombre</label>
                        <input type="text" className="form-control" id="nameInput" value={producer.user_name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastNameInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Apellidos</label>
                        <input type="text" className="form-control" id="lastNameInput" value={producer.user_last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Tus apellidos"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Número de teléfono</label>
                        <input type="text" className="form-control" id="phoneInput" value={producer.phone} onChange={(e) => setPhone(e.target.value)} placeholder="Tu número de teléfono"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                    </div>

                    <hr/>

                    {/* Información de empresa */}
                    <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-building fa-2x" style={{ color: "#007bff", marginRight: "10px" }}></i>
                        <h3 style={{ fontWeight: "600", color: "#333" }}>Información de empresa</h3>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="brandNameInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Nombre de Empresa</label>
                        <input type="text" className="form-control" id="brandNameInput" value={producer.brand_name} onChange={(e) => setBrandName(e.target.value)} placeholder="Nombre de tu empresa"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cifInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>CIF</label>
                        <input type="text" className="form-control" id="cifInput" value={cif} onChange={(e) => setCif(e.target.value)} placeholder="CIF de tu empresa"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="addressInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Dirección</label>
                        <input type="text" className="form-control" id="addressInput" value={producer.address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección de la empresa"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="zipcodeInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Código Postal</label>
                        <input type="text" className="form-control" id="zipcodeInput" value={producer.zip_code} onChange={(e) => setZipcode(e.target.value)} placeholder="Código postal"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="provinceInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Provincia</label>
                        <input type="text" className="form-control" id="provinceInput" value={producer.province} onChange={(e) => setProvince(e.target.value)} placeholder="Provincia"
                            style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success" style={{ padding: "12px 24px", fontWeight: "bold", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                            Guardar
                        </button>
                        <Link to={`/producer/dashboard/${producerId}`}>
                            <button type="button" className="btn btn-primary" style={{ padding: "12px 24px", fontWeight: "bold", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                                Volver atrás
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
            </>
            )}
        </div>
	);
};
