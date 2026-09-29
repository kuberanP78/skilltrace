"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Building, GraduationCap, CheckCircle2, Upload, FileCheck, ShieldCheck } from "lucide-react";

export const SelfEmpApprenticeship: React.FC = () => {
  const { trainees, selectedTraineeId, updateTraineeOutcome, t } = useApp();
  const [activeTab, setActiveTab] = useState<"self" | "apprentice">("self");

  const trainee = trainees.find((t) => t.id === selectedTraineeId) || trainees[0];

  // Form states
  const [businessType, setBusinessType] = useState("Solar Repair & Micro-Services");
  const [startDate, setStartDate] = useState("2025-11-01");
  const [incomeBand, setIncomeBand] = useState("₹18,000 - ₹25,000");
  const [proofType, setProofType] = useState("Udyam Registration Certificate");

  const [orgName, setOrgName] = useState("Maharashtra State Electricity Workshop");
  const [appRole, setAppRole] = useState("Trade Apprentice (Electrical)");
  const [appDuration, setAppDuration] = useState("12 Months");
  const [stipendBand, setStipendBand] = useState("₹9,000 / Month");

  const handleSaveSelfEmp = (e: React.FormEvent) => {
    e.preventDefault();
    updateTraineeOutcome(trainee.id, "Self-employed", `${trainee.name} Enterprises`, incomeBand, businessType);
    alert(`Self-employment outcome registered for ${trainee.name}!`);
  };

  const handleSaveApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    updateTraineeOutcome(trainee.id, "Apprenticeship", orgName, stipendBand, appRole);
    alert(`Apprenticeship contract outcome registered for ${trainee.name}!`);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="w-5 h-5 text-gov-teal" />
            <span>Self-Employment & Apprenticeship Capture</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Specialized outcome validation forms for micro-entrepreneurs and certified trade apprentices.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("self")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "self" ? "bg-white text-gov-navy shadow-sm" : "text-slate-600"
            }`}
          >
            Self-Employment Form
          </button>
          <button
            onClick={() => setActiveTab("apprentice")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "apprentice" ? "bg-white text-gov-navy shadow-sm" : "text-slate-600"
            }`}
          >
            Apprenticeship Contract Form
          </button>
        </div>
      </div>

      {/* Forms */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {activeTab === "self" ? "Self-Employment Verification" : "Apprenticeship Contract Verification"}
            </h3>
            <p className="text-xs text-slate-500">Target Trainee: {trainee.name} ({trainee.id})</p>
          </div>
          <span className="text-xs px-2.5 py-1 bg-teal-100 text-teal-800 font-bold rounded-full">
            Verification Pending
          </span>
        </div>

        {activeTab === "self" ? (
          <form onSubmit={handleSaveSelfEmp} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Business / Micro-Enterprise Type</label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Establishment Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Monthly Income Band</label>
                <select
                  value={incomeBand}
                  onChange={(e) => setIncomeBand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                >
                  <option value="Below ₹12,000">Below ₹12,000</option>
                  <option value="₹12,000 - ₹18,000">₹12,000 - ₹18,000</option>
                  <option value="₹18,000 - ₹25,000">₹18,000 - ₹25,000</option>
                  <option value="₹25,000+">₹25,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Business Proof Document</label>
              <select
                value={proofType}
                onChange={(e) => setProofType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
              >
                <option value="Udyam Registration Certificate">Udyam Registration Certificate</option>
                <option value="GST Registration Document">GST Registration Document</option>
                <option value="Bank Statement / UPI Business QR">Bank Statement / UPI Business QR</option>
                <option value="Gram Panchayat License">Gram Panchayat License</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gov-teal hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Register Self-Employment</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSaveApprentice} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Host Organization / Workshop</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Trade Apprentice Designation</label>
                <input
                  type="text"
                  value={appRole}
                  onChange={(e) => setAppRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Contract Duration</label>
                <input
                  type="text"
                  value={appDuration}
                  onChange={(e) => setAppDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Monthly Stipend Band</label>
              <input
                type="text"
                value={stipendBand}
                onChange={(e) => setStipendBand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gov-blue hover:bg-blue-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Verify & Register Apprenticeship</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
