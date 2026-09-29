"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  PhoneCall,
  MessageCircle,
  Smartphone,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export const FollowUpEngine: React.FC = () => {
  const { followups, trainees, simulateFollowup, sendNewFollowup, t } = useApp();

  const [selectedMilestone, setSelectedMilestone] = useState<"T+30" | "T+90" | "T+180" | "T+365">("T+30");
  const [selectedChannel, setSelectedChannel] = useState<"WhatsApp" | "SMS" | "IVR">("WhatsApp");
  const [selectedTraineeId, setSelectedTraineeId] = useState<string>(trainees[0]?.id || "");

  const handleTriggerFollowup = () => {
    if (!selectedTraineeId) return;
    sendNewFollowup(selectedTraineeId, selectedMilestone, selectedChannel);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gov-teal" />
            <span>{t.followups}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Multi-channel automated milestone messaging engine (WhatsApp, SMS, IVR, Assisted Voice).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
            Active Gateway: WhatsApp Business API & Telecom IVR
          </span>
        </div>
      </div>

      {/* Simulator Control Card */}
      <div className="bg-gradient-to-r from-gov-navy via-slate-900 to-gov-navyLight text-white p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-teal-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Simulate Live Milestone Dispatch</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Trainee</label>
            <select
              value={selectedTraineeId}
              onChange={(e) => setSelectedTraineeId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none"
            >
              {trainees.slice(0, 15).map((tr) => (
                <option key={tr.id} value={tr.id}>
                  {tr.name} ({tr.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Milestone Period</label>
            <select
              value={selectedMilestone}
              onChange={(e) => setSelectedMilestone(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none"
            >
              <option value="T+30">T+30 Days Post-Cert</option>
              <option value="T+90">T+90 Days Post-Cert</option>
              <option value="T+180">T+180 Days Post-Cert</option>
              <option value="T+365">T+365 Days Post-Cert</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Channel Gateway</label>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none"
            >
              <option value="WhatsApp">WhatsApp Interactive Bot</option>
              <option value="SMS">SMS Shortcode (139)</option>
              <option value="IVR">Automated Voice IVR</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleTriggerFollowup}
              className="w-full py-2 bg-gov-teal hover:bg-teal-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Follow-Up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Follow-up Queue Table & Live Status */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b pb-3 flex items-center justify-between">
          <span>Active Follow-up Dispatch Queue</span>
          <span className="text-xs text-slate-500">Lifecycle: Sent → Delivered → Responded</span>
        </h3>

        <div className="space-y-3">
          {followups.map((fol) => (
            <div
              key={fol.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gov-teal transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {fol.channel === "WhatsApp" ? (
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  ) : fol.channel === "IVR" ? (
                    <PhoneCall className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Smartphone className="w-5 h-5 text-amber-600" />
                  )}
                </div>

                <div>
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                    <span>{fol.traineeName}</span>
                    <span className="text-[10px] font-mono text-slate-500">({fol.traineeId})</span>
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-bold text-[10px]">
                      {fol.milestone}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Channel: {fol.channel} • Dispatched: {fol.sentDate}
                  </div>
                  {fol.responseContent && (
                    <div className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-lg mt-2 font-medium border border-emerald-100">
                      Response: &quot;{fol.responseContent}&quot;
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    fol.status === "Responded"
                      ? "bg-emerald-100 text-emerald-800"
                      : fol.status === "Delivered"
                      ? "bg-blue-100 text-blue-800"
                      : fol.status === "Sent"
                      ? "bg-amber-100 text-amber-800 animate-pulse"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {fol.status}
                </span>

                {fol.status !== "Responded" && (
                  <button
                    onClick={() => simulateFollowup(fol.id)}
                    className="px-3 py-1 bg-slate-200 hover:bg-gov-teal hover:text-white text-slate-800 text-xs font-bold rounded-lg transition-all"
                  >
                    Simulate Trainee Response
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
