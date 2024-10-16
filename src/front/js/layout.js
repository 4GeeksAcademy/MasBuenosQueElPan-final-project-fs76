import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { categories } from "./pages/categories";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Producers } from "./pages/producers";
import { EditProducer } from "./pages/editProducer";
import { ProducerSignup } from "./component/producerSignup";
import { ProducerInfoForm } from "./pages/producerInfoForm";
import { ProducerView } from "./pages/producerView";
import { AddProduct } from "./pages/producerAddProduct";
import injectContext from "./store/appContext";
import { ProducerCart } from "./pages/producerCartView";
import { ProducerCartDescriptio } from "./pages/producerCartDescription"
import { ProducerProfile } from "./component/producerProfile";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { CustomerProductList } from "./pages/CustomerProductList";
import { CustomerProductView } from "./pages/CustomerProductView"; // Importa el componente de vista del producto
import { CartItems } from "./pages/CartView";
import { Product } from "./pages/ViewProducts";
import { CustomerLoginUpview } from "./pages/customerLoginview";
import { CustomerSignUp } from "./pages/customerSingUp";
import { HomeCustView } from "./pages/homeCustView"
import { MainHome } from "./pages/MainHome";
import { CustomerInfoForm } from "./pages/customerInfoForm";
import { CustomerCartView } from "./pages/customerCartView";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* <Route element={<Home />} path="" /> */}
                        <Route element={<MainHome />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Producers />} path="/producer/login" />
                        <Route element={<ProducerProfile/>} path="/producer/profile/:producerId" />
                        <Route element={<CustomerInfoForm/>} path="/customer/profile/:customer_id" />
                        <Route element={<CustomerCartView/>} path="/customer/cart/:customer_id" />
                        <Route element={<EditProducer />} path="/producer/edit/:producerId" />
                        <Route element={<ProducerSignup />} path="/producer/signup" />
                        <Route element={<ProducerView />} path="/producer/dashboard/:producerId" />
                        <Route element={<ProducerInfoForm />} path="/producer/form/:producerId" />
                        <Route element={<AddProduct />} path="/producer/dashboard/:producerId/newproduct" />
                        <Route element={<categories />} path="/categories" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<CustomerProductList />} path="/productlist" />
                        <Route element={<CustomerProductView />} path="/product/:product_id" />
                        <Route element={<CartItems />} path="/cart" />
                        <Route element={<CustomerSignUp />} path="/customer/singUp" />
                        {/* <Route element={<Product />} path="/product" /> */}
                        <Route element={<CustomerLoginUpview />} path="/customer/Login" />
                        <Route element={<CustomerSignUp />} path="/customer/singUp" />
                        <Route element={<HomeCustView />} path="/customer/home/:customer_id" />
                        <Route element={<ProducerCart />} path="/producer/cart/:producerId" />
                        <Route element={<ProducerCartDescriptio />} path="/producer/cart/description/:customer_id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);