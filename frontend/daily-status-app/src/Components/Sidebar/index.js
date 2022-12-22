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
import {startCase} from 'lodash';


const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List >
      {["project", "teams", "status"].map((text, index) => (
        <ListItem key={text} sx={{ paddingLeft: "25px" }} >
          <NavLink to={`${text}`}>
            <ListItemButton>
              <ListItemIcon>
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
const Sidebar = () => {
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
        {drawer}
      </Drawer>
    </div>
  );
};

export default Sidebar;
