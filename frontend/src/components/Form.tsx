import React, {useState} from "react";
import {Button, TextField} from "@mui/material";

type FormProps = {
    handleSubmit: (title: string) => void,
    buttonText: string
}
export default function Form(props: FormProps) {
    const [title, setTitle] = useState<string>("")

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
            <Button className="button" variant="outlined" type="submit">{props.buttonText}</Button>
        </form>
    )
}