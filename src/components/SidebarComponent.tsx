import React from "react";
import {Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import type {Tab} from "@pages/homePage/tabsHelper.ts";

interface SidebarComponentProps {
    menu: Tab[];
    active: string;
    setActive: (key: string) => void;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
                                                               menu,
                                                               active,
                                                               setActive
                                                           }) => {

    console.log("active", active)

    return (
        <Box className="home__sidebar">
            <Box>
                <Typography variant="overline">Navigazione</Typography>
                <List>
                    {menu.map((tab) => (
                        <ListItemButton
                            key={tab.key}
                            selected={active === tab.key}
                            onClick={() => setActive(tab.key)}
                            sx={{
                                gap: 2,
                                '&:hover': {bgcolor: '#6b21a8'},
                                '&&.Mui-selected': {bgcolor: '#a855f7'},
                                '&&.Mui-selected:hover': {bgcolor: '#a855f7'},
                            }}
                        >
                            <ListItemIcon>
                                {tab.icon ? React.createElement(tab.icon) : null}
                            </ListItemIcon>
                            <ListItemText primary={tab.label}/>
                        </ListItemButton>
                    ))}
                </List>
                <Divider/>
            </Box>
        </Box>
    );
}

export default SidebarComponent;