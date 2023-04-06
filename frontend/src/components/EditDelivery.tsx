import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import Form from "./Form";
import {DeliveryModel} from "../models/DeliveryModel";
import {useParams} from "react-router-dom";

type EditProps = {
    // title: string,
    delivery: DeliveryModel;
    loadDeliveryById: (id: string) => void,
    updateDelivery: (id: string, delivery: DeliveryModel) => void
}
export default function EditDelivery(props: EditProps) {
    const [title, setTitle] = useState<string>(props.delivery.title);
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            props.loadDeliveryById(id);
        }
        //eslint-disable-next-line
    }, [id]);
    console.log("Delivery", props.delivery);
    console.log("title", title);

    const handleSubmit = (title: string) => {
        const updatedDelivery: DeliveryModel = {...props.delivery, title: title};
        props.updateDelivery(updatedDelivery.id, updatedDelivery);
        // console.log("updated", updatedDelivery);
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