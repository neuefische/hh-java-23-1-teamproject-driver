import React, {useEffect} from "react";
import {Typography} from "@mui/material";
import Form from "./Form";
import {DeliveryModel} from "../models/DeliveryModel";
import {useParams} from "react-router-dom";

type EditProps = {
    title: string,
    delivery: DeliveryModel;
    loadDeliveryById: (id: string) => void
}
export default function EditDelivery(props: EditProps) {
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            props.loadDeliveryById(id)
        }
        //eslint-disable-next-line
    }, [id]);

    function handleSubmit() {
        const updatedDelivery: DeliveryModel = {...props.delivery, title: props.title};
        return updatedDelivery;
    }


    return (
        <section>
            <Typography sx={{fontSize: "1.5rem", padding: "0.5rem"}} variant="h2">
                Edit your Delivery
            </Typography>
            <Form handleSubmit={handleSubmit} buttonText="Save"/>
        </section>
    )
}