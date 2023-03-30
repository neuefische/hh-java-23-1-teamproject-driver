import React, {useEffect, useState} from 'react';
import './App.css';
import {DeliveryModel} from "./models/DeliveryModel";
import Gallery from "./components/Gallery";
import axios from "axios";
import Header from "./components/Header";
import {Box, Container} from '@mui/material';

function App() {
    const [deliveries, setDeliveries] = useState<DeliveryModel[]>([])

    useEffect(() => {
        loadDeliveries()
    }, [])

    function loadDeliveries() {
        axios.get("api/deliveries")
            .then((response) => {
                setDeliveries(response.data)

            })
            .catch(reason => console.error(reason))
    }

    return (
        <div className="App">
            <Header/>
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: '#efebe9', height: '100vh'}}>
                    <Gallery deliveries={deliveries}/>
                </Box>
            </Container>

        </div>
    );
}

export default App;
