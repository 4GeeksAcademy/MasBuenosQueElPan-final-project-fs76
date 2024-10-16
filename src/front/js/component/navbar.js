//Nuevo nabvbar:
import React, { useContext, useEffect } from "react";
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
		actions.verifyCustomerToken();
		actions.costumerLogout()
		navigate("/");
	}
	useEffect(()=>{
        actions.verifyCustomerToken()
    },[])

	useEffect(()=>{
        actions.verifyCustomerToken()
    },[])

	// Menú desplegable común para Producers y Customers
	const DropdownMenu = ({ profileLink, CartLink }) => (
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
				Usuario
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
					<Link to={CartLink} className="dropdown-item" style={{ color: "#333", fontSize: "14px" }}>
						Carrito
					</Link>
				</li>
				<hr />
				<li>
					<button
						className="dropdown-item"
						onClick={()=>handleLogout()}
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
						<DropdownMenu profileLink={`/producer/profile/${localStorage.getItem("producerId")}`} CartLink={`/producer/cart/${localStorage.getItem("producerId")}`} />
					</>
				) : ""}

				{/* Si el customer está logeado */}
				{store.customerIsLogedIn ? (
					<DropdownMenu profileLink={`/customer/profile/${localStorage.getItem("customer_id")}`} CartLink={`/customer/cart/${localStorage.getItem("customer_id")}`} />
				) : (
					<>
					<div className="btn-group dropstart">
						<button type="button" className="btn dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
							<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
						</svg>
						</button>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={()=> navigate("/producer/signup")}>Regístrate como productor</a></li>
							<li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={()=> navigate("/customer/singUp")}>Regístrate como comprador</a></li>
							{/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
							<li><hr className="dropdown-divider"/></li>
							<li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={()=> navigate("/producer/login")}>Login como productor</a></li>
							<li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={()=> navigate("/customer/Login")}>Login como comprador</a></li>
							<li><hr className="dropdown-divider"/></li>
							<li><a className="dropdown-item" href="#">Sobre nosotros</a></li>
						</ul>
					</div>
					</>
				)}
			</div>
		</nav>
	);
};