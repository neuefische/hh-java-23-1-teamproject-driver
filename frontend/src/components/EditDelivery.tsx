import React, {useEffect, useState} from "react";
import {Box, Container, Typography} from "@mui/material";
import Form from "./Form";
import {DeliveryModel} from "../models/DeliveryModel";
import {useNavigate, useParams} from "react-router-dom";

type EditProps = {
    delivery: DeliveryModel;
    loadDeliveryById: (id: string) => void,
    updateDelivery: (id: string, delivery: DeliveryModel) => void
}
export default function EditDelivery(props: EditProps) {
    const [isEditMode, setIsEditMode] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            props.loadDeliveryById(id);
        }
        //eslint-disable-next-line
    }, [id]);
    console.log("Delivery", props.delivery);

    const handleSubmit = (title: string) => {
        const updatedDelivery: DeliveryModel = {...props.delivery, title: title};
        props.updateDelivery(updatedDelivery.id, updatedDelivery);
        navigate('/home')
        // console.log("updated", updatedDelivery);
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{bgcolor: '#efebe9', p: "1rem", pb: "3rem"}}>
                <Typography sx={{fontSize: "1.5rem", padding: "0.5rem"}} variant="h2">
                    Edit your Delivery
                </Typography>
                <Form isEditMode={isEditMode}
                      delivery={props.delivery}
                      handleSubmit={handleSubmit}
                      buttonText="Save"/>
            </Box>
        </Container>
    )
}