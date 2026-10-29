"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Breadcrumbs,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedIcon from "@mui/icons-material/Verified";
import HomeIcon from "@mui/icons-material/Home";
import PrintIcon from "@mui/icons-material/Print";
import ChecklistModal, { ServiceData, ChecklistItem } from "./ChecklistModal";
import {
  CATEGORIES_DATA,
  GROUPS,
  CategoryCardData,
} from "@/data/checklistsData";

export default function ChecklistsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchFilter, setSearchFilter] = useState(initialQuery);
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "expanded">("grid");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Keep track of checked items in expanded view
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const toggleChecked = (itemId: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleOpenChecklist = (item: CategoryCardData) => {
    setActiveService(item);
    setModalOpen(true);
  };

  // Filter categories
  const filteredCategories = useMemo(() => {
    return CATEGORIES_DATA.filter((cat) => {
      // 1. Group filter
      const matchesGroup =
        selectedTab === 0 || cat.group === GROUPS[selectedTab].label;
      if (!matchesGroup) return false;

      // 2. Type filter
      if (typeFilter === "photo" && !cat.photoSpecs) return false;
      if (typeFilter === "original" && !cat.items.some((i) => i.type === "Original"))
        return false;
      if (typeFilter === "photocopy" && !cat.items.some((i) => i.type === "Photocopy"))
        return false;
      if (typeFilter === "digital" && !cat.items.some((i) => i.type === "Digital"))
        return false;

      // 3. Search query filter
      if (!searchFilter.trim()) return true;

      const q = searchFilter.toLowerCase();
      const inTitle = cat.title.toLowerCase().includes(q);
      const inDesc = cat.desc.toLowerCase().includes(q);
      const inSub = cat.subcategory.toLowerCase().includes(q);
      const inApp = cat.appType.toLowerCase().includes(q);
      const inTags = cat.tags.some((t) => t.toLowerCase().includes(q));
      const inItems = cat.items.some(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.details.toLowerCase().includes(q)
      );

      return inTitle || inDesc || inSub || inApp || inTags || inItems;
    });
  }, [selectedTab, searchFilter, typeFilter]);

  // Total documents across filtered categories
  const totalDocsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <>
      <Box
        component="main"
        sx={{
          pt: { xs: 12, md: 15 },
          pb: { xs: 8, md: 12 },
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 5, md: 8 } }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ mb: 3, fontSize: "0.85rem", color: "text.secondary" }}
          >
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              <HomeIcon sx={{ fontSize: 16 }} />
              Home
            </Box>
            <Typography sx={{ color: "secondary.main", fontWeight: 700, fontSize: "0.85rem" }}>
              All Checklists
            </Typography>
          </Breadcrumbs>

          {/* Header Banner */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
              <Chip
                icon={<VerifiedIcon sx={{ fontSize: "16px !important", color: "secondary.main" }} />}
                label="Official Government Counter Directory"
                size="small"
                sx={{
                  bgcolor: "rgba(255, 87, 51, 0.08)",
                  color: "secondary.dark",
                  fontWeight: 700,
                  fontSize: "0.76rem",
                  border: "1px solid rgba(255, 87, 51, 0.2)",
                }}
              />
              <Chip
                label={`${CATEGORIES_DATA.length} Services`}
                size="small"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.74rem",
                  bgcolor: "rgba(15, 23, 42, 0.05)",
                }}
              />
            </Stack>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.2rem", sm: "3rem", md: "3.6rem" },
                fontWeight: 800,
                color: "text.primary",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                mb: 1.5,
              }}
            >
              All Government{" "}
              <Box component="span" sx={{ color: "secondary.main" }}>
                Document Checklists
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
                maxWidth: 820,
                lineHeight: 1.6,
              }}
            >
              Every checklist, counter requirement, photocopy rule, and photograph specification
              for Indian public offices. Select a service to inspect and track your counter readiness.
            </Typography>
          </Box>

          {/* Search, Group Tabs, and Controls Card */}
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 3,
              mb: 4,
              bgcolor: "background.paper",
              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            {/* Search Bar + View Toggle */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
            >
              <TextField
                placeholder="Search across all checklists, document names, or departments..."
                fullWidth
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary", fontSize: 22 }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchFilter && (
                      <InputAdornment position="end">
                        <Button
                          size="small"
                          onClick={() => setSearchFilter("")}
                          sx={{ minWidth: "auto", p: 0.5, color: "text.secondary" }}
                        >
                          <ClearIcon sx={{ fontSize: 18 }} />
                        </Button>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    bgcolor: "background.default",
                  },
                }}
              />

              {/* View Toggle */}
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", alignSelf: { xs: "flex-end", md: "center" } }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  View:
                </Typography>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, val) => {
                    if (val) setViewMode(val);
                  }}
                  size="small"
                  aria-label="view mode"
                  sx={{
                    bgcolor: "background.default",
                    "& .MuiToggleButton-root": {
                      textTransform: "none",
                      fontWeight: 600,
                      px: 1.5,
                      py: 0.5,
                    },
                  }}
                >
                  <ToggleButton value="grid" aria-label="cards view">
                    <GridViewIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    Cards
                  </ToggleButton>
                  <ToggleButton value="expanded" aria-label="expanded checklists">
                    <ViewListIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    Full Details
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>

            {/* Category Domain Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2.5 }}>
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
                    minHeight: 46,
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
                        ? `All Checklists (${CATEGORIES_DATA.length})`
                        : g.label
                    }
                  />
                ))}
              </Tabs>
            </Box>

            {/* Secondary Type Quick Filters */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: "wrap", gap: 1, alignItems: "center" }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mr: 0.5 }}>
                Filter By Document Type:
              </Typography>
              {[
                { key: "all", label: "All Types" },
                { key: "original", label: "Originals Required" },
                { key: "photocopy", label: "Photocopies Needed" },
                { key: "digital", label: "Online / Digital" },
                { key: "photo", label: "Photo Specs Included" },
              ].map((pill) => (
                <Chip
                  key={pill.key}
                  label={pill.label}
                  size="small"
                  clickable
                  color={typeFilter === pill.key ? "secondary" : "default"}
                  variant={typeFilter === pill.key ? "filled" : "outlined"}
                  onClick={() => setTypeFilter(pill.key)}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    transition: "all 0.15s ease",
                  }}
                />
              ))}
            </Stack>
          </Paper>

          {/* Search Result Counter & Active Tags */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 3.5, flexWrap: "wrap", gap: 1, alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Showing <strong>{filteredCategories.length}</strong> services (
              <strong>{totalDocsCount}</strong> document requirements verified)
            </Typography>

            {(searchFilter || selectedTab > 0 || typeFilter !== "all") && (
              <Button
                size="small"
                variant="text"
                color="secondary"
                onClick={() => {
                  setSearchFilter("");
                  setSelectedTab(0);
                  setTypeFilter("all");
                }}
                sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.82rem" }}
              >
                Reset All Filters
              </Button>
            )}
          </Stack>

          {/* ────────────────────────────────────────────────────────── */}
          {/* EMPTY STATE */}
          {/* ────────────────────────────────────────────────────────── */}
          {filteredCategories.length === 0 && (
            <Paper
              variant="outlined"
              sx={{
                py: 10,
                px: 3,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "background.paper",
                borderStyle: "dashed",
              }}
            >
              <DescriptionIcon sx={{ fontSize: 52, color: "text.secondary", mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                No checklists match your search criteria
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
                We couldn&apos;t find any service matching &quot;{searchFilter}&quot;. Try adjusting your keywords or clearing the active filters.
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setSearchFilter("");
                  setSelectedTab(0);
                  setTypeFilter("all");
                }}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
              >
                Clear Filters & Show All
              </Button>
            </Paper>
          )}

          {/* ────────────────────────────────────────────────────────── */}
          {/* VIEW MODE 1: GRID / CARDS VIEW */}
          {/* ────────────────────────────────────────────────────────── */}
          {filteredCategories.length > 0 && viewMode === "grid" && (
            <Grid container spacing={3}>
              {filteredCategories.map((cat) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      bgcolor: "background.paper",
                      transition: "all 0.22s ease-in-out",
                      borderColor: "divider",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: cat.color,
                        boxShadow: "0 12px 28px -4px rgba(15, 23, 42, 0.09)",
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleOpenChecklist(cat)}
                      sx={{
                        p: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        {/* Header: Icon, Group, and Doc Count */}
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
                              width: 48,
                              height: 48,
                              borderRadius: "12px",
                              bgcolor: cat.bgColor,
                              color: cat.color,
                            }}
                          >
                            {cat.icon}
                          </Avatar>
                          <Stack direction="row" spacing={0.75}>
                            {cat.photoSpecs && (
                              <Chip
                                icon={<CameraAltIcon sx={{ fontSize: "14px !important" }} />}
                                label="Photo Specs"
                                size="small"
                                sx={{
                                  bgcolor: "rgba(255, 87, 51, 0.08)",
                                  color: "secondary.dark",
                                  fontWeight: 700,
                                  fontSize: "0.7rem",
                                  height: 24,
                                }}
                              />
                            )}
                            <Chip
                              label={`${cat.count} Docs`}
                              size="small"
                              sx={{
                                bgcolor: "rgba(15, 23, 42, 0.05)",
                                fontWeight: 700,
                                fontSize: "0.72rem",
                                height: 24,
                              }}
                            />
                          </Stack>
                        </Stack>

                        {/* Subcategory */}
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: cat.color,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            fontSize: "0.7rem",
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
                            fontSize: "1.12rem",
                            lineHeight: 1.35,
                            mb: 1.25,
                          }}
                        >
                          {cat.title}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.85rem",
                            lineHeight: 1.55,
                            mb: 2.2,
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
                          {cat.tags.slice(0, 3).map((tag) => (
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
                          {cat.tags.length > 3 && (
                            <Chip
                              label={`+${cat.tags.length - 3}`}
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
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pt: 1.5,
                          borderTop: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontWeight: 600 }}
                        >
                          {cat.group.split(" ")[0]} Service
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: cat.color,
                            fontWeight: 700,
                            fontSize: "0.86rem",
                          }}
                        >
                          Open Checklist
                          <ArrowForwardIcon sx={{ fontSize: 14 }} />
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ────────────────────────────────────────────────────────── */}
          {/* VIEW MODE 2: EXPANDED DETAILED CHECKLISTS VIEW */}
          {/* ────────────────────────────────────────────────────────── */}
          {filteredCategories.length > 0 && viewMode === "expanded" && (
            <Stack spacing={3}>
              {filteredCategories.map((cat) => {
                const checkedCount = cat.items.filter((item) => checkedMap[item.id]).length;
                const progressPct = Math.round((checkedCount / cat.items.length) * 100);

                return (
                  <Accordion
                    key={cat.id}
                    defaultExpanded={filteredCategories.length <= 3}
                    variant="outlined"
                    sx={{
                      borderRadius: "16px !important",
                      borderColor: "divider",
                      overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(15, 23, 42, 0.03)",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        p: { xs: 2, sm: 2.5 },
                        bgcolor: "background.paper",
                        "&:hover": { bgcolor: "rgba(15, 23, 42, 0.02)" },
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        sx={{
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: { xs: "flex-start", sm: "center" },
                          pr: 2,
                        }}
                      >
                        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: "12px",
                              bgcolor: cat.bgColor,
                              color: cat.color,
                            }}
                          >
                            {cat.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.08rem" }}>
                              {cat.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {cat.group} · {cat.subcategory}
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                          {checkedCount > 0 && (
                            <Chip
                              label={`${checkedCount}/${cat.items.length} Ready (${progressPct}%)`}
                              size="small"
                              color="success"
                              sx={{ fontWeight: 700, fontSize: "0.72rem" }}
                            />
                          )}
                          <Chip
                            label={`${cat.items.length} Documents`}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.74rem",
                              bgcolor: "rgba(15, 23, 42, 0.05)",
                            }}
                          />
                          <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenChecklist(cat);
                            }}
                            sx={{
                              textTransform: "none",
                              fontWeight: 700,
                              borderRadius: 2,
                              fontSize: "0.8rem",
                            }}
                          >
                            Interactive Modal
                          </Button>
                        </Stack>
                      </Stack>
                    </AccordionSummary>

                    <AccordionDetails sx={{ p: { xs: 2, sm: 3 }, bgcolor: "background.default" }}>
                      {/* Description & Photo Specs */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
                        {cat.desc}
                      </Typography>

                      {cat.photoSpecs && (
                        <Alert
                          severity="info"
                          icon={<CameraAltIcon sx={{ color: "secondary.main" }} />}
                          sx={{
                            mb: 2.5,
                            borderRadius: 2,
                            bgcolor: "rgba(255, 87, 51, 0.06)",
                            border: "1px solid rgba(255, 87, 51, 0.2)",
                            color: "text.primary",
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "secondary.main" }}>
                            Counter Photograph Requirements
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: "0.82rem", mt: 0.25 }}>
                            <strong>Size:</strong> {cat.photoSpecs.size} | <strong>Background:</strong> {cat.photoSpecs.background} | <strong>Coverage:</strong> {cat.photoSpecs.coverage}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                            {cat.photoSpecs.notes}
                          </Typography>
                        </Alert>
                      )}

                      {/* Documents Checklist List */}
                      <Paper variant="outlined" sx={{ borderRadius: 2.5, bgcolor: "background.paper", overflow: "hidden" }}>
                        <List disablePadding>
                          {cat.items.map((item, idx) => {
                            const isChecked = !!checkedMap[item.id];
                            return (
                              <React.Fragment key={item.id}>
                                {idx > 0 && <Divider />}
                                <ListItem
                                  sx={{
                                    py: 1.75,
                                    px: { xs: 2, sm: 2.5 },
                                    bgcolor: isChecked ? "rgba(16, 185, 129, 0.04)" : "transparent",
                                    transition: "background-color 0.15s ease",
                                  }}
                                  secondaryAction={
                                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                      <Chip
                                        label={item.type}
                                        size="small"
                                        sx={{
                                          fontSize: "0.72rem",
                                          fontWeight: 700,
                                          bgcolor:
                                            item.type === "Original"
                                              ? "rgba(2, 132, 199, 0.1)"
                                              : item.type === "Photocopy"
                                              ? "rgba(234, 88, 12, 0.1)"
                                              : "rgba(16, 185, 129, 0.1)",
                                          color:
                                            item.type === "Original"
                                              ? "#0284C7"
                                              : item.type === "Photocopy"
                                              ? "#EA580C"
                                              : "#10B981",
                                        }}
                                      />
                                      {item.mandatory ? (
                                        <Chip
                                          label="Mandatory"
                                          size="small"
                                          sx={{
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            bgcolor: "rgba(220, 38, 38, 0.08)",
                                            color: "#DC2626",
                                          }}
                                        />
                                      ) : (
                                        <Chip
                                          label="If Applicable"
                                          size="small"
                                          sx={{
                                            fontSize: "0.7rem",
                                            fontWeight: 500,
                                            bgcolor: "rgba(15, 23, 42, 0.04)",
                                            color: "text.secondary",
                                          }}
                                        />
                                      )}
                                    </Stack>
                                  }
                                >
                                  <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Checkbox
                                      edge="start"
                                      checked={isChecked}
                                      onChange={() => toggleChecked(item.id)}
                                      color="secondary"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="subtitle2"
                                        sx={{
                                          fontWeight: 700,
                                          fontSize: "0.95rem",
                                          textDecoration: isChecked ? "line-through" : "none",
                                          color: isChecked ? "text.secondary" : "text.primary",
                                        }}
                                      >
                                        {item.name}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: "block", mt: 0.5, pr: { xs: 8, sm: 12 } }}
                                      >
                                        {item.details}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </React.Fragment>
                            );
                          })}
                        </List>
                      </Paper>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Stack>
          )}
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
