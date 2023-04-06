import {DeliveryModel} from "../models/DeliveryModel";
import React from "react";
import './DeliveryCard.css'
import {Button, ButtonGroup, Card} from "@mui/material";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

type CardProps = {
    delivery: DeliveryModel;
}

export default function DeliveryCard(props: CardProps) {
    const navigate = useNavigate();
    return (
        <Card variant="outlined" className="details-card">
            <small> ID: {props.delivery.id}</small>
            <p>Title: {props.delivery.title}</p>
            <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}} variant="text"
                         aria-label="text button group">
            <Button  variant="outlined"
                    onClick={() => navigate(`/details/${props.delivery.id}`)}>Details</Button>
            <Button className="button" variant="contained" endIcon={<EditIcon />}
                    onClick={() => navigate(`/edit/${props.delivery.id}`)}>Edit</Button>
            </ButtonGroup>
        </Card>
    )
}