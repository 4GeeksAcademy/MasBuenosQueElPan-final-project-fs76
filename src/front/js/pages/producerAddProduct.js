import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen/index";


export const AddProduct = () => {
	const { actions, store } = useContext(Context)
	const { producerId } = useParams()
	const navigate = useNavigate()
	const [newcategorieName, setNewcategorieName] = useState("");
	const [displayAddcategorie, setDisplayAddcategorie] = useState(false);
	const [selectedCategorie, setSelectedCategorie] = useState("");


	// const cld = new Cloudinary({ cloud: {
	//     cloudName: 'dw5sqtvsd',
	//     apiKey: "214752669141281", 
	//     apiSecret: "WPEPv_-AdZNmjbMCkv9k7opE3V8", 
	//     secure:true        
	// },
	//     });

	// cld.image("Cesta-de-verdura-ecologica_wzxave").toURL();


	useEffect(() => {
		actions.checkToken();
		actions.getCategories();
	}, []);

	useEffect(() => {
		console.log("Categorías actualizadas en el store:", store.categories); // Verificar si las categorías están en el store
	}, [store.categories]);

	const handleAddcategorie = () => {
		if (newcategorieName.trim() === "") {
			alert("El nombre de la categoría no puede estar vacío");
			return;
		}
		actions.addcategorie(newcategorieName);
		setNewcategorieName("");
	};

	const handleAddProduct = (e) => {
		e.preventDefault();

		const newProduct = {
			name: document.getElementById("name").value,
			origin: document.getElementById("origin").value,
			price: document.getElementById("price").value,
			description: document.getElementById("description").value,
			brief_description: document.getElementById("brief_description").value,
			weight: document.getElementById("weight").value ? parseInt(document.getElementById("weight").value) : null, // Asigna null si está vacío
			volume: document.getElementById("volume").value ? parseInt(document.getElementById("volume").value) : null, // Asigna null si está vacío
			minimum: document.getElementById("minimum").value ? parseInt(document.getElementById("minimum").value) : null, // Asigna null si está vacío
			// // imageUrl: document.getElementById("image").value,
			categorie_id: selectedCategorie ? selectedCategorie.id : null, // Obtén el id de la categoría seleccionada
			producer_id: producerId, // Obtén el id del productor desde el estado o contexto
			// categorie: newcategorieName
		};
		console.log("new product",newProduct);
		
		actions.addProducts(newProduct);
		navigate(`/producer/dashboard/${producerId}`)
	};

	return (
		<>
			<h1 className="my-3">Añade un producto, o vuelve a
				<Link to={`/producer/dashboard/${producerId}`}>
					<span> Home</span>
				</Link>
			</h1>
			<form>
				<div className="mb-3">
					<label htmlFor="categorie" className="form-label">CATEGORÍA</label>
					<select
						className="form-select"
						id="categorie"
						aria-label="Default select example"
						defaultValue={selectedCategorie}
						onChange={(e) => {
							const selected = store.categories.find(cat => cat.categorie === e.target.value);
							console.log("selected categorie", selected);
							setSelectedCategorie(selected ? selected.url : "");
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
						{selectedCategorie ? (
							<img src={selectedCategorie} alt="Imagen de categoría" style={{ width: '30%', height: 'auto' }} />
						) : (
							<p className="text-secondary">Hemos dado una imagen por defecto a cada categoría, pero si lo prefieres puedes subir tu propia imagen!</p>
						)}
					</div>
				</div>
				{displayAddcategorie &&
					<div className="mt-3">
						<input
							type="text"
							className="form-control"
							placeholder="Añade aquí la nueva categoría"
							value={newcategorieName} // Controlamos el estado del input
							onChange={(e) => setNewcategorieName(e.target.value)}
						/>
						<button className="btn btn-success my-2" onClick={() => handleAddcategorie()}>
							Nueva categoría
						</button>
					</div>
				}
				{!displayAddcategorie &&
					<button className="btn btn-primary my-2" onClick={() => setDisplayAddcategorie(true)}>
						Añadir categoría
					</button>
				}
				<div className="mb-3">
					<label htmlFor="name" className="form-label">PRODUCTO</label>
					<input type="text" className="form-control" id="name" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="formFile" className="form-label">Sube una imagen del producto</label>
					<input className="form-control" type="file" id="formFile" />
				</div>
				<div className="mb-3">
					<label htmlFor="origin" className="form-label">ORIGEN</label>
					<input type="text" className="form-control" id="origin" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="price" className="form-label">PRECIO (€)</label>
					<input type="number" className="form-control" id="price" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="weight" className="form-label">PESO (KG)</label>
					<input type="number" className="form-control" id="weight" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="volume" className="form-label">VOLUMEN (L)</label>
					<input type="number" className="form-control" id="volume" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="minimum" className="form-label">CANTIDAD MÍNIMA A COMPRAR</label>
					<input type="number" className="form-control" id="minimum" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="brief_description" className="form-label">BREVE DESCRIPCIÓN</label>
					<textarea className="form-control" id="brief_description" aria-label="With textarea"></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">DESCRIPCIÓN</label>
					<textarea className="form-control" id="description" aria-label="With textarea"></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="status" className="form-label">ESTATUS</label>
					<div className="mb-3 d-block">
						<input type="checkbox" className="form-check-input" id="available" />
						<label className="form-check-label" htmlFor="available">Disponible</label>
						<input type="checkbox" className="form-check-input" id="lastUnits" />
						<label className="form-check-label" htmlFor="lastUnits">Últimas unidades</label>
						<input type="checkbox" className="form-check-input" id="soon" />
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
