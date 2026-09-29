"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import {
  ShieldCheck,
  Lock,
  Eye,
  AlertTriangle,
  History,
  CheckCircle2,
  XCircle,
  FileText,
  UserCheck,
} from "lucide-react";

export const ConsentManager: React.FC = () => {
  const { trainees, selectedTraineeId, consents, toggleConsent, t } = useApp();

  const currentTrainee = trainees.find((tr) => tr.id === selectedTraineeId) || trainees[0];
  const consentRecord = consents[currentTrainee.id] || {
    traineeId: currentTrainee.id,
    personalInfo: true,
    employmentFollowup: true,
    employerVerification: true,
    communication: true,
    analytics: true,
    dataSharing: true,
    consentDate: "2025-06-10",
    status: "Active",
    history: [
      { date: "2025-06-10", action: "Consent Granted at Enrollment", actor: "Trainee Kiosk" },
    ],
  };

  const consentItems = [
    {
      key: "personalInfo" as const,
      label: "Personal Information Storage",
      desc: "Allow secure, encrypted hashing of name, phone, and Aadhaar-derived Token ID.",
    },
    {
      key: "employmentFollowup" as const,
      label: "Longitudinal Employment Follow-up",
      desc: "Consent to automated T+30, T+90, T+180, and T+365 milestone check-ins.",
    },
    {
      key: "employerVerification" as const,
      label: "Employer Data Verification",
      desc: "Permit employer portal to confirm job role, joining date, and salary band.",
    },
    {
      key: "communication" as const,
      label: "Multi-Channel Messaging (WhatsApp/SMS/IVR)",
      desc: "Receive periodic survey forms and career assistance alerts on mobile.",
    },
    {
      key: "analytics" as const,
      label: "Anonymized Government Analytics",
      desc: "Include non-PII metrics in state-level district skill gap reports.",
    },
    {
      key: "dataSharing" as const,
      label: "Inter-Departmental Livelihood Matching",
      desc: "Share verified employment status with MSSDS and state apprenticeship portals.",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gov-teal" />
            <span>{t.consent}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Privacy-first consent governance and granular permissions management under DPDP Act compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Trainee Context:</span>
          <span className="text-xs font-bold bg-slate-100 text-slate-900 px-3 py-1 rounded-lg border border-slate-200">
            {currentTrainee.name} ({currentTrainee.tokenId})
          </span>
        </div>
      </div>

      {/* Consent Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-5 rounded-2xl shadow-md space-y-2">
          <div className="text-xs text-slate-300 font-bold uppercase tracking-wider">
            Current Consent State
          </div>
          <div className="text-2xl font-black text-teal-400 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            <span>{consentRecord.status}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Granted on: <span className="text-white font-semibold">{consentRecord.consentDate}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Privacy Protection Framework
          </div>
          <div className="text-sm font-bold text-slate-900">Zero-Knowledge Token ID</div>
          <p className="text-xs text-slate-600">
            Raw Aadhaar and personal details are never exposed to employers or public analytics dashboards.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Withdrawal Rights
          </div>
          <div className="text-sm font-bold text-red-600">Right to Revoke</div>
          <p className="text-xs text-slate-600">
            Trainees can withdraw consent for follow-up communications or data sharing at any point.
          </p>
        </div>
      </div>

      {/* Granular Consent Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b pb-3">
          <Lock className="w-4 h-4 text-gov-blue" />
          <span>Granular Consent Controls & Permissions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {consentItems.map((item) => {
            const isGranted = Boolean(consentRecord[item.key]);
            return (
              <div
                key={item.key}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  isGranted
                    ? "bg-slate-50 border-slate-200 hover:border-gov-teal"
                    : "bg-red-50/40 border-red-200"
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900">{item.label}</div>
                  <div className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</div>
                </div>

                <button
                  onClick={() => toggleConsent(currentTrainee.id, item.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold shrink-0 transition-all ${
                    isGranted
                      ? "bg-gov-teal hover:bg-teal-700 text-white shadow-sm"
                      : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                  }`}
                >
                  {isGranted ? "Granted" : "Withdrawn"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit History Log */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
          <History className="w-4 h-4 text-slate-600" />
          <span>Consent Audit & Change History Log</span>
        </h3>

        <div className="space-y-2">
          {consentRecord.history.map((h, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">{h.action}</div>
                <div className="text-[11px] text-slate-500">Actor: {h.actor}</div>
              </div>
              <div className="font-mono text-slate-400 text-[11px]">{h.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
