import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CustomerProductList = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getProducts();
    }, [])



    return (
        <>
            <div className="container d-inline-flex my-4 gap-3">

                {/* <ProducerLogin /> */}
            </div>
            <h2>Product List</h2>
            <div className="container d-inline-flex my-4 gap-3">
                {store.products.length > 0 ? (
                    store.products.map((product, index) =>
                        <div key={index}>

                            <div className="card" style={{ width: "18rem;" }}>
                                <img src={"..."} className="card-img-top" alt={"..."} />
                                <div class="card-body">
                                    <h5 className="card-title">{product.name}</h5>

                                    <button href={"/products/" + product.id} className="btn btn-primary">{product.price}</button>
                                </div>
                            </div>

                        </div>
                    )
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </>

    );
};



                            



