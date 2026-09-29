"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { AlertTriangle, Plus, CheckCircle2, Clock, Building, Send, ArrowRight } from "lucide-react";
import { RemedialActionItem } from "../types";

export const RemedialAction: React.FC = () => {
  const { remedialActions, addRemedialAction, updateRemedialStatus, t } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [detectedReason, setDetectedReason] = useState("");
  const [recommendedAction, setRecommendedAction] = useState("");
  const [assignedDepartment, setAssignedDepartment] = useState("DVET Maharashtra");
  const [deadline, setDeadline] = useState("2026-12-31");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRemedialAction({
      title,
      problem,
      detectedReason,
      recommendedAction,
      assignedDepartment,
      deadline,
      status: "Assigned",
      priority,
    });
    setShowCreateModal(false);
    setTitle("");
    setProblem("");
    setDetectedReason("");
    setRecommendedAction("");
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Policy Intervention & Remedial Action Engine</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Closed-loop governance converting data insights into department action items with deadline tracking.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-gov-teal hover:bg-teal-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Create Remedial Action</span>
        </button>
      </div>

      {/* Remedial Actions Grid */}
      <div className="space-y-4">
        {remedialActions.map((action) => (
          <div
            key={action.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-gov-blue transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">{action.id}</span>
                <h3 className="text-base font-extrabold text-slate-900">{action.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                    action.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {action.priority} Priority
                </span>

                <select
                  value={action.status}
                  onChange={(e) => updateRemedialStatus(action.id, e.target.value as any)}
                  className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Problem → Reason → Recommended Action Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl space-y-1">
                <span className="font-bold text-red-900 block text-[11px] uppercase">Detected Bottleneck / Problem</span>
                <p className="text-slate-800 leading-relaxed">{action.problem}</p>
              </div>

              <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl space-y-1">
                <span className="font-bold text-amber-900 block text-[11px] uppercase">Root Cause Analysis</span>
                <p className="text-slate-800 leading-relaxed">{action.detectedReason}</p>
              </div>

              <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl space-y-1">
                <span className="font-bold text-teal-900 block text-[11px] uppercase">Mandated Remedial Action</span>
                <p className="text-slate-900 font-semibold leading-relaxed">{action.recommendedAction}</p>
              </div>
            </div>

            {/* Footer Assignment Details */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div>
                Assigned Department:{" "}
                <span className="font-bold text-slate-800">{action.assignedDepartment}</span>
              </div>
              <div>
                Deadline Target:{" "}
                <span className="font-bold text-gov-blue">{action.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Create New Policy Remedial Action</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Action Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Add AI Productivity Modules to ITI Curriculum"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Problem Description</label>
                <textarea
                  required
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detected Root Cause</label>
                <input
                  type="text"
                  required
                  value={detectedReason}
                  onChange={(e) => setDetectedReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Recommended Policy Intervention</label>
                <textarea
                  required
                  value={recommendedAction}
                  onChange={(e) => setRecommendedAction(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Department</label>
                  <input
                    type="text"
                    required
                    value={assignedDepartment}
                    onChange={(e) => setAssignedDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deadline Date</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gov-teal hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow transition-all"
              >
                Dispatch Remedial Action Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
