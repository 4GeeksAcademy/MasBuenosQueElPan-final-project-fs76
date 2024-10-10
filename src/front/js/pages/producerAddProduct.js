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
	const [selectedcategorie, setSelectedcategorie] = useState("");


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
		actions.getcategories();
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
			weight: document.getElementById("weight").value,
			volume: document.getElementById("volume").value,
			minimum: document.getElementById("minimum").value,
			// imageUrl: document.getElementById("image").value,
			categorie: newcategorieName
		};
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
						defaultValue={selectedcategorie} // Establece el valor del select
						onChange={(e) => {
							const selected = store.categories.find(item => item.categorie === e.target.value);
							setSelectedcategorie(selected ? selected.url : "");
							// setSelectedcategorie(e.target.value); // Actualiza el estado al seleccionar una categoría
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
						{selectedcategorie ? (
							<img src={selectedcategorie} alt="Imagen de categoría" style={{ width: '30%', height: 'auto' }} />
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
					<label htmlFor="description" className="form-label">DESCRIPCIÓN</label>
					<textarea className="form-control" id="description" aria-label="With textarea"></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="status" className="form-label">ESTATUS</label>
					<div className="mb-3 d-block">
						<input type="checkbox" className="form-check-input" id="available" />
						<label className="form-check-label" htmlFor="available">Disponible</label>
						{/* <input type="checkbox" className="form-check-input" id="withoutStock"/>
				<label className="form-check-label" htmlFor="withoutStock">Sin existencias</label> */}
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
