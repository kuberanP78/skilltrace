"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Building2,
  CheckSquare,
  Sparkles,
  BarChart3,
  School,
  MapPin,
  FileText,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  Home,
  LogOut,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, userRole, t } = useApp();

  const navItems = [
    { id: "landing", label: "Home / Landing", icon: Home, roles: ["Administrator", "Training Provider", "Employer", "Trainee"] },
    { id: "dashboard", label: t.dashboard, icon: LayoutDashboard, roles: ["Administrator", "Training Provider"] },
    { id: "trainees", label: t.trainees, icon: Users, roles: ["Administrator", "Training Provider"] },
    { id: "followups", label: t.followups, icon: MessageSquare, roles: ["Administrator", "Training Provider"] },
    { id: "employer-verif", label: t.employerVerif, icon: Building2, roles: ["Administrator", "Employer"] },
    { id: "outcomes", label: t.outcomes, icon: CheckSquare, roles: ["Administrator", "Training Provider"] },
    { id: "skill-gap", label: t.skillGap, icon: Sparkles, roles: ["Administrator", "Training Provider"] },
    { id: "analytics", label: t.analytics, icon: BarChart3, roles: ["Administrator", "Training Provider"] },
    { id: "providers", label: t.providers, icon: School, roles: ["Administrator"] },
    { id: "districts", label: t.districts, icon: MapPin, roles: ["Administrator"] },
    { id: "reports", label: t.reports, icon: FileText, roles: ["Administrator", "Training Provider"] },
    { id: "consent", label: t.consent, icon: ShieldCheck, roles: ["Administrator", "Trainee"] },
    { id: "remedial", label: t.remedial, icon: AlertTriangle, roles: ["Administrator"] },
    { id: "architecture", label: t.architecture, icon: Cpu, roles: ["Administrator", "Training Provider", "Employer", "Trainee"] },
  ];

  return (
    <aside className="w-64 bg-gov-navy text-slate-200 flex flex-col h-screen sticky top-0 shrink-0 select-none shadow-xl border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gov-blue via-teal-500 to-gov-orange flex items-center justify-center font-black text-white text-lg shadow-md">
          ST
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-wide text-white flex items-center gap-1.5">
            SkillTrace
            <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-1.5 py-0.5 rounded border border-teal-500/30">
              SIH &apos;26
            </span>
          </h1>
          <p className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">
            {t.tagline}
          </p>
        </div>
      </div>

      {/* Role Pill */}
      <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-semibold">Active Role:</span>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-900/40 text-teal-300 border border-teal-500/30">
          {userRole}
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          const isAllowed = item.roles.includes(userRole);

          if (!isAllowed) return null;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-gov-blue to-teal-700 text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-teal-300" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-teal-300" />}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80 text-slate-400 text-[11px] space-y-1">
        <div className="flex items-center justify-between text-[10px]">
          <span>PS ID: 26135</span>
          <span className="text-teal-400 font-semibold">MoSDE / SIH</span>
        </div>
        <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-400">
          Longitudinal Skilling Tracker
        </div>
      </div>
    </aside>
  );
};
