import React, {FormEvent, useState} from "react";
import {Button, ButtonGroup, TextField} from "@mui/material";
import './Form.css'
import {useNavigate} from "react-router-dom";
import {DeliveryModel} from "../models/DeliveryModel";

type FormProps = {
    handleSubmit: (title: string) => void,
    buttonText: string,
    isEditMode: boolean,
    delivery: DeliveryModel;
}
export default function Form(props: FormProps) {
    const initialState = props.isEditMode ? props.delivery.title :"";
    const [title, setTitle] = useState<string>(initialState);

    const navigate = useNavigate();

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        props.handleSubmit(title)
        setTitle("");
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <TextField
                required
                label="Title"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <ButtonGroup sx={{display: "flex", justifyContent: "space-evenly"}}
                         variant="text"
                         aria-label="text button group">
                <Button type="button"
                        variant="outlined"
                        onClick={() => navigate(-1)}>Back</Button>
                <Button type="submit"
                        variant="contained">{props.buttonText}</Button>
            </ButtonGroup>
        </form>
    )
}