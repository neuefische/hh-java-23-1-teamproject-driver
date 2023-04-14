import {DeliveryModel} from "../models/DeliveryModel";
import './Gallery.css';
import {Box, Container, Typography} from "@mui/material";
import DeliveryCard from "./DeliveryCard";

type GalleryProps = {
    deliveries: DeliveryModel[];
    deleteDelivery: (id:string) => void
}
export default function Gallery(props: GalleryProps) {
    return (
        <Container maxWidth="lg">
            <Box sx={{bgcolor: '#efebe9', pb: "4.5rem"}}>
                <Typography sx={{fontSize: "1.5rem", padding: "1rem"}} variant="h2" component="h2">
                    Deliveries
                </Typography>
                <ul className="card-container">
                    {props.deliveries.map((delivery) => {
                        return (
                            <DeliveryCard key={delivery.id} delivery={delivery} deleteDelivery={props.deleteDelivery}/>)
                    })}
                </ul>
            </Box>
        </Container>
    )
}