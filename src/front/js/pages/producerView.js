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
    const [weight, setWeight] = useState("");
    const [volume, setVolume] = useState("");
    const [minimum, setMinimum] = useState("");
    const [briefDescription, setBriefDescription] = useState("");
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [categorieId, setCategorieId] = useState("");
    const [categorieImgUrl, setCategorieImgUrl] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editOrigin, setEditOrigin] = useState("");
    const [editWeight, setEditWeight] = useState("");
    const [editVolume, setEditVolume] = useState("");
    const [editMinimum, setEditMinimum] = useState("");
    const [editBriefDescription, setEditBriefDescription] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCategorie, setEditCategorie] = useState("");
    const [editCategorieId, setEditCategorieId] = useState("");
    const [editCategorieImgUrl, setEditCategorieImgUrl] = useState("");
    const [status, setStatus] = useState({
        available: false,
        lastUnits: false,
        soon: false,
        not_available: false,
    });
    const [editStatus, setEditStatus] = useState({
        available: false,
        lastUnits: false,
        soon: false,
        not_available: false,
    });

    const autenticate = store.producerIsLogedIn;
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        actions.checkToken().then(() => {
            setIsLoading(false)
        });
        actions.getProducer(producerId);
        actions.getCategories();
        actions.getProducersProducts(producerId)
    }, []);
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
    const validateProduct = (product) => {
        const { weight, volume } = product;
        if (!weight && !volume) return "Debes introducir al menos el peso o el volumen.";
        if (weight && volume) return "Debes introducir solo el peso o el volumen.";
        for (let field in product) {
            if (field !== 'weight' && field !== 'volume' && field !== 'soon' && field !== 'available' && field !== 'lastUnits' && field !== 'not_available' && !product[field]) {
                return `No se han introducido los datos en: ${field}`;
            }
        }
        return null;
    };
    const handleSaveProduct = () => {
        const parsePrice = parseFloat(price);
        const parseWeight = weight ? parseInt(weight) : null;
        const parseVolume = volume ? parseInt(volume) : null;
        const parseMinimum = minimum ? parseInt(minimum) : null;
        const newProduct = {
            name: name,
            price: parsePrice,
            origin: origin,
            weight: parseWeight,
            volume: parseVolume,
            minimum: parseMinimum,
            brief_description: briefDescription,
            description: description,
            categorie_id: categorieId,
            producer_id: producerId ? parseInt(producerId) : null,
            available: status.available,
            lastUnits: status.lastUnits,
            soon: status.soon,
            not_available: status.not_available,
        };
        console.log("newProduct to be save in store",newProduct);
        console.log("producerId antes de añadir producto:", producerId);
        const error = validateProduct(newProduct);
        if (error) {
            alert(error);
            return;
        }
        actions.addProducts(newProduct);
        actions.getProducersProducts()
        closeModal();
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const handleEditProduct = (product) => {
        setEditProductId(product.id);
        setEditName(product.name);
        setEditPrice(product.price);
        setEditOrigin(product.origin);
        setEditWeight(product.weight);
        setEditVolume(product.volume);
        setEditMinimum(product.minimum);
        setEditBriefDescription(product.brief_description);
        setEditDescription(product.description);
        setEditCategorie(product.selectedCategorie);
        setEditCategorieImgUrl(product.categorie_imageUrl);
        setShowEditModal(true);
        setEditStatus({
            available: product.available,
            lastUnits: product.lastUnits,
            soon: product.soon,
            not_available: editStatus.not_available,
        });
    };

    const handleSaveEditProduct = () => {
        const parsePrice = parseFloat(editPrice);
        const parseWeight = editWeight ? parseInt(editWeight) : null;
        const parseVolume = editVolume ? parseInt(editVolume) : null;
        const parseMinimum = editMinimum ? parseInt(editMinimum) : null;
        const updatedProduct = {
            id: editProductId,
            name: editName,
            price: parsePrice,
            origin: editOrigin,
            weight: parseWeight,
            volume: parseVolume,
            minimum: parseMinimum,
            brief_description: editBriefDescription,
            description: editDescription,
            categorie_id: editCategorieId,
            producer_id: producerId ? parseInt(producerId) : null,
            available: editStatus.available,
            lastUnits: editStatus.lastUnits,
            soon: editStatus.soon,
            not_available: editStatus.not_available,
        };
        if (!parseWeight && !parseVolume) {
            alert(`Debes introducir al menos el peso o el volumen.`);
            return;
        }
        if (parseWeight && parseVolume) {
            alert(`Debes introducir solo el peso o el volumen.`);
            return;
        }
        for (let field in updatedProduct) {
            // Excluir 'categorie_id' de la validación
            if (field !== 'categorie_id' && field !== "weight" && field !== "volume" && field !== 'soon' && field !== 'available' && field !== 'lastUnits' && field !== 'not_available' && !updatedProduct[field]) {
                alert(`No se han introducido los datos en: ${field}`);
                return;
            }
        }
        actions.modifyProduct(updatedProduct);
        closeEditModal();
    };
    const closeEditModal = () => {
        setShowEditModal(false);
    };
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setStatus((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };
    const handleEditCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setEditStatus({
                available: name === "editAvailable" ? true : false,
                lastUnits: name === "editLastUnits" ? true : false,
                soon: name === "editSoon" ? true : false,
                not_available: name === "editNot_available" ? true : false
            });
        }
        setEditStatus((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };
    return (
        <>
            <div className="container">
                <div className="row">
                {store.producersInfo.map((producer, index) => 
                    <h1 key={index} className="my-3">¡Encantados de recibirte, {producer.user_name}!</h1>
                )}
                {store.producerProducts.length > 0 ? <h1>Tus productos son los siguientes:</h1> : <h1>¡Es momento de añadir nuevos productos!</h1>}
                    <br />
                    <hr />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems:"center" }}>
                        {store.producerProducts.length > 0 && store.producerProducts.map((product, index) => (
                            <div key={index} className="card"
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                            style={{
                                width: "300px",
                                borderRadius: "12px",
                                boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                                overflow: "hidden",
                                transition: "transform 0.3s ease-in-out",
                                cursor: "pointer",
                            }}>
                                <img src={product.categorie_imageUrl} className="card-img-top" alt="Cargando imagen..." style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body" style={{ padding: "20px" }}>
                                    <h5 className="card-title" style={{ fontWeight: "bold", color: "#333" }}>{product.name}</h5>
                                    <p className="card-text" style={{color:"#777", fontSize: "14px"}}>Categoría: {product.categorie_name}</p>
                                    <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>Precio: {product.price} €/kg</p>
                                    <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>Origen del producto: {product.origin}</p>
                                    <p className="card-text" style={{ color: "#777", fontSize: "14px" }}>Breve descripción: {product.brief_description}</p>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger" 
                                        style={{ borderRadius: "10px", backgroundColor: "#ff6b6b", borderColor: "#ff6b6b", transition: "background-color 0.3s ease" }} 
                                        onClick={() => actions.deleteProduct(product.id)}
                                    >
                                        Eliminar producto
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-warning" 
                                        style={{ borderRadius: "10px", backgroundColor: "#ffc107", borderColor: "#ffc107", transition: "background-color 0.3s ease", marginLeft: "10px" }}
                                        onClick={() => handleEditProduct(product)}
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
                        <div className="modal-dialog" style={{ maxWidth: "700px", margin: "100px auto" }}>
                            <div className="modal-content" style={{ borderRadius: "15px", padding: "20px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}>
                                <div className="modal-header" style={{ borderBottom: "none", paddingBottom: "10px" }}>
                                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Añadir Producto</h1>
                                    <button type="button" className="btn-close" onClick={() => closeModal()} aria-label="Close" style={{ fontSize: "20px", cursor: "pointer" }}></button>
                                </div>
                                <div className="modal-body" style={{ paddingTop: "10px" }}>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="name" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Producto </span>
                                        <input type="text" className="form-control" placeholder="Tomate..." onChange={(e) => setName(e.target.value)} value={name} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="categorie" className="form-label">Categoría</label>
                                        <select
                                            className="form-select"
                                            id="categorie"
                                            aria-label="Default select example"
                                            defaultValue={categorieId}
                                            onChange={(e) => {
                                                const selected = store.categories.find(cat => cat.categorie === e.target.value);
                                                console.log("selected categorie", selected);
                                                setCategorieId(selected ? selected.id : "");
                                                setCategorieImgUrl(selected ? selected.url : "");
                                            }}
                                        >
                                            <option disabled value="">Escoge una categoría</option>
                                            {store.categories?.length > 0 ? (
                                                store.categories
                                                    .sort((a, b) => a.categorie.localeCompare(b.categorie))
                                                    .map((categorie, id) => (
                                                        <option key={id} value={categorie.categorie}>{categorie.categorie}</option>
                                                    ))
                                            ) : (
                                                <option>Añade una nueva categoría</option>
                                            )}
                                        </select>
                                        <div className="my-3">
                                            {categorieImgUrl ? (
                                                <img src={categorieImgUrl} alt="Imagen de categoría" style={{ width: '30%', height: 'auto' }} />
                                            ) : (
                                                <>
                                                <p className="text-secondary">Hemos dado una imagen por defecto a cada categoría, pero si lo prefieres puedes subir tu propia imagen!</p>
                                                <div className="mb-3">
                                                    <label htmlFor="uploadImg" className="form-label">Sube tu foto aquí</label>
                                                    <input className="form-control" type="file" id="uploadImg"/>
                                                </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="origin" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Origen</span>
                                        <input type="text" className="form-control" placeholder="ej: Valencia" onChange={(e) => setOrigin(e.target.value)} value={origin} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="weight" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Peso</span>
                                        <input type="number" className="form-control" placeholder="ej: 1" onChange={(e) => setWeight(e.target.value)} value={weight} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="volume" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Volumen</span>
                                        <input type="number" className="form-control" placeholder="ej: 3" onChange={(e) => setVolume(e.target.value)} value={volume} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="minimum" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Cantidad mínima</span>
                                        <input type="number" className="form-control" placeholder="Pon la cantidad mínima que el comprador debe comprar. ej: 5" onChange={(e) => setMinimum(e.target.value)} value={minimum} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="briefDescription" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Breve descripción</span>
                                        <input type="text" className="form-control" placeholder="Cuenta en pocas palabras algo interesante del producto" onChange={(e) => setBriefDescription(e.target.value)} value={briefDescription} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="description" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Descripción</span>
                                        <input type="text" className="form-control" placeholder="Aquí te puedes explayar!" onChange={(e) => setDescription(e.target.value)} value={description} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="price" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Precio</span>
                                        <input type="number" className="form-control" placeholder="3,14..." onChange={(e) => setPrice(e.target.value)} value={price} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Estatus</label>
                                        <div className="mb-3 d-block">
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                id="available"
                                                name="available"
                                                checked={status.available}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label me-4" htmlFor="available">Disponible</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                id="lastUnits"
                                                name="lastUnits"
                                                checked={status.lastUnits}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label me-4" htmlFor="lastUnits">Últimas unidades</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                id="soon"
                                                name="soon"
                                                checked={status.soon}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label me-4" htmlFor="soon">Pronto en nuestra página</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                id="not_available"
                                                name="not_available"
                                                checked={status.not_available}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label me-4" htmlFor="not_available">No disponible</label>
                                        </div>
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
                                    <div className="mb-3">
                                        <label htmlFor="categorie" className="form-label">Categoría</label>
                                        <select
                                            className="form-select"
                                            id="categorie"
                                            aria-label="Default select example"
                                            defaultValue={editCategorieId}
                                            onChange={(e) => {
                                                const selected = store.categories.find(cat => cat.categorie === e.target.value);
                                                console.log("selected categorie", selected);
                                                setEditCategorieId(selected ? selected.id : "");
                                                setEditCategorie(selected ? selected.categorie : "");
                                                setEditCategorieImgUrl(selected ? selected.url : "");
                                                // setSelectedCategorie(e.target.value); // Actualiza el estado al seleccionar una categoría
                                            }}
                                        >
                                            <option disabled value="">Escoge una categoría</option> {/* Cambia defaultValue a value="" */}
                                            {store.categories?.length > 0 ? (
                                                store.categories
                                                    .sort((a, b) => a.categorie.localeCompare(b.categorie)) // Ordena alfabéticamente
                                                    .map((categorie, id) => (
                                                        <option key={id} value={categorie.categorie}>{categorie.categorie}</option>
                                                    ))
                                            ) : (
                                                <option>Añade una nueva categoría</option>
                                            )}
                                        </select>
                                        <div className="my-3">
                                            {editCategorieImgUrl ? (
                                                <img src={editCategorieImgUrl} alt="Imagen de categoría" style={{ width: '30%', height: 'auto' }} />
                                            ) : (
                                                <p className="text-secondary">Hemos dado una imagen por defecto a cada categoría, pero si lo prefieres puedes subir tu propia imagen!</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="addon-wrapping" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Origen</span>
                                        <input type="text" className="form-control" placeholder="Valencia..." onChange={(e) => setEditOrigin(e.target.value)} value={editOrigin} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="weightEdit" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Peso</span>
                                        <input type="number" className="form-control" placeholder="ej: 1" onChange={(e) => setEditWeight(e.target.value)} value={editWeight} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="volumeEdit" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Volumen</span>
                                        <input type="number" className="form-control" placeholder="ej: 3" onChange={(e) => setEditVolume(e.target.value)} value={editVolume} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="minimumEdit" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Cantidad mínima</span>
                                        <input type="number" className="form-control" placeholder="Pon la cantidad mínima que el comprador debe comprar. ej: 5" value={editMinimum} onChange={(e) => setEditMinimum(e.target.value)}  aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="briefDescriptionEdit" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Breve descripción</span>
                                        <input type="text" className="form-control" placeholder="Cuenta en pocas palabras algo interesante del producto"  value={editBriefDescription} onChange={(e) => setEditBriefDescription(e.target.value)} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="descriptionEdit" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Descripción</span>
                                        <input type="text" className="form-control" placeholder="Había una vez..." onChange={(e) => setEditDescription(e.target.value)} value={editDescription} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3" style={{ marginBottom: "15px" }}>
                                        <span className="input-group-text" id="priceEdit" style={{ width: "150px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>Precio</span>
                                        <input type="text" className="form-control" placeholder="3,14..." onChange={(e) => setEditPrice(e.target.value)} value={editPrice} aria-label="Username" aria-describedby="addon-wrapping" style={{ borderRadius: "0 10px 10px 0" }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Estatus</label>
                                        <div className="mb-3 d-block">
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                id="editAvailable"
                                                name="editAvailable"
                                                checked={editStatus.available}
                                                onChange={handleEditCheckboxChange}
                                            />
                                            <label className="form-check-label me-4" htmlFor="editAvailable">Disponible</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                id="editLastUnits"
                                                name="editLastUnits"
                                                checked={editStatus.lastUnits}
                                                onChange={handleEditCheckboxChange}
                                            />
                                            <label className="form-check-label me-4" htmlFor="editLastUnits">Últimas unidades</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                id="editSoon"
                                                name="editSoon"
                                                checked={editStatus.soon}
                                                onChange={handleEditCheckboxChange}
                                            />
                                            <label className="form-check-label me-4" htmlFor="editSoon">Pronto en nuestra página</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                id="editNot_available"
                                                name="editNot_available"
                                                checked={editStatus.not_available}
                                                onChange={handleEditCheckboxChange}
                                            />
                                            <label className="form-check-label me-4" htmlFor="editNot_available">No disponible</label>
                                        </div>
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

