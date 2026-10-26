"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  Paper,
  Checkbox,
  LinearProgress,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PublicIcon from "@mui/icons-material/Public";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistModal, { ServiceData } from "./ChecklistModal";

const STATS = [
  { value: "500+", label: "Document Checklists", icon: <DescriptionIcon sx={{ fontSize: 20 }} /> },
  { value: "28", label: "States & UTs Covered", icon: <PublicIcon sx={{ fontSize: 20 }} /> },
  { value: "0", label: "Sign-ups or Tracking", icon: <LockOpenIcon sx={{ fontSize: 20 }} /> },
  { value: "100%", label: "Free & Open Source", icon: <VerifiedIcon sx={{ fontSize: 20 }} /> },
];

const TICKER_SERVICES = [
  "Fresh Passport",
  "Learner's Licence",
  "Birth Certificate",
  "Voter ID (EPIC)",
  "Property Registration",
  "RC Ownership Transfer",
  "Marriage Certificate",
  "Tatkal Passport",
  "Income & Caste Certificate",
  "PAN Card Correction",
  "Driving Licence Renewal",
];

const pulseDotSx = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  bgcolor: "secondary.main",
  animation: "paperready-pulse 2s infinite ease-in-out",
  "@keyframes paperready-pulse": {
    "0%": { transform: "scale(0.9)", opacity: 0.8 },
    "50%": { transform: "scale(1.3)", opacity: 1 },
    "100%": { transform: "scale(0.9)", opacity: 0.8 },
  },
} as const;

const tickerContainerSx = {
  display: "inline-flex",
  animation: "paperready-ticker 28s linear infinite",
  "@keyframes paperready-ticker": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
} as const;

const SAMPLE_DOCS = [
  { id: "1", title: "Proof of Date of Birth (Birth Cert. / 10th Marksheet)", ready: true },
  { id: "2", title: "Proof of Address (Aadhaar / Bank Passbook)", ready: true },
  { id: "3", title: "2x Passport Photos (35x45mm, White Background)", ready: true },
  { id: "4", title: "Online Appointment Confirmation Barcode Slip", ready: false },
];

