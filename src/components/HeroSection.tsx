"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  Paper,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PublicIcon from "@mui/icons-material/Public";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistModal from "./ChecklistModal";

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

export default function HeroSection() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/checklists?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      const categoriesEl = document.getElementById("categories");
      if (categoriesEl) {
        categoriesEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Box
        component="section"
        id="hero"
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 4, md: 8 },
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.default",
          backgroundImage: `
            linear-gradient(to bottom, rgba(248, 250, 252, 0.78) 0%, rgba(248, 250, 252, 0.90) 65%, rgba(248, 250, 252, 0.98) 100%),
            url('/hero-bg.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 4, sm: 6, md: 8 } }}>
          {/* ── Centered Hero Value Proposition ── */}
          <Box
            sx={{
              maxWidth: 900,
              mx: "auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: { xs: 6, md: 8 },
            }}
          >


            {/* Eyebrow badge */}
            <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center", mb: 2.5 }}>
              <Chip
                icon={<Box sx={pulseDotSx} />}
                label="Community Verified · Open Government Initiative"
                size="small"
                sx={{
                  bgcolor: "rgba(255, 87, 51, 0.08)",
                  color: "secondary.dark",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  border: "1px solid rgba(255, 87, 51, 0.2)",
                  backdropFilter: "blur(6px)",
                }}
              />
            </Stack>

            {/* Main Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.6rem", sm: "3.6rem", md: "4.4rem", lg: "4.8rem" },
                color: "text.primary",
                mb: 2.5,
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.12,
                textAlign: "center",
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
                fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.25rem" },
                color: "text.secondary",
                lineHeight: 1.65,
                mb: 4,
                maxWidth: 740,
                mx: "auto",
                textAlign: "center",
              }}
            >
              Never get turned away from a government office again. Clear, interactive,
              verified document checklists for passports, driving licences, vital certificates,
              business registrations, and civic services.
            </Typography>

            {/* Search Bar with InputBase */}
            <Paper
              component="form"
              onSubmit={handleSearchSubmit}
              variant="outlined"
              sx={{
                p: "6px 10px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: 640,
                mx: "auto",
                borderRadius: 3,
                borderColor: "divider",
                boxShadow: "0 8px 30px -4px rgba(15, 23, 42, 0.08)",
                bgcolor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
                mb: 2.5,
              }}
            >
              <Box sx={{ pl: 1, pr: 0.5, color: "text.secondary", display: "flex", alignItems: "center" }}>
                <SearchIcon />
              </Box>
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "1rem" }}
                placeholder="Search any service (e.g: Passport, DL Renewal)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.1,
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                }}
              >
                Find Checklist
              </Button>
            </Paper>

            {/* Quick Search Chips */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                mb: 4.5,
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, alignSelf: "center", mr: 0.5 }}>
                Popular:
              </Typography>
              {["Passport Tatkal", "Driving Licence", "Birth Certificate", "PAN Card", "GST Registration", "GeM Portal"].map((term) => (
                <Chip
                  key={term}
                  label={term}
                  size="small"
                  onClick={() => {
                    router.push(`/checklists?q=${encodeURIComponent(term)}`);
                  }}
                  sx={{
                    cursor: "pointer",
                    bgcolor: "rgba(255, 255, 255, 0.92)",
                    border: "1px solid",
                    borderColor: "divider",
                    fontWeight: 500,
                    transition: "all 0.15s ease",
                    "&:hover": {
                      borderColor: "secondary.main",
                      color: "secondary.main",
                      transform: "translateY(-1px)",
                    },
                  }}
                />
              ))}
            </Stack>

            {/* CTA Buttons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center" }}>
              <Button
                component={Link}
                href="#categories"
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 700,
                  boxShadow: "0 6px 20px rgba(255, 87, 51, 0.3)",
                }}
              >
                Browse Checklists
              </Button>
              <Button
                component={Link}
                href="#how-it-works"
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  px: 3.5,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                How PaperReady Works
              </Button>
            </Stack>
          </Box>

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
                      bgcolor: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(8px)",
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
