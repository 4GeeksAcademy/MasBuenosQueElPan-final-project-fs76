import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { useParams } from "react-router-dom";

export const ProducerCartDescriptio = () => {
	const { store, actions } = useContext(Context);
    const params=useParams()
    const customerCartInfo = store.producerCartInfo.find(info => info.usuario === params.customer_id);
    console.log(customerCartInfo)
	return (
		<div className="text-center mt-5 container">
			<h1>Así, si!</h1>
            <p> eso lo ha hecho {params.customer_id}</p>
            {customerCartInfo ? (
                <table className="table" style={{ borderRadius: '15px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
                        <tr>
                            <th scope="col">{params.customer_id}</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerCartInfo.Productos.split(', ').map((producto, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{producto}</td>
                                <td>{customerCartInfo.Precio.split(', ')[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<p>No se ha encontrado información</p>)}
            <Link to="/producer/cart">
                <button type = "button" className="btn btn-primary"
                style={{backgroundColor: "#007bff", 
                    color: "#fff", 
                    borderRadius: "10px", 
                    padding: "10px 20px", 
                    border: "none", 
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    fontWeight: "bold"}}>Volver atrás</button>
            </Link>
		</div>
	);
};
