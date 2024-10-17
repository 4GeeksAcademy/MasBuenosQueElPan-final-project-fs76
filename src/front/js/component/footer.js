import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/footer.css";

export const Footer = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleCategoryClick = (categorieId) => {
		actions.getProductsByCategorie(categorieId);
		navigate(`/productByCategorie/${categorieId}/products`);
	};

	return (
		<footer className="footer py-3 my-5 py-5">
			<div className="row">
				<div className="col-6 my-4">
					<h6 className="">Categorías</h6>
					<div className="row" style={{marginLeft: "-12px"}}>
						{/* Dividir las categorías en dos columnas */}
						<div className="col-6">
							<ul className="nav flex-column">
								{store.categories.map((categorie, index) => {
									if (index < Math.ceil(store.categories.length / 2)) {
										return (
											<li className="nav-item mb-2" key={index}>
												<a
													style={{ cursor: "pointer", color: "grey" }}
													onClick={() => handleCategoryClick(categorie.id)}
													onMouseOver={(e) => (e.currentTarget.style.color = "green")}
													onMouseOut={(e) => (e.currentTarget.style.color = "grey")}
												>
													{categorie.categorie}
												</a>
											</li>
										);
									}
									return null; // Si estamos en la segunda columna, no renderizamos aquí
								})}
							</ul>
						</div>
						<div className="col-6">
							<ul className="nav flex-column">
								{store.categories.map((categorie, index) => {
									if (index >= Math.ceil(store.categories.length / 2)) {
										return (
											<li className="nav-item mb-2" key={index}>
												<a
													style={{ cursor: "pointer", color: "grey" }}
													onMouseOver={(e) => (e.currentTarget.style.color = "green")}
													onMouseOut={(e) => (e.currentTarget.style.color = "grey")}
													onClick={() => handleCategoryClick(categorie.id)}
												>
													{categorie.categorie}
												</a>
											</li>
										);
									}
									return null; // Si estamos en la primera columna, no renderizamos aquí
								})}
							</ul>
						</div>
					</div>
				</div>
				<div className="col-6 my-4">
					<h6>Sobre nosotros</h6>
					<ul className="nav flex-column">
						<li className="nav-item mb-2"><a
						style={{ cursor: "pointer", color: "grey" }}
						onMouseOver={(e) => (e.currentTarget.style.color = "green")}
						onMouseOut={(e) => (e.currentTarget.style.color = "grey")}
						className="nav-link p-0 text-body-secondary">Quienes somos</a></li>
						<li className="nav-item mb-2"><a
						style={{ cursor: "pointer", color: "grey" }}
						onMouseOver={(e) => (e.currentTarget.style.color = "green")}
						onMouseOut={(e) => (e.currentTarget.style.color = "grey")}
						className="nav-link p-0 text-body-secondary">Nuestros valores</a></li>
						<li className="nav-item mb-2"><a
						style={{ cursor: "pointer", color: "grey" }}
						onMouseOver={(e) => (e.currentTarget.style.color = "green")}
						onMouseOut={(e) => (e.currentTarget.style.color = "grey")}
						className="nav-link p-0 text-body-secondary">Nuestros productores</a></li>
						{/* <li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Pricing</a></li>
						<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">FAQs</a></li>
						<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">About</a></li> */}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col-10 d-flex flex-column flex-sm-row justify-content-between py-3 my-3 border-top">
					<p>© 2024 Más Buenos que el Pan, Inc. All rights reserved.</p>
				</div>
			</div>
			<div className="row">
				<p className="col-10 text-center">
					Desarrolladores de ¡Más Buenos que el Pan!: {" "}
					<a href="http://www.4geeksacademy.com">David</a>,{" "}
					<a href="http://www.4geeksacademy.com">Marcos</a>{" "}y{" "}
					<a href="http://www.4geeksacademy.com">Alicia</a>
				</p>
			</div>
		</footer>
	);
};