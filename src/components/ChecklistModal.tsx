"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Stack,
  Tabs,
  Tab,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  LinearProgress,
  Paper,
  Divider,
  Alert,
  Snackbar,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export interface ChecklistItem {
  id: string;
  name: string;
  type: "Original" | "Photocopy" | "Digital";
  details: string;
  mandatory: boolean;
}

export interface ServiceData {
  title: string;
  category: string;
  appType: string;
  items: ChecklistItem[];
  photoSpecs?: {
    size: string;
    background: string;
    coverage: string;
    notes: string;
  };
}

const DEFAULT_SERVICE: ServiceData = {
  title: "Fresh Indian Passport (Adult 18+)",
  category: "Passports & Travel",
  appType: "Fresh Normal / Tatkal",
  photoSpecs: {
    size: "35mm x 45mm (passport size)",
    background: "Plain white background (no shadows or borders)",
    coverage: "Full frontal view, face covering 70-80% of photo",
    notes: "No spectacles/glare, neutral expression, both ears visible, printed on quality photographic paper.",
  },
  items: [
    {
      id: "p1",
      name: "Proof of Date of Birth (DoB)",
      type: "Original",
      details: "Birth Certificate issued by Municipal Corporation, or School Leaving / Matriculation Certificate.",
      mandatory: true,
    },
    {
      id: "p2",
      name: "Proof of Present Address",
      type: "Original",
      details: "Aadhaar Card, Active Bank Passbook with photo, or registered Rental Agreement (>1 year old).",
      mandatory: true,
    },
    {
      id: "p3",
      name: "Self-Attested Photocopies",
      type: "Photocopy",
      details: "One legible photocopy of each original document signed by you with 'Self Attested' and current date.",
      mandatory: true,
    },
    {
      id: "p4",
      name: "Online Application & Appointment Receipt",
      type: "Digital",
      details: "Printed ARN (Application Reference Number) receipt with barcode from Passport Seva portal.",
      mandatory: true,
    },
    {
      id: "p5",
      name: "ECR / Non-ECR Proof (Higher Education)",
      type: "Original",
      details: "Class 10th or higher education degree certificate for Non-ECR category stamp exemption.",
      mandatory: false,
    },
  ],
};

interface ChecklistModalProps {
  open: boolean;
  onClose: () => void;
  service?: ServiceData | null;
}

export default function ChecklistModal({
  open,
  onClose,
  service = DEFAULT_SERVICE,
}: ChecklistModalProps) {
  const currentService = service || DEFAULT_SERVICE;
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    p1: true,
    p2: true,
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalMandatory = currentService.items.filter((i) => i.mandatory).length;
  const checkedMandatory = currentService.items.filter(
    (i) => i.mandatory && checkedIds[i.id]
  ).length;
  const progressPercent = Math.round((checkedMandatory / Math.max(totalMandatory, 1)) * 100);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setToastMsg("Checklist link copied to clipboard!");
      setToastOpen(true);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              p: 1,
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            pb: 1,
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
              <Chip
                label={currentService.category}
                size="small"
                color="secondary"
                sx={{ fontSize: "0.75rem", fontWeight: 600 }}
              />
              <Chip
                icon={<VerifiedUserIcon sx={{ fontSize: "14px !important" }} />}
                label="Community Verified"
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.72rem" }}
              />
            </Stack>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
              {currentService.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentService.appType} · Everything required for your counter visit
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box sx={{ px: 3, py: 1.5, bgcolor: "background.default", borderRadius: 2, mx: 3 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 0.8 }}>
              <CheckCircleIcon color={progressPercent === 100 ? "success" : "primary"} sx={{ fontSize: 18 }} />
              Readiness: {checkedMandatory} of {totalMandatory} required documents ready
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: progressPercent === 100 ? "success.main" : "primary.main" }}>
              {progressPercent}% Complete
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            color={progressPercent === 100 ? "success" : "secondary"}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, mt: 1 }}>
          <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} textColor="secondary" indicatorColor="secondary">
            <Tab icon={<DescriptionIcon fontSize="small" />} iconPosition="start" label="Required Documents" sx={{ textTransform: "none", fontWeight: 600 }} />
            {currentService.photoSpecs && (
              <Tab icon={<CameraAltIcon fontSize="small" />} iconPosition="start" label="Photo Specs & Rules" sx={{ textTransform: "none", fontWeight: 600 }} />
            )}
          </Tabs>
        </Box>

        <DialogContent sx={{ py: 2 }}>
          {tabIndex === 0 && (
            <List disablePadding>
              {currentService.items.map((item) => {
                const isChecked = !!checkedIds[item.id];
                return (
                  <Paper
                    key={item.id}
                    variant="outlined"
                    sx={{
                      mb: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      borderColor: isChecked ? "secondary.light" : "divider",
                      bgcolor: isChecked ? "rgba(255, 87, 51, 0.03)" : "background.paper",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ListItem
                      disableGutters
                      alignItems="flex-start"
                      secondaryAction={
                        <Chip
                          label={item.type}
                          size="small"
                          color={
                            item.type === "Original"
                              ? "primary"
                              : item.type === "Photocopy"
                              ? "default"
                              : "info"
                          }
                          variant="outlined"
                          sx={{ fontSize: "0.7rem", fontWeight: 600 }}
                        />
                      }
                    >
                      <ListItemIcon sx={{ minWidth: 42, mt: 0.2 }}>
                        <Checkbox
                          edge="start"
                          checked={isChecked}
                          onChange={() => toggleCheck(item.id)}
                          color="secondary"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                textDecoration: isChecked ? "line-through" : "none",
                                color: isChecked ? "text.secondary" : "text.primary",
                              }}
                            >
                              {item.name}
                            </Typography>
                            {item.mandatory && (
                              <Chip
                                label="Mandatory"
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: "0.65rem",
                                  bgcolor: "rgba(239, 68, 68, 0.1)",
                                  color: "#DC2626",
                                  fontWeight: 700,
                                }}
                              />
                            )}
                          </Stack>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.5 }}>
                            {item.details}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Paper>
                );
              })}
            </List>
          )}

          {tabIndex === 1 && currentService.photoSpecs && (
            <Box sx={{ py: 1 }}>
              <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                Submitting incorrect photograph dimensions or lighting is the #1 reason application files get held up at counters.
              </Alert>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                      Dimensions & Aspect Ratio
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mt: 0.5 }}>
                      {currentService.photoSpecs.size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Standard passport frame specification for biometric scanning machines.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                      Background Tone
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mt: 0.5 }}>
                      {currentService.photoSpecs.background}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      No patterned curtains, off-white, or outdoor backgrounds permitted.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Official Facial Coverage & Position Guidelines
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentService.photoSpecs.coverage}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Important Rule:</strong> {currentService.photoSpecs.notes}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1, justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{ color: "text.primary" }}
            >
              Print Checklist
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{ color: "text.primary" }}
            >
              Share
            </Button>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            Done Assembling
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message={toastMsg}
      />
    </>
  );
}
