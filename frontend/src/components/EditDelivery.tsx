import React from "react";
import {Typography} from "@mui/material";
import Form from "./Form";

type EditProps = {

}
export default function EditDelivery(props: EditProps){

    function handleSubmit(){

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