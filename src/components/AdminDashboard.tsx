"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Users,
  Award,
  Briefcase,
  UserCheck,
  Building,
  GraduationCap,
  AlertCircle,
  HelpCircle,
  Filter,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { COURSES, DISTRICTS } from "../data/mockData";

export const AdminDashboard: React.FC = () => {
  const { trainees, t } = useApp();

  // Filters State
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedCourse, setSelectedCourse] = useState<string>("All");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("All");
  const [selectedOutcome, setSelectedOutcome] = useState<string>("All");

  // Filtered dataset
  const filteredData = trainees.filter((tr) => {
    if (selectedDistrict !== "All" && tr.district !== selectedDistrict) return false;
    if (selectedCourse !== "All" && tr.course !== selectedCourse) return false;
    if (selectedGender !== "All" && tr.gender !== selectedGender) return false;
    if (selectedAgeGroup !== "All" && tr.ageGroup !== selectedAgeGroup) return false;
    if (selectedOutcome !== "All" && tr.currentOutcome !== selectedOutcome) return false;
    return true;
  });

  // Calculate KPI Counts
  const totalCount = filteredData.length;
  const certifiedCount = filteredData.filter((t) => t.certificationStatus === "Certified").length;
  const employedCount = filteredData.filter((t) => t.currentOutcome === "Employed").length;
  const retainedCount = filteredData.filter((t) => t.currentOutcome === "Retained").length;
  const selfEmployedCount = filteredData.filter((t) => t.currentOutcome === "Self-employed").length;
  const apprenticeCount = filteredData.filter((t) => t.currentOutcome === "Apprenticeship").length;
  const unemployedCount = filteredData.filter((t) => t.currentOutcome === "Unemployed").length;
  const untraceableCount = filteredData.filter((t) => t.currentOutcome === "Untraceable").length;

  // Chart Data Calculations
  // Chart 1: Outcome Trend (Months)
  const outcomeTrendData = [
    { month: "Oct 25", Employed: 35, Retained: 30, SelfEmployed: 8, Unemployed: 12 },
    { month: "Nov 25", Employed: 42, Retained: 38, SelfEmployed: 10, Unemployed: 10 },
    { month: "Dec 25", Employed: 48, Retained: 44, SelfEmployed: 12, Unemployed: 9 },
    { month: "Jan 26", Employed: 55, Retained: 50, SelfEmployed: 15, Unemployed: 8 },
    { month: "Feb 26", Employed: 62, Retained: 58, SelfEmployed: 18, Unemployed: 7 },
    { month: "Mar 26", Employed: 70, Retained: 65, SelfEmployed: 22, Unemployed: 6 },
  ];

  // Chart 2: Placement Rate by Course
  const coursePlacementData = COURSES.map((course) => {
    const totalInCourse = filteredData.filter((t) => t.course === course).length || 1;
    const placedInCourse = filteredData.filter(
      (t) => t.course === course && (t.currentOutcome === "Employed" || t.currentOutcome === "Retained")
    ).length;
    return {
      courseName: course.length > 18 ? course.substring(0, 16) + "..." : course,
      placementRate: Math.round((placedInCourse / totalInCourse) * 100),
    };
  });

  // Chart 3: Retention at 30/90/180/365 Days
  const retentionCurveData = [
    { milestone: "30 Days (T+30)", retention: 94.2 },
    { milestone: "90 Days (T+90)", retention: 86.5 },
    { milestone: "180 Days (T+180)", retention: 79.1 },
    { milestone: "365 Days (T+365)", retention: 73.8 },
  ];

  // Chart 4: Wage Progression
  const wageProgressionData = [
    { period: "Entry Level", salary: 13500 },
    { period: "90 Days", salary: 15800 },
    { period: "180 Days", salary: 18200 },
    { period: "365 Days", salary: 22400 },
  ];

  // Chart 5: Self-Employment vs Wage Employment Ratio
  const employmentTypePie = [
    { name: "Wage Employment", value: employedCount + retainedCount, color: "#1E40AF" },
    { name: "Self-Employment", value: selfEmployedCount, color: "#0D9488" },
    { name: "Apprenticeship", value: apprenticeCount, color: "#F97316" },
    { name: "Unemployed / Seeking", value: unemployedCount, color: "#EF4444" },
  ];

  // Chart 6: Unemployment Reasons Breakdown
  const unemploymentReasonsData = [
    { reason: "Lack of required skills", count: 14 },
    { reason: "No suitable local jobs", count: 10 },
    { reason: "Salary too low", count: 8 },
    { reason: "Relocation issues", count: 5 },
    { reason: "Further study", count: 6 },
  ];

  // Chart 7: Skill Gap Frequency
  const skillGapFrequencyData = [
    { gap: "Advanced Excel / Tools", count: 42 },
    { gap: "English Communication", count: 35 },
    { gap: "AI Productivity Tools", count: 28 },
    { gap: "PLC & Automation", count: 19 },
    { gap: "Customer Service Etiquette", count: 16 },
  ];

  // Chart 8: District-wise Outcomes
  const districtOutcomeData = DISTRICTS.slice(0, 5).map((district) => {
    const distTrainees = filteredData.filter((t) => t.district === district);
    const distTotal = distTrainees.length || 1;
    const distPlaced = distTrainees.filter(
      (t) => t.currentOutcome === "Employed" || t.currentOutcome === "Retained"
    ).length;
    return {
      district,
      placed: Math.round((distPlaced / distTotal) * 100),
      unemployed: Math.round((distTrainees.filter((t) => t.currentOutcome === "Unemployed").length / distTotal) * 100),
    };
  });

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header & Filter Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t.dashboard}</span>
            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
              Maharashtra State Scope
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time longitudinal outcome verification across 100 active trainees and 10 training providers.
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="All">District: All</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer max-w-[150px] truncate"
            >
              <option value="All">Course: All</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <select
              value={selectedOutcome}
              onChange={(e) => setSelectedOutcome(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="All">Outcome: All</option>
              <option value="Employed">Employed</option>
              <option value="Retained">Retained</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Apprenticeship">Apprenticeship</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSelectedDistrict("All");
              setSelectedCourse("All");
              setSelectedGender("All");
              setSelectedAgeGroup("All");
              setSelectedOutcome("All");
            }}
            className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
            title="Reset Filters"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top KPI Cards (8 Metric Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.totalTrainees}</span>
            <Users className="w-4 h-4 text-gov-blue" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalCount}</div>
          <div className="text-[10px] text-slate-500 font-medium">100% Tracked</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.certified}</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{certifiedCount}</div>
          <div className="text-[10px] text-emerald-600 font-bold">
            {totalCount ? Math.round((certifiedCount / totalCount) * 100) : 0}% Pass
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.employed}</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{employedCount}</div>
          <div className="text-[10px] text-blue-600 font-bold">Wage Placed</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.retained}</span>
            <UserCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{retainedCount}</div>
          <div className="text-[10px] text-teal-600 font-bold">180d Verified</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.selfEmployed}</span>
            <Building className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-xl font-black text-slate-900">{selfEmployedCount}</div>
          <div className="text-[10px] text-orange-500 font-bold">Entrepreneurs</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.apprentices}</span>
            <GraduationCap className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{apprenticeCount}</div>
          <div className="text-[10px] text-purple-600 font-bold">Active Contracts</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.unemployed}</span>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-xl font-black text-slate-900">{unemployedCount}</div>
          <div className="text-[10px] text-red-500 font-bold">Action Needed</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.untraceable}</span>
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl font-black text-slate-900">{untraceableCount}</div>
          <div className="text-[10px] text-slate-400 font-bold">IVR Queued</div>
        </div>
      </div>

      {/* 8 Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Employment Outcome Trend */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">1. Employment Outcome Trend (6 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={outcomeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Employed" stackId="1" stroke="#1E40AF" fill="#1E40AF" />
                <Area type="monotone" dataKey="Retained" stackId="1" stroke="#0D9488" fill="#0D9488" />
                <Area type="monotone" dataKey="SelfEmployed" stackId="1" stroke="#F97316" fill="#F97316" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Placement Rate by Training Program */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">2. Placement Rate by Course Program (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePlacementData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis dataKey="courseName" type="category" width={140} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="placementRate" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Retention Curve at 30/90/180/365 Days */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">3. Longitudinal Retention Curve (30 to 365 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="milestone" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="retention" stroke="#0D9488" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Wage Progression */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">4. Average Monthly Wage Progression (₹ INR)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wageProgressionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                <Bar dataKey="salary" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Self-Employment vs Wage Employment */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">5. Self-Employment vs Wage Employment Ratio</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employmentTypePie}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {employmentTypePie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Unemployment Reasons */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">6. Primary Unemployment & Non-Placement Reasons</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unemploymentReasonsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="reason" tick={{ fontSize: 9 }} interval={0} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 7: Skill Gap Frequency */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">7. Identified Skill Gaps (Market Demand Mismatch)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillGapFrequencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="gap" type="category" width={150} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#F59E0B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 8: District-wise Outcomes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">8. District-wise Outcome Distribution (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtOutcomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="district" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="placed" name="Placed %" fill="#0D9488" />
                <Bar dataKey="unemployed" name="Unemployed %" fill="#F43F5E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
