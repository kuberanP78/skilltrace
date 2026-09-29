"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { CheckSquare, ShieldCheck, RefreshCw, Layers, Award, Sparkles } from "lucide-react";
import { OutcomeType } from "../types";

export const OutcomeEngine: React.FC = () => {
  const { trainees, selectedTraineeId, updateTraineeOutcome, t } = useApp();

  const trainee = trainees.find((tr) => tr.id === selectedTraineeId) || trainees[0];

  const [targetOutcome, setTargetOutcome] = useState<OutcomeType>(trainee.currentOutcome);
  const [employerInput, setEmployerInput] = useState(trainee.employer);
  const [salaryInput, setSalaryInput] = useState(trainee.salaryBand);
  const [jobRoleInput, setJobRoleInput] = useState(trainee.jobRole);

  const handleUpdate = () => {
    updateTraineeOutcome(trainee.id, targetOutcome, employerInput, salaryInput, jobRoleInput);
  };

  const outcomeOptions: OutcomeType[] = [
    "Employed",
    "Retained",
    "Wage Growth",
    "Self-employed",
    "Apprenticeship",
    "Further Study",
    "Unemployed",
    "Seeking Employment",
    "Untraceable",
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-gov-teal" />
            <span>Outcome Classification Engine</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standardized 9-tier outcome classifier with confidence scoring and source verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 bg-teal-100 text-teal-800 rounded-full">
            Active Trainee: {trainee.name} ({trainee.id})
          </span>
        </div>
      </div>

      {/* Main Classifier Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Verified Card */}
        <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4">
          <span className="text-xs text-teal-400 font-bold uppercase tracking-wider block">
            Current Outcome State
          </span>

          <div className="text-2xl font-black text-white flex items-center justify-between">
            <span>{trainee.currentOutcome}</span>
            <span className="text-xs px-2.5 py-1 bg-teal-500/20 text-teal-300 font-mono rounded border border-teal-500/30">
              Confidence {trainee.confidenceScore}%
            </span>
          </div>

          <div className="text-xs space-y-2 pt-2 border-t border-slate-800 text-slate-300">
            <div className="flex justify-between">
              <span>Source:</span>
              <span className="font-semibold text-white">{trainee.verificationSource}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Verified Date:</span>
              <span className="font-semibold text-white">{trainee.lastFollowup}</span>
            </div>
            <div className="flex justify-between">
              <span>Employer:</span>
              <span className="font-semibold text-white">{trainee.employer}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary Band:</span>
              <span className="font-semibold text-emerald-400">{trainee.salaryBand}</span>
            </div>
          </div>
        </div>

        {/* Update / Reclassify Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gov-blue" />
            <span>Reclassify Trainee Outcome</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select New Outcome State</label>
              <select
                value={targetOutcome}
                onChange={(e) => setTargetOutcome(e.target.value as OutcomeType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
              >
                {outcomeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Employer / Enterprise Name</label>
              <input
                type="text"
                value={employerInput}
                onChange={(e) => setEmployerInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Designation</label>
                <input
                  type="text"
                  value={jobRoleInput}
                  onChange={(e) => setJobRoleInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Monthly Salary Band</label>
                <input
                  type="text"
                  value={salaryInput}
                  onChange={(e) => setSalaryInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="w-full py-2.5 bg-gov-teal hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Update & Recalculate Confidence Score</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
