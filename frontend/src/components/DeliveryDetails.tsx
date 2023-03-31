import {Card} from "@mui/material";
import React, {useEffect, useState} from "react";
import {DeliveryModel} from "../models/DeliveryModel";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function DeliveryDetails() {
    const [delivery, setDelivery] = useState<DeliveryModel>()
    const [message, setMessage] = useState("")
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            loadDeliveryById()
        }
    }, [id]);

    function loadDeliveryById() {
        axios.get(`/api/deliveries/${id}`)
            .then((response) => {
                setDelivery(response.data)
            })
            .catch((error) => {
                console.error(error)
                setMessage("Delivery not found")
            })
    }

    return (
        delivery ?
            <Card variant="outlined" className="card">
                <p>Title: {delivery.title}</p>
                <small>ID: {delivery.id}</small>
            </Card>
            :
            <p>{message}</p>
    )
}