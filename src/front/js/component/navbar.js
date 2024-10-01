import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/producers">
						<button className="btn btn-primary">Producers</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/categories">
						<button className="btn btn-primary">Categories</button>
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

			</div>
		</nav>
	);
};
