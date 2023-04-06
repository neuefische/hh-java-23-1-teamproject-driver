import {Button, ButtonGroup, Card} from "@mui/material";
import React, {useEffect} from "react";
import {DeliveryModel} from "../models/DeliveryModel";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

type DetailsProps = {
    loadDeliveryById: (id: string) => void;
    delivery: DeliveryModel,
    message: string
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

    return (
        props.delivery ?
            <Card variant="outlined" sx={{p: "0.3rem"}}>
                <small>ID: {props.delivery.id}</small>
                <p>Title: {props.delivery.title}</p>
                <ButtonGroup sx={{display: "flex", justifyContent: "space-between"}} variant="text"
                             aria-label="text button group">
                    <Button variant="outlined"
                            onClick={() => navigate(`/home`)}>Back</Button>
                    <Button className="button" variant="contained" endIcon={<EditIcon/>}
                            onClick={() => navigate(`/edit/${props.delivery.id}`)}>Edit</Button>
                </ButtonGroup>

            </Card>
            :
            <p>{props.message}</p>
    )
}