"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const STEPS = [
  {
    n: "01",
    title: "Pick your service",
    desc: "Choose from our growing index of central and state government application types — passports, driving licences, certificates, and more.",
    icon: <SearchIcon sx={{ fontSize: 24 }} />,
    color: "#0F172A",
  },
  {
    n: "02",
    title: "Answer quick questions",
    desc: "Filter by your exact circumstance: Fresh or Renewal? Adult or Minor? Normal or Tatkal? We narrow down to what you actually need.",
    icon: <TuneIcon sx={{ fontSize: 24 }} />,
    color: "#FF5733",
  },
  {
    n: "03",
    title: "Assemble your checklist",
    desc: "Check off originals, self-attested copies, biometric photo specifications, and barcode slips with zero missing paperwork.",
    icon: <FactCheckIcon sx={{ fontSize: 24 }} />,
    color: "#0284C7",
  },
  {
    n: "04",
    title: "Walk in with confidence",
    desc: "Print a clean 1-page folder summary or keep your checklist offline on your phone. Pass document verification on the first attempt.",
    icon: <VerifiedUserIcon sx={{ fontSize: 24 }} />,
    color: "#10B981",
  },
];

export default function HowItWorksSection() {
  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.default",
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
            How PaperReady Works
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
              Prepared in{" "}
              <Box component="span" sx={{ color: "secondary.main" }}>
                4 foolproof steps.
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 360, lineHeight: 1.6 }}
            >
              No mandatory accounts. No tracking. Just verified, crowd-tested
              intelligence so you never have to make a second trip.
            </Typography>
          </Stack>
        </Box>

        {/* ── Steps Grid ── */}
        <Grid container spacing={3}>
          {STEPS.map((step) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.n}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3.5,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  position: "relative",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: step.color,
                    boxShadow: "0 10px 24px -6px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                {/* Step badge & icon */}
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${step.color}15`,
                      color: step.color,
                      width: 46,
                      height: 46,
                    }}
                  >
                    {step.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: "text.secondary",
                      opacity: 0.5,
                      fontFamily: "monospace",
                    }}
                  >
                    STEP {step.n}
                  </Typography>
                </Stack>

                {/* Step Content */}
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "text.primary" }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                  {step.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
