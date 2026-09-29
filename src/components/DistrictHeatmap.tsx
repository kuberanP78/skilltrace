"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MapPin, Database, Award, AlertTriangle, Users, TrendingUp } from "lucide-react";
import { MOCK_DISTRICTS } from "../data/mockData";

export const DistrictHeatmap: React.FC = () => {
  const { t } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState(MOCK_DISTRICTS[0]);

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gov-teal" />
            <span>Maharashtra District Outcome Heatmap</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Geographic outcome distribution, skill gap intensity, and retention benchmarks across state districts.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs font-bold">
          <Database className="w-3.5 h-3.5 text-amber-600" />
          <span>Synthetic Demo Data</span>
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_DISTRICTS.map((district) => {
          const isSelected = selectedDistrict.name === district.name;
          return (
            <button
              key={district.code}
              onClick={() => setSelectedDistrict(district)}
              className={`p-5 rounded-2xl border text-left transition-all space-y-3 ${
                isSelected
                  ? "bg-gradient-to-br from-gov-navy to-slate-900 text-white border-gov-blue shadow-lg scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-900 hover:border-gov-teal hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base">{district.name}</h3>
                  <span className={`text-[10px] font-mono ${isSelected ? "text-teal-300" : "text-slate-400"}`}>
                    Code: {district.code}
                  </span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                  isSelected ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "bg-blue-50 text-blue-800"
                }`}>
                  {district.traineesCount} Trainees
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-700/40">
                <div>
                  <span className={isSelected ? "text-slate-400" : "text-slate-500"}>Placement Rate</span>
                  <div className={`font-black text-sm ${isSelected ? "text-emerald-400" : "text-emerald-700"}`}>
                    {district.placementRate}%
                  </div>
                </div>

                <div>
                  <span className={isSelected ? "text-slate-400" : "text-slate-500"}>Skill Gap Intensity</span>
                  <div className={`font-black text-sm ${isSelected ? "text-amber-300" : "text-amber-600"}`}>
                    {district.skillGapIntensity}%
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected District Deep Dive */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-base font-extrabold text-slate-900">
            District Profile & Analytics: {selectedDistrict.name}
          </h3>
          <span className="text-xs text-slate-500 font-semibold">SYNTHETIC DEMO DATA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-slate-500 font-semibold">Total Trainees Tracked</span>
            <div className="text-xl font-black text-slate-900">{selectedDistrict.traineesCount}</div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-emerald-800 font-semibold">Verified Placement Rate</span>
            <div className="text-xl font-black text-emerald-700">{selectedDistrict.placementRate}%</div>
          </div>

          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
            <span className="text-teal-800 font-semibold">180-Day Retention Rate</span>
            <div className="text-xl font-black text-teal-700">{selectedDistrict.retentionRate}%</div>
          </div>

          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
            <span className="text-rose-800 font-semibold">Unemployment Rate</span>
            <div className="text-xl font-black text-rose-700">{selectedDistrict.unemploymentRate}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
