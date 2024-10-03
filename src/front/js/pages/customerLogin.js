// CustomerSignUp.js
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CustomerLoginUp = () => {
    const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate();
	const loginData = (event) =>{
		event.preventDefault();
		const loginData = {
			email: email,
			password: password,
		}
		const requestOptions = {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(loginData)
		}
		fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
		.then((response)=> response.json())
		.then((data)=>{
			if (data.access_token){
				actions.setToken(data.access_token)
				alert("Inicio de sessión exitoso")
				navigate("/customer/home");
			}
		})
	
	}

    return (
        <div className="text-center mt-5 ">
			<div className="container d-flex aling-items-center justify-content-center">
				<h1 >Bienvenido a Mas Buenos que el Pan <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-emoji-smile-fill" viewBox="0 0 16 16">
					<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
					</svg>
				</h1>
			</div>
			<br/>
			<h3>La nueva forma de potenciar el comercio local</h3>
			<br/>
			<p>Para hacer tu experiencia única, a continuación logeate o, si no tienes cuenta, puedes crear una nueva...</p>
			<hr style= {{width: "70vw"}}/>
			<br />
			<div className = "container" style= {{width: "30vw"}}>
				<div className = "row d-flex justify-content-center">
					<form onSubmit={loginData}>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
							<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value = {email} onChange={(event) => setEmail(event.target.value)}/>
							<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
							<input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(event)=>setPassword(event.target.value)}/>
						</div>
						<div className="d-flex justify-content-center align-items-center">
							<button type="submit" className="btn btn-primary">Entrar</button>
							<Link to="/customer/singUp" className="mx-4">
								¿Todavía no tienes cuenta?
							</Link>
						</div>
					</form>
				</div>
			</div>

        </div>
    );
};