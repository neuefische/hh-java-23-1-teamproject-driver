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
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
    const {user, login, logout} = useUser()
    const {deliveries, environmentName, loadDeliveries, addDelivery} = useDeliveries()


    return (
        <BrowserRouter>
            <div>
                <Header user={user} onLogout={logout}/>
                <Routes>
                    <Route path="/login" element={<LoginPage loadDeliveries={loadDeliveries} onLogin={login}/>}/>

                    <Route element={<ProtectedRoutes user={user}/>}>
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
                    </Route>

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

                </Routes>
                <Navigation/>
            </div>
        </BrowserRouter>
    );
}

export default App;
