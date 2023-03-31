import React, {useEffect, useState} from 'react';
import {DeliveryModel, NewDeliveryModel} from "./models/DeliveryModel";
import Gallery from "./components/Gallery";
import axios from "axios";
import Header from "./components/Header";
import {Box, Container} from '@mui/material';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddDelivery from "./components/AddDelivery";
import Navigation from "./components/Navigation";

function App() {
    const [deliveries, setDeliveries] = useState<DeliveryModel[]>([])

    useEffect(() => {
        loadDeliveries()
    }, [])

    function loadDeliveries() {
        axios.get("/api/deliveries")
            .then((response) => {
                setDeliveries(response.data)
            })
            .catch(reason => console.error(reason))
    }

    function addDelivery(delivery: NewDeliveryModel) {
        axios.post("/api/deliveries", delivery)
            .then(response => response.data)
            .then(data => setDeliveries([...deliveries, data]))
            .catch(reason => console.error(reason))
    }

    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Routes>
                    <Route path="/"
                           element={<p>Welcome you freaks</p>}/>
                    <Route path="/home"
                           element={
                               <Container maxWidth="lg">
                                   <Box sx={{bgcolor: '#efebe9', height: '100vh'}}>
                                       <Gallery deliveries={deliveries}/>
                                   </Box>
                               </Container>
                           }
                    />
                    <Route path="/add"
                           element={<AddDelivery addDelivery={addDelivery}/>}/>
                </Routes>
                <Navigation/>
            </div>
        </BrowserRouter>
    );
}

export default App;
