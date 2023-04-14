import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@mui/material";
import './LoginPage.css'

type Props = {
    onLogin: (username: string, password: string) => Promise<void>,
    loadDeliveries: ()=> void
}

export default function LoginPage(props: Props){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()
    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        props.onLogin(username, password)
            .then(()=> {
                navigate("/home");
                props.loadDeliveries()
            })

    }

    return(
        <Box sx={{ bgcolor: '#efebe9', p: "1rem", pb: "3rem", m: "1rem"}}>
            <Typography variant="h4" component="h4">Login</Typography>
        <form className="form" onSubmit={onSubmit}>
            <TextField value={username}
                       placeholder="username"
                       type="text"
                       onChange={event => setUsername(event.target.value)}/>
            <TextField value={password}
                       placeholder="password"
                       type="password"
                       onChange={event => setPassword(event.target.value)}/>
            <Button type="submit">Login</Button>
        </form>
        </Box>
    )
}