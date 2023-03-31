import {useNavigate} from "react-router-dom";
import {SyntheticEvent, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navigation() {
    const [value, setValue] = useState('/');
    const navigate = useNavigate();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        navigate(newValue)
    };

    return (
        <Paper sx={{position: 'fixed', bottom: '0.1rem'}}>
            <BottomNavigation sx={{width: '100vw', bgcolor: "#eeeeee"}} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="profil"
                    value="/"
                    icon={<AccountCircleIcon/>}
                />
                <BottomNavigationAction
                    label="home"
                    value="/home"
                    icon={<HomeIcon/>}
                />
                <BottomNavigationAction
                    label="add"
                    value="/add"
                    icon={<AddIcon/>}
                />
            </BottomNavigation>
        </Paper>
    )
}