import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";
import { MapView } from "../component/mapView";

export const HomeCustView = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { customer_id } = useParams();
    const [name, setName] = useState("");
    const [customer_name, setCustomerName] = useState(null);
    const [last_name, setLastName] = useState("");
    const [view, setView] = useState("list")
    const handleLogOut = () => {
        actions.logOut();
        if (!store.token) {
            navigate("/");
        }
    };

    const newData = (event) => {
        event.preventDefault();
        const raw = JSON.stringify({
            name: name,
            last_name: last_name,
        });

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: raw,
        };
        fetch(`${process.env.BACKEND_URL}/api/customer/${customer_id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setCustomerName(data.name),
                actions.get_One_customer(customer_id);
            })
            .catch((error) => console.error("Error al actualizar los datos:", error));
    };

    useEffect(() => {
        actions.getProducts();  
        actions.get_One_customer(customer_id); 
    }, [customer_id]);

    useEffect(() => {
        // Si ya tienes customerInfo en el store, usa eso para llenar los campos del formulario
        if (store.customerInfo) {
            setName(store.customerInfo.customer_name || "");
            setLastName(store.customerInfo.customer_lastname || "");
            setCustomerName(store.customerInfo.customer_name || null);
        }
    }, [store.customerInfo]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-4">
                <button 
                    className={`btn ${view === 'list' ? 'btn-primary' : 'btn-secondary'}`} 
                    onClick={() => setView("list")}>
                    Ver Lista
                </button>
                <button 
                    className={`btn ${view === 'mapa' ? 'btn-primary' : 'btn-secondary'} ml-3`} 
                    onClick={() => setView("mapa")}>
                    Ver Mapa
                </button>
            </div>

            {view === "list" ? (
                customer_name ? (
                    <div className="text-center">
                        <h1>Encantados de tenerte aquí, {customer_name}!</h1>
                        <h3 className="my-4">Aquí encontrarás una selecta variedad de productos: </h3>

                        {store.products.length > 0 ? (
                            <div className="row">
                                {store.products.map((producto, index) => (
                                    <div key={index} className="col-md-4 mb-4">
                                        <div className="card h-100 shadow-sm" style={{ borderRadius: "15px" }}>
                                            <img src={producto.image || rigoImageUrl} className="card-img-top" alt={producto.name} style={{ height: "200px", objectFit: "cover", borderRadius: "15px 15px 0 0" }} />
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ fontWeight: "600" }}>{producto.name}</h5>
                                                <p className="card-text">Categoría: {producto.categorie_name || "Desconocida"}</p>
                                                <p className="card-text">Precio: {producto.price} €/kg</p>
                                                <p className="card-text">Origen: {producto.origin}</p>
                                                <p className="card-text">Descripción: {producto.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="alert alert-info" role="alert">
                                Aún nadie ha creado productos.
                            </div>
                        )}
                    </div>
                ) : (
                    <form onSubmit={newData} className="p-4 shadow-lg rounded-3" style={{ backgroundColor: "#f9f9f9", maxWidth: "600px", margin: "0 auto", borderRadius: "15px" }}>
                        <h3 style={{ 
                            textAlign: "center", 
                            fontWeight: "bold", 
                            color: "#007bff", 
                            marginBottom: "20px", 
                            fontSize: "24px",
                            letterSpacing: "1px",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                        }}>
                            Antes de comenzar, cuéntanos un poco acerca de ti:
                        </h3>
                        <div className="mb-4">
                            <label htmlFor="inputName" className="form-label" style={{ fontWeight: "600", color: "#555" }}>Nombre</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                id="inputName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nombre..."
                                style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ccc", backgroundColor: "#fff" }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="inputLastName" className="form-label" style={{ fontWeight: "600", color: "#555" }}>Apellidos</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                id="inputLastName"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Apellidos..."
                                style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ccc", backgroundColor: "#fff" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 py-2" style={{ borderRadius: "10px", fontWeight: "bold", backgroundColor: "#007bff", border: "none", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                            Guardar
                        </button>
                    </form>
                )
            ) : (
                // Aquí se mostrará el mapa cuando esté activo
                <MapView />
            )}
        </div>
    );
};
