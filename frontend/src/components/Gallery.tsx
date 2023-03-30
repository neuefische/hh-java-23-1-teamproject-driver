import Card from "./Card";
import {DeliveryModel} from "../models/DeliveryModel";

type GalleryProps = {
    deliveries: DeliveryModel[];
}
export default function Gallery(props: GalleryProps) {
    return (
        <div>
            <h2>Deliveries</h2>
            <ul>
                {props.deliveries.map((delivery) => {
                    return (
                        <Card key={delivery.id} delivery={delivery}/>)
                })}
            </ul>
        </div>
    )
}