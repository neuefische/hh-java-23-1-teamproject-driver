import {DeliveryModel} from "../models/DeliveryModel";
import React from "react";
import './DeliveryCard.css'
import {Button, Card} from "@mui/material";
import {useNavigate} from "react-router-dom";

type CardProps = {
    delivery: DeliveryModel;
}

export default function DeliveryCard(props: CardProps) {
    const navigate = useNavigate();
    return (
        <Card variant="outlined" className="card">
            <p>Title: {props.delivery.title}</p>
            <small> ID: {props.delivery.id}</small>
            <Button variant="outlined" onClick={() => navigate(`/details/${props.delivery.id}`)}>Details</Button>
        </Card>
    )
}