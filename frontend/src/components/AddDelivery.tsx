import {NewDeliveryModel} from "../models/DeliveryModel";
import {Typography} from "@mui/material";
import './Form.css'
import Form from "./Form";

type AddDeliveryProps = {
    addDelivery: (delivery: NewDeliveryModel) => void;
}
export default function AddDelivery(props: AddDeliveryProps) {

    const handleSubmit = (title: string) => {
        const deliveryToAdd: NewDeliveryModel = {title: title};
        props.addDelivery(deliveryToAdd);
    }

    return (
        <section>
            <Typography sx={{fontSize: "1.5rem", padding: "0.5rem"}} variant="h2">
                Add your Delivery
            </Typography>
            <Form handleSubmit={handleSubmit} buttonText="Add"/>
        </section>
    )
}