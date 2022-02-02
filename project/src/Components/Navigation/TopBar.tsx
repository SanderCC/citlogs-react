import {AppBar, Toolbar, Typography} from "@mui/material";
import LeftDrawer from "./LeftDrawer";

export default function TopBar() {
    return <AppBar position="static">
        <Toolbar variant="dense">
            <LeftDrawer />
            <Typography variant="h6" color="inherit" component="div">
                CITLogs Divider
            </Typography>
        </Toolbar>
    </AppBar>
}