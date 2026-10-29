import React, { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChecklistsClient from "@/components/ChecklistsClient";
import { Box, CircularProgress, Container } from "@mui/material";

export const metadata: Metadata = {
  title: "All Document Checklists — PaperReady",
  description:
    "Comprehensive directory of verified document checklists for Indian government services: Passports, Driving Licences, Birth Certificates, GST, Company Registration, and more.",
};

export default function ChecklistsPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <Container sx={{ py: 20, textAlign: "center" }}>
            <CircularProgress color="secondary" />
          </Container>
        }
      >
        <ChecklistsClient />
      </Suspense>
      <Footer />
    </>
  );
}
