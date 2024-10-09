import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen/index";

export const Product = () => {
	const { store, actions } = useContext(Context);

    const cld = new Cloudinary({ cloud: {
        cloudName: 'dw5sqtvsd',
        apiKey: "214752669141281", 
        apiSecret: "WPEPv_-AdZNmjbMCkv9k7opE3V8", 
        secure:true        
    },
        });

    console.log(cld.image("Cesta-de-verdura-ecologica_wzxave").toURL());
    
    // new Cloudinary()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [origin, setOrigin] = useState("")
    // const [weight, setWeight] = useState("")
    // const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [productid, setProductid] = useState("")
    const [nameModal, setNameModal] = useState("")
    const [originModal, setOriginModal] = useState("")
    const [descriptionModal, setDescriptionModal] = useState("")
    const [priceModal, setPriceModal] = useState("")

    useEffect(() => {
        actions.checkToken();
    }, [])


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
        <>
        <h2>Tus productos</h2>
            <div className="container d-inline-flex">
                <div className="card-group gap-2">
                {store.products.length > 0 ? (
                    store.products
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((product, index) => 
                        // (
                        {
                        return(
                        <div className="card col-4" key={index} style={{"width": "18rem"}}>
                        {/* <img src={rigoImageUrl} className="card-img-top" alt="..."/> */}
                        {store.categoriesWithUrls?.map((category, index) => (
                            <li key={index}>
                                <img 
                                    src={category.url || "Imagen de producto.jpg"}  // Si no hay URL, puedes mostrar una imagen de placeholder
                                    alt={category.name}
                                    style={{ width: '50px', height: '50px' }}
                                />
                                {category.name}  {/* Muestra el nombre de la categoría */}
                            </li>
                        ))}
                            <div className="card-body">
                                <h5 className="card-title" >{product.name}</h5>
                                <p className="card-text">{product.price}€</p>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">{product.weight} Aquí el peso</p>
                                <p className="card-text">Aquí la categoría</p>
                                <button className="btn btn-info"
                                type="button"
                                onClick={() => openModal(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </button>
                                <button className="btn btn-danger"
                                type="button"
                                data-bs-toggle="modal"
                                onClick={()=> actions.deleteProduct(product.id)}
                                data-bs-target="#deleteProductModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                                </button>
                            </div>
                        </div>
                        )
                    }
                )
            ) : (
            <p>Añade nuevos productos</p>
            )}
            </div>
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
        </>
	);
};