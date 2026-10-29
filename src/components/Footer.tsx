"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  IconButton,
  Chip,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CURRENT_YEAR = 2026;

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Browse Checklists", href: "/checklists" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Platform Features", href: "/#features" },
      { label: "Photo Specs Guide", href: "/checklists" },
    ],
  },
  {
    title: "Government Portals",
    links: [
      { label: "Passport Seva Kendra", href: "https://portal2.passportindia.gov.in" },
      { label: "Parivahan Sarathi (DL/LL)", href: "https://sarathi.parivahan.gov.in" },
      { label: "UIDAI MyAadhaar", href: "https://myaadhaar.uidai.gov.in" },
      { label: "Income Tax e-Filing (PAN)", href: "https://www.incometax.gov.in" },
    ],
  },
  {
    title: "Community & Code",
    links: [
      { label: "GitHub Repository", href: "https://github.com/mashroofmashru/PaperReady" },
      { label: "Suggest a Checklist", href: "https://github.com/mashroofmashru/PaperReady/issues" },
      { label: "Discussion Forum", href: "https://github.com/mashroofmashru/PaperReady/discussions" },
      { label: "MIT License", href: "https://github.com/mashroofmashru/PaperReady/blob/main/LICENSE" },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: { xs: 4, md: 8 },
        pb: 5,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 4, sm: 6, md: 8 } }}>
        <Grid container spacing={5} sx={{ mb: 6 }}>
          {/* Brand Info Column */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <Box sx={{ mb: 2.5, display: "flex", alignItems: "center", gap: 1.25 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                <DescriptionIcon sx={{ fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                Paper<span style={{ color: "#FF5733" }}>Ready</span>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, lineHeight: 1.7, mb: 3 }}>
              Know what to carry before you go. Clear, interactive, community-verified document checklists
              for every Indian citizen facing government counter appointments.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Button
                component="a"
                href="https://github.com/mashroofmashru/PaperReady"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                startIcon={<GitHubIcon />}
                sx={{
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": { borderColor: "primary.main" },
                }}
              >
                GitHub · Open Source
              </Button>
              <Chip
                label="Free forever"
                size="small"
                sx={{ bgcolor: "rgba(16, 185, 129, 0.1)", color: "#059669", fontWeight: 700 }}
              />
            </Stack>
          </Grid>

          {/* Navigation Columns */}
          {FOOTER_SECTIONS.map((section, idx) => (
            <Grid size={{ xs: 6, sm: 4, md: 2.5 }} key={idx}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontSize: "0.75rem",
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1.2}>
                {section.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      textDecoration: "none",
                      color: "#64748B",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#FF5733";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#64748B";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {CURRENT_YEAR} PaperReady. Built with{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              React Material UI
            </Box>{" "}
            & Next.js under MIT License.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              Crafted for India with <FavoriteIcon sx={{ fontSize: 13, color: "secondary.main" }} />
            </Typography>
            <IconButton
              onClick={scrollToTop}
              size="small"
              sx={{
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { bgcolor: "rgba(15, 23, 42, 0.05)" },
              }}
              aria-label="scroll to top"
            >
              <ArrowUpwardIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
