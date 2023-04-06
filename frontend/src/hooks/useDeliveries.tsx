import {useEffect, useState} from "react";
import {DeliveryModel, NewDeliveryModel} from "../models/DeliveryModel";
import axios from "axios";

export default function useDeliveries() {
    const [deliveries, setDeliveries] = useState<DeliveryModel[]>([])
    const [environmentName, setEnvironmentName] = useState<string>("");

    useEffect(() => {
        loadDeliveries()
        loadEnvironmentName()
    }, [])

    function loadEnvironmentName() {
        axios.get("/api/info")
            .then((response) => {
                setEnvironmentName(response.data)
            })
            .catch(reason => console.error(reason))
    }

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

    return {deliveries, environmentName, loadEnvironmentName, loadDeliveries, addDelivery}
}