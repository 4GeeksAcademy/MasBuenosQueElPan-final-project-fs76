import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const SingUp = () => {
    
    const{store, actions} = useContext(Context);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setaddress] = useState("")
    const [province, setProvince] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const sendData=(event)=>{
        event.preventDefault();
        const newCustomer = {
            name: name,
            email: email,
            password: password,
            last_name: lastName,
            address: address,
            province: province,
            country: country,
            phone: phone,
            zipcode: zipcode
        };
        let allFieldsFilled = true; 
        for (const key in newCustomer) {
            if (!newCustomer[key]) {
                alert(`El campo ${key} no se ha introducido.`);
                allFieldsFilled = false; 
            }
        }
        if (allFieldsFilled) {
            console.log("Se procede al envío de la información");
            actions.createCustomer(newCustomer);
            alert("Se ha creado el nuevo usuario")
            setLoading(true);
            setName("");
            setEmail("");
            setPassword("");
            setLastName("");
            setaddress("");
            setProvince("");
            setCountry("");
            setZipcode("");
            setPhone("")

            setTimeout(() => {
                setLoading(false);
                navigate("/customer/Login");
            }, 2000);
        };
    }

	return (
        <div className = "col 12 mt-4">
            <form className="row g-3" onSubmit={sendData}>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" value = {email} onChange={(event)=> setEmail(event.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="inputPassword4" value = {password} onChange={(event)=>setPassword(event.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="inputName" value={name} onChange={(event)=>setName(event.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputLastName" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="inputLastName" value={lastName} onChange={(event)=>setLastName(event.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Calle</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={address} onChange={(event)=>setaddress(event.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputProvince" className="form-label">Provincia</label>
                    <input type="text" className="form-control" id="inputProvince" placeholder="Navarra..." value={province} onChange={(event)=> setProvince(event.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCountry" className="form-label">País</label>
                    <input type="text" className="form-control" id="inputCountry" placeholder="España..." value={country} onChange={(event)=>setCountry(event.target.value)}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                    <input type="text" className="form-control" id="inputPhone" value={phone} onChange={(event)=>setPhone(event.target.value)}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">Código Postal</label>
                    <input type="text" className="form-control" id="inputZip" value={zipcode} onChange={(event)=>setZipcode(event.target.value)}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                </div>
                <Link to="/customer/login" className="mx-2">
						<button className="btn btn-primary">Atrás</button>
				</Link>
            </form>
            {/* Mostrar rueda de carga condicionalmente */}
            {loading && (
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}
        </div>
	);
}
