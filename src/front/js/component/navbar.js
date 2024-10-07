import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const { producerId } = useParams()
	const navigate = useNavigate();

	

	function handleLogout () {
		console.log("Loging out");
		localStorage.clear();
		actions.producerLogout();
		navigate("/producer/login")
	}

	function handleNewProduct () {
		console.log("Going to add new product");
		navigate(`/producer/dashboard/${localStorage.getItem("producerId")}/newproduct`)
	}

	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/producer/login">
						<button className="btn btn-primary">Producers</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/categories">
						<button className="btn btn-primary">Categories</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/cart">
						<button className="btn btn-primary">Carrito</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					<Link to="/product" className="mx-2">
						<button className="btn btn-primary">View Products</button>
					</Link>
					<Link to="/productlist" className="mx-2">
						<button className="btn btn-primary">Product List</button>
					</Link>
				</div>

				<div>
					<Link to="/customer/Login" className="mx-2">
						<button className="btn btn-primary">SignUp</button>
					</Link>
				</div>
				{store.isLogedIn === true ? 
				<>
				<div className="d-flex justify-content-end w-100">
					<button type="button" className="btn btn-primary" onClick={handleNewProduct}>Nuevo producto</button>
				</div>
				<div className="d-flex justify-content-end w-100">
					<button type="button" className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
				</div>
				</>
				 : ""		
				}
				<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Profile
				</button>
				<ul class="dropdown-menu">
					<li><a class="dropdown-item" href="#">Action</a></li>
					<li><a class="dropdown-item" href="#">Another action</a></li>
					<li><a class="dropdown-item" href="#">Something else here</a></li>
				</ul>
				</div>
				
			</div>
		</nav>
	);
};