"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SignInButton from "./SignInButton";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const routes = [
  { name: "Resume", href: "/resume" },
  { name: "Apply", href: "/apply" },
  { name: "Saved Resume", href: "/savedResume" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const session = useSession();
  const settings = {
    Profile: (
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography sx={{ textAlign: "center" }}>Profile</Typography>
      </MenuItem>
    ),
    Account: (
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography sx={{ textAlign: "center" }}>Account</Typography>
      </MenuItem>
    ),
    Dashboard: (
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography sx={{ textAlign: "center" }}>Dashboard</Typography>
      </MenuItem>
    ),
    Logout: session.status === "authenticated" && (
      <MenuItem
        onClick={() => {
          signOut();
          handleCloseUserMenu();
        }}
      >
        <Typography sx={{ textAlign: "center" }}>Logout</Typography>
      </MenuItem>
    ),
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src="/logo.png"
            alt="Milpitas Communications"
            width={100}
            height={80}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {session.status === "authenticated" &&
                routes.map(({ name, href }) => (
                  <Link key={name} href={href}>
                    <MenuItem>
                      <Typography sx={{ textAlign: "center" }}>
                        {name}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {session.status === "authenticated" &&
              routes.map(({ name, href }) => (
                <Link key={name} href={href}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {name}
                  </Button>
                </Link>
              ))}
          </Box>

          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}
          >
            <SignInButton />

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.entries(settings).map(([key, component]) => (
                <span key={key}>{component}</span>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
