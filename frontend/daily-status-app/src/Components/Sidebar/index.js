import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import GroupIcon from "@mui/icons-material/Group";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { startCase } from "lodash";
import { useLocation } from "react-router-dom";

const DrawerMain = ({ pathname }) => {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["project", "teams", "status"].map((text, index) => (
          <ListItem
            key={text}
            sx={{
              paddingLeft: "25px",
              color: pathname.includes(text) ? "#0277bd" : "",
            }}
          >
            <NavLink to={`${text}`}>
              <ListItemButton>
                <ListItemIcon sx={{color: pathname.includes(text) ? "#0277bd" : "",}}>
                  {index === 0 ? (
                    <AssuredWorkloadIcon />
                  ) : index === 1 ? (
                    <GroupIcon />
                  ) : (
                    <TaskAltIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={startCase(text)} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
const Sidebar = () => {
  let { pathname } = useLocation();
  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "250px" },
        }}
        open
      >
        <DrawerMain pathname={pathname} />
      </Drawer>
    </div>
  );
};

export default Sidebar;
