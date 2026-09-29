"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Cpu, ArrowDown, Database, ShieldCheck, Server, Sparkles, Layers, Code } from "lucide-react";

export const SystemArchitecture: React.FC = () => {
  const { t } = useApp();

  const pipelineNodes = [
    { title: "Trainee Registration", tech: "Next.js / React UI", desc: "Digital enrollment & Aadhaar hashing" },
    { title: "Consent Governance", tech: "DPDP Compliance Engine", desc: "Granular permission & revocation log" },
    { title: "Secure Token ID", tech: "Zero-Knowledge Tokenizer", desc: "ST-7X29-AB84 identity resolution" },
    { title: "Training Data Store", tech: "Supabase / PostgreSQL", desc: "Course & certification records" },
    { title: "Follow-up Engine", tech: "WhatsApp / SMS / IVR Gateway", desc: "Milestone T+30 to T+365 messaging" },
    { title: "Employer Verification", tech: "Corporate Portal (FastAPI)", desc: "Role & wage band confirmation" },
    { title: "Outcome Classifier", tech: "Python Rule & ML Engine", desc: "9-tier confidence scoring" },
    { title: "Skill-Gap AI", tech: "Scikit-Learn NLP / Gemini", desc: "Market demand gap detector" },
    { title: "Analytics & Heatmaps", tech: "Recharts & Next.js SSR", desc: "State-wide district dashboards" },
    { title: "Remedial Action Engine", tech: "Policy Workflow System", desc: "Department assignment & tracking" },
  ];

  const techBadges = [
    "Next.js 14",
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "Python 3.11",
    "Supabase",
    "PostgreSQL",
    "Scikit-Learn",
    "Vercel Deployment",
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-gov-teal" />
            <span>{t.architecture}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end technical data pipeline architecture & tech stack layout for SIH 2026.
          </p>
        </div>

        <span className="text-xs bg-indigo-50 text-indigo-800 font-bold px-3 py-1 rounded-full border border-indigo-200">
          Vercel & FastAPI Cloud Ready
        </span>
      </div>

      {/* Tech Stack Badges Bar */}
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-5 rounded-2xl shadow-md space-y-3">
        <span className="text-xs text-teal-400 font-extrabold uppercase tracking-wider block">
          Core Tech Stack Stack Infrastructure
        </span>
        <div className="flex flex-wrap gap-2">
          {techBadges.map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-slate-800 border border-slate-700 text-teal-300 font-mono text-xs font-bold rounded-lg shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b pb-3">
          10-Stage Data Flow & System Pipeline
        </h3>

        <div className="space-y-3 max-w-2xl mx-auto">
          {pipelineNodes.map((node, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-full p-4 bg-slate-50 border border-slate-200 hover:border-gov-teal rounded-xl flex items-center justify-between gap-4 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gov-navy text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{node.title}</h4>
                    <p className="text-[11px] text-slate-500">{node.desc}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-teal-100 text-teal-800 font-mono text-[10px] font-bold rounded">
                  {node.tech}
                </span>
              </div>

              {idx < pipelineNodes.length - 1 && (
                <ArrowDown className="w-4 h-4 text-slate-400 my-1 animate-bounce" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
