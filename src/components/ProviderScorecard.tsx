"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { School, Filter, Search, Award, TrendingUp, ShieldCheck } from "lucide-react";
import { MOCK_PROVIDERS, DISTRICTS } from "../data/mockData";

export const ProviderScorecard: React.FC = () => {
  const { t } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProviders = MOCK_PROVIDERS.filter((p) => {
    const matchesDistrict = selectedDistrict === "All" || p.district === selectedDistrict;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <School className="w-5 h-5 text-gov-teal" />
            <span>Training Provider Performance Scorecard</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Factual outcome benchmarking across 10 active training providers in Maharashtra.
          </p>
        </div>

        <div className="text-xs bg-slate-100 text-slate-800 font-semibold px-3 py-1 rounded-lg border">
          Objective Factual Metrics (No Subjective Rankings)
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Training Center Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none"
          />
        </div>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
        >
          <option value="All">All Districts</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Provider Scorecard Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Provider ID & Name</th>
                <th className="py-3.5 px-4">District</th>
                <th className="py-3.5 px-4 text-center">Trainees Trained</th>
                <th className="py-3.5 px-4 text-center">Cert %</th>
                <th className="py-3.5 px-4 text-center">Placement %</th>
                <th className="py-3.5 px-4 text-center">90d Retention</th>
                <th className="py-3.5 px-4 text-center">Wage Growth</th>
                <th className="py-3.5 px-4 text-center">Traceability %</th>
                <th className="py-3.5 px-4 text-center">Skill Gap Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProviders.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{p.id}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{p.district}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                    {p.traineesTrained}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-700">
                    {p.certificationRate}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-blue-700">
                    {p.placementRate}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-teal-700">
                    {p.retentionRate90}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-600">
                    +{p.wageGrowthRate}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-700">
                    {p.traceabilityRate}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-amber-700">
                    {p.skillGapRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
