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
    const [view, setView] = useState("list");
    // Estado para las cantidades de cada producto, fuera de map
    const [quantities, setQuantities] = useState({});
    useEffect(()=>{
        actions.verifyCustomerToken()
    },[])
    console.log(store.customerIsLogedIn)
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
                setCustomerName(data.name);
                actions.get_One_customer(customer_id);
            })
            .catch((error) => console.error("Error al actualizar los datos:", error));
    };

    useEffect(() => {
        actions.getProducts();  
        actions.get_One_customer(customer_id); 
    }, [customer_id]);

    useEffect(() => {
        if (store.customerInfo) {
            setName(store.customerInfo.customer_name || "");
            setLastName(store.customerInfo.customer_lastname || "");
            setCustomerName(store.customerInfo.customer_name || null);
        }
    }, [store.customerInfo]);

    const handleQuantityChange = (index, value) => {
        setQuantities({
            ...quantities,
            [index]: value
        });
    };
    const handlePurchase = (producto, quantity) => {
        const purchaseData = {
            product_id: producto.id,
            quantity: quantity,
            customer_id: customer_id, 
            price: producto.price * quantity,
            producer_id: producto.producer_id  
        };
        fetch(process.env.BACKEND_URL + "/api/ordencompra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(purchaseData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Compra realizada con éxito");
            console.log(data); 
        })
        .catch(error => console.error("Error al realizar la compra:", error));
    };
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{fontSize: '2rem', fontWeight: 'bold',color: '#343a40'}}>Encantados de tenerte aquí, {customer_name}!</h2>
                <div className="d-flex justify-content-end  align-items-center mb-4">
                    <button 
                        className={`btn ${view === 'list' ? 'btn-primary' : 'btn-secondary'}`} 
                        onClick={() => setView("list")} style={{
                            backgroundColor: view === 'list' ? '#4CAF50' : 'transparent',  // Verde para Lista
                            color: view === 'list' ? 'white' : '#4CAF50', 
                            borderColor: '#4CAF50',
                            transition: "all 0.3s",
                            marginRight: "10px"
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"/>
                        </svg>
                    </button>
                    <button 
                        className={`btn ${view === 'mapa' ? 'btn-primary' : 'btn-secondary'} ml-3`} 
                        onClick={() => setView("mapa")} style={{
                            backgroundColor: view === 'mapa' ? '#8B4513' : 'transparent',  // Marrón para Mapa
                            color: view === 'mapa' ? 'white' : '#8B4513',
                            borderColor: '#8B4513',
                            transition: "all 0.3s"
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-map-fill" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                        </svg>
                    </button>
                </div>
            </div>

            {view === "list" ? (
                customer_name ? (
                    <div className="text-center">
                        <h3 style={{fontSize: '2rem',color: '#343a40'}}>Descubre la variedad de productos locales</h3>
                        <p className="my-4" tyle={{fontSize: '1rem',color: '#6c757d'}}>Aquí encontrarás una selecta variedad de productos: </p>

                        {store.products.length > 0 ? (
                            <div className="row">
                            {store.products.map((producto, index) => {
                              const quantity = quantities[index] || 1;
                              return (
                                <div key={index} className="col-md-4 mb-4">
                                  <div className="card h-100 shadow-lg" style={{
                                    borderRadius: "20px",
                                    backgroundColor: "#f7f5f2",
                                    border: "none",
                                    transition: "transform 0.3s",
                                    }} onMouseEnter={(e)=> e.currentTarget.style.transform ="scale(1.02)"}
                                    onMouseLeave={(e)=> e.currentTarget.style.transform="scale(1)"}>
                                    <img
                                      src={producto.categorie_imageUrl}
                                      className="card-img-top"
                                      alt={producto.name}
                                      style={{
                                        height: "250px",
                                        objectFit: "cover",
                                        borderRadius: "20px 20px 0 0",
                                      }}
                                    />
                                    <div className="card-body text-center">
                                      <h5 className="card-title" style={{
                                        fontWeight: "600",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "1.25rem",
                                        color: "#343a40",
                                      }}>
                                        {producto.name}
                                      </h5>
                                      <p className="card-text" style={{
                                        color: "#6c757d",
                                        fontSize: "0.9rem",
                                        fontWeight: "500",
                                      }}>
                                        {producto.categorie_name}
                                      </p>
                                      <p className="card-text" style={{
                                        color: "#4CAF50",
                                        fontWeight: "bold",
                                        fontSize: "1.1rem",
                                      }}>
                                        {producto.price} €/kg
                                      </p>
                                      <p className="card-text" style={{
                                        color: "#8B4513",
                                        fontSize: "0.9rem",
                                      }}>
                                        Origen: {producto.origin}
                                      </p>
                                      <p className="card-text" style={{
                                        fontSize: "0.85rem",
                                        color: "#666",
                                      }}>
                                        {producto.description}
                                      </p>
                                      {/* Casilla para seleccionar la cantidad */}
                                      <div className="mb-3 d-flex justify-content-center">
                                        <input
                                          type="number"
                                          className="form-control shadow-sm"
                                          value={quantity || ""}
                                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                                          min="1"
                                          style={{
                                            width: "60px",
                                            textAlign: "center",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                          }}
                                        />
                                      </div>
                          
                                      {/* Botón para comprar */}
                                      <button
                                        className="btn btn-success w-100"
                                        onClick={() => handlePurchase(producto, quantity)}
                                        style={{
                                          backgroundColor: "#4CAF50",
                                          borderRadius: "10px",
                                          fontWeight: "bold",
                                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        }}
                                      >
                                        Comprar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
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
                            color: "#388E3C", 
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
                        <button type="submit" className="btn btn-primary w-100 py-2" style={{ borderRadius: "10px", fontWeight: "bold", backgroundColor: "#388E3C", border: "none", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
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