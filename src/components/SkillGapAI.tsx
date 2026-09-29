"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, ArrowRight, CheckCircle, AlertTriangle, Lightbulb, Bot } from "lucide-react";
import { COURSES } from "../data/mockData";

export const SkillGapAI: React.FC = () => {
  const { t } = useApp();

  const skillGapAnalysis = [
    {
      course: "Data Entry & Office Automation",
      trainedSkills: ["Basic Typing & Data Entry", "MS Word Basics", "File Management"],
      marketDemand: ["Excel (VLOOKUP, Pivot Tables)", "AI Productivity Tools (ChatGPT, Copilot)", "English Communication"],
      detectedGap: ["Advanced Excel", "AI Productivity Tools", "Communication"],
      recommendations: [
        { topic: "Advanced Excel & Power Query", priority: "High Priority", status: "Recommended Module" },
        { topic: "AI Productivity & Prompt Basics", priority: "High Priority", status: "Recommended Module" },
        { topic: "Corporate English Etiquette", priority: "Medium Priority", status: "Recommended Module" },
      ],
    },
    {
      course: "Solar PV Installer & Technician",
      trainedSkills: ["Solar Panel Mounting", "Wiring & Inverter Connection"],
      marketDemand: ["Lithium Battery Maintenance", "Smart Grid Controllers", "Customer Troubleshooting"],
      detectedGap: ["Lithium Storage Systems", "Smart Grid Tech"],
      recommendations: [
        { topic: "Lithium-Ion Battery Storage & BMS", priority: "High Priority", status: "Recommended Module" },
        { topic: "IoT Smart Metering & Grid Interfacing", priority: "Medium Priority", status: "Recommended Module" },
      ],
    },
    {
      course: "Retail Sales Associate",
      trainedSkills: ["Counter Sales", "Product Display"],
      marketDemand: ["POS Machine Software", "Digital Payment Gateway", "CRM Data Entry"],
      detectedGap: ["Digital POS & CRM Systems"],
      recommendations: [
        { topic: "Digital POS & Billing Software", priority: "High Priority", status: "Recommended Module" },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span>Skill-Gap AI Intelligence Engine</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Machine learning market demand alignment matching curriculum outputs against live industrial recruiter needs.
          </p>
        </div>

        {/* AI Insight Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-900 text-xs font-bold">
          <Bot className="w-4 h-4 text-amber-600" />
          <span>AI-generated demo insight</span>
        </div>
      </div>

      {/* Analysis Grid per Course */}
      <div className="space-y-6">
        {skillGapAnalysis.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">{item.course}</h3>
              <span className="text-xs text-slate-500 font-semibold">Curriculum Gap Model v2.4</span>
            </div>

            {/* 3-Column Visual Comparator */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Column 1: Taught Skills */}
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
                <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider">
                  1. Current Taught Curriculum
                </span>
                <div className="space-y-1.5">
                  {item.trainedSkills.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-800">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Live Market Demand */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                <span className="font-bold text-emerald-900 block text-xs uppercase tracking-wider">
                  2. Live Industry Employer Demand
                </span>
                <div className="space-y-1.5">
                  {item.marketDemand.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-800 font-semibold">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Detected Gap */}
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                <span className="font-bold text-amber-900 block text-xs uppercase tracking-wider">
                  3. Detected Mismatch (Gap)
                </span>
                <div className="space-y-1.5">
                  {item.detectedGap.map((g, i) => (
                    <div key={i} className="flex items-center gap-2 text-amber-900 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Recommendations Bar */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>AI Recommended Curriculum Remediation</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">AI-generated demo insight</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {item.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-3 text-xs"
                  >
                    <span className="font-bold text-white">{rec.topic}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        rec.priority === "High Priority"
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
