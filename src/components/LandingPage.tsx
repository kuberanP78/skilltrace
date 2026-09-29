"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  ShieldCheck,
  TrendingUp,
  Cpu,
  Award,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { UserRole } from "../types";

export const LandingPage: React.FC = () => {
  const { setActiveView, setUserRole, setIsGuidedDemoActive, setGuidedStep } = useApp();
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    setShowRoleModal(false);
    if (role === "Trainee") {
      setActiveView("trainee-profile");
    } else if (role === "Employer") {
      setActiveView("employer-verif");
    } else {
      setActiveView("dashboard");
    }
  };

  const handleStartDemo = () => {
    setUserRole("Administrator");
    setGuidedStep(1);
    setIsGuidedDemoActive(true);
    setActiveView("dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Banner Header */}
      <div className="bg-gov-navy text-white py-2 px-6 text-xs flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="bg-teal-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
            SIH 2026 Innovation Prototype
          </span>
          <span className="text-slate-300 font-medium">
            PS 26135: Longitudinal Skilling Outcome & Impact Tracking
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-300 text-[11px]">
          <span>Ministry of Skill Development & Entrepreneurship</span>
          <span className="text-teal-400 font-semibold">Government of India</span>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gov-navy via-slate-900 to-gov-navyLight text-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Consent-Based Longitudinal Outcome Verification</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              SkillTrace
              <span className="block text-2xl md:text-3xl text-teal-400 font-normal mt-2">
                “Trace Every Skill to a Livelihood”
              </span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              A privacy-first, secure identity platform that follows vocational trainees across 
              <span className="text-white font-semibold"> 30, 90, 180, and 365 days</span> post-certification to accurately verify employment, retention, wage growth, self-employment, and skill gaps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setShowRoleModal(true)}
                className="px-6 py-3 bg-gov-teal hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-teal-500/25 transition-all flex items-center gap-2 text-sm"
              >
                <span>Launch Portal Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleStartDemo}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 text-sm"
              >
                <PlayCircle className="w-5 h-5 text-teal-300" />
                <span>Start SIH Live Demo Journey</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div>
                <div className="text-2xl font-black text-white">365 Days</div>
                <div className="text-xs text-slate-400">Longitudinal Follow-up</div>
              </div>
              <div>
                <div className="text-2xl font-black text-teal-400">100%</div>
                <div className="text-xs text-slate-400">Consent & Privacy Preservation</div>
              </div>
              <div>
                <div className="text-2xl font-black text-orange-400">92%+</div>
                <div className="text-xs text-slate-400">Verification Confidence</div>
              </div>
            </div>
          </div>

          {/* Hero Card Graphic */}
          <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Live Outcome Tracking Matrix
              </span>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono">
                ST-7X29-AB84
              </span>
            </div>

            {/* Timeline Snapshot */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2.5 bg-slate-900/60 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Enrollment & Digital Consent</div>
                  <div className="text-[11px] text-slate-400">Aarav Sharma • Solar PV Installer</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-slate-900/60 rounded-lg border border-slate-700">
                <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">T+90 Days Employer Verification</div>
                  <div className="text-[11px] text-slate-400">Verified by Mahindra & Mahindra (96% Confidence)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-slate-900/60 rounded-lg border border-slate-700">
                <Zap className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">AI Skill Gap Recommendation</div>
                  <div className="text-[11px] text-slate-400">Added Advanced Excel + AI Tools Module</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem & Solution Cards */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold mb-4">
              PS
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Problem Statement (PS 26135)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional skilling initiatives rely on short-term initial placement statistics and struggle to capture real longitudinal outcome metrics such as 180/365-day retention, wage progression, self-employment, and skill mismatches across various sectors.
            </p>
          </div>

          {/* Core Idea Card */}
          <div className="bg-white border border-teal-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold mb-4">
              ST
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              The SkillTrace Solution
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              SkillTrace introduces a privacy-preserving Token ID (ST-XXXX-XXXX) framework coupled with an automated multi-channel follow-up engine (WhatsApp, SMS, IVR) and direct Employer Verification to monitor post-certification progression effortlessly.
            </p>
          </div>
        </div>

        {/* Key Capabilities */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Key Platform Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-2 hover:border-gov-blue transition-all">
              <ShieldCheck className="w-7 h-7 text-gov-teal" />
              <h4 className="font-bold text-sm text-slate-900">Consent & Privacy</h4>
              <p className="text-xs text-slate-600">Granular consent controls with full withdrawal and audit trail.</p>
            </div>
            <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-2 hover:border-gov-blue transition-all">
              <Clock className="w-7 h-7 text-blue-600" />
              <h4 className="font-bold text-sm text-slate-900">Longitudinal Tracker</h4>
              <p className="text-xs text-slate-600">Milestone checks at 30, 90, 180, and 365 days post-certification.</p>
            </div>
            <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-2 hover:border-gov-blue transition-all">
              <Building2 className="w-7 h-7 text-indigo-600" />
              <h4 className="font-bold text-sm text-slate-900">Employer Verification</h4>
              <p className="text-xs text-slate-600">Direct portal verification for employment, wage bands, and retention.</p>
            </div>
            <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-2 hover:border-gov-blue transition-all">
              <Sparkles className="w-7 h-7 text-orange-500" />
              <h4 className="font-bold text-sm text-slate-900">Skill-Gap AI</h4>
              <p className="text-xs text-slate-600">Automated market demand mapping & remedial training actions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Select Portal Login Role</h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {(["Administrator", "Training Provider", "Employer", "Trainee"] as UserRole[]).map(
                (role) => (
                  <button
                    key={role}
                    onClick={() => handleSelectRole(role)}
                    className="w-full p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-gov-blue rounded-xl flex items-center justify-between text-left transition-all group"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-gov-blue">
                        {role}
                      </div>
                      <div className="text-xs text-slate-500">
                        {role === "Administrator" && "Full analytics, follow-ups, and remedial control"}
                        {role === "Training Provider" && "View provider scorecards, trainee cohorts"}
                        {role === "Employer" && "Verify employee status, roles, and wage bands"}
                        {role === "Trainee" && "View consent, longitudinal timeline, and token"}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gov-blue" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
