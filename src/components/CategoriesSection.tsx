"use client";

import React, { useState, useMemo } from "react";
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
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LanIcon from "@mui/icons-material/Lan";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import BalanceIcon from "@mui/icons-material/Balance";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import ChecklistModal, { ServiceData } from "./ChecklistModal";

export interface CategoryCardData extends ServiceData {
  id: string;
  icon: React.ReactNode;
  group: "Citizen Services (G2C)" | "Business Services (G2B)" | "Internal Operations (G2G)" | "Health & Human Services" | "Public Safety & Justice";
  subcategory: string;
  desc: string;
  count: number;
  tags: string[];
  color: string;
  bgColor: string;
}

const CATEGORIES_DATA: CategoryCardData[] = [
  // ──────────────────────────────────────────
  // 1. Citizen Services (Government-to-Citizen / G2C)
  // ──────────────────────────────────────────
  {
    id: "passport",
    group: "Citizen Services (G2C)",
    subcategory: "Identity Management",
    icon: <FlightTakeoffIcon />,
    color: "#0284C7",
    bgColor: "rgba(2, 132, 199, 0.1)",
    title: "Passports & Travel",
    category: "Passports & Travel",
    appType: "Fresh, Adult Renewal, Tatkal, Minor",
    desc: "Official counter checklists for Indian passport applications at PSK/POPSK, renewal, expedited Tatkal processing, and minor passports.",
    count: 8,
    tags: ["Fresh Passport", "Passport Renewal", "Tatkal Service", "Minor Passport"],
    photoSpecs: {
      size: "35mm x 45mm",
      background: "Plain white",
      coverage: "70-80% face coverage",
      notes: "No spectacles/glare, neutral expression, printed on matte or glossy photo paper.",
    },
    items: [
      { id: "p1", name: "Proof of Date of Birth (DoB)", type: "Original", details: "Birth Certificate issued by Municipal Corporation, or School Leaving / Matriculation Certificate.", mandatory: true },
      { id: "p2", name: "Proof of Present Address", type: "Original", details: "Aadhaar Card, Active Bank Passbook with photograph, or registered Rental Agreement (>1 year old).", mandatory: true },
      { id: "p3", name: "Self-Attested Photocopies", type: "Photocopy", details: "One clear photocopy of each original document signed with 'Self Attested' and current date.", mandatory: true },
      { id: "p4", name: "Online Application & Appointment Receipt", type: "Digital", details: "Printed ARN receipt with barcode from Passport Seva portal.", mandatory: true },
      { id: "p5", name: "Non-ECR Category Certificate", type: "Original", details: "Class 10th or higher education degree certificate for Non-ECR status stamp.", mandatory: false },
      { id: "p6", name: "Previous Passport & Cancellation Slip", type: "Original", details: "Original old passport booklet and self-attested copies of first 2 and last 2 pages (for renewals).", mandatory: false },
      { id: "p7", name: "Annexure F / Verification Certificate", type: "Original", details: "Required for Tatkal out-of-turn passport processing under urgency.", mandatory: false },
    ],
  },
  {
    id: "transport",
    group: "Citizen Services (G2C)",
    subcategory: "Identity Management",
    icon: <DirectionsCarIcon />,
    color: "#EA580C",
    bgColor: "rgba(234, 88, 12, 0.1)",
    title: "Driving & Transport",
    category: "Driving & Transport",
    appType: "Learner's, Permanent DL, RC Transfer",
    desc: "Parivahan Sarathi checklists for Learner's Licence (LL), permanent driving test, DL renewal, vehicle RC ownership transfer, and IDP.",
    count: 7,
    tags: ["Learner's Licence (LL)", "Permanent DL", "DL Renewal", "RC Transfer"],
    photoSpecs: {
      size: "Standard passport size",
      background: "Light blue or white",
      coverage: "Front facing direct view",
      notes: "Clear lighting without shadow or flash reflection.",
    },
    items: [
      { id: "dl1", name: "Form 1 & Form 1A (Medical Fitness)", type: "Original", details: "Self-declaration of fitness or doctor certified Form 1A for commercial / 40+ applicants.", mandatory: true },
      { id: "dl2", name: "Age & Identity Proof", type: "Original", details: "Aadhaar card, 10th standard certificate, or PAN card.", mandatory: true },
      { id: "dl3", name: "Current Address Proof", type: "Original", details: "Voter ID, electricity bill, or rent deed within RTO jurisdiction.", mandatory: true },
      { id: "dl4", name: "Valid Learner's Licence (LL)", type: "Original", details: "LL held for at least 30 days before booking permanent test slot.", mandatory: true },
      { id: "dl5", name: "Vehicle RC & Valid Insurance (Test Vehicle)", type: "Original", details: "Original RC, pollution certificate (PUC), and comprehensive motor insurance of test vehicle.", mandatory: true },
    ],
  },
  {
    id: "vital",
    group: "Citizen Services (G2C)",
    subcategory: "Identity Management",
    icon: <DescriptionIcon />,
    color: "#059669",
    bgColor: "rgba(5, 150, 105, 0.1)",
    title: "Vital Certificates",
    category: "Vital Certificates",
    appType: "Birth, Marriage, Domicile, Caste",
    desc: "Municipal birth certificates, legally registered marriage certificates, domicile/residence proof, and official caste/income certificates.",
    count: 6,
    tags: ["Birth Certificate", "Marriage Registration", "Domicile Certificate", "Caste Certificate"],
    items: [
      { id: "vc1", name: "Hospital Discharge Summary / Birth Report", type: "Original", details: "Form 2 / institutional birth record with official hospital seal and superintendent signature.", mandatory: true },
      { id: "vc2", name: "Parents' Identification & Marriage Proof", type: "Original", details: "Aadhaar cards of both parents along with Marriage Certificate if available.", mandatory: true },
      { id: "vc3", name: "Notarized Affidavit (if delayed registration)", type: "Original", details: "Affidavit in prescribed format with court stamp if registration is attempted after 21 days.", mandatory: false },
      { id: "vc4", name: "Proof of Continuous Residence", type: "Original", details: "Electricity bills, ration card, or school records verifying continuous local stay for domicile certificate.", mandatory: true },
    ],
  },
  {
    id: "identity",
    group: "Citizen Services (G2C)",
    subcategory: "Identity Management",
    icon: <BadgeIcon />,
    color: "#4F46E5",
    bgColor: "rgba(79, 70, 229, 0.1)",
    title: "Identity & Citizen Records",
    category: "Identity & Citizen Records",
    appType: "Aadhaar, Voter ID, PAN Allotment",
    desc: "Aadhaar demographic and biometric updates, Voter ID (EPIC) Form 6/8, instant PAN card allocation, and official name corrections.",
    count: 7,
    tags: ["Aadhaar Update", "Voter ID (EPIC)", "PAN Card Allotment", "Name Correction"],
    items: [
      { id: "id1", name: "Proof of Identity (PoI)", type: "Original", details: "Government issued photo ID, passport, driving licence, or arms licence.", mandatory: true },
      { id: "id2", name: "Proof of Address (PoA)", type: "Original", details: "Utility bill (<3 months old), bank passbook with photo, or registered rent agreement.", mandatory: true },
      { id: "id3", name: "Gazette Notification (if Legal Name Change)", type: "Original", details: "Official central or state government gazette publication showing previous and changed name.", mandatory: false },
      { id: "id4", name: "Aadhaar Enrolment / Update Slip", type: "Digital", details: "Printed acknowledgement receipt containing 28-digit EID code for tracking status.", mandatory: true },
    ],
  },
  {
    id: "personal-tax",
    group: "Citizen Services (G2C)",
    subcategory: "Taxation & Revenue",
    icon: <ReceiptLongIcon />,
    color: "#0D9488",
    bgColor: "rgba(13, 148, 136, 0.1)",
    title: "Personal Taxes & Municipal Utilities",
    category: "Taxation & Revenue",
    appType: "ITR-1/2, Property Tax, Utility Sanction",
    desc: "Filing personal income tax returns (ITR-1 Sahaj / ITR-2), paying municipal property taxes, and applying for new water/electricity connections.",
    count: 6,
    tags: ["Personal ITR", "Property Tax Assessment", "Water Connection", "Electricity Meter"],
    items: [
      { id: "pt1", name: "Form 16 / 16A (TDS Certificate)", type: "Original", details: "TDS certificates issued by employer, bank, or deductor verifying tax deducted at source.", mandatory: true },
      { id: "pt2", name: "Annual Information Statement (AIS / TIS)", type: "Digital", details: "Downloaded summary from Income Tax e-filing portal confirming all reported financial transactions.", mandatory: true },
      { id: "pt3", name: "Property Title Deed & Khata Extract", type: "Original", details: "Registered sale deed and latest Khata/Patta extract for municipal property tax assessment.", mandatory: true },
      { id: "pt4", name: "Bank Account Details (Aadhaar Seeded)", type: "Digital", details: "Pre-validated active bank account for automated income tax refund dispatch.", mandatory: true },
    ],
  },
  {
    id: "civic-engagement",
    group: "Citizen Services (G2C)",
    subcategory: "Voting & Civic Engagement",
    icon: <HowToVoteIcon />,
    color: "#7C3AED",
    bgColor: "rgba(124, 58, 237, 0.1)",
    title: "Voting & Civic Engagement",
    category: "Voting & Civic Engagement",
    appType: "Form 6, Form 8, Polling Locator, CPGRAMS",
    desc: "Voter registration in electoral roll (Form 6), constituency relocation (Form 8), polling booth locator, and central public grievance submissions.",
    count: 5,
    tags: ["Form 6 Voter Enrolment", "EPIC Replacement", "Polling Station", "CPGRAMS Grievance"],
    photoSpecs: {
      size: "Passport size standard",
      background: "White background",
      coverage: "Front facing head and shoulders",
      notes: "Recent passport photo taken within last 6 months.",
    },
    items: [
      { id: "ce1", name: "Proof of Age (18+ Qualification)", type: "Original", details: "Birth Certificate, 10th marksheet, PAN card, or Indian passport proving age on qualifying date.", mandatory: true },
      { id: "ce2", name: "Proof of Ordinary Residence", type: "Original", details: "Bank passbook, ration card, rent agreement, or utility bill in the applicant's or parent's name.", mandatory: true },
      { id: "ce3", name: "Declaration of Non-Enrolment Elsewhere", type: "Original", details: "Signed statutory declaration that the applicant has not been registered in any other constituency.", mandatory: true },
      { id: "ce4", name: "Existing EPIC Number (if shifting constituency)", type: "Digital", details: "Voter ID card number from previous constituency for automated deletion and re-enrolment.", mandatory: false },
    ],
  },

  // ──────────────────────────────────────────
  // 2. Business Services (Government-to-Business / G2B)
  // ──────────────────────────────────────────
  {
    id: "corporate-reg",
    group: "Business Services (G2B)",
    subcategory: "Corporate Registration",
    icon: <BusinessCenterIcon />,
    color: "#0F172A",
    bgColor: "rgba(15, 23, 42, 0.08)",
    title: "Corporate Registration & Tax IDs",
    category: "Corporate Registration",
    appType: "SPICe+ MCA21, LLP, PAN/TAN, ROC",
    desc: "Incorporation of Private Limited, OPC, and LLP entities via MCA SPICe+, obtaining company PAN/TAN, MSME Udyam registration, and annual ROC filings.",
    count: 10,
    tags: ["SPICe+ Incorporation", "LLP Agreement", "Company PAN/TAN", "MSME Udyam"],
    items: [
      { id: "cr1", name: "Class 3 Digital Signature Certificate (DSC)", type: "Digital", details: "Class 3 DSC token required for all proposed directors to sign electronic e-forms on MCA21.", mandatory: true },
      { id: "cr2", name: "PAN & Aadhaar of All Directors / Partners", type: "Original", details: "Self-attested identity and address proof of every proposed director and subscriber.", mandatory: true },
      { id: "cr3", name: "Proof of Registered Office Address", type: "Original", details: "Recent electricity/gas bill (<2 months old) along with notarized NOC from the property owner.", mandatory: true },
      { id: "cr4", name: "Memorandum & Articles of Association (MoA / AoA)", type: "Digital", details: "Drafted electronic MoA (INC-33) and electronic AoA (INC-34) aligning with main business objects.", mandatory: true },
      { id: "cr5", name: "Director Identification Number (DIN) Application", type: "Digital", details: "Automated DIN allotment for up to 3 directors through unified SPICe+ Part B form.", mandatory: false },
      { id: "cr6", name: "MSME Udyam Aadhaar Registration", type: "Digital", details: "Self-declaration portal registration for government priority sector benefits and subsidies.", mandatory: false },
    ],
  },
  {
    id: "permits-licensing",
    group: "Business Services (G2B)",
    subcategory: "Permits & Licensing",
    icon: <HomeWorkIcon />,
    color: "#D97706",
    bgColor: "rgba(217, 119, 6, 0.1)",
    title: "Permits & Commercial Licensing",
    category: "Permits & Licensing",
    appType: "FSSAI, Shops Act, Building Permit, Trade",
    desc: "Commercial building plan approval, municipal trade licenses, FSSAI food business licensing, Shops & Establishment Act registration, and health inspections.",
    count: 9,
    tags: ["FSSAI Food Licence", "Shops & Establishment", "Commercial Building Permit", "Trade Licence"],
    items: [
      { id: "pl1", name: "Title Deed / Sanctioned Commercial Lease", type: "Original", details: "Registered commercial lease agreement or ownership deed specifying approved zoning.", mandatory: true },
      { id: "pl2", name: "Architect Certified Building Layout Plan", type: "Original", details: "Blueprints approved by licensed municipal architect showing fire exits, setbacks, and square footage.", mandatory: true },
      { id: "pl3", name: "Fire Department No Objection Certificate (NOC)", type: "Original", details: "Clearance from regional fire services verifying operational extinguishers and evacuation drills.", mandatory: true },
      { id: "pl4", name: "Food Safety Management System (FSMS) Plan", type: "Original", details: "Mandatory for FSSAI State / Central licenses including water testing lab report and food handler records.", mandatory: false },
      { id: "pl5", name: "Pollution Control Board Consent to Establish / Operate", type: "Original", details: "SPCB/CPCB clearance certificate based on industrial green/orange/red categorization.", mandatory: false },
    ],
  },
  {
    id: "commercial-tax",
    group: "Business Services (G2B)",
    subcategory: "Permits & Licensing",
    icon: <ReceiptLongIcon />,
    color: "#E11D48",
    bgColor: "rgba(225, 29, 72, 0.1)",
    title: "Commercial Taxation & GST Returns",
    category: "Commercial Taxation",
    appType: "GST Registration, GSTR-1/3B, Commercial TDS",
    desc: "Goods & Services Tax (GST) registration (REG-01), monthly GSTR-1 and GSTR-3B filings, commercial TDS deductions, and e-Way bill credentials.",
    count: 8,
    tags: ["GST REG-01", "GSTR-1 & 3B", "e-Way Bill", "TDS Compliance"],
    items: [
      { id: "ct1", name: "PAN Card of Business Entity", type: "Original", details: "Entity PAN card for Company/Partnership/LLP or individual PAN for Sole Proprietorship.", mandatory: true },
      { id: "ct2", name: "Bank Statement / Cancelled Cheque", type: "Original", details: "First page of active current account passbook or cancelled cheque with MICR/IFSC details.", mandatory: true },
      { id: "ct3", name: "Board Resolution / Letter of Authorization", type: "Original", details: "Formal resolution authorizing designated partner or director to sign and file GST documents.", mandatory: true },
      { id: "ct4", name: "Proof of Principal Place of Business", type: "Original", details: "Electricity bill, legal lease deed, and property tax receipt of the operating premises.", mandatory: true },
    ],
  },

  // ──────────────────────────────────────────
  // 3. Internal Operations (Government-to-Government / G2G)
  // ──────────────────────────────────────────
  {
    id: "procurement-gem",
    group: "Internal Operations (G2G)",
    subcategory: "Public Procurement",
    icon: <ShoppingCartCheckoutIcon />,
    color: "#2563EB",
    bgColor: "rgba(37, 99, 235, 0.1)",
    title: "Public Procurement & GeM Portal",
    category: "Public Procurement",
    appType: "GeM Primary Seller, CPPP Tenders, EMD",
    desc: "Government e-Marketplace (GeM) seller onboarding, Central Public Procurement Portal (CPPP) e-tender submissions, and vendor bid evaluations.",
    count: 8,
    tags: ["GeM Portal", "CPPP E-Tender", "EMD Bank Guarantee", "Vendor Empanelment"],
    items: [
      { id: "pr1", name: "GeM Seller Primary Registration Credentials", type: "Digital", details: "Aadhaar of authorized user linked to active mobile and organizational PAN on GeM portal.", mandatory: true },
      { id: "pr2", name: "Audited Balance Sheets (Last 3 Financial Years)", type: "Original", details: "CA certified profit & loss accounts and balance sheets demonstrating minimum financial turnover.", mandatory: true },
      { id: "pr3", name: "Class 3 Combo DSC (Signing & Encryption)", type: "Digital", details: "Dual-purpose digital signature certificate for secure bid encryption and submission on e-procurement portals.", mandatory: true },
      { id: "pr4", name: "Earnest Money Deposit (EMD) / MSME Exemption", type: "Original", details: "Bank Guarantee / Demand Draft in favour of procuring agency, or valid MSME Udyam exemption certificate.", mandatory: true },
      { id: "pr5", name: "Non-Blacklisting & Integrity Pact Affidavit", type: "Original", details: "Sworn affidavit on non-judicial stamp paper stating the firm is not debarred or blacklisted by any government authority.", mandatory: true },
    ],
  },
  {
    id: "inter-agency",
    group: "Internal Operations (G2G)",
    subcategory: "Inter-Agency Data Sharing",
    icon: <LanIcon />,
    color: "#16A34A",
    bgColor: "rgba(22, 163, 74, 0.1)",
    title: "Inter-Agency Data Sharing & Clearances",
    category: "Inter-Agency Data Sharing",
    appType: "CCTNS Verification, Cadre Transfer, Vigilance NOC",
    desc: "Inter-departmental records exchange, Crime & Criminal Tracking Network (CCTNS) verification, cadre transfers, and administrative vigilance clearances.",
    count: 6,
    tags: ["CCTNS Verification", "Cadre Transfer", "Vigilance Clearance", "Inter-Departmental NOC"],
    items: [
      { id: "ia1", name: "Official Departmental Requisition Letter", type: "Original", details: "Formal dispatch letter on government department letterhead bearing official seal and file dispatch number.", mandatory: true },
      { id: "ia2", name: "Attestation Roll & Character Verification Form", type: "Original", details: "Comprehensive background details covering educational, residential, and employment history of candidate.", mandatory: true },
      { id: "ia3", name: "Integrity & Vigilance Clearance Certificate (CVO)", type: "Original", details: "Clearance issued by the Chief Vigilance Officer confirming no ongoing departmental enquiries or charge sheets.", mandatory: true },
      { id: "ia4", name: "Cadre Controlling Authority No-Objection (NOC)", type: "Original", details: "Formal approval permitting deputation, inter-cadre movement, or transfer of service records.", mandatory: false },
    ],
  },

  // ──────────────────────────────────────────
  // 4. Health & Human Services
  // ──────────────────────────────────────────
  {
    id: "welfare-benefits",
    group: "Health & Human Services",
    subcategory: "Welfare & Benefits",
    icon: <VolunteerActivismIcon />,
    color: "#B45309",
    bgColor: "rgba(180, 83, 9, 0.1)",
    title: "Welfare & Direct Benefit Support",
    category: "Welfare & Benefits",
    appType: "Ration Card, PM Kisan, Pensions, DBT",
    desc: "National Food Security Act (NFSA) ration cards, PM Kisan Samman Nidhi farmer benefits, old-age/widow pensions, and Direct Benefit Transfer (DBT).",
    count: 8,
    tags: ["NFSA Ration Card", "PM-Kisan", "Old-Age Pension", "Direct Benefit Transfer"],
    items: [
      { id: "wb1", name: "Aadhaar Card of Applicant & All Family Members", type: "Original", details: "Mandatory biometric identity cards for family seeding and deduplication across national registries.", mandatory: true },
      { id: "wb2", name: "State BPL / Antyodaya (AAY) Ration Card", type: "Original", details: "State-issued ration card or local revenue official certificate establishing economic eligibility.", mandatory: true },
      { id: "wb3", name: "Income Certificate issued by Tehsildar / SDM", type: "Original", details: "Annual household income verification certificate with official revenue department stamp.", mandatory: true },
      { id: "wb4", name: "Bank Passbook (Aadhaar-Seeded for DBT)", type: "Original", details: "Nationalized or post office savings bank account linked to NPCI Aadhaar payment bridge.", mandatory: true },
      { id: "wb5", name: "Land Ownership Records (Khasra / Khatauni)", type: "Original", details: "Updated land title records verified by Patwari for PM Kisan Samman Nidhi direct subsidy instalments.", mandatory: false },
    ],
  },
  {
    id: "health-tracking",
    group: "Health & Human Services",
    subcategory: "Public Health Tracking",
    icon: <LocalHospitalIcon />,
    color: "#DC2626",
    bgColor: "rgba(220, 38, 38, 0.1)",
    title: "Public Health & Disability Services",
    category: "Public Health Tracking",
    appType: "Ayushman Bharat, UDID Card, ESIC Benefits",
    desc: "Ayushman Bharat (PM-JAY) Golden health card enrolment, Unique Disability ID (UDID) issuance, ESIC medical claims, and clinical registrations.",
    count: 7,
    tags: ["Ayushman Bharat PM-JAY", "UDID Card", "ESIC Health Benefits", "Medical Board Cert."],
    photoSpecs: {
      size: "Passport size standard",
      background: "Plain white or light grey",
      coverage: "Front facing full face",
      notes: "For UDID: clear photo showing the disability condition if physically visible.",
    },
    items: [
      { id: "ht1", name: "PM-JAY Family Verification / SECC Letter", type: "Original", details: "Aadhaar card or Ration Card matching socioeconomic database for free Rs. 5 Lakh family health cover.", mandatory: true },
      { id: "ht2", name: "District Medical Board Disability Assessment", type: "Original", details: "Official evaluation report signed by authorized CMO/Medical Superintendent stating percentage disability.", mandatory: true },
      { id: "ht3", name: "ESIC Insured Person (IP) Pehchan Card", type: "Original", details: "Employee State Insurance registration card for access to empanelled diagnostic centers and hospitals.", mandatory: false },
      { id: "ht4", name: "Clinical Case Summary & Diagnostic Records", type: "Original", details: "Prescriptions, discharge summary, and diagnostic test reports for chronic ailment coverage.", mandatory: false },
    ],
  },

  // ──────────────────────────────────────────
  // 5. Public Safety & Justice
  // ──────────────────────────────────────────
  {
    id: "emergency-police",
    group: "Public Safety & Justice",
    subcategory: "Emergency Dispatch",
    icon: <LocalPoliceIcon />,
    color: "#1E40AF",
    bgColor: "rgba(30, 64, 175, 0.1)",
    title: "Police Clearance & Public Safety",
    category: "Emergency Dispatch & Police",
    appType: "Police Verification, Lost FIR, Arms Licence",
    desc: "Police Clearance Certificate (PCC) for visas or employment, online non-cognizable lost property reports, arms licence issuance and renewals.",
    count: 7,
    tags: ["Police Clearance (PCC)", "Lost Article NCR/FIR", "Arms Licence", "Tenant Verification"],
    photoSpecs: {
      size: "Passport size standard",
      background: "Plain white or light background",
      coverage: "Frontal facial view",
      notes: "Photographs must not be older than 3 months.",
    },
    items: [
      { id: "ep1", name: "Application Addressed to SP / Commissioner", type: "Original", details: "Formal prescribed request form submitted to jurisdictional police authority.", mandatory: true },
      { id: "ep2", name: "Aadhaar & Secondary Government Photo ID", type: "Original", details: "Original and self-attested copies of Aadhaar plus Voter ID, Passport, or PAN.", mandatory: true },
      { id: "ep3", name: "Proof of Current Local Jurisdiction Residence", type: "Original", details: "Electricity bill or registered rent deed proving active residence in the local police station area.", mandatory: true },
      { id: "ep4", name: "Non-Judicial Stamp Fee / Treasury Challan", type: "Original", details: "Proof of statutory fee deposit via state treasury e-challan or judicial stamp paper.", mandatory: true },
      { id: "ep5", name: "Medical Fitness Certificate from Civil Surgeon", type: "Original", details: "Mandatory for arms licence applicants covering physical dexterity and mental sanity assessment.", mandatory: false },
    ],
  },
  {
    id: "court-justice",
    group: "Public Safety & Justice",
    subcategory: "Court Case Management",
    icon: <BalanceIcon />,
    color: "#9333EA",
    bgColor: "rgba(147, 51, 234, 0.1)",
    title: "Court Case Management & Legal Services",
    category: "Court Case Management",
    appType: "e-Courts Filing, Legal Heir, RTI, Affidavits",
    desc: "e-Courts petition filing documentation, legal heir and succession certificates, notarized court affidavits, and Right to Information (RTI) petitions.",
    count: 7,
    tags: ["e-Courts Filing", "Legal Heir Certificate", "Succession Certificate", "RTI Petition"],
    items: [
      { id: "cj1", name: "Affidavit Sworn Before Oath Commissioner / Notary", type: "Original", details: "Executed on appropriate denomination non-judicial stamp paper with notary seal and signature.", mandatory: true },
      { id: "cj2", name: "Certified Death Certificate (for Succession)", type: "Original", details: "Municipal death certificate of the deceased person with barcode and registration number.", mandatory: true },
      { id: "cj3", name: "Genealogical Family Tree (Vamshavruksha)", type: "Original", details: "Family genealogy statement attested by jurisdictional Revenue Inspector / Village Administrative Officer.", mandatory: true },
      { id: "cj4", name: "Proof of Surviving Heirs Relationship", type: "Original", details: "Aadhaar cards, birth certificates, or school leaving certificates of all legal heirs.", mandatory: true },
      { id: "cj5", name: "Prescribed Court Fee Stamps / Indian Postal Order", type: "Original", details: "Appropriate court fee stamps fixed on the petition or IPO of Rs. 10 for RTI applications.", mandatory: true },
    ],
  },
];

const GROUPS = [
  { label: "All Categories", icon: null },
  { label: "Citizen Services (G2C)", icon: <BadgeIcon sx={{ fontSize: 16 }} /> },
  { label: "Business Services (G2B)", icon: <BusinessCenterIcon sx={{ fontSize: 16 }} /> },
  { label: "Internal Operations (G2G)", icon: <LanIcon sx={{ fontSize: 16 }} /> },
  { label: "Health & Human Services", icon: <LocalHospitalIcon sx={{ fontSize: 16 }} /> },
  { label: "Public Safety & Justice", icon: <BalanceIcon sx={{ fontSize: 16 }} /> },
];

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

  return (
    <>
      <Box
        component="section"
        id="categories"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
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
                  Five core categories,{" "}
                  <Box component="span" sx={{ color: "secondary.main" }}>
                    one counter-ready source.
                  </Box>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Select your service to view required original documents, photocopies, and photo specifications.
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
                  minWidth: { xs: "100%", md: 340 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "background.default",
                  },
                }}
              />
            </Stack>
          </Box>

          {/* Category Filter Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
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
                  minHeight: 52,
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

          {/* Active Filter Chips summary */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 3.5, flexWrap: "wrap", gap: 1, alignItems: "center" }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Showing {filteredCategories.length} of {CATEGORIES_DATA.length} categories
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

          {/* Grid of Category Cards */}
          {filteredCategories.length === 0 ? (
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
            <Grid container spacing={2.5}>
              {filteredCategories.map((cat) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      borderRadius: 2.5,
                      bgcolor: "background.paper",
                      transition: "all 0.2s ease-in-out",
                      borderColor: "divider",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: cat.color,
                        boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.08)",
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleOpenChecklist(cat)}
                      sx={{
                        p: 2.5,
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
                            mb: 1.5,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: "10px",
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
                              bgcolor: "rgba(15, 23, 42, 0.04)",
                              fontWeight: 600,
                              fontSize: "0.72rem",
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
                            mb: 0.5,
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
                            fontSize: "1.05rem",
                            lineHeight: 1.35,
                            mb: 1.5,
                          }}
                        >
                          {cat.title}
                        </Typography>

                        {/* Concise Tags */}
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
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: cat.color,
                          fontWeight: 600,
                          fontSize: "0.84rem",
                          pt: 0.5,
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
