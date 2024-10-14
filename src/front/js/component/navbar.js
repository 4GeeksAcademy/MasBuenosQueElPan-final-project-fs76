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
		navigate("/")
	}
	return (
		<nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-secondary">¡Más Buenos que el Pan!</span>
				</Link>
				{/* {store.producerIsLogedIn === false
					// && customerIsLogedIn === false 
					?
					<>
						<div className="ml-auto">
							<Link to="/producer/login">
								<button className="btn btn-primary">Producers</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/categories">
								<button className="btn btn-primary">categories</button>
							</Link>
						</div> */}
						{/* Activar esta parte cuando se necesite renderizar lo que verá en el navbar el customer */}
						{/* {store.customerIsLogedIn === true ? */}

						{/* : ""} */}
						{/* <div className="ml-auto">
							<Link to="/cart">
								<button className="btn btn-primary">Carrito</button>
							</Link>
						</div>
						<div className="ml-auto">
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
					</>
					: ""
				} */}
				
				{store.producerIsLogedIn === true ?
					<div className="d-flex justify-content-end w-100">
						<button type="button" className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
					</div>
				: ""
				}
				{store.producerIsLogedIn === true ?
				<div className="dropdown" style={{ position: "relative", display: "inline-block" }}>
					<button
						className="btn dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
						style={{
							backgroundColor: "#007bff",
							color: "#fff",
							borderRadius: "10px",
							padding: "10px 20px",
							border: "none",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							fontWeight: "bold"
						}}
					>
						Perfil
					</button>
					
						<ul
						className="dropdown-menu"
						style={{
							backgroundColor: "#fff",
							borderRadius: "10px",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
							border: "none",
						}}
					>
						<li>
						<Link to={`/producer/profile/${localStorage.getItem("producerId")}`}
								className="dropdown-item"
								style={{
									color: "#333",
									fontSize: "14px",
									textDecoration: "none"  // Elimina el subrayado del texto
								}}
								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
							> Perfil
							</Link>
						</li>
						<li>
							<Link
								to="/producer/cart"
								className="dropdown-item"
								style={{
									color: "#333",
									fontSize: "14px",
									textDecoration: "none"  // Elimina el subrayado del texto
								}}
								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
							>
							</Link>
						</li>
						<li>
							<Link 
								to="/producer/cart" 
								className="dropdown-item" 
								style={{ 
									color: "#333", 
									fontSize: "14px", 
									textDecoration: "none"  // Elimina el subrayado del texto
								}}
								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
							>
								Carrito
							</Link>
						</li>
						<li>
							<button 
								className="dropdown-item" 
								onClick={handleLogout}
								href="#" 
								style={{ 
									color: "#ff0000", 
									fontSize: "14px" 
								}}
								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
							>
								LogOut
							</button>
						</li>
						</ul>
					</div>
					:
					<>
					<button type="button" onClick={()=> actions.setDisplayLogin(true)} className="btn btn-black">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
						<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
				 		</svg>
					</button>
				  	</>
					}
			</div>
		</nav>
	);
};