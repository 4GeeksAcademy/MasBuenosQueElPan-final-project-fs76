import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Product = () => {
	const { store, actions } = useContext(Context);
    useEffect( () => {
        actions.getProducts()
    }, [])

	return (
        <div className="container">
			<ul className="list-group">
				{store.products.map((productos, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between">
							<p>{productos.name}</p>
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Edit
							</button>
						</li>
					);
				})}
			</ul>
			<br />
		</div>
        
	);
};
