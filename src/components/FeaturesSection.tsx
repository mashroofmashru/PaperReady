"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CropFreeIcon from "@mui/icons-material/CropFree";
import PrintIcon from "@mui/icons-material/Print";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import SecurityIcon from "@mui/icons-material/Security";

const FEATURES = [
  {
    icon: <PlaylistAddCheckIcon sx={{ fontSize: 26 }} />,
    color: "#0F172A",
    title: "Interactive Checklists",
    desc: "Check off originals, self-attested photocopies, and digital files as you assemble your folder. Progress stays saved locally.",
    tag: "Core Workflow",
  },
  {
    icon: <AltRouteIcon sx={{ fontSize: 26 }} />,
    color: "#FF5733",
    title: "Conditional Requirements",
    desc: "Tailored to your exact situation — Fresh vs Renewal, Adult vs Minor, Tatkal vs Normal. Never carry useless paperwork.",
    tag: "Smart Filters",
  },
  {
    icon: <CropFreeIcon sx={{ fontSize: 26 }} />,
    color: "#0284C7",
    title: "Photo & Spec Cheat-Sheets",
    desc: "Exact photo millimetre dimensions, acceptable background colours, signature bounding boxes, and maximum file size limits.",
    tag: "Counter-Approved",
  },
  {
    icon: <PrintIcon sx={{ fontSize: 26 }} />,
    color: "#10B981",
    title: "Printable & Offline-Ready",
    desc: "One-click export to a clean 1-page summary to clip right onto your physical file folder before heading to your appointment.",
    tag: "Offline First",
  },
  {
    icon: <GroupWorkIcon sx={{ fontSize: 26 }} />,
    color: "#8B5CF6",
    title: "Crowdsourced & Verified",
    desc: "Real citizen reports confirming what officers actually ask for on the ground, flagging recent bureaucratic circular updates.",
    tag: "Community Power",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 26 }} />,
    color: "#EC4899",
    title: "Privacy-First, Zero Signup",
    desc: "No account required, no login walls, no tracking cookies. Your personal checklist progress stays strictly on your browser.",
    tag: "100% Private",
  },
];

export default function FeaturesSection() {
  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        {/* ── Section Header ── */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "secondary.main",
              display: "block",
              mb: 1,
            }}
          >
            Platform Capabilities
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" },
                color: "text.primary",
                maxWidth: 600,
              }}
            >
              Built for citizens,{" "}
              <Box component="span" sx={{ color: "secondary.main" }}>
                by citizens.
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 360, lineHeight: 1.6 }}
            >
              Every feature is built around the friction points citizens face
              every day at government department counters.
            </Typography>
          </Stack>
        </Box>

        {/* ── Features Grid ── */}
        <Grid container spacing={3}>
          {FEATURES.map((feat, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  p: 1.5,
                  borderRadius: 3,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: feat.color,
                    boxShadow: "0 10px 24px -6px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center", mb: 2.5 }}
                  >
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: `${feat.color}15`,
                        color: feat.color,
                      }}
                    >
                      {feat.icon}
                    </Avatar>
                    <Chip
                      label={feat.tag}
                      size="small"
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        bgcolor: "background.default",
                      }}
                    />
                  </Stack>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "text.primary" }}>
                    {feat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {feat.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
