import {DeliveryModel} from "../models/DeliveryModel";
import React from "react";
import './DeliveryCard.css'
import {Card} from "@mui/material";

type CardProps = {
    delivery: DeliveryModel;
}

export default function DeliveryCard(props: CardProps) {
    return (
        <Card variant="outlined" className="card">
            <p>Title: {props.delivery.title}</p>
            <small> ID: {props.delivery.id}</small>
        </Card>
    )
}