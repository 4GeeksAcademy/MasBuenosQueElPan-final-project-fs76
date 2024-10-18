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
	const [loading, setLoading] = useState(false);
	const loginData = (event) =>{
		event.preventDefault();
		setLoading(true);
		const loginDataUser = {
			email: email,
			password: password,
		}
		const requestOptions = {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(loginDataUser)
		}
		fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
		.then((response)=> response.json())
		.then((data)=>{
			if (data.access_token){
                localStorage.setItem("token", data.access_token);
				actions.setToken(data.access_token)
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("customer_id", data.user_id)
				navigate(`/customer/home/${data.user_id}`);
			}
			else {
				return alert("Usuario o contraseña incorrectas")
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			alert("Ocurrió un problema con la solicitud");
		})
		// .finally(() => {
		// 	setLoading(false); 
		// });
	}

    return (
        <>
        <div className="container d-flex justify-content-center align-items-center mt-2">
        <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "15px", border: "none" }}>
            <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#159ba2" }}>Iniciar sesión como Comprador</h2>
            
            <form onSubmit={loginData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Dirección de email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        style={{ borderRadius: "8px", padding: "10px" }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        style={{ borderRadius: "8px", padding: "10px" }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ borderRadius: "8px", borderColor: "#159ba2", padding: "12px", fontSize: "16px", backgroundColor: "#159ba2" }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#10757a";
                        e.currentTarget.style.borderColor = "#10757a";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#2f8b90";
                        e.currentTarget.style.borderColor = "#2f8b90";
                    }}
                >
                    {loading ? (
                        <span>
                            Cargando...{" "}
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </span>
                    ) : (
                        "Iniciar Sesión"
                    )}
                </button>

                <div className="text-center mt-3">
                    <Link to="/customer/singUp" style={{color: "#10757a"}} className="">
                        ¿Todavía no tienes cuenta? Regístrate aquí
                    </Link>
                </div>
            </form>
        </div>
    </div>
    </>
    );
};