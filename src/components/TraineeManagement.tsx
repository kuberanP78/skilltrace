"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Building,
  User,
  ArrowUpDown,
} from "lucide-react";
import { COURSES, DISTRICTS } from "../data/mockData";
import { OutcomeType } from "../types";

export const TraineeManagement: React.FC = () => {
  const { trainees, viewTraineeProfile, t } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterDistrict, setFilterDistrict] = useState("All");
  const [filterOutcome, setFilterOutcome] = useState("All");
  const [filterCert, setFilterCert] = useState("All");

  const filteredTrainees = trainees.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tokenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = filterCourse === "All" || item.course === filterCourse;
    const matchesDistrict = filterDistrict === "All" || item.district === filterDistrict;
    const matchesOutcome = filterOutcome === "All" || item.currentOutcome === filterOutcome;
    const matchesCert = filterCert === "All" || item.certificationStatus === filterCert;

    return matchesSearch && matchesCourse && matchesDistrict && matchesOutcome && matchesCert;
  });

  const getOutcomeBadgeColor = (outcome: OutcomeType) => {
    switch (outcome) {
      case "Employed":
      case "Retained":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Wage Growth":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Self-employed":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Apprenticeship":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Further Study":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Unemployed":
      case "Seeking Employment":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t.trainees}</span>
            <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
              {filteredTrainees.length} Records
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive list of registered, trained, and post-certification trainees across all districts.
          </p>
        </div>

        <button
          onClick={() => {
            setSearchTerm("");
            setFilterCourse("All");
            setFilterDistrict("All");
            setFilterOutcome("All");
            setFilterCert("All");
          }}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
        >
          Clear Filters
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Name / Token ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-blue/20"
          />
        </div>

        {/* Course Filter */}
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
        >
          <option value="All">All Courses</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* District Filter */}
        <select
          value={filterDistrict}
          onChange={(e) => setFilterDistrict(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
        >
          <option value="All">All Districts</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Outcome Filter */}
        <select
          value={filterOutcome}
          onChange={(e) => setFilterOutcome(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
        >
          <option value="All">All Outcomes</option>
          <option value="Employed">Employed</option>
          <option value="Retained">Retained</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Apprenticeship">Apprenticeship</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Untraceable">Untraceable</option>
        </select>

        {/* Cert Status Filter */}
        <select
          value={filterCert}
          onChange={(e) => setFilterCert(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
        >
          <option value="All">Certification: All</option>
          <option value="Certified">Certified</option>
          <option value="In Training">In Training</option>
          <option value="Assessment Pending">Assessment Pending</option>
        </select>
      </div>

      {/* Trainees Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Trainee ID & Token</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Course & District</th>
                <th className="py-3.5 px-4">Training Provider</th>
                <th className="py-3.5 px-4">Certification</th>
                <th className="py-3.5 px-4">Current Outcome</th>
                <th className="py-3.5 px-4">Last Follow-up</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTrainees.slice(0, 25).map((item) => (
                <tr
                  key={item.id}
                  onClick={() => viewTraineeProfile(item.id)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.id}</div>
                    <div className="text-[11px] font-mono text-gov-teal font-semibold">
                      {item.tokenId}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{item.course}</div>
                    <div className="text-[11px] text-slate-500">{item.district}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-[180px] truncate">
                    {item.provider}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        item.certificationStatus === "Certified"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {item.certificationStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-1 rounded-md text-[11px] font-bold border ${getOutcomeBadgeColor(
                        item.currentOutcome
                      )}`}
                    >
                      {item.currentOutcome}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                    {item.lastFollowup}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div
                          className="bg-gov-teal h-full rounded-full"
                          style={{ width: `${item.confidenceScore}%` }}
                        />
                      </div>
                      <span className="font-bold text-[11px] text-slate-700">
                        {item.confidenceScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 bg-slate-100 hover:bg-gov-blue hover:text-white text-slate-700 rounded-lg transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTrainees.length > 25 && (
          <div className="p-3 text-center border-t border-slate-100 text-xs text-slate-500 font-semibold">
            Showing first 25 of {filteredTrainees.length} trainees. Use search/filters to narrow results.
          </div>
        )}
      </div>
    </div>
  );
};
