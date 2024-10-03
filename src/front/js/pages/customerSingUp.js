// CustomerSignUp.js
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import {SingUp} from "../component/SingUpCust"

export const CustomerSignUp = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div className="row 4">
                <SingUp/>
            </div>
        </div>

    )
};