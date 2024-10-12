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
	function handleNewProduct () {
		console.log("Going to add new product");
		navigate(`/producer/dashboard/${localStorage.getItem("producerId")}/newproduct`)
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">¡Más Buenos que el Pan!</span>
				</Link>
				{store.producerIsLogedIn === false
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
						</div>

						{/* Activar esta parte cuando se necesite renderizar lo que verá en el navbar el customer */}
						{/* {store.customerIsLogedIn === true ? */}

						{/* : ""} */}
						<div className="ml-auto">
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
				}
				{store.producerIsLogedIn === true ?
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
				<div className="dropdown" style={{ position: "relative", display: "inline-block" }}>
					{/* {store.token ? (
						<> */}
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
							padding: "10px 0",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
							border: "none",
							marginTop: "5px"
						}}
					>
						<li>
						<Link to={`/producer/profile/${localStorage.getItem("producerId")}`}
								className="dropdown-item"
								style={{
									padding: "10px 20px",
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
									padding: "10px 20px",
									color: "#333",
									fontSize: "14px",
									textDecoration: "none"  // Elimina el subrayado del texto
								}}
								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
							>
							</Link>
						</li>
						<hr />
								<li>
									<Link 
										to="/producer/cart" 
										className="dropdown-item" 
										style={{ 
											padding: "10px 20px", 
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
								<hr/>
								<li>
									<button 
										className="dropdown-item" 
										onClick={handleLogout}
										href="#" 
										style={{ 
											padding: "5px 20px", 
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
			</div>
		</nav>
	);
};