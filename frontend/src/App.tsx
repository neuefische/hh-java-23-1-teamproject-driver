import React, {useEffect, useState} from 'react';
import './App.css';
import {DeliveryModel} from "./models/DeliveryModel";
import Gallery from "./components/Gallery";
import axios from "axios";

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
            <Gallery deliveries={deliveries}/>
        </div>
    );
}

export default App;
