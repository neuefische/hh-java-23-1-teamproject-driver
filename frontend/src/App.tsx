import React from 'react';
import Gallery from "./components/Gallery";
import './App.css'
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddDelivery from "./components/AddDelivery";
import Navigation from "./components/Navigation";
import DeliveryDetails from "./components/DeliveryDetails";
import useDeliveries from "./hooks/useDeliveries";
import EditDelivery from "./components/EditDelivery";
import LandingPage from "./components/LandingPage";

function App() {
    const {
        message,
        delivery,
        deliveries,
        environmentName,
        loadDeliveryById,
        addDelivery,
        updateDelivery,
        deleteDelivery
    } = useDeliveries()

    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Routes>
                    <Route path="/"
                           element={
                               <LandingPage environmentName={environmentName}/>}/>
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
                </Routes>
                <Navigation/>
            </div>
        </BrowserRouter>
    )
        ;
}

export default App;
