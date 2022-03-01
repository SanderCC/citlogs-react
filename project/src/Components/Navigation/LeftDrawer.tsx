import {Divider, IconButton, ListItem, List, SwipeableDrawer, Typography} from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import {Link} from "react-router-dom";

import AgricultureIcon from '@mui/icons-material/Agriculture';
import {HouseRounded} from "@material-ui/icons";
import {AdminPanelSettings} from "@mui/icons-material";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function LeftDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    return (
        <React.Fragment key={"left"}>
            <IconButton onClick={toggleDrawer("left", true)} sx={{color: "white", mr: 2}}>
                <MenuIcon/>
            </IconButton>
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >
                <>
                    <Typography variant={"h5"} sx={{fontWeight: "bold", textAlign: "center", p:2, color: "grey"}}>
                        Menu
                    </Typography>
                    <Divider />
                    <List>
                        <DetailedListItem title={"Home"} to={"/Home"}>
                            <HouseRounded />
                        </DetailedListItem>
                        <Divider />
                        <DetailedListItem title={"Account Divider"} to={"/Parser/Account"}>
                            <AccessibilityIcon />
                        </DetailedListItem>
                        <Divider />
                        <DetailedListItem title={"SO Application"} to={"/Parser/SO/Application"}>
                            <ArchitectureRoundedIcon />
                        </DetailedListItem>
                        <DetailedListItem title={"SO Review"} to={"/Parser/SO/Review"}>
                            <AgricultureIcon />
                        </DetailedListItem>
                        <DetailedListItem title={"Guider App Review"} to={"/Parser/Guiders/Application"}>
                            <SupportAgentRoundedIcon />
                        </DetailedListItem>
                        {
                            !isAdminDomain() ? <></> : (
                                <>
                                    <Divider />
                                    <DetailedListItem title={"Admin Review"} to={"/Parser/Admin"}>
                                        <AdminPanelSettings />
                                    </DetailedListItem>
                                </>
                            )
                        }
                    </List>
                </>
            </SwipeableDrawer>
        </React.Fragment>
    );
}

function DetailedListItem({to, children, title}: { to: string, title: string, children?: JSX.Element }) {
    return (
        <ListItem button component={Link} to={to}>
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={title}/>
        </ListItem>
    )
}

function isAdminDomain() : boolean {
    let hostname = window.location.hostname
    return hostname.includes("admin") || hostname.includes("localhost")
}