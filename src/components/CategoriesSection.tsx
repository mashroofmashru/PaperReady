"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Chip,
  Stack,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import ChecklistModal, { ServiceData } from "./ChecklistModal";
import {
  CATEGORIES_DATA,
  GROUPS,
  CategoryCardData,
} from "@/data/checklistsData";

export default function CategoriesSection() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenChecklist = (item: CategoryCardData) => {
    setActiveService(item);
    setModalOpen(true);
  };

  const filteredCategories = useMemo(() => {
    return CATEGORIES_DATA.filter((cat) => {
      const matchesGroup =
        selectedTab === 0 || cat.group === GROUPS[selectedTab].label;

      if (!matchesGroup) return false;

      if (!searchFilter.trim()) return true;

      const q = searchFilter.toLowerCase();
      return (
        cat.title.toLowerCase().includes(q) ||
        cat.desc.toLowerCase().includes(q) ||
        cat.subcategory.toLowerCase().includes(q) ||
        cat.appType.toLowerCase().includes(q) ||
        cat.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [selectedTab, searchFilter]);

  // Only display 4 cards in this category section
  const displayedCategories = filteredCategories.slice(0, 4);

  return (
    <>
      <Box
        component="section"
        id="categories"
        sx={{
          py: { xs: 5, md: 9 },
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 4, sm: 6, md: 8 } }}>
          {/* Section Header */}
          <Box sx={{ mb: 4 }}>
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
              Government Application Framework
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "flex-end" } }}
            >
              <Box sx={{ maxWidth: 640 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" },
                    color: "text.primary",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 1,
                  }}
                >
                  Featured categories,{" "}
                  <Box component="span" sx={{ color: "secondary.main" }}>
                    one counter-ready source.
                  </Box>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Quickly access top document checklists or explore the complete directory of government services.
                </Typography>
              </Box>

              {/* In-category instant search */}
              <TextField
                placeholder="Search checklists (e.g. Passport, GST, Ration, GeM)..."
                size="small"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  minWidth: { xs: "100%", md: 440 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "background.default",
                  },
                }}
              />
            </Stack>
          </Box>

          {/* Category Filter Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3.5 }}>
            <Tabs
              value={selectedTab}
              onChange={(_, val) => setSelectedTab(val)}
              variant="scrollable"
              scrollButtons="auto"
              textColor="secondary"
              indicatorColor="secondary"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "0.85rem", sm: "0.92rem" },
                  minHeight: 48,
                },
              }}
            >
              {GROUPS.map((g, i) => (
                <Tab
                  key={i}
                  icon={g.icon ?? undefined}
                  iconPosition="start"
                  label={
                    i === 0
                      ? `All Categories (${CATEGORIES_DATA.length})`
                      : g.label
                  }
                />
              ))}
            </Tabs>
          </Box>

          {/* Filter Status Strip */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 3.5, flexWrap: "wrap", gap: 1, alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Showing {displayedCategories.length} of {filteredCategories.length} available
              </Typography>
              {selectedTab > 0 && (
                <Chip
                  icon={GROUPS[selectedTab].icon ?? undefined}
                  label={GROUPS[selectedTab].label}
                  color="secondary"
                  size="small"
                  onDelete={() => setSelectedTab(0)}
                  sx={{ fontWeight: 700 }}
                />
              )}
              {searchFilter && (
                <Chip
                  label={`Query: "${searchFilter}"`}
                  size="small"
                  onDelete={() => setSearchFilter("")}
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Stack>

            <Button
              component={Link}
              href="/checklists"
              size="small"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "rgba(255, 87, 51, 0.08)",
                },
              }}
            >
              View all {CATEGORIES_DATA.length} checklists
            </Button>
          </Stack>

          {/* Grid of 4 Category Cards */}
          {displayedCategories.length === 0 ? (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
                bgcolor: "background.default",
                borderRadius: 3,
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No checklists match your criteria
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try searching for a different keyword or select &quot;All Categories&quot;.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {displayedCategories.map((cat) => (
                <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={cat.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      borderRadius: 2.5,
                      bgcolor: "background.paper",
                      transition: "all 0.2s ease-in-out",
                      borderColor: "divider",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: cat.color,
                        boxShadow: "0 12px 28px -6px rgba(15, 23, 42, 0.1)",
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleOpenChecklist(cat)}
                      sx={{
                        p: 2.75,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        {/* Top: Icon & Document Count */}
                        <Stack
                          direction="row"
                          sx={{
                            width: "100%",
                            mb: 2,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 46,
                              height: 46,
                              borderRadius: "12px",
                              bgcolor: cat.bgColor,
                              color: cat.color,
                            }}
                          >
                            {cat.icon}
                          </Avatar>
                          <Chip
                            label={`${cat.count} Docs`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(15, 23, 42, 0.05)",
                              fontWeight: 700,
                              fontSize: "0.74rem",
                              height: 24,
                            }}
                          />
                        </Stack>

                        {/* Subcategory Label */}
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: cat.color,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            fontSize: "0.68rem",
                            display: "block",
                            mb: 0.75,
                          }}
                        >
                          {cat.subcategory}
                        </Typography>

                        {/* Title */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            fontSize: "1.08rem",
                            lineHeight: 1.35,
                            mb: 1.5,
                          }}
                        >
                          {cat.title}
                        </Typography>

                        {/* Description snippet */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.82rem",
                            lineHeight: 1.5,
                            mb: 2,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {cat.desc}
                        </Typography>

                        {/* Tags */}
                        <Stack
                          direction="row"
                          sx={{ flexWrap: "wrap", gap: 0.6, mb: 2 }}
                        >
                          {cat.tags.slice(0, 2).map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                fontSize: "0.7rem",
                                bgcolor: "background.default",
                                border: "1px solid",
                                borderColor: "divider",
                                height: 23,
                              }}
                            />
                          ))}
                          {cat.tags.length > 2 && (
                            <Chip
                              label={`+${cat.tags.length - 2}`}
                              size="small"
                              sx={{
                                fontSize: "0.68rem",
                                bgcolor: "transparent",
                                color: "text.secondary",
                                height: 23,
                              }}
                            />
                          )}
                        </Stack>
                      </Box>

                      {/* Bottom Action */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.6,
                          color: cat.color,
                          fontWeight: 700,
                          fontSize: "0.86rem",
                          pt: 1,
                        }}
                      >
                        View Checklist
                        <ArrowForwardIcon sx={{ fontSize: 14 }} />
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ── View All Checklists Button ── */}
          <Box
            sx={{
              mt: 6,
              pt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button
              component={Link}
              href="/checklists"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
              sx={{
                px: 4.5,
                py: 1.6,
                fontSize: "1.02rem",
                fontWeight: 700,
                borderRadius: 2.5,
                boxShadow: "0 8px 24px rgba(255, 87, 51, 0.28)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(255, 87, 51, 0.4)",
                },
              }}
            >
              View All Checklists ({CATEGORIES_DATA.length})
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1.5, fontSize: "0.85rem", maxWidth: 500 }}
            >
              Explore all {CATEGORIES_DATA.length} verified government checklists across Citizen, Business, Health, Operations, and Legal domains.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Interactive Modal */}
      <ChecklistModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={activeService}
      />
    </>
  );
}
