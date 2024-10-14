import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CustomerInfoForm = () => {
    const { store, actions } = useContext(Context);
    const { customer_id } = useParams();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        actions.get_One_customer(customer_id);
    }, [customer_id]);

    useEffect(() => {
        if (store.customerInfo) {
            setEmail(store.customerInfo.customer_email || "");
            setName(store.customerInfo.customer_name || "");
            setLastName(store.customerInfo.customer_lastname || "");
            setCity(store.customerInfo.customer_city || "");
            setAddress(store.customerInfo.customer_address || "");
            setPhone(store.customerInfo.customer_phone || "");
            setZipcode(store.customerInfo.customer_zipcode || "");
            setProvince(store.customerInfo.customer_province || "");
            setCountry(store.customerInfo.customer_country || "");
        }
    }, [store.customerInfo]);

    const handleSaveEditInfo = (event) => {
        event.preventDefault();
        const newData = {
            customer_name: name,
            customer_lastname: lastName,
            customer_email: email,
            customer_address: address,
            customer_province: province,
            customer_city: city,
            customer_zipcode: zipcode,
            customer_phone: phone,
            customer_country: country
        };
        setLoading(true); 
        actions.edit_customer(customer_id, newData);
        setTimeout(() => {
            setLoading(false);
            navigate(`/customer/home/${customer_id}`);
        }, 2000);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ fontSize: "32px", fontWeight: "bold", color: "#007bff" }}>
                Bienvenido a tu perfil, <span>{store.customerInfo?.customer_name}</span>
            </h1>
            <div className="card" style={{ padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-user-circle fa-2x" style={{ color: "#007bff", marginRight: "10px" }}></i>
                    <h3 style={{ fontWeight: "600", color: "#333" }}>Información de usuario</h3>
                </div>
                <form onSubmit={handleSaveEditInfo}>
                {loading ? (
                        <div className="text-center mb-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Cargando...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label htmlFor="emailInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Email</label>
                                <input type="email" className="form-control" id="emailInput" value={email || ""} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com"
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", transition: "box-shadow 0.3s" }}
                                    onFocus={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'}/>
                            </div>
                            <hr/>
                            <div className="d-flex align-items-center mb-3">
                                <i className="fas fa-address-card fa-2x" style={{ color: "#007bff", marginRight: "10px" }}></i>
                                <h3 style={{ fontWeight: "600", color: "#333" }}>Información de usuario</h3>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nameInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Nombre</label>
                                <input type="text" className="form-control" id="nameInput" value={name || ""} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre"
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastNameInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Apellidos</label>
                                <input type="text" className="form-control" id="lastNameInput" value={lastName || ""} onChange={(e) => setLastName(e.target.value)} placeholder="Tus apellidos"
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                            </div>
                            <hr/>
                            <div className="d-flex align-items-center mb-3">
                                <i className="fas fa-address-card fa-2x" style={{ color: "#007bff", marginRight: "10px" }}></i>
                                <h3 style={{ fontWeight: "600", color: "#333" }}>Información personal</h3>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="addressinput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Dirección</label>
                                <input type="text" className="form-control" id="addressinput" value={address || ""} onChange={(e) => setAddress(e.target.value)} placeholder="Calle..."
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="provinceInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Provincia</label>
                                <input type="text" className="form-control" id="provinceInput" value={province || ""} onChange={(e) => setProvince(e.target.value)} placeholder="Madrid..."
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cityInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Ciudad</label>
                                <input type="text" className="form-control" id="cityInput" value={city || ""} onChange={(e) => setCity(e.target.value)} placeholder="Madrid..."
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="zipcodeInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Código Postal</label>
                                <input type="text" className="form-control" id="zipcodeInput" value={zipcode || ""} onChange={(e) => setZipcode(e.target.value)} placeholder="31000..."
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="countryInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>País</label>
                                <input type="text" className="form-control" id="countryInput" value={country || ""} onChange={(e) => setCountry(e.target.value)} placeholder="España..."
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phoneInput" className="form-label" style={{ fontWeight: "500", color: "#555" }}>Teléfono</label>
                                <input type="text" className="form-control" id="phoneInput" value={phone || ""} onChange={(e) => setPhone(e.target.value)} placeholder="626..."
                                    style={{ borderRadius: "8px", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}/>
                            </div>
                            {/* Otros campos como teléfono, dirección, CIF, etc. */}
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-success" style={{ padding: "12px 24px", fontWeight: "bold", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                                    Guardar
                                </button>
                                <Link to={`/customer/home/${customer_id}`}>
                                    <button type="button" className="btn btn-primary" style={{ padding: "12px 24px", fontWeight: "bold", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                                        Volver atrás
                                    </button>
                                </Link>
                            </div>
                        </>)}
                </form>
            </div>
        </div>
    );
};