import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const theme = useTheme(); 

  return (
    <AppBar
      position="fixed"
      sx={{
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        zIndex: "1400",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <WidgetsIcon sx={{ display: "flex", mr: 1 }} /> */}
          <img style={{width: "30px" , padding: "5px"}} src="./app.png" alt="logo">
          </img>
          <Link to="/">
            <img
              src="https://afourathonfe.afourtech.com/372d668b088c8bea977d.png"
              alt="afourathoon"
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default React.memo(ResponsiveAppBar);
