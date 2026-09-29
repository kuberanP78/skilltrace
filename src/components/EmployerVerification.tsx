"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Check,
  RotateCcw,
  ShieldCheck,
  Briefcase,
  DollarSign,
  Calendar,
} from "lucide-react";

export const EmployerVerification: React.FC = () => {
  const { verifications, updateEmployerVerification, t } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerifId, setSelectedVerifId] = useState<string>(verifications[0]?.id || "");

  const filteredVerifications = verifications.filter(
    (v) =>
      v.traineeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.employerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.traineeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeRecord = verifications.find((v) => v.id === selectedVerifId) || verifications[0];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gov-teal" />
            <span>Employer Verification Portal</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Direct corporate verification portal for validating trainee employment, role fit, and wage band.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-indigo-50 text-indigo-800 font-bold px-3 py-1 rounded-full border border-indigo-200">
            Corporate SSO Active
          </span>
        </div>
      </div>

      {/* Main Grid: Request List (Left) & Active Verification Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Verification Requests */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Employee / Company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredVerifications.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedVerifId(item.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedVerifId === item.id
                    ? "bg-blue-50/70 border-gov-blue shadow-sm"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{item.traineeName}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.verificationStatus === "Verified"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.verificationStatus === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.verificationStatus}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {item.employerName} • {item.jobRole}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Verification Action Panel */}
        {activeRecord && (
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{activeRecord.traineeName}</h3>
                <p className="text-xs text-slate-500">Trainee ID: {activeRecord.traineeId}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-semibold">
                  Verification Confidence
                </span>
                <span className="text-xl font-black text-gov-teal">
                  {activeRecord.confidenceScore}% Score
                </span>
              </div>
            </div>

            {/* Verification Attributes */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 font-semibold block">Employer Organization</span>
                <span className="font-bold text-slate-900">{activeRecord.employerName}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 font-semibold block">Designation / Role</span>
                <span className="font-bold text-slate-900">{activeRecord.jobRole}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 font-semibold block">Joining Date</span>
                <span className="font-bold text-slate-900">{activeRecord.joiningDate}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-slate-500 font-semibold block">Confirmed Salary Band</span>
                <span className="font-bold text-emerald-700">{activeRecord.salaryBand}</span>
              </div>
            </div>

            {/* Retention Confirmation Status */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-bold text-slate-900">180-Day Employment Retention</span>
                  <p className="text-slate-600 text-[11px]">
                    Confirmed active on payroll as of latest monthly return.
                  </p>
                </div>
              </div>
              <span className="font-bold text-emerald-800">Confirmed</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t flex flex-wrap items-center gap-3">
              <button
                onClick={() => updateEmployerVerification(activeRecord.id, "Verified")}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Verify Employment</span>
              </button>

              <button
                onClick={() => updateEmployerVerification(activeRecord.id, "Correction Requested")}
                className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Request Correction</span>
              </button>

              <button
                onClick={() => updateEmployerVerification(activeRecord.id, "Rejected")}
                className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Record</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
