import React, {useState} from "react";
import {Button, ButtonGroup, TextField} from "@mui/material";
import './Form.css'
import {useNavigate} from "react-router-dom";

type FormProps = {
    handleSubmit: (title: string) => void,
    buttonText: string
}
export default function Form(props: FormProps) {
    const [title, setTitle] = useState<string>("");
    const navigate = useNavigate();

   const onSubmit = () => {
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
            <ButtonGroup sx={{display: "flex", justifyContent: "space-evenly"}} variant="text"
                         aria-label="text button group">
                <Button variant="outlined"
                        onClick={() => navigate(`/home`)}>Back</Button>
                <Button className="button" variant="contained" type="submit">{props.buttonText}</Button>
            </ButtonGroup>
        </form>
    )
}