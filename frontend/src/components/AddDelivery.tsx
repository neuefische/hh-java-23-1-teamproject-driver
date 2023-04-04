import {FormEvent, useState} from "react";
import {NewDeliveryModel} from "../models/DeliveryModel";
import {Button, TextField, Typography} from "@mui/material";
import './AddDelivery.css'

type AddDeliveryProps = {
    addDelivery: (delivery: NewDeliveryModel) => void
}
export default function AddDelivery(props: AddDeliveryProps) {
    const [title, setTitle] = useState<string>("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const deliveryToAdd: NewDeliveryModel = {title: title};
        props.addDelivery(deliveryToAdd)
        setTitle("")
    }

    return (
        <section>
            <Typography sx={{fontSize: "1.5rem", padding: "0.5rem"}} variant="h2">
                Add your Delivery
            </Typography>
            <form className="form" onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Title"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <Button className="add-button" variant="outlined" type="submit">Add</Button>
            </form>
        </section>
    )
}