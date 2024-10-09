import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const ProducerCartView = () => {
	const { store, actions } = useContext(Context);

	const handleStatusChange = (index, newStatus) => {
		const updatedCart = [...store.producerCart];
		updatedCart[index].Estado = newStatus;
		actions.updateProducerCart(updatedCart);
	};

	const pedidosRecibidos = store.producerCart.filter(item => item.Estado === "Recibido");
	const pedidosProcesados = store.producerCart.filter(item => item.Estado === "Procesado");
	const pedidosEnviados = store.producerCart.filter(item => item.Estado === "Enviado");

	return (
		<div className="mt-5 container">
			<div className="row col-12">
				<h1 className="my-3">Bienvenido a tu lista de pedidos! Tus pedidos son los siguientes:</h1>
			</div>

			{/* Pedidos Recibidos */}
			<div className="row col-12">
				<h5 className="my-3">Pedidos Recibidos:</h5>
			</div>
			<div className="row col-12 text-center">
				<table className="table" style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
					<thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Usuario</th>
							<th scope="col">Fecha de creación</th>
							<th scope="col">Precio</th>
							<th scope="col">Estado</th>
						</tr>
					</thead>
					<tbody>
						{pedidosRecibidos.map((item, index) => (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>
									<Link to={`/producer/cart/description/${item.usuario}`}>
									<button type="button" className="btn btn-success" 
									style={{backgroundColor:"white",
										color: "#333",
										border: "none"

									}}>
										{item.usuario}
									</button>
									</Link>
								</td>
								<td>{item.creado}</td>
								<td>{item.Precio}</td>
								<td className="d-flex align-items-center justify-content-center">
									<select
										value={item.Estado}
										onChange={(e) => handleStatusChange(index, e.target.value)}
										className="form-select"
										style={{
											borderRadius: '8px',
											padding: '8px 12px',
											border: '2px solid #007bff',
											boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
											backgroundColor: '#f9f9f9',
											transition: 'border-color 0.3s, box-shadow 0.3s',
											cursor: 'pointer',
											color: '#333',
											fontWeight: 'bold',
											width: '100%'
										}}
										onFocus={(e) => {
											e.target.style.borderColor = '#0056b3';
											e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
										}}
										onBlur={(e) => {
											e.target.style.borderColor = '#007bff';
											e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
										}}
									>
										<option value="Recibido">Recibido</option>
										<option value="Procesado">Procesado</option>
										<option value="Enviado">Enviado</option>
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pedidos Procesados */}
			<div className="row col-12">
				<h5 className="my-3">Pedidos en Proceso:</h5>
			</div>
			<div className="row col-12 text-center">
				<table className="table" style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
					<thead style={{ backgroundColor: '#ffc107', color: '#333' }}>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Usuario</th>
							<th scope="col">Fecha de creación</th>
							<th scope="col">Precio</th>
							<th scope="col">Estado</th>
						</tr>
					</thead>
					<tbody>
						{pedidosProcesados.map((item, index) => (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{item.usuario}</td>
								<td>{item.creado}</td>
								<td>{item.Precio}</td>
								<td className="d-flex align-items-center justify-content-center">
									<select
										value={item.Estado}
										onChange={(e) => handleStatusChange(index, e.target.value)}
										className="form-select"
										style={{
											borderRadius: '8px',
											padding: '8px 12px',
											border: '2px solid #007bff',
											boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
											backgroundColor: '#f9f9f9',
											transition: 'border-color 0.3s, box-shadow 0.3s',
											cursor: 'pointer',
											color: '#333',
											fontWeight: 'bold',
											width: '100%'
										}}
										onFocus={(e) => {
											e.target.style.borderColor = '#0056b3';
											e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
										}}
										onBlur={(e) => {
											e.target.style.borderColor = '#007bff';
											e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
										}}
									>
										<option value="Recibido">Recibido</option>
										<option value="Procesado">Procesado</option>
										<option value="Enviado">Enviado</option>
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pedidos Enviados */}
			<div className="row col-12">
				<h5 className="my-3">Pedidos Enviados:</h5>
			</div>
			<div className="row col-12 text-center">
				<table className="table" style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
					<thead style={{ backgroundColor: '#28a745', color: '#fff' }}>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Usuario</th>
							<th scope="col">Fecha de creación</th>
							<th scope="col">Precio</th>
							<th scope="col">Estado</th>
						</tr>
					</thead>
					<tbody>
						{pedidosEnviados.map((item, index) => (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{item.usuario}</td>
								<td>{item.creado}</td>
								<td>{item.Precio}</td>
								<td className="d-flex align-items-center justify-content-center">
									<select
										value={item.Estado}
										onChange={(e) => handleStatusChange(index, e.target.value)}
										className="form-select"
										style={{
											borderRadius: '8px',
											padding: '8px 12px',
											border: '2px solid #007bff',
											boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
											backgroundColor: '#f9f9f9',
											transition: 'border-color 0.3s, box-shadow 0.3s',
											cursor: 'pointer',
											color: '#333',
											fontWeight: 'bold',
											width: '100%'
										}}
										onFocus={(e) => {
											e.target.style.borderColor = '#0056b3';
											e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
										}}
										onBlur={(e) => {
											e.target.style.borderColor = '#007bff';
											e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
										}}
									>
										<option value="Recibido">Recibido</option>
										<option value="Procesado">Procesado</option>
										<option value="Enviado">Enviado</option>
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};