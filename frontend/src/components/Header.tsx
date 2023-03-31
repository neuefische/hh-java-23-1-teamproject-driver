import {createTheme, ThemeProvider, Typography} from "@mui/material";
export default function Header(){
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '2rem',
                color: '#e0e0e0',
                textAlign: "center",
                padding: "1rem",
                marginBottom: "0.7rem",
                backgroundColor: "#ff6d00",
            }}})
    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h1" component="h1">
               Driver App
            </Typography>
        </ThemeProvider>
    )
}