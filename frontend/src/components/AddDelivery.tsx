import {FormEvent, useState} from "react";
import {NewDeliveryModel} from "../models/DeliveryModel";

type Props = {
    addDelivery: (delivery: NewDeliveryModel) => void
}
export default function AddDelivery(props: Props) {
    const [title, setTitle] = useState("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const deliveryToAdd: NewDeliveryModel = {title: title};
        props.addDelivery(deliveryToAdd)
        setTitle("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Titel:</label>
            <input id="title"
                   type="text"
                   value={title}
                   onChange={(event) => setTitle(event.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    )
}