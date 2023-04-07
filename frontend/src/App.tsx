import React from 'react';
import Gallery from "./components/Gallery";
import './App.css'
import Header from "./components/Header";
import {Box, Container, Typography} from '@mui/material';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import AddDelivery from "./components/AddDelivery";
import Navigation from "./components/Navigation";
import DeliveryDetails from "./components/DeliveryDetails";
import useDeliveries from "./hooks/useDeliveries";
import EditDelivery from "./components/EditDelivery";

function App() {
    const {
        message,
        delivery,
        deliveries,
        environmentName,
        loadDeliveryById,
        addDelivery,
        updateDelivery
    } = useDeliveries()

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
                                       <p>{environmentName}</p>
                                       <NavLink className="start-link" to="/home">Click to Start...</NavLink>
                                   </Box>
                               </Container>
                           }/>
                    <Route path="/home"
                           element={
                               <Container maxWidth="lg">
                                   <Box sx={{bgcolor: '#efebe9', pb: "4.5rem"}}>
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
                                       <DeliveryDetails message={message}
                                                        delivery={delivery}
                                                        loadDeliveryById={loadDeliveryById}/>
                                   </Box>
                               </Container>
                           }/>
                    <Route path="/edit/:id" element={
                        <Container maxWidth="lg">
                            <Box sx={{bgcolor: '#efebe9', p: "1rem", pb: "3rem"}}>
                                <EditDelivery delivery={delivery}
                                    // title={delivery.title}
                                              loadDeliveryById={loadDeliveryById}
                                              updateDelivery={updateDelivery}/></Box>
                        </Container>}/>
                </Routes>
                <Navigation/>
            </div>
        </BrowserRouter>
    )
        ;
}

export default App;
