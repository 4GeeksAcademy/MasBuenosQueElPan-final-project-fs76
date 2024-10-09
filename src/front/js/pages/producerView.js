import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const ProducerView = () => {
    const { actions, store } = useContext(Context);
    const { producerId } = useParams();
    const navigate = useNavigate();
    const [cautionDeleting, setCautionDeleting] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [origin, setOrigin] = useState("");
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [categoria, setcategoria] = useState("")
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editOrigin, setEditOrigin] = useState("");
    const [editDescription, setEditDescription] = useState("");
    
    const autenticate = store.isLogedIn;
    const [ isLoading, setIsLoading ] = useState(true)
    
    useEffect(() => {
        actions.checkToken().then(() => {
            setIsLoading(false)
        });
        // actions.getCategorieImg();
        actions.getProducer(producerId);
        actions.getProducts();
        // actions.getCategories();
    }, [producerId]);
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!autenticate) {
        return <Navigate to="/producer/login" />;
    }
    
    const handleCautionDelete = () => {
        setCautionDeleting(true) 
    }
    const handleGoToAddProduct = () => {
        navigate(`/producer/dashboard/${producerId}/newproduct`)
    }

    const openModal = () => {
        setShowModal(true);
    };

    const handleSaveProduct = () => {
        const parsePrice = parseFloat(price);
        const newProduct = {
            name: name,
            price: parsePrice,
            origin: origin,
            description: description,
        };
        for (let field in newProduct) {
            if (!newProduct[field]) {
                alert(`No se han introducido los datos en: ${field}`);
                return;
            }
        }
        actions.addProducts(newProduct);
        setName("");
        setOrigin("");
        setDescription("");
        setPrice("");
        closeModal();
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Abre el modal de edición con los datos del producto seleccionado
    const handleEditProduct = (producto) => {
        setEditProductId(producto.id);
        setEditName(producto.name);
        setEditPrice(producto.price);
        setEditOrigin(producto.origin);
        setEditDescription(producto.description);
        setShowEditModal(true);
    };

    const handleSaveEditProduct = () => {
        const parsePrice = parseFloat(editPrice);
        const updatedProduct = {
            id: editProductId,
            name: editName,
            price: parsePrice,
            origin: editOrigin,
            description: editDescription,
        };
        for (let field in updatedProduct) {
            if (!updatedProduct[field]) {
                alert(`No se han introducido los datos en: ${field}`);
                return;
            }
        }
        actions.modifyProduct(updatedProduct);
        setEditName("")
        setEditPrice("")
        setEditOrigin("")
        setEditDescription("")
        closeEditModal();
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const handleDelete = (id) => {
        actions.deleteProduct(id);
    };

    // return (
    //     <>
    //     <h1 className="my-3">This is the producer view</h1>
    //     {/* <div>
    //         <img src={imageUrls[currentIndex]} alt="Descripción de la imagen" style={{ maxWidth: '100%', height: 'auto' }} />
    //         <button onClick={changeImage}>Cambiar Imagen</button>
    //     </div> */}
    //     {store.producers.map((producer, index) => 
    //     <div key={index}>
    //         <h3>Nombre de la compañía: {producer.brand_name || "no brand_name"}</h3>
    //         <h1>Hola, {producer.user_name || "no username"} {producer.user_last_name || "no user_last_name"}!</h1>
    //         <Link to={"/producer/form/" + producer.id}>
    //             <button type="button" className="edit btn btn-warning">Edita tu información o de la empresa aquí</button>
    //         </Link>

    //         {store.products.length > 0 ? (
    //             <Product />
    //         ) : (
    //             <button className="btn btn-primary" onClick={()=>handleGoToAddProduct()}>Añade nuevos productos</button>
    //         )}



    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className="my-3">Bienvenido a tu panel! Tus productos son los siguientes:</h1>
                    <br />
                    <hr />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems:"center" }}>
                        {store.products.length > 0 && store.products.map((producto, index) => (
                            <div key={index} className="card" style={{ 
                                width: "24rem", 
                                borderRadius: "15px", 
                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)", 
                                overflow: "hidden" 
                            }}>
                                <img src={rigoImageUrl} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body" style={{ padding: "20px" }}>
                                    <h5 className="card-title" style={{ fontWeight: "bold", color: "#333" }}>Producto: {producto.name}</h5>
                                    <p className="card-text" style={{color:"#777", fontSize: "14px"}}>Categoría: {categoria}</p>
                                    <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>Precio: {producto.price} €/kg</p>
                                    <p style={{ color: "#555" }}>El origen del producto es: {producto.origin}</p>
                                    <p style={{ color: "#555" }}>Descripción del producto: {producto.description}</p>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger" 
                                        style={{ borderRadius: "10px", backgroundColor: "#ff6b6b", borderColor: "#ff6b6b", transition: "background-color 0.3s ease" }} 
                                        onClick={() => handleDelete(producto.id)}
                                    >
                                        Eliminar producto
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-warning" 
                                        style={{ borderRadius: "10px", backgroundColor: "#ffc107", borderColor: "#ffc107", transition: "background-color 0.3s ease", marginLeft: "10px" }}
                                        onClick={() => handleEditProduct(producto)}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {/* Botón para añadir una nueva tarjeta */}
                        <button
                            className="add-card-button "
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                fontSize: "24px",
                                border: "none",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease"
                            }}
                            onClick={() => openModal()} // Abre el modal para añadir una nueva tarjeta
                        >
                            +
                        </button>
                    </div>
                </div>
                
                {/* Modal para añadir productos */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <div className="modal-dialog" style={{ maxWidth: "600px", margin: "100px auto" }}>
                            <div className="modal-content" style={{ borderRadius: "15px", padding: "20px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}>
                                <div className="modal-header" style={{ borderBottom: "none", paddingBottom: "10px" }}>
                                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Añadir Producto</h1>
                                    <button type="button" className="btn-close" onClick={() => closeModal()} aria-label="Close" style={{ fontSize: "20px", cursor: "pointer" }}></button>
                                </div>
                                <div className="modal-body" style={{ paddingTop: "10px" }}>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Nombre Producto </span>
                                        <input type="text" className="form-control" placeholder="Tomate..." onChange={(e) => setName(e.target.value)} value={name} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Categoría</span>
                                        <select className="form-select" aria-label="Default select example" value={categoria} onChange={()=>setcategoria()}>
                                            <option defaultValue>Selecciona la categoría del producto: </option>
                                            <option value="1">Frutas</option>
                                            <option value="2">Verduras</option>
                                            <option value="3">Ábrol</option>
                                        </select>
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Origen</span>
                                        <input type="text" className="form-control" placeholder="Valencia..." onChange={(e) => setOrigin(e.target.value)} value={origin} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Descripción</span>
                                        <input type="text" className="form-control" placeholder="Había una vez..." onChange={(e) => setDescription(e.target.value)} value={description} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Precio</span>
                                        <input type="text" className="form-control" placeholder="3,14..." onChange={(e) => setPrice(e.target.value)} value={price} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                </div>
                                <div className="modal-footer" style={{ borderTop: "none", paddingTop: "10px" }}>
                                    <button type="button" className="btn btn-secondary" onClick={() => closeModal()} style={{ borderRadius: "10px", padding: "10px 20px", backgroundColor: "#6c757d", borderColor: "#6c757d" }}>Cerrar</button>
                                    <button type="button" className="btn btn-primary" onClick={() => handleSaveProduct()} style={{ borderRadius: "10px", padding: "10px 20px", backgroundColor: "#007bff", borderColor: "#007bff" }}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para editar productos */}
                {showEditModal && (
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <div className="modal-dialog" style={{ maxWidth: "600px", margin: "100px auto" }}>
                            <div className="modal-content" style={{ borderRadius: "15px", padding: "20px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}>
                                <div className="modal-header" style={{ borderBottom: "none", paddingBottom: "10px" }}>
                                    <h1 className="modal-title fs-5" id="editModalLabel" style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Editar Producto</h1>
                                    <button type="button" className="btn-close" onClick={() => closeEditModal()} aria-label="Close" style={{ fontSize: "20px", cursor: "pointer" }}></button>
                                </div>
                                <div className="modal-body" style={{ paddingTop: "10px" }}>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Nombre Producto</span>
                                        <input type="text" className="form-control" placeholder="Tomate..." onChange={(e) => setEditName(e.target.value)} value={editName} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Categoría</span>
                                        <select className="form-select" aria-label="Default select example" value={categoria} onChange={()=>setcategoria()}>
                                            <option selected>Selecciona la categoría del producto: </option>
                                            <option value="1">Frutas</option>
                                            <option value="2">Verduras</option>
                                            <option value="3">Ábrol</option>
                                        </select>
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Origen</span>
                                        <input type="text" className="form-control" placeholder="Valencia..." onChange={(e) => setEditOrigin(e.target.value)} value={editOrigin} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Descripción</span>
                                        <input type="text" className="form-control" placeholder="Había una vez..." onChange={(e) => setEditDescription(e.target.value)} value={editDescription} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Precio</span>
                                        <input type="text" className="form-control" placeholder="3,14..." onChange={(e) => setEditPrice(e.target.value)} value={editPrice} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                </div>
                                <div className="modal-footer" style={{ borderTop: "none", paddingTop: "10px" }}>
                                    <button type="button" className="btn btn-secondary" onClick={() => closeEditModal()} style={{ borderRadius: "10px", padding: "10px 20px", backgroundColor: "#6c757d", borderColor: "#6c757d" }}>Cerrar</button>
                                    <button type="button" className="btn btn-primary" onClick={() => handleSaveEditProduct()} style={{ borderRadius: "10px", padding: "10px 20px", backgroundColor: "#007bff", borderColor: "#007bff" }}>Guardar Cambios</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Backdrop */}
                {(showModal || showEditModal) && <div className="modal-backdrop fade show"></div>}
            </div>
        </>
    );
};

 {/* <button type="button" className="btn btn-danger" onClick={()=> actions.producerLogout()}>Log out</button>
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

                )}  */}
        