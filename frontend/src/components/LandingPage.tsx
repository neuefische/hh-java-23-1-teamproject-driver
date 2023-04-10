import {Box, Container, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import React from "react";

type LandingProps = {
    environmentName: string
}
export default function LandingPage(props: LandingProps){
    return (
        <Container maxWidth="lg">
            <Box sx={{bgcolor: '#efebe9', p: "1rem", pb: "3rem", textAlign: "center"}}>
                <Typography variant="h2">Welcome you freaks</Typography>
                <p>{props.environmentName}</p>
                <NavLink className="start-link" to="/home">Click to Start...</NavLink>
            </Box>
        </Container>
    )
}