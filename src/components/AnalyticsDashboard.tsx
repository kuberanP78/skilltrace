"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { BarChart3, TrendingUp, Users, Award, ShieldCheck } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

export const AnalyticsDashboard: React.FC = () => {
  const { t } = useApp();

  const cohortData = [
    { cohort: "Q1 2025", placement: 74, retention180: 71, wageGrowth: 8 },
    { cohort: "Q2 2025", placement: 78, retention180: 75, wageGrowth: 11 },
    { cohort: "Q3 2025", placement: 82, retention180: 79, wageGrowth: 14 },
    { cohort: "Q4 2025", placement: 86, retention180: 82, wageGrowth: 17 },
  ];

  const funnelData = [
    { stage: "1. Enrolled", count: 1200 },
    { stage: "2. Certified", count: 1120 },
    { stage: "3. T+30 Placed", count: 910 },
    { stage: "4. T+180 Retained", count: 780 },
    { stage: "5. T+365 Retained", count: 710 },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gov-teal" />
            <span>{t.analytics}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            State-wide longitudinal cohort modeling, provider benchmarking, and retention forecasting.
          </p>
        </div>

        <span className="text-xs bg-teal-100 text-teal-800 font-bold px-3 py-1 rounded-full">
          96.4% Overall Traceability Rate
        </span>
      </div>

      {/* 8 Advanced KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Placement Rate</div>
          <div className="text-xl font-black text-slate-900">79.5%</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">90d Retention</div>
          <div className="text-xl font-black text-blue-600">86.5%</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">180d Retention</div>
          <div className="text-xl font-black text-teal-600">79.1%</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">365d Retention</div>
          <div className="text-xl font-black text-indigo-600">73.8%</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Wage Growth</div>
          <div className="text-xl font-black text-emerald-600">+14.2%</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Traceability</div>
          <div className="text-xl font-black text-purple-600">96.4%</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Self-Emp Rate</div>
          <div className="text-xl font-black text-orange-500">12.4%</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Apprenticeship</div>
          <div className="text-xl font-black text-rose-500">6.8%</div>
        </div>
      </div>

      {/* Cohort Comparison & Outcome Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Quarterly Cohort Progression Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="cohort" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="placement" name="Placement %" stroke="#1E40AF" strokeWidth={3} />
                <Line type="monotone" dataKey="retention180" name="180d Retention %" stroke="#0D9488" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">State Trainee Outcome Funnel Conversion</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="stage" type="category" width={130} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
