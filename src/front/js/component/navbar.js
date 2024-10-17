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
		console.log("Logging out");
		localStorage.clear();
		actions.producerLogout();
		actions.verifyCustomerToken();
		actions.customerLogout();
		navigate("/");
	}
	useEffect(() => {
		actions.verifyCustomerToken();
	}, []);

	const DropdownMenu = ({ profileLink, CartLink }) => (
		<ul className="dropdown-menu dropdown-menu-start" style={{
			backgroundColor: "#fff",
			borderRadius: "10px",
			boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
			border: "none",
			position: "relative",
			top: "100%",           
			left: "0",            
			zIndex: 1000         
		}}>
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
					onClick={() => handleLogout()}
					style={{ color: "#ff0000", fontSize: "14px" }}
				>
					LogOut
				</button>
			</li>
		</ul>
	);

	return (
		<nav className="navbar border-bottom border-body justify-content-between d-flex" id="navbar">
			<Link to="/" className="text-decoration-none py-4 ps-2 ms-5">
				<span className="navbar-brand h1">¡Más Buenos que el Pan!</span>
			</Link>

			<div className="dropdown" style={{ position: "relative" }}>
				{/* Aquí colocamos el menú desplegable */}
				{store.customerIsLogedIn || store.producerIsLogedIn ? (
					<DropdownMenu
						profileLink={store.producerIsLogedIn ? `/producer/profile/${localStorage.getItem("producerId")}` : `/customer/profile/${localStorage.getItem("customer_id")}`}
						CartLink={store.producerIsLogedIn ? `/producer/cart/${localStorage.getItem("producerId")}` : `/customer/cart/${localStorage.getItem("customer_id")}`}
					/>
				) : (
					<>
					<div class="btn-group me-5">
					<button type="button" class="btn dropdown-toggle text-white" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
						<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
					</svg>
					</button>
					<ul class="dropdown-menu dropdown-menu-start dropdown-menu-lg-end">
						<li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => navigate("/producer/signup")}>Regístrate como productor</a></li>
						<li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => navigate("/customer/signup")}>Regístrate como comprador</a></li>
						<li><hr className="dropdown-divider" /></li>
						<li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => navigate("/producer/login")}>Login como productor</a></li>
						<li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => navigate("/customer/login")}>Login como comprador</a></li>
						<li><hr className="dropdown-divider" /></li>
						<li><a className="dropdown-item" href="#">Sobre nosotros</a></li>
					</ul>
				  </div>
				  </>
				)}
			</div>
		</nav>
	);
};