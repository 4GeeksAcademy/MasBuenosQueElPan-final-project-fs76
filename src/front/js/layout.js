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
import { ProducerSignup } from "./component/producerSignup";
import { ProducerInfoForm } from "./pages/producerInfoForm";
import { ProducerView } from "./pages/producerView";
import { AddProduct } from "./pages/producerAddProduct";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { CustomerProductList } from "./pages/CustomerProductList";
import { CustomerProductView } from "./pages/CustomerProductView"; // Importa el componente de vista del producto
import { CartItems } from "./pages/CartView";
import { Product } from "./pages/ViewProducts";
import { CustomerLoginUp } from "./pages/customerLogin";
import { CustomerSignUp } from "./pages/customerSingUp";
import { HomeCustView } from "./pages/homeCustView"

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Producers />} path="/producer/login" />
                        <Route element={<EditProducer />} path="/producer/edit/:producerId" />
                        <Route element={<ProducerSignup />} path="/producer/signup" />
                        <Route element={<ProducerView />} path="/producer/dashboard/:producerId" />
                        <Route element={<ProducerInfoForm />} path="/producer/form/:producerId" />
                        <Route element={<AddProduct />} path="/producer/dashboard/:producerId/newproduct" />
                        <Route element={<Categories />} path="/categories" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<CustomerProductList />} path="/productlist" />
                        <Route element={<CustomerProductView />} path="/product/:product_id" />
                        <Route element={<CartItems />} path="/cart" />
                        <Route element={<Product />} path="/product" />
                        <Route element={<CustomerLoginUp />} path="/customer/Login" />
                        <Route element={< CustomerSignUp />} path="/customer/singUp" />
                        <Route element={<HomeCustView />} path="/customer/home" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);