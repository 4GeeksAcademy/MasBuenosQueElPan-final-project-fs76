import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const categories = () => {
	const { store, actions } = useContext(Context);
	const [newcategorieName, setNewcategorieName] = useState("");
	const [editingcategorieId, setEditingcategorieId] = useState(null);
	const [updatedcategorieName, setUpdatedcategorieName] = useState("");
	console.log(store.categories)
	useEffect(() => {
		const loadcategories = async () => {
			await actions.getcategories();
		};
		loadcategories();
	}, []);

	const handleAddcategorie = () => {
		// Validación básica: asegurarse de que el campo no esté vacío
		if (newcategorieName.trim() === "") {
			alert("El nombre de la categoría no puede estar vacío");
			return;
		}
		// Llamar a la función que añadirá la categoría
		actions.addcategorie(newcategorieName);
		// Limpiar el campo de entrada
		setNewcategorieName("");
	};
	// Esto inicia la edición de la categoría .
	const startEditing = (categorie) => {
		setEditingcategorieId(categorie.id);
		setUpdatedcategorieName(categorie.categorie);
	};
	// Función para guardar los cambios en la categoría
	const handleSave = (categorieId) => {
		actions.updatecategorie(categorieId, updatedcategorieName);
		setEditingcategorieId(null); // Salir del modo de edición
	};

	// Función para cancelar la edición
	const cancelEditing = () => {
		setEditingcategorieId(null);
		setUpdatedcategorieName("");
	};

	return (

		<div className="container">
			<ul className="list-group">
				{store.categories && store.categories.length > 0 ? (
					store.categories.map((item, index) => {
						return (
							<li key={index} className="list-group-item d-flex justify-content-between align-items-center">

								{editingcategorieId === item.id ? (
									<input
										type="text"
										className="form-control"
										value={updatedcategorieName}
										onChange={(e) => setUpdatedcategorieName(e.target.value)}
									/>
								) : (
									<span>{item.categorie}</span> // Mostrar el nombre si no está en modo edición
								)}
								<div className="ml-auto">
									{editingcategorieId === item.id ? (
										<>
											<button className="btn btn-success m-2" onClick={() => handleSave(item.id)}>
												Guardar
											</button>
											<button className="btn btn-secondary m-2" onClick={cancelEditing}>
												Cancelar
											</button>
										</>
									) : (
										<>
											<button className="btn btn-primary m-2" onClick={() => startEditing(item)}>
												Editar
											</button>
											<button
												className="btn btn-danger m-2"
												onClick={() => actions.deletecategorie(item.id)}
											>
												Borrar
											</button>
										</>
									)}
								</div>
							</li>
						);
					})
				) : (
					<li>No se han encontrado las categorías</li>
				)}
			</ul>
			<br />
			{/* Campo de entrada para nueva categoría y botón para agregar */}
			<div className="mt-3">
				<input
					type="text"
					className="form-control"
					placeholder="Añade aquí la nueva categoría"
					value={newcategorieName} // Controlamos el estado del input
					onChange={(e) => setNewcategorieName(e.target.value)}
				/>
				<button className="btn btn-success my-2" onClick={handleAddcategorie}>
					Nueva categoría
				</button>
			</div>
			<Link to="/">
				<button className="btn btn-primary my-3">Back home</button>
			</Link>
		</div>
	);
};
