import {DeliveryModel} from "../models/DeliveryModel";
import React from "react";
import './DeliveryCard.css'
import {Button, ButtonGroup, Card} from "@mui/material";
import {useNavigate} from "react-router-dom";

type CardProps = {
    delivery: DeliveryModel;
    deleteDelivery: (id:string) => void
}

export default function DeliveryCard(props: CardProps) {
    const navigate = useNavigate();

    function onDeleteClick(){
        props.deleteDelivery(props.delivery.id)
    }

    return (
        <Card variant="outlined" className="details-card">
            <small> ID: {props.delivery.id}</small>
            <p>Title: {props.delivery.title}</p>
            <ButtonGroup sx={{display: "flex", justifyContent: "flex-end"}} variant="text"
                         aria-label="text button group">
                <Button variant="outlined"
                        onClick={() => navigate(`/details/${props.delivery.id}`)}>Details</Button>
                <Button variant="outlined"
                        onClick={onDeleteClick}>Delete</Button>
            </ButtonGroup>
        </Card>
    )
}