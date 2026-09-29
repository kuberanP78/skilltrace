"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { FileText, Download, FileSpreadsheet, Printer, CheckCircle2 } from "lucide-react";

export const ReportsModule: React.FC = () => {
  const { trainees, t } = useApp();

  const [selectedReport, setSelectedReport] = useState("Outcome Report");

  const reportsList = [
    "Outcome Report",
    "Provider Report",
    "District Report",
    "Skill Gap Report",
    "Employment Report",
    "Retention Report",
  ];

  const handleExportCSV = () => {
    const headers = "ID,Name,TokenID,Course,District,Outcome,Salary,Employer\n";
    const rows = trainees
      .map(
        (tr) =>
          `"${tr.id}","${tr.name}","${tr.tokenId}","${tr.course}","${tr.district}","${tr.currentOutcome}","${tr.salaryBand}","${tr.employer}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SkillTrace_${selectedReport.replace(/\s+/g, "_")}_2026.csv`;
    a.click();
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-gov-teal" />
            <span>{t.reports}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate and export official audit reports for state skill development authorities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV Data</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gov-navy hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportsList.map((rep) => {
          const isSelected = selectedReport === rep;
          return (
            <button
              key={rep}
              onClick={() => setSelectedReport(rep)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-blue-50 border-gov-blue shadow-md"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">{rep}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-gov-blue" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Official longitudinal data export for {rep.toLowerCase()}.
              </p>
            </button>
          );
        })}
      </div>

      {/* Report Preview Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 border-b pb-3">
          Live Report Data Preview: {selectedReport}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px]">
                <th className="py-2.5 px-3">Trainee ID</th>
                <th className="py-2.5 px-3">Token ID</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Course</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Outcome</th>
                <th className="py-2.5 px-3">Salary Band</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trainees.slice(0, 10).map((t) => (
                <tr key={t.id}>
                  <td className="py-2.5 px-3 font-bold">{t.id}</td>
                  <td className="py-2.5 px-3 font-mono text-gov-teal">{t.tokenId}</td>
                  <td className="py-2.5 px-3 font-semibold">{t.name}</td>
                  <td className="py-2.5 px-3">{t.course}</td>
                  <td className="py-2.5 px-3">{t.district}</td>
                  <td className="py-2.5 px-3 font-bold text-blue-700">{t.currentOutcome}</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">{t.salaryBand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
