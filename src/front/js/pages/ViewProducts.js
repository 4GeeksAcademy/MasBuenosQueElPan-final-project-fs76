import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Product = () => {
	const { store, actions } = useContext(Context);
    useEffect( () => {
        actions.getProducts()
    }, [])

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [origin, setOrigin] = useState("")
    const [description, setDescription] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [productid, setProductid] = useState("")
    const [nameModal, setNameModal] = useState("")
    const [originModal, setOriginModal] = useState("")
    const [descriptionModal, setDescriptionModal] = useState("")
    const [priceModal, setPriceModal] = useState("")

    const openModal = (id) => {
        setShowModal(true);
        setName("");
		setPrice("");
		setOrigin("");
		setDescription("");
        const foundProducts= store.products.find((elemento) => elemento.id === id);
        console.log (foundProducts)
        setNameModal(foundProducts.name)
        setOriginModal(foundProducts.origin)
        setPriceModal(foundProducts.price)
        setDescriptionModal(foundProducts.description)
        setProductid(foundProducts.id)

    };
    const closeModal = () => {
        setShowModal(false);
    };
    const sendNewData = () => {
		const newProductInfo = {
			name: nameModal,
            price: priceModal,
            origin: originModal,
            description: descriptionModal,
            id: productid,
        };
		actions.modifyProduct(newProductInfo);
		setNameModal("");
        setOriginModal("");
        setDescriptionModal("");
        setPriceModal("");
        setProductid("")
		closeModal();
	}

    const DataSend=(event) =>{
        event.preventDefault();
        //Cambiamos a número
        const parsePrice = parseFloat(price)
        const newProduct = {
            name: name,
            price: parsePrice,
            origin: origin,
            description: description
        };
		if (name!="" && price!="" && origin!="" && description!=""){
			actions.addProducts(newProduct);
			alert("Se ha guardado tu producto") 
			setName("");
			setPrice("");
			setOrigin("");
			setDescription("");
		}
		else {
			alert("Quedan campos por rellenar!")
		}
        
    }
	return (
        <div className="container">
			<ul className="list-group">
				{store.products.map((productos, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between align-items-center ">
                                <div>
                                    <h4>{productos.name}</h4>
                                    <span className="d-block"><strong>El origen del producto es:</strong> {productos.origin}</span>
                                    <span className="d-block"><strong>El precio del producto es de:</strong> {productos.price} €/Kg</span>
                                    <span className="d-block"><strong>Descripción:</strong> {productos.description}</span>
                                </div>
                                <div className="d-flex flex-column">
                                    <button type="button" className="btn btn-success m-2" onClick={()=> actions.deleteProduct(productos.id)}>Eliminar</button>
                                    <button type="button" className="btn btn-success m-20" onClick={() => openModal(productos.id)}>Editar</button>
                                </div>
						</li>
					);
				})}
			</ul>
			<br />
            <hr/>
            <div className="container ">
                <form onSubmit={DataSend}>
                    <div className="mb-3">
                        <label form="nameinput" className="form-label">Nombre Producto</label>
                        <input type="name" className="form-control" id="nameinput" placeholder="Tomate..."  value={name} onChange={(event)=>setName(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label form="origininput" className="form-label">Origen</label>
                        <input type="text" className="form-control" id="origininput" placeholder="Valencia..."  value={origin} onChange={(event)=>setOrigin(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label form="priceinput" className="form-label">Price</label>
                        <input type="number" className="form-control" id="priceinput" placeholder="3,12..."  value={price} onChange={(event)=>setPrice(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label form="descriptioninput" className="form-label">description</label>
                        <input type="text" className="form-control" id="descriptioninput" placeholder="En un mundo lleno de margaritas..."  value={description} onChange={(event)=>setDescription(event.target.value)} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="mx-2">
						<button className="btn btn-primary">Back Home</button>
					</Link>

                </form>
            </div>
            {showModal && (
                <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit contact</h1>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
								<div className="input-group flex-nowrap">
									<span className="input-group-text" id="addon-wrapping">Nombre Producto</span>
									<input type="text" className="form-control" placeholder="Tomate..." onChange={(e)=>setNameModal(e.target.value)} value = {nameModal} aria-label="Username" aria-describedby="addon-wrapping"/>
								</div>
								<div className="input-group flex-nowrap">
									<span className="input-group-text" id="addon-wrapping">Origen</span>
									<input type="text" className="form-control" placeholder="Valencia..." onChange={(e)=>setOriginModal(e.target.value)} value = {originModal} aria-label="Username" aria-describedby="addon-wrapping"/>
								</div>
								<div className="input-group flex-nowrap">
									<span className="input-group-text" id="addon-wrapping">Descripción</span>
									<input type="text" className="form-control" placeholder="Había una vez..." onChange={(e)=>setDescriptionModal(e.target.value)} value = {descriptionModal} aria-label="Username" aria-describedby="addon-wrapping"/>
								</div>
								<div className="input-group flex-nowrap">
									<span className="input-group-text" id="addon-wrapping">Precio</span>
									<input type="text" className="form-control" placeholder="3,14..." onChange={(e)=>setPriceModal(e.target.value)} value = {priceModal} aria-label="Username" aria-describedby="addon-wrapping"/>
								</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={()=>sendNewData()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Backdrop */}
            {showModal && <div className="modal-backdrop fade show"></div>}

		</div>
        
	);
};
