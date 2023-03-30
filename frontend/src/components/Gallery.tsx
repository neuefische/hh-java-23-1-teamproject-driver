import Card from "./DeliveryCard";
import {DeliveryModel} from "../models/DeliveryModel";
import './Gallery.css';
import {Typography} from "@mui/material";

type GalleryProps = {
    deliveries: DeliveryModel[];
}
export default function Gallery(props: GalleryProps) {
    return (
        <div>
            <Typography sx={{fontSize: "1.5rem", padding: "1rem"}} variant="h2" component="h2">
                Deliveries
            </Typography>
            <ul className="card-container">
                {props.deliveries.map((delivery) => {
                    return (
                        <Card key={delivery.id} delivery={delivery}/>)
                })}
            </ul>
        </div>
    )
}