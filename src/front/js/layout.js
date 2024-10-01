import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Categories } from "./pages/categories";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Producers } from "./pages/producers";
import { EditProducer } from "./pages/editProducer";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Product } from "./pages/ViewProducts";
import { CustomerProductList } from "./pages/CustomerProductList";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Producers />} path="/producers" />
                        <Route element={<EditProducer />} path="/producer/:producerId" />
                        <Route element={<Categories />} path="/categories" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element ={<Product />} path="/product" />
                        <Route element ={<CustomerProductList />} path="/productlist" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
