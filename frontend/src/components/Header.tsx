import {Button, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";

type HeaderProps = {
    user: string | undefined,
    onLogout: () => Promise<void>
}
export default function Header(props: HeaderProps) {
    const navigate = useNavigate();
   const authenticated = props.user !== undefined && props.user !== "anonymousUser"

    function logoutOnClick(){
        props.onLogout()
            .then(() => {
                navigate("/login")
            })
    }

    return (
        <StyledHeader>
            <Typography variant="h1" component="h1" sx={{fontSize: "2rem"}}>
                Driver App
            </Typography>
            {authenticated &&
            <Button type="button" onClick={logoutOnClick}>Logout</Button>}
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  color: #e0e0e0;
  background-color: #ef6c00;
  text-align: center;
  font-size: 2rem;
  padding: 1rem;
  margin-bottom: 0.7rem;
`