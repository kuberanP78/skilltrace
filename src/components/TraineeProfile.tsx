"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  Building,
  DollarSign,
  AlertTriangle,
  Award,
  Calendar,
  FileCheck,
  Send,
  User,
  ArrowLeft,
} from "lucide-react";

export const TraineeProfile: React.FC = () => {
  const { trainees, selectedTraineeId, setSelectedTraineeId, setActiveView, sendNewFollowup, followups } = useApp();

  const trainee = trainees.find((t) => t.id === selectedTraineeId) || trainees[0];
  const traineeFollowups = followups.filter((f) => f.traineeId === trainee.id);

  const timelineSteps = [
    { title: "Enrolled", date: trainee.enrolledDate, status: "completed" },
    { title: "Consent Granted", date: trainee.enrolledDate, status: "completed" },
    { title: "Token ID Assigned", date: trainee.enrolledDate, status: "completed" },
    { title: "Training Completed", date: trainee.certificationDate, status: "completed" },
    { title: "Certification", date: trainee.certificationDate, status: "completed" },
    { title: "30 Days (T+30)", date: "2025-10-25", status: trainee.retentionDays >= 30 ? "completed" : "active" },
    { title: "90 Days (T+90)", date: "2025-12-25", status: trainee.retentionDays >= 90 ? "completed" : "active" },
    { title: "180 Days (T+180)", date: "2026-03-25", status: trainee.retentionDays >= 180 ? "completed" : "pending" },
    { title: "365 Days (T+365)", date: "2026-09-25", status: trainee.retentionDays >= 365 ? "completed" : "pending" },
    { title: "Current Outcome", date: "Present", status: "completed" },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView("trainees")}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Trainee Management</span>
        </button>

        <span className="text-xs bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full border border-blue-200">
          Longitudinal Outcome File
        </span>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-gradient-to-r from-gov-navy via-slate-900 to-gov-navyLight text-white p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-inner">
              {trainee.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold">{trainee.name}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono border border-teal-500/30">
                  {trainee.id}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Course: <span className="text-white font-semibold">{trainee.course}</span> • District:{" "}
                <span className="text-white font-semibold">{trainee.district}</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Secure Anonymized Token ID
            </div>
            <div className="text-lg font-mono font-extrabold text-teal-400">
              {trainee.tokenId}
            </div>
          </div>
        </div>

        {/* Quick Details Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Training Provider</span>
            <span className="font-semibold text-white">{trainee.provider}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Certification Status</span>
            <span className="font-bold text-emerald-400">{trainee.certificationStatus}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Current Outcome</span>
            <span className="font-bold text-teal-300">{trainee.currentOutcome}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Verification Source</span>
            <span className="font-semibold text-slate-200">{trainee.verificationSource}</span>
          </div>
        </div>
      </div>

      {/* Visual Longitudinal Timeline (Vertical / Horizontal Flow) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-gov-blue" />
          <span>Longitudinal Outcome Milestone Timeline (T+30 to T+365 Days)</span>
        </h3>

        {/* Milestone Steps Bar */}
        <div className="overflow-x-auto py-4">
          <div className="flex items-center min-w-[800px] justify-between relative">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10 space-y-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step.status === "completed"
                      ? "bg-gov-teal text-white shadow-md"
                      : step.status === "active"
                      ? "bg-blue-600 text-white animate-pulse"
                      : "bg-slate-100 text-slate-400 border border-slate-300"
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="text-center">
                  <div className="text-[11px] font-bold text-slate-800">{step.title}</div>
                  <div className="text-[10px] text-slate-400">{step.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Outcome & Verification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Employment & Income Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gov-blue" />
            <span>Employment & Livelihood Particulars</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Current Outcome:</span>
              <span className="font-bold text-teal-700 px-2 py-0.5 bg-teal-50 rounded">
                {trainee.currentOutcome}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Employer Organization:</span>
              <span className="font-bold text-slate-900">{trainee.employer}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Job Designation:</span>
              <span className="font-semibold text-slate-800">{trainee.jobRole}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Monthly Salary Band:</span>
              <span className="font-bold text-emerald-700">{trainee.salaryBand}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Retention Duration:</span>
              <span className="font-bold text-slate-800">{trainee.retentionDays} Days</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-semibold">Verification Confidence:</span>
              <span className="font-black text-gov-teal">{trainee.confidenceScore}% Score</span>
            </div>
          </div>
        </div>

        {/* Right Card: Skills & AI Gap Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-500" />
            <span>Acquired Skills & Detected Gaps</span>
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                Certified Core Competencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {trainee.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                Identified Skill Gaps (Market Demand Mismatch):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {trainee.skillGaps.map((g, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold"
                  >
                    ⚠️ {g}
                  </span>
                ))}
              </div>
            </div>

            {trainee.unemploymentReason && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider block">
                  Unemployment Reason Logged
                </span>
                <p className="text-xs text-red-700 font-medium">{trainee.unemploymentReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Follow-Up History & Quick Action Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-gov-teal" />
            <span>Follow-up History & Multi-Channel Verification Logs</span>
          </h3>

          <button
            onClick={() => sendNewFollowup(trainee.id, "T+90", "WhatsApp")}
            className="px-3 py-1.5 bg-gov-teal hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate WhatsApp Follow-Up</span>
          </button>
        </div>

        <div className="space-y-2">
          {traineeFollowups.length > 0 ? (
            traineeFollowups.map((fol) => (
              <div
                key={fol.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{fol.milestone} Milestone</span> •{" "}
                  <span className="text-slate-600 font-semibold">{fol.channel}</span>
                  {fol.responseContent && (
                    <p className="text-[11px] text-slate-500 italic mt-0.5">
                      &quot;{fol.responseContent}&quot;
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                    {fol.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">{fol.sentDate}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-slate-500 italic py-2">
              Initial follow-up notification queued for T+30 milestone.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
