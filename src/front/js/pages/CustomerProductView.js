import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CustomerProductView = props () => {
    const { store, actions } = useContext(Context);
    const [Planet, setPlanet] = useState({});

    useEffect(() => {
        actions.getProducts();
    }, []);

    return (
        <div className="d-flex container my-4">
            
           
            </div>

            {/* Div de Productos */}
            <div className="products-list ml-4" style={{ width: "75%" }}>
                <h2>Product List</h2>
                <div className="d-flex flex-wrap gap-3">
                    {store.products.length > 0 ? (
                        store.products.map((product, index) => (
                            <div key={index}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img src={"..."} className="card-img-top" alt={"..."} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        {/* Cambiar button por Link para la navegación */}
                                        <Link to={"/products/" + product.id} className="btn btn-primary">
                                            {product.price}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        
    );
};