export default function HeroSection() {
  const [sampleDocs, setSampleDocs] = useState(SAMPLE_DOCS);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSampleDoc = (id: string) => {
    setSampleDocs((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ready: !doc.ready } : doc))
    );
  };

  const completedCount = sampleDocs.filter((d) => d.ready).length;
  const progressPercent = Math.round((completedCount / sampleDocs.length) * 100);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoriesEl = document.getElementById("categories");
    if (categoriesEl) {
      categoriesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Box
        component="section"
        id="hero"
        sx={{
          pt: { xs: 12, md: 15 },
          pb: { xs: 8, md: 10 },
          bgcolor: "background.default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 6 }} sx={{ alignItems: "center" }}>
            {/* ── Left Column: Value Proposition ── */}
            <Grid size={{ xs: 12, md: 6.5 }}>
              <Box>
                {/* Eyebrow badge */}
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2.5 }}>
                  <Chip
                    icon={
                      <Box sx={pulseDotSx} />
                    }
                    label="Community Verified · Open Government Initiative"
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 87, 51, 0.08)",
                      color: "secondary.dark",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      border: "1px solid rgba(255, 87, 51, 0.2)",
                    }}
                  />
                </Stack>

                {/* Main Headline */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.75rem" },
                    color: "text.primary",
                    mb: 2.5,
                  }}
                >
                  Know what to carry{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "secondary.main",
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    before you go.
                  </Box>
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1.05rem", sm: "1.2rem" },
                    color: "text.secondary",
                    lineHeight: 1.6,
                    mb: 4,
                    maxWidth: 540,
                  }}
                >
                  Never get turned away from a government office again. Clear, interactive,
                  verified document checklists for passports, driving licences, vital certificates,
                  and civic services.
                </Typography>

                {/* Search Bar with InputBase */}
                <Paper
                  component="form"
                  onSubmit={handleSearchSubmit}
                  variant="outlined"
                  sx={{
                    p: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    maxWidth: 520,
                    borderRadius: 3,
                    borderColor: "divider",
                    boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.08)",
                    bgcolor: "background.paper",
                    mb: 2.5,
                  }}
                >
                  <Box sx={{ pl: 1, pr: 0.5, color: "text.secondary", display: "flex", alignItems: "center" }}>
                    <SearchIcon />
                  </Box>
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: "0.95rem" }}
                    placeholder="Search any service (e.g., Passport, DL Renewal, Caste)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Find Checklist
                  </Button>
                </Paper>

                {/* Quick Search Chips */}
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, mb: 4 }}>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, alignSelf: "center", mr: 0.5 }}>
                    Popular:
                  </Typography>
                  {["Passport Tatkal", "Driving Licence", "Birth Certificate", "PAN Card"].map((term) => (
                    <Chip
                      key={term}
                      label={term}
                      size="small"
                      onClick={() => {
                        setSearchQuery(term);
                        setModalOpen(true);
                      }}
                      sx={{
                        cursor: "pointer",
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": {
                          borderColor: "secondary.main",
                          color: "secondary.main",
                        },
                      }}
                    />
                  ))}
                </Stack>

                {/* CTA Buttons */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    component={Link}
                    href="#categories"
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 3.5,
                      py: 1.4,
                      fontSize: "1rem",
                      boxShadow: "0 6px 20px rgba(255, 87, 51, 0.3)",
                    }}
                  >
                    Browse 500+ Checklists
                  </Button>
                  <Button
                    component={Link}
                    href="#how-it-works"
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{
                      px: 3,
                      py: 1.4,
                      fontSize: "1rem",
                      bgcolor: "background.paper",
                    }}
                  >
                    How PaperReady Works
                  </Button>
                </Stack>
              </Box>
            </Grid>

            {/* ── Right Column: Interactive Live Preview Card ── */}
            <Grid size={{ xs: 12, md: 5.5 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3.5 },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)",
                  position: "relative",
                }}
              >
                {/* Header of preview card */}
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Box>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                      <Chip
                        label="Live Interactive Preview"
                        size="small"
                        color="secondary"
                        sx={{ fontSize: "0.7rem", height: 22, fontWeight: 700 }}
                      />
                      <Chip
                        label="Adult 18+"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem", height: 22 }}
                      />
                    </Stack>
                    <Typography variant="h6" sx={{ fontWeight: 800, mt: 1, color: "text.primary" }}>
                      Fresh Passport Checklist
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Click items below to test interactive preparation
                    </Typography>
                  </Box>
                </Stack>

                {/* Progress bar */}
                <Box sx={{ my: 2.5, p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                  <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>
                      Preparation Status:
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 800,
                        color: progressPercent === 100 ? "success.main" : "secondary.main",
                      }}
                    >
                      {completedCount} of {sampleDocs.length} Ready ({progressPercent}%)
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercent}
                    color={progressPercent === 100 ? "success" : "secondary"}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                {/* Document Items */}
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  {sampleDocs.map((doc) => (
                    <Paper
                      key={doc.id}
                      onClick={() => toggleSampleDoc(doc.id)}
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        borderColor: doc.ready ? "secondary.light" : "divider",
                        bgcolor: doc.ready ? "rgba(255, 87, 51, 0.02)" : "background.paper",
                        transition: "all 0.15s ease",
                        "&:hover": {
                          bgcolor: "rgba(15, 23, 42, 0.02)",
                          borderColor: "secondary.main",
                        },
                      }}
                    >
                      <Checkbox
                        size="small"
                        checked={doc.ready}
                        color="secondary"
                        sx={{ p: 0 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.88rem",
                          color: doc.ready ? "text.primary" : "text.secondary",
                        }}
                      >
                        {doc.title}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setModalOpen(true)}
                  startIcon={<CheckCircleIcon sx={{ color: "secondary.main" }} />}
                  sx={{ py: 1.2 }}
                >
                  Open Full Checklist with Photo Specs
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* ── Stats Strip ── */}
          <Box sx={{ mt: { xs: 6, md: 8 }, pt: 4, borderTop: "1px solid", borderColor: "divider" }}>
            <Grid container spacing={2}>
              {STATS.map((stat, i) => (
                <Grid size={{ xs: 6, md: 3 }} key={i}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: "background.paper",
                      textAlign: "center",
                      transition: "transform 0.2s ease",
                      "&:hover": { transform: "translateY(-2px)" },
                    }}
                  >
                    <Box sx={{ color: "secondary.main", mb: 0.5, display: "flex", justifyContent: "center" }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mt: 0.5 }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        {/* ── Scrolling Ticker Bar ── */}
        <Box
          sx={{
            mt: 6,
            py: 1.5,
            bgcolor: "primary.main",
            color: "#FFFFFF",
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={tickerContainerSx}>
            {[...TICKER_SERVICES, ...TICKER_SERVICES].map((item, index) => (
              <Typography
                key={index}
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 2.5,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  opacity: 0.9,
                  "&::after": {
                    content: '"•"',
                    ml: 2.5,
                    color: "secondary.main",
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Checklist Modal */}
      <ChecklistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
