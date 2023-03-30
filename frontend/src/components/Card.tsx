import {DeliveryModel} from "../models/DeliveryModel";

type CardProps = {
    delivery: DeliveryModel;
}

export default function Card(props: CardProps){
    return (
        <div>
            <p>{props.delivery.title}</p>
            <small>{props.delivery.id}</small>
        </div>
    )
}