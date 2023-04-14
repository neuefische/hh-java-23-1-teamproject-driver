import React from 'react';
import Gallery from "./components/Gallery";
import './App.css'
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddDelivery from "./components/AddDelivery";
import Navigation from "./components/Navigation";
import DeliveryDetails from "./components/DeliveryDetails";
import useDeliveries from "./hooks/useDeliveries";
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditDelivery from "./components/EditDelivery";
import LandingPage from "./components/LandingPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const {user, login, logout} = useUser()
    const {message, delivery, deliveries, environmentName, loadDeliveries, loadDeliveryById, addDelivery, updateDelivery, deleteDelivery} = useDeliveries()


    return (
        <main>
        <BrowserRouter>
            <div>
                <Header user={user} onLogout={logout}/>
                <ToastContainer autoClose={3000}/>
                <Routes>
                    <Route path="/login" element={<LoginPage loadDeliveries={loadDeliveries} onLogin={login}/>}/>

                    <Route element={<ProtectedRoutes user={user}/>}>

                    <Route path="/home"
                           element={
                               <Gallery deliveries={deliveries} deleteDelivery={deleteDelivery}/>}/>
                    <Route path="/add"
                           element={
                               <AddDelivery isEditMode={false}
                                            delivery={delivery}
                                            addDelivery={addDelivery}/>}/>
                    <Route path="/details/:id"
                           element={
                               <DeliveryDetails message={message}
                                                delivery={delivery}
                                                deleteDelivery={deleteDelivery}
                                                loadDeliveryById={loadDeliveryById}/>}/>
                    <Route path="/edit/:id"
                           element={
                               <EditDelivery delivery={delivery}
                                             loadDeliveryById={loadDeliveryById}
                                             updateDelivery={updateDelivery}/>}/>

                    </Route>

                    <Route path="/"
                           element={
                               <LandingPage environmentName={environmentName}/>}/>
                </Routes>
                <Navigation/>
            </div>
        </BrowserRouter>
        </main>
    );
}
export default App;
