import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen/index";


export const AddProduct = () => {
    const { actions, store } = useContext(Context)
    const { producerId } = useParams()
	const  navigate  = useNavigate()
	const [newCategoryName, setNewCategoryName] = useState ("");
	const [displayAddCategorie, setDisplayAddCategorie] = useState (false);
	// const [selectedCategory, setSelectedCategory] = useState("");
	// const [images, setImages] = useState([]);

	// const cld = new Cloudinary({ cloud: { cloudName: 'dw5sqtvsd' } });

	useEffect(() => {

		actions.getCategorieImg()

		// const loadCategories = async () => {
		// 	await actions.getCategories();
		// };
		// loadCategories();
	}, []);

	// const handleCategoryChange = (event) => {
    // 	const category = event.target.value;
	// 	setSelectedCategory(category);
	// };

	const handleAddCategory = () => {
		if (newCategoryName.trim() === "") {
			alert("El nombre de la categoría no puede estar vacío");
			return;
		}
		actions.addCategory(newCategoryName);
		setNewCategoryName("");
	};


	const handleAddProduct = (e) => {
		e.preventDefault();
	
		const newProduct = {
			name: document.getElementById("name").value,
			origin: document.getElementById("origin").value,
			price: document.getElementById("price").value,
			description: document.getElementById("description").value,
			weight: document.getElementById("weight").value,
			volume: document.getElementById("volume").value,
			minimum: document.getElementById("minimum").value,
			categorie: newCategoryName
		};
		actions.addProducts(newProduct);
		navigate(`/producer/dashboard/${producerId}`)
	};

    return (
        <>
        <h1 className="my-3">Añadir producto</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="categorie" className="form-label">CATEGORÍA</label>
				<select className="form-select"  id="categorie" aria-label="Default select example">
					<option disabled defaultValue>Escoge una categoría</option>
                    {store.categories.length > 0 ? (
						store.categories.map((item, id)=>{
							return(
								<option key={id} value={item.categorie}>{item.categorie}</option>
							)
						})
					) : (
						<option>Añade una nueva categoría</option>
					)}
                </select>
            </div> 
				
								
	{/* <button type="button" className="btn border border-none bg-danger float-end" onClick={() => actions.deleteCategory(item.id)}>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
		<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
		</svg>
	</button>
	<button type="button" className="btn border border-none bg-warning float-end" onClick={() => startEditing(item)}>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
		<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
		<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
		</svg>
	</button> */}
					
					{displayAddCategorie &&
					<div className="mt-3">
						<input
							type="text"
							className="form-control"
							placeholder="Añade aquí la nueva categoría"
							value={newCategoryName} // Controlamos el estado del input
							onChange={(e) => setNewCategoryName(e.target.value)}
						/>
						<button className="btn btn-success my-2" onClick={()=>handleAddCategory()}>
							Nueva categoría
						</button>
					</div>
					}
					{!displayAddCategorie &&
					<button className="btn btn-primary my-2" onClick={()=>setDisplayAddCategorie(true)}>
						Añadir categoría
					</button>
					}
					
            <div className="mb-3">
                <label htmlFor="name" className="form-label">PRODUCTO</label>
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
            </div>
			<div className="mb-3">
				<label htmlFor="name" className="form-label">IMAGEN</label>
				{store.images.length > 0 ? (
					store.images.map((image, url) => (
						<img key={image.public_id} src={image.url} className="img-fluid" alt="Imagen de producto" />
					))
				) : (
					<p>No hay imágenes disponibles.</p>
				)}
			</div>
						{/* <div className="mb-3">
                <label htmlFor="name" className="form-label">IMAGEN</label>
                <img src="..." class="img-fluid" alt="Imagen de producto"/>
            </div> */}
			<div className="mb-3">
                <label htmlFor="origin" className="form-label">ORIGEN</label>
                <input type="text" className="form-control" id="origin" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">PRECIO (€)</label>
                <input type="number" className="form-control" id="price" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="weight" className="form-label">PESO (KG)</label>
                <input type="number" className="form-control" id="weight" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="volume" className="form-label">VOLUMEN (L)</label>
                <input type="number" className="form-control" id="volume" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="minimum" className="form-label">CANTIDAD MÍNIMA A COMPRAR</label>
                <input type="number" className="form-control" id="minimum" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">DESCRIPCIÓN</label>
                <textarea className="form-control" id="description" aria-label="With textarea"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">ESTATUS</label>
                <div className="mb-3 d-block">
                    <input type="checkbox" className="form-check-input" id="available"/>
                    <label className="form-check-label" htmlFor="available">Disponible</label>
                    {/* <input type="checkbox" className="form-check-input" id="withoutStock"/>
                    <label className="form-check-label" htmlFor="withoutStock">Sin existencias</label> */}
                    <input type="checkbox" className="form-check-input" id="lastUnits"/>
                    <label className="form-check-label" htmlFor="lastUnits">Últimas unidades</label>
                    <input type="checkbox" className="form-check-input" id="soon"/>
                    <label className="form-check-label" htmlFor="soon">Pronto en nuestra página</label>
                </div>
            </div>
            <button type="button" onClick={handleAddProduct} className="btn btn-primary">Submit</button>
        </form>
        <Link to={`/producer/dashboard/${producerId}`}>
            <button type="button" className="edit btn btn-secondary">Volver</button>
        </Link>
        </>
    )
};
