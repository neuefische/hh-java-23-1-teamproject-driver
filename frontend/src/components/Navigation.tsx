import {NavLink} from "react-router-dom";
import './Navigation.css'

export default function Navigation() {

    return (
        <nav className="nav">
            <div className="nav-links">
                <NavLink className="link" to="/">Start</NavLink>
                <NavLink className="link" to="/home">Home</NavLink>
                <NavLink className="link" to="/add">Add</NavLink>
            </div>
        </nav>
    )
}