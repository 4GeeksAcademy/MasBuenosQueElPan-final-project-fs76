import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { CustomerProductList } from "./CustomerProductList";
import { CustomerProductView } from "./CustomerProductView";

export const HomeCustView = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const handleLogOut =() =>{
		actions.logOut()
		if (!store.token) {
			navigate("/customer/Login");
		} 
	}
	return (
		<div className="text-center mt-5">
			<h1>DIOOOOOSSSS ESTO FUNCIONA!</h1>
			<CustomerProductList />
			<CustomerProductView />
			<button className="btn btn-danger" onClick={()=>handleLogOut()}>LogOut</button>
		</div>
	);
};
