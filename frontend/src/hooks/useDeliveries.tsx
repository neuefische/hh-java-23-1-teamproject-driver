import {useEffect, useState} from "react";
import {DeliveryModel, NewDeliveryModel} from "../models/DeliveryModel";
import axios from "axios";

export default function useDeliveries() {
    const [deliveries, setDeliveries] = useState<DeliveryModel[]>([])
    const [delivery, setDelivery] = useState<DeliveryModel>({
        id: "", title:""
    })
    const [message, setMessage] = useState("")
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
    function loadDeliveryById(id: string) {
        axios.get(`/api/deliveries/${id}`)
            .then((response) => {
                setDelivery(response.data)
            })
            .catch((error) => {
                console.error(error)
                setMessage("Delivery not found")
            })
    }

    function addDelivery(delivery: NewDeliveryModel) {
        axios.post("/api/deliveries", delivery)
            .then(response => response.data)
            .then(data => setDeliveries([...deliveries, data]))
            .catch(reason => console.error(reason))
    }

    function updateDelivery(id: string, delivery: DeliveryModel){
        axios.put(`/api/deliveries/${id}`, delivery)
            .then(response => response.data)
            .then(data => setDeliveries(prevState => {
                return prevState.map(currentDelivery => {
                    if(currentDelivery.id === id){
                        return data;
                    }
                    return currentDelivery;
                })
            }))
            .catch(reason => console.error(reason))
    }

    return {message, delivery, deliveries, environmentName, loadDeliveryById,  addDelivery, updateDelivery}
}