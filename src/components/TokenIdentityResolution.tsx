"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Key,
  ShieldAlert,
  Link,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";

export const TokenIdentityResolution: React.FC = () => {
  const { trainees, selectedTraineeId, t } = useApp();
  const [showUnmaskedPII, setShowUnmaskedPII] = useState(false);

  const trainee = trainees.find((tr) => tr.id === selectedTraineeId) || trainees[0];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Key className="w-5 h-5 text-gov-teal" />
            <span>Secure Token ID & Identity Resolution Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Privacy-preserving longitudinal linking across training, certification, follow-ups, and employment.
          </p>
        </div>

        <button
          onClick={() => setShowUnmaskedPII(!showUnmaskedPII)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
        >
          {showUnmaskedPII ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showUnmaskedPII ? "Hide PII Data" : "Demo Unmask PII"}</span>
        </button>
      </div>

      {/* Main Token Highlight Card */}
      <div className="bg-gradient-to-r from-gov-navy via-slate-900 to-gov-navyLight text-white p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-teal-400 font-bold uppercase tracking-wider block">
              Anonymized Sovereign Token Identifier
            </span>
            <div className="text-3xl font-mono font-black tracking-wider text-white mt-1 flex items-center gap-3">
              <span>{trainee.tokenId}</span>
              <span className="text-xs px-2.5 py-0.5 bg-teal-500/20 text-teal-300 rounded border border-teal-500/30 font-sans font-bold">
                Deterministic SHA-256 Hash
              </span>
            </div>
          </div>

          <div className="text-right text-xs text-slate-300">
            <div>
              Mapped Name:{" "}
              <span className="font-bold text-white">
                {showUnmaskedPII ? trainee.name : trainee.name.replace(/./g, "*")}
              </span>
            </div>
            <div>
              Aadhaar Vault Hash: <span className="font-mono text-teal-300">0x8f3a...b92c</span>
            </div>
          </div>
        </div>
      </div>

      {/* Identity Resolution Graph / Linked Records Visualizer */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b pb-3">
          <Layers className="w-4 h-4 text-gov-blue" />
          <span>Cross-Scheme Identity Resolution Graph</span>
        </h3>

        {/* Multi-System Link Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Node 1: MSSDS Training Registry */}
          <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-2 relative">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span>1. Training Registry</span>
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xs space-y-1">
              <div>
                ID: <span className="font-mono font-bold text-slate-800">{trainee.id}</span>
              </div>
              <div>Course: {trainee.course}</div>
              <div>Provider: {trainee.provider}</div>
            </div>
            <div className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded w-fit">
              ✓ Linked by Token ID
            </div>
          </div>

          {/* Node 2: Certification Portal (NCVT/SCVT) */}
          <div className="p-4 bg-teal-50/50 border border-teal-200 rounded-xl space-y-2 relative">
            <div className="flex items-center justify-between text-xs font-bold text-teal-900">
              <span>2. Certification Board</span>
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-xs space-y-1">
              <div>Cert No: CERT-2025-9921</div>
              <div>Status: {trainee.certificationStatus}</div>
              <div>Date: {trainee.certificationDate}</div>
            </div>
            <div className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded w-fit">
              ✓ Verified Score 98%
            </div>
          </div>

          {/* Node 3: Follow-Up Engine */}
          <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2 relative">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>3. Follow-up Engine</span>
              <Link className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xs space-y-1">
              <div>Channel: WhatsApp / SMS</div>
              <div>Milestone: T+90 Days</div>
              <div>Response: Employed</div>
            </div>
            <div className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded w-fit">
              ✓ Active Signal
            </div>
          </div>

          {/* Node 4: Employer Portal */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2 relative">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>4. Employer Verification</span>
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xs space-y-1">
              <div>Employer: {trainee.employer}</div>
              <div>Role: {trainee.jobRole}</div>
              <div>Salary: {trainee.salaryBand}</div>
            </div>
            <div className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded w-fit">
              ✓ Verified Confidence {trainee.confidenceScore}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
