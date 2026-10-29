"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  IconButton,
  Box,
  Stack,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const NAV_ITEMS = [
  { label: "Checklists", href: "/checklists" },
  { label: "Categories", href: "/#categories" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 1 : 0}
        sx={{
          bgcolor: scrolled ? "rgba(255, 255, 255, 0.94)" : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: scrolled ? "divider" : "rgba(226, 232, 240, 0.7)",
          color: "text.primary",
          transition: "all 0.25s ease",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 4, sm: 6, md: 8 } }}>
          <Toolbar disableGutters sx={{ height: 68, justifyContent: "space-between" }}>
            {/* ── Brand Logo ── */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.15)",
                }}
              >
                <DescriptionIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  letterSpacing: "-0.02em",
                  color: "text.primary",
                }}
              >
                Paper<span style={{ color: "#FF5733" }}>Ready</span>
              </Typography>
              <Chip
                label="v0.1 Beta"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  bgcolor: "rgba(15, 23, 42, 0.05)",
                  color: "text.secondary",
                  display: { xs: "none", sm: "inline-flex" },
                }}
              />
            </Box>

            {/* ── Desktop Navigation Links ── */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === pathname ||
                  (item.href.startsWith("/checklists") && pathname?.startsWith("/checklists"));
                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: isActive ? "secondary.main" : "text.secondary",
                      bgcolor: isActive ? "rgba(255, 87, 51, 0.08)" : "transparent",
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 700 : 500,
                      px: 1.75,
                      py: 0.75,
                      borderRadius: 2,
                      transition: "all 0.15s ease",
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: "rgba(15, 23, 42, 0.04)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            {/* ── Right Actions ── */}
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Button
                component={Link}
                href="/checklists"
                variant="contained"
                color="secondary"
                size="small"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  fontWeight: 700,
                  px: 2.2,
                  py: 0.9,
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(255, 87, 51, 0.25)",
                }}
              >
                Browse Checklists
              </Button>

              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ display: { md: "none" }, color: "text.primary" }}
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: { width: 290, p: 2.5 },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Paper<span style={{ color: "#FF5733" }}>Ready</span>
          </Typography>
          <IconButton onClick={toggleDrawer(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === pathname ||
              (item.href.startsWith("/checklists") && pathname?.startsWith("/checklists"));
            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={toggleDrawer(false)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    bgcolor: isActive ? "rgba(255, 87, 51, 0.08)" : "transparent",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: isActive ? 700 : 600,
                          fontSize: "0.95rem",
                          color: isActive ? "secondary.main" : "text.primary",
                        }}
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ mt: 3 }}>
          <Button
            component={Link}
            href="/checklists"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={toggleDrawer(false)}
            endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
            sx={{
              py: 1.2,
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(255, 87, 51, 0.25)",
            }}
          >
            Browse All Checklists
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
