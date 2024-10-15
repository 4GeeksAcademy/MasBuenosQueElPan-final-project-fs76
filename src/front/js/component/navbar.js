//Nuevo nabvbar:
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const { customerId } = useParams();

	function handleLogout() {
		console.log("Loging out");
		localStorage.clear();
		actions.producerLogout();
		navigate("/");
	

	}

	// Menú desplegable común para Producers y Customers
	const DropdownMenu = ({ profileLink }) => (
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
					<Link to={profileLink} className="dropdown-item" style={{ color: "#333", fontSize: "14px" }}>
						Perfil
					</Link>
				</li>
				<li>
					<Link to="/producer/cart" className="dropdown-item" style={{ color: "#333", fontSize: "14px" }}>
						Carrito
					</Link>
				</li>
				<hr />
				<li>
					<button
						className="dropdown-item"
						onClick={handleLogout}
						style={{ color: "#ff0000", fontSize: "14px" }}
					>
						LogOut
					</button>
				</li>
			</ul>
		</div>
	);

	return (
		<nav className="navbar border-bottom border-body" id="navbar">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">¡Más Buenos que el Pan!</span>
				</Link>

				{/* Si el producer está logeado */}
				{store.producerIsLogedIn ? (
					<>
						<div className="d-flex justify-content-end w-100">
							<button type="button" className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
						</div>
						<DropdownMenu profileLink={`/producer/profile/${localStorage.getItem("producerId")}`} />
					</>
				) : ""}

				{/* Si el customer está logeado */}
				{store.customerIsLogedIn ? (
					<DropdownMenu profileLink={`/customer/profile/${customerId}`} />
				) : (
					<>
					<div className="btn-group">
						<button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
							<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
						</svg>
						</button>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={()=> navigate("/producer/signup")}>Regístrate como productor</a></li>
							<li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={()=> navigate("customer/signUp")}>Regístrate como comprador</a></li>
							{/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
							<li><hr className="dropdown-divider"/></li>
							<li><a className="dropdown-item" href="#">Sobre nosotros</a></li>
						</ul>
					</div>
						{/* <button type="button" onClick={() => actions.setDisplayLogin(true)} className="btn btn-black">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
							<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
						</svg>
						</button> */}
					</>
				)}
			</div>
		</nav>
	);
};


// //Antiguo Navbar
// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../store/appContext";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

// export const Navbar = () => {
// 	const { store, actions } = useContext(Context);
// 	const { producerId } = useParams()
// 	const navigate = useNavigate();
// 	function handleLogout () {
// 		console.log("Loging out");
// 		localStorage.clear();
// 		actions.producerLogout();
// 		navigate("/")
// 	}
// 	return (
// 		<nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1 text-secondary">¡Más Buenos que el Pan!</span>
// 				</Link>
// 				{/* {store.producerIsLogedIn === false
// 					// && customerIsLogedIn === false 
// 					?
// 					<>
// 						<div className="ml-auto">
// 							<Link to="/producer/login">
// 								<button className="btn btn-primary">Producers</button>
// 							</Link>
// 						</div>
// 						<div className="ml-auto">
// 							<Link to="/categories">
// 								<button className="btn btn-primary">categories</button>
// 							</Link>
// 						</div> */}
// 						{/* Activar esta parte cuando se necesite renderizar lo que verá en el navbar el customer */}
// 						{/* {store.customerIsLogedIn === true ? */}

// 						{/* : ""} */}
// 						{/* <div className="ml-auto">
// 							<Link to="/cart">
// 								<button className="btn btn-primary">Carrito</button>
// 							</Link>
// 						</div>
// 						<div className="ml-auto">
// 							<Link to="/product" className="mx-2">
// 								<button className="btn btn-primary">View Products</button>
// 							</Link>
// 							<Link to="/productlist" className="mx-2">
// 								<button className="btn btn-primary">Product List</button>
// 							</Link>
// 						</div>

// 						<div>
// 							<Link to="/customer/Login" className="mx-2">
// 								<button className="btn btn-primary">SignUp</button>
// 							</Link>
// 						</div>
// 					</>
// 					: ""
// 				} */}
				
// 				{store.producerIsLogedIn === true ?
// 					<div className="d-flex justify-content-end w-100">
// 						<button type="button" className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
// 					</div>
// 				: ""
// 				}
// 				{/* Botón dropdown */}
// 				{store.producerIsLogedIn === true ?
// 				<div className="dropdown" style={{ position: "relative", display: "inline-block" }}>
// 					<button
// 						className="btn dropdown-toggle"
// 						type="button"
// 						data-bs-toggle="dropdown"
// 						aria-expanded="false"
// 						style={{
// 							backgroundColor: "#007bff",
// 							color: "#fff",
// 							borderRadius: "10px",
// 							padding: "10px 20px",
// 							border: "none",
// 							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
// 							fontWeight: "bold"
// 						}}
// 					>
// 						Perfil Producers
// 					</button>
					
