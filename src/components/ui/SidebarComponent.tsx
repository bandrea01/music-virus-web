import React, {type ReactElement} from "react";
import {Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import type {Tab} from "@utils/lib/tabsHelper.ts";
import {useNavigate} from "react-router-dom";
import {selectActiveTab, setActiveTab} from "@store/sidebar/slice.ts";
import {useDispatch, useSelector} from "react-redux";

type SidebarComponentProps = {
  menu: Tab[];
  sx?: object;
}

export default function SidebarComponent({
                                           menu,
                                           sx
                                         }: SidebarComponentProps): ReactElement {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  const handleClick = (key: string) => {
    dispatch(setActiveTab(key));
    navigate(`/music-virus/${key}`);
  };

  return (
    <Box className="home__sidebar" sx={{...sx}}>
      <Box>
        <Typography variant="overline">Navigazione</Typography>
        <List>
          {menu.map((tab, index) => (
            <>
              <ListItemButton
                key={index}
                selected={activeTab === tab.key}
                onClick={() => handleClick(tab.key)}
                sx={{
                  gap: 1,
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
            </>
          ))}
        </List>
        <Divider/>
      </Box>
    </Box>
  );
};