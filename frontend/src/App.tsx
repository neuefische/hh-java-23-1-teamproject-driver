import React, {useEffect, useState} from 'react';
import {DeliveryModel, NewDeliveryModel} from "./models/DeliveryModel";
import Gallery from "./components/Gallery";
import axios from "axios";
import './App.css'
import Header from "./components/Header";
import {Box, Container, Typography} from '@mui/material';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import AddDelivery from "./components/AddDelivery";
import Navigation from "./components/Navigation";
import DeliveryDetails from "./components/DeliveryDetails";


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
                           element={
                               <Container maxWidth="lg">
                                   <Box sx={{bgcolor: '#efebe9', p: "1rem", pb: "3rem", textAlign: "center"}}>
                                       <Typography variant="h2">Welcome you freaks</Typography>
                                       <NavLink className="start-link" to="/home">Click to Start...</NavLink>
                                   </Box>
                               </Container>
                           }/>
                    <Route path="/home"
                           element={
                               <Container maxWidth="lg">
                                   <Box sx={{bgcolor: '#efebe9', pb: "3rem"}}>
                                       <Gallery deliveries={deliveries}/>
                                   </Box>
                               </Container>
                           }
                    />
                    <Route path="/add"
                           element={
                               <Container maxWidth="lg">
                                   <Box sx={{bgcolor: '#efebe9', p: "1rem", pb: "3rem"}}>
                                       <AddDelivery addDelivery={addDelivery}/>
                                   </Box>
                               </Container>
                           }
                    />
                    <Route path="/details/:id"
                           element={
                               <Container maxWidth="lg">
                                   <Box sx={{bgcolor: '#efebe9', p: "1rem", pb: "3rem"}}>
                                       <DeliveryDetails/>
                                   </Box>
                               </Container>
                           }/>
                </Routes>
                <Navigation/>
            </div>
        </BrowserRouter>
    )
        ;
}

export default App;