// 						<ul
// 						className="dropdown-menu"
// 						style={{
// 							backgroundColor: "#fff",
// 							borderRadius: "10px",
// 							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
// 							border: "none",
// 						}}
// 					>
// 						<li>
// 						<Link to={`/producer/profile/${localStorage.getItem("producerId")}`}
// 								className="dropdown-item"
// 								style={{
// 									color: "#333",
// 									fontSize: "14px",
// 									textDecoration: "none"  // Elimina el subrayado del texto
// 								}}
// 								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 							> Perfil
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								to="/producer/cart"
// 								className="dropdown-item"
// 								style={{
// 									color: "#333",
// 									fontSize: "14px",
// 									textDecoration: "none"  // Elimina el subrayado del texto
// 								}}
// 								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 							>
// 							</Link>
// 						</li>
// 						<li>
// 							<Link 
// 								to="/producer/cart" 
// 								className="dropdown-item" 
// 								style={{ 
// 									color: "#333", 
// 									fontSize: "14px", 
// 									textDecoration: "none"  // Elimina el subrayado del texto
// 								}}
// 								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 							>
// 								Carrito
// 							</Link>
// 						</li>
// 						<li>
// 							<button 
// 								className="dropdown-item" 
// 								onClick={handleLogout}
// 								href="#" 
// 								style={{ 
// 									color: "#ff0000", 
// 									fontSize: "14px" 
// 								}}
// 								onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 								onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 							>
// 								LogOut
// 							</button>
// 							<ul 
// 								className="dropdown-menu" 
// 								style={{
// 									backgroundColor: "#fff", 
// 									borderRadius: "10px", 
// 									padding: "10px 0", 
// 									boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", 
// 									border: "none",
// 									marginTop: "5px"
// 								}}
// 							>
// 								<li>
// 									{/* to=`/producer/profile/${localStorage.getItem("producerId")}` */}
// 									<Link to={`/producer/profile/${localStorage.getItem("producerId")}`}
// 										className="dropdown-item" 
// 										href="#" 
// 										style={{ 
// 											padding: "10px 20px", 
// 											color: "#333", 
// 											fontSize: "14px" 
// 										}}
// 										onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 										onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 									>
// 										Perfil
// 									</Link>
// 								</li>
// 								<li>
// 									<Link 
// 										to="/producer/cart" 
// 										className="dropdown-item" 
// 										style={{ 
// 											padding: "10px 20px", 
// 											color: "#333", 
// 											fontSize: "14px", 
// 											textDecoration: "none"  // Elimina el subrayado del texto
// 										}}
// 										onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 										onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 									>
// 										Carrito
// 									</Link>
// 								</li>
// 								<hr/>
// 								<li>
// 									<button 
// 										className="dropdown-item" 
// 										onClick={handleLogout}
// 										href="#" 
// 										style={{ 
// 											padding: "5px 20px", 
// 											color: "#ff0000", 
// 											fontSize: "14px" 
// 										}}
// 										onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 										onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 									>
// 										LogOut
// 									</button>
// 								</li>
// 							</ul>
// 						{/* </>)
// 					:
// 					<>
// 						<button>Hola nuevos weys</button>
// 					</>
// 					} */}
// 				</div>	
// 				{/* dropdown customer */}
// 				<div className="dropdown" style={{ position: "relative", display: "inline-block" }}>
// 					{/* {store.token ? (
// 						<> */}
// 							<button 
// 								className="btn dropdown-toggle" 
// 								type="button" 
// 								data-bs-toggle="dropdown" 
// 								aria-expanded="false"
// 								style={{
// 									backgroundColor: "#007bff", 
// 									color: "#fff", 
// 									borderRadius: "10px", 
// 									padding: "10px 20px", 
// 									border: "none", 
// 									boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
// 									fontWeight: "bold"
// 								}}
// 							>
// 								Profile Customer
// 							</button>
// 							<ul 
// 								className="dropdown-menu" 
// 								style={{
// 									backgroundColor: "#fff", 
// 									borderRadius: "10px", 
// 									padding: "10px 0", 
// 									boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", 
// 									border: "none",
// 									marginTop: "5px"
// 								}}
// 							>
// 								<li>
// 									{/* to=`/producer/profile/${localStorage.getItem("producerId")}` */}
// 									<Link to={`/customer/profile/${localStorage.getItem("customer_id")}`}
// 										className="dropdown-item" 
// 										href="#" 
// 										style={{ 
// 											padding: "10px 20px", 
// 											color: "#333", 
// 											fontSize: "14px" 
// 										}}
// 										onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 										onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 									>
// 										Perfil
// 									</Link>
// 								</li>
// 								<li>
// 									<Link 
// 										to="/producer/cart" 
// 										className="dropdown-item" 
// 										style={{ 
// 											padding: "10px 20px", 
// 											color: "#333", 
// 											fontSize: "14px", 
// 											textDecoration: "none"  // Elimina el subrayado del texto
// 										}}
// 										onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 										onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 									>
// 										Carrito
// 									</Link>
// 								</li>
// 								<hr/>
// 								<li>
// 									<button 
// 										className="dropdown-item" 
// 										onClick={handleLogout}
// 										href="#" 
// 										style={{ 
// 											padding: "5px 20px", 
// 											color: "#ff0000", 
// 											fontSize: "14px" 
// 										}}
// 										onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
// 										onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// 									>
// 										LogOut
// 									</button>
// 								</li>
// 							</ul>
// 						{/* </>)
// 					:
// 					<>
// 						<button>Hola nuevos weys</button>
// 					</>
// 					} */}
// 				</div>				
// 						</li>
// 						</ul>
// 					</div>
// 					:(
// 					<>
// 					<button type="button" onClick={()=> actions.setDisplayLogin(true)} className="btn btn-black">
// 						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
// 						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
// 						<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
// 				 		</svg>
// 					</button>
// 				  	</>)
// 					}
// 			</div>
// 		</nav>
// 	);
// };