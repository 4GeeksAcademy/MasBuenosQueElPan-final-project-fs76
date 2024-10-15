import React, { Component } from "react";
import "../../styles/footer.css"

export const Footer = () => (
	<footer className="footer py-3 my-5 text-center">
		<div className="container mt-3">
		
			<div className="row">
			<div className="col-6 col-md-3 mb-3">
				<h5>Categorías</h5>
				<ul className="nav flex-column" style={{cursor: "pointer"}} > 
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Alcoholes destilados</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Alcoholes fermentados</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Carnes</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Cereales</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Especias</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Frutas</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Frutos secos</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Hierbas</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Leche y derivados</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Productos del mar</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Verduras</a></li>
				</ul>
			</div>

			<div className="col-6 col-md-2 mb-3">
				<h5>Section</h5>
				<ul className="nav flex-column">
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Home</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Features</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Pricing</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">FAQs</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">About</a></li>
				</ul>
			</div>

			<div className="col-6 col-md-2 mb-3">
				<h5>Section</h5>
				<ul className="nav flex-column">
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Home</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Features</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">Pricing</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">FAQs</a></li>
				<li className="nav-item mb-2"><a className="nav-link p-0 text-body-secondary">About</a></li>
				</ul>
			</div>

			<div className="col-md-4 offset-md-1 mb-3">
				<form>
				<h5>Subscíbete a nuestra newsletter</h5>
				<p>¡Recibe notificaciones en el correo con las novedades!</p>
				<div className="d-flex flex-column flex-sm-row w-100 gap-2">
					<label htmlFor="newsletter1" className="visually-hidden">Dirección de correo</label>
					<input id="newsletter1" type="text" className="form-control" placeholder="Dirección de correo" fdprocessedid="qmofhg"/>
					<button className="btn btn-primary" type="button" fdprocessedid="r9toi">Subscribirse</button>
				</div>
				</form>
			</div>
			</div>

			<div className="d-flex flex-column flex-sm-row justify-content-between py-3 my-3 border-top">
			<p>© 2024 Más Buenos que el Pan, Inc. All rights reserved.</p>
			<ul className="list-unstyled d-flex">
				<li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
				<li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
				<li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
			</ul>
			</div>
		</div>
		<p>
			Desarrolladores de ¡Más Buenos que el Pan!: {" "}
			<a href="http://www.4geeksacademy.com">David</a>,{" "}
			<a href="http://www.4geeksacademy.com">Marcos</a>{" "}y{" "}
			<a href="http://www.4geeksacademy.com">Alicia</a>
		</p>
	</footer>
);
