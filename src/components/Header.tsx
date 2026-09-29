"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Bell,
  Search,
  Globe,
  UserCheck,
  PlayCircle,
  Database,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Language, UserRole } from "../types";

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    userRole,
    setUserRole,
    t,
    setIsGuidedDemoActive,
    setGuidedStep,
    setActiveView,
    trainees,
    viewTraineeProfile,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredTrainees = searchQuery.trim()
    ? trainees.filter(
        (tr) =>
          tr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tr.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tr.tokenId.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleStartDemo = () => {
    setGuidedStep(1);
    setIsGuidedDemoActive(true);
  };

  return (
    <header className="bg-white border-b border-gov-border sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Search Input with Instant Dropdown */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Trainee Name, Token ID (ST-XXXX), or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all"
            />
          </div>

          {showSearchResults && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
              {filteredTrainees.length > 0 ? (
                filteredTrainees.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      viewTraineeProfile(item.id);
                      setShowSearchResults(false);
                      setSearchQuery("");
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">
                        {item.id} • {item.tokenId} • {item.district}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                      {item.currentOutcome}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-slate-500">No matching trainees found</div>
              )}
            </div>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Synthetic Demo Data Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-semibold">
            <Database className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>{t.demoDataIndicator}</span>
          </div>

          {/* SIH Hackathon Demo Walkthrough Button */}
          <button
            onClick={handleStartDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gov-navy to-gov-blue text-white rounded-lg text-xs font-semibold shadow hover:opacity-95 transition-all"
          >
            <PlayCircle className="w-4 h-4 text-teal-300" />
            <span>SIH Live Demo Flow</span>
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1" />
            {(["en", "mr", "hi"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === lang
                    ? "bg-white text-gov-navy shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {lang === "en" ? "EN" : lang === "mr" ? "मराठी" : "हिंदी"}
              </button>
            ))}
          </div>

          {/* Role Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
            <UserCheck className="w-3.5 h-3.5 text-gov-teal" />
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="Administrator">Role: Administrator</option>
              <option value="Training Provider">Role: Training Provider</option>
              <option value="Employer">Role: Employer</option>
              <option value="Trainee">Role: Trainee</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    System Notifications
                  </h4>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                    3 New
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
                  <div className="p-2 bg-blue-50/70 border border-blue-100 rounded-lg flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Employer Verified</p>
                      <p className="text-slate-600 text-[11px]">
                        TCS verified employment for Aarav Sharma (ST-7X29-AB84).
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-amber-50/70 border border-amber-100 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Follow-up Responded</p>
                      <p className="text-slate-600 text-[11px]">
                        T+90 WhatsApp response received from Pune cohort.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
