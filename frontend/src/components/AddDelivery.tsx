import {NewDeliveryModel} from "../models/DeliveryModel";
import {Box, Container, Typography} from "@mui/material";
import './Form.css'
import Form from "./Form";

type AddDeliveryProps = {
    addDelivery: (delivery: NewDeliveryModel) => void;
}
export default function AddDelivery(props: AddDeliveryProps) {

    const handleSubmit = (title: string) => {
        const deliveryToAdd: NewDeliveryModel = {title: title};
        props.addDelivery(deliveryToAdd);
        // console.log("add", deliveryToAdd)
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{bgcolor: '#efebe9', p: "1rem", pb: "3rem"}}>
                <Typography sx={{fontSize: "1.5rem", padding: "0.5rem"}} variant="h2">
                    Add your Delivery
                </Typography>
                <Form handleSubmit={handleSubmit} buttonText="Add"/>
            </Box>
        </Container>
    )
}