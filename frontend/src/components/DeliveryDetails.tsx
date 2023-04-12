import {Box, Button, ButtonGroup, Card, Container, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {DeliveryModel} from "../models/DeliveryModel";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

type DetailsProps = {
    loadDeliveryById: (id: string) => void;
    delivery: DeliveryModel,
    message: string,
    deleteDelivery: (id:string) => void
}
export default function DeliveryDetails(props: DetailsProps) {
    // const [message, setMessage] = useState("")
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            props.loadDeliveryById(id)
        }
        //eslint-disable-next-line
    }, [id]);

    function onDeleteClick(){
        props.deleteDelivery(props.delivery.id)
        navigate("/home")
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{bgcolor: '#efebe9', p: "1rem", pb: "3rem"}}>
                <Typography sx={{fontSize: "1.5rem", padding: "1rem"}} variant="h2" component="h2">
                    Delivery Details
                </Typography>
                {props.delivery ?
                    <Card variant="outlined" sx={{p: "0.3rem"}}>
                        <small>ID: {props.delivery.id}</small>
                        <p>Title: {props.delivery.title}</p>
                        <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}} variant="text"
                                     aria-label="text button group">
                            <Button variant="outlined"
                                    onClick={() => navigate(`/home`)}>Back</Button>
                            <Button className="button" variant="contained" endIcon={<EditIcon/>}
                                    onClick={() => navigate(`/edit/${props.delivery.id}`)}>Edit</Button>
                            <Button color="error" onClick={onDeleteClick}>Delete</Button>
                        </ButtonGroup>

                    </Card>
                    :
                    <p>{props.message}</p>}
            </Box>
        </Container>
    )
}