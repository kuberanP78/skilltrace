"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { AlertCircle, PieChart as PieIcon, BarChart2, Filter } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const UnemploymentReasons: React.FC = () => {
  const { t } = useApp();

  const reasonsDistribution = [
    { name: "Lack of required skills", value: 34, color: "#EF4444" },
    { name: "No suitable local jobs", value: 24, color: "#F97316" },
    { name: "Salary expectation mismatch", value: 18, color: "#F59E0B" },
    { name: "Relocation constraints", value: 12, color: "#6366F1" },
    { name: "Personal / Family reasons", value: 8, color: "#8B5CF6" },
    { name: "Pursuing Further Study", value: 4, color: "#10B981" },
  ];

  const courseReasonBreakdown = [
    { course: "Data Entry", skillMismatch: 18, lowSalary: 6, noLocalJobs: 8 },
    { course: "Retail Sales", skillMismatch: 8, lowSalary: 12, noLocalJobs: 14 },
    { course: "Solar PV Tech", skillMismatch: 10, lowSalary: 4, noLocalJobs: 16 },
    { course: "Healthcare Assistant", skillMismatch: 6, lowSalary: 8, noLocalJobs: 6 },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>Unemployment & Non-Placement Reason Analysis</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Empirical root-cause classification for unplaced or drop-out trainees to guide policy intervention.
          </p>
        </div>

        <span className="text-xs bg-rose-100 text-rose-800 font-bold px-3 py-1 rounded-full">
          14% Total Unemployment Pool
        </span>
      </div>

      {/* 2 Main Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual 1: Reason Pie Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-gov-blue" />
            <span>Primary Non-Placement Reason Distribution</span>
          </h3>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reasonsDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {reasonsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visual 2: Course-wise Reason Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-gov-teal" />
            <span>Course-wise Specific Non-Placement Reasons</span>
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseReasonBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="course" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="skillMismatch" name="Skill Mismatch" fill="#EF4444" />
                <Bar dataKey="lowSalary" name="Low Salary" fill="#F59E0B" />
                <Bar dataKey="noLocalJobs" name="No Local Jobs" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
