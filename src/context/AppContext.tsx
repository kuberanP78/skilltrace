"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Trainee,
  ConsentRecord,
  FollowUpRecord,
  EmployerVerificationRecord,
  TrainingProvider,
  DistrictMetric,
  RemedialActionItem,
  Language,
  UserRole,
  OutcomeType,
} from "../types";
import {
  MOCK_TRAINEES,
  MOCK_CONSENTS,
  MOCK_FOLLOWUPS,
  MOCK_VERIFICATIONS,
  MOCK_PROVIDERS,
  MOCK_DISTRICTS,
  MOCK_REMEDIAL_ACTIONS,
} from "../data/mockData";

export interface Translations {
  title: string;
  tagline: string;
  dashboard: string;
  trainees: string;
  followups: string;
  employerVerif: string;
  outcomes: string;
  skillGap: string;
  analytics: string;
  providers: string;
  districts: string;
  reports: string;
  consent: string;
  architecture: string;
  remedial: string;
  totalTrainees: string;
  certified: string;
  employed: string;
  retained: string;
  selfEmployed: string;
  apprentices: string;
  unemployed: string;
  untraceable: string;
  demoDataIndicator: string;
  switchRole: string;
}

const DICTIONARY: Record<Language, Translations> = {
  en: {
    title: "SkillTrace",
    tagline: "Trace Every Skill to a Livelihood",
    dashboard: "Admin Dashboard",
    trainees: "Trainee Management",
    followups: "Follow-up Engine",
    employerVerif: "Employer Verification",
    outcomes: "Outcome Classifier",
    skillGap: "Skill-Gap AI",
    analytics: "Advanced Analytics",
    providers: "Training Providers",
    districts: "District Analytics",
    reports: "Reports & Exports",
    consent: "Consent Manager",
    architecture: "System Architecture",
    remedial: "Remedial Actions",
    totalTrainees: "Total Trainees",
    certified: "Certified",
    employed: "Employed",
    retained: "Retained (180d)",
    selfEmployed: "Self-Employed",
    apprentices: "Apprentices",
    unemployed: "Unemployed",
    untraceable: "Untraceable",
    demoDataIndicator: "SYNTHETIC DEMO DATA ACTIVE",
    switchRole: "Role",
  },
  mr: {
    title: "स्किलट्रेस (SkillTrace)",
    tagline: "प्रत्येक कौशल्याचा रोजगारापर्यंत मागोवा",
    dashboard: "प्रशासकीय डॅशबोर्ड",
    trainees: "प्रशिक्षणार्थी व्यवस्थापन",
    followups: "पाठपुरावा इंजिन",
    employerVerif: "रोजगारदाता पडताळणी",
    outcomes: "निष्कर्ष वर्गीकरण",
    skillGap: "कौशल्य दरी एआय (AI)",
    analytics: "प्रगत विश्लेषण",
    providers: "प्रशिक्षण संस्था",
    districts: "जिल्हास्तरीय विश्लेषण",
    reports: "अहवाल आणि निर्यात",
    consent: "समती व्यवस्थापक",
    architecture: "सिस्टम आर्किटेक्चर",
    remedial: "उपयात्मक कृती",
    totalTrainees: "एकूण प्रशिक्षणार्थी",
    certified: "प्रमाणित",
    employed: "रोजगारप्राप्त",
    retained: "कायम रोजगार (180 दिवस)",
    selfEmployed: "स्वयंरोजगार",
    apprentices: "प्रशिक्षणार्थी (Apprentice)",
    unemployed: "बेरोजगार",
    untraceable: "संपर्क न झालेले",
    demoDataIndicator: "कृत्रिम डेमो डेटा सक्रिय",
    switchRole: "भूमिका",
  },
  hi: {
    title: "स्किलट्रेस (SkillTrace)",
    tagline: "हर कौशल को आजीविका से जोड़ें",
    dashboard: "प्रशासनिक डैशबोर्ड",
    trainees: "प्रशिक्षु प्रबंधन",
    followups: "अनुवर्ती कार्रवाई (Follow-up)",
    employerVerif: "नियोक्ता सत्यापन",
    outcomes: "परिणाम वर्गीकरण",
    skillGap: "कौशल अंतर एआई (AI)",
    analytics: "उन्नत विश्लेषण",
    providers: "प्रशिक्षण संस्थान",
    districts: "जिला विश्लेषण",
    reports: "रिपोर्ट और निर्यात",
    consent: "सहमति प्रबंधक",
    architecture: "सिस्टम आर्किटेक्चर",
    remedial: "उपचारात्मक कार्रवाई",
    totalTrainees: "कुल प्रशिक्षु",
    certified: "प्रमाणित",
    employed: "रोजगार प्राप्त",
    retained: "स्थायी रोजगार (180 दिन)",
    selfEmployed: "स्वरोजगार",
    apprentices: "शिक्षु (Apprentice)",
    unemployed: "बेरोजगार",
    untraceable: "अज्ञात",
    demoDataIndicator: "सिंथेटिक डेमो डेटा सक्रिय",
    switchRole: "भूमिका",
  },
};

interface AppContextType {
  activeView: string;
  setActiveView: (view: string) => void;
  selectedTraineeId: string | null;
  setSelectedTraineeId: (id: string | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  t: Translations;
  trainees: Trainee[];
  updateTraineeOutcome: (traineeId: string, outcome: OutcomeType, employer?: string, salaryBand?: string, jobRole?: string) => void;
  followups: FollowUpRecord[];
  simulateFollowup: (id: string) => void;
  sendNewFollowup: (traineeId: string, milestone: "T+30" | "T+90" | "T+180" | "T+365", channel: "WhatsApp" | "SMS" | "IVR") => void;
  verifications: EmployerVerificationRecord[];
  updateEmployerVerification: (id: string, status: "Verified" | "Rejected" | "Correction Requested", notes?: string) => void;
  consents: Record<string, ConsentRecord>;
  toggleConsent: (traineeId: string, field: keyof ConsentRecord) => void;
  remedialActions: RemedialActionItem[];
  addRemedialAction: (action: Omit<RemedialActionItem, "id">) => void;
  updateRemedialStatus: (id: string, status: RemedialActionItem["status"]) => void;
  isGuidedDemoActive: boolean;
  setIsGuidedDemoActive: (active: boolean) => void;
  guidedStep: number;
  setGuidedStep: (step: number) => void;
  viewTraineeProfile: (traineeId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<string>("landing");
  const [selectedTraineeId, setSelectedTraineeId] = useState<string | null>("TR-2026-1001");
  const [language, setLanguage] = useState<Language>("en");
  const [userRole, setUserRole] = useState<UserRole>("Administrator");
  const [isGuidedDemoActive, setIsGuidedDemoActive] = useState<boolean>(false);
  const [guidedStep, setGuidedStep] = useState<number>(1);

  const [trainees, setTrainees] = useState<Trainee[]>(MOCK_TRAINEES);
  const [followups, setFollowups] = useState<FollowUpRecord[]>(MOCK_FOLLOWUPS);
  const [verifications, setVerifications] = useState<EmployerVerificationRecord[]>(MOCK_VERIFICATIONS);
  const [consents, setConsents] = useState<Record<string, ConsentRecord>>(MOCK_CONSENTS);
  const [remedialActions, setRemedialActions] = useState<RemedialActionItem[]>(MOCK_REMEDIAL_ACTIONS);

  const t = DICTIONARY[language];

  const viewTraineeProfile = (traineeId: string) => {
    setSelectedTraineeId(traineeId);
    setActiveView("trainee-profile");
  };

  const updateTraineeOutcome = (
    traineeId: string,
    outcome: OutcomeType,
    employer?: string,
    salaryBand?: string,
    jobRole?: string
  ) => {
    setTrainees((prev) =>
      prev.map((item) => {
        if (item.id === traineeId) {
          return {
            ...item,
            currentOutcome: outcome,
            employer: employer || item.employer,
            salaryBand: salaryBand || item.salaryBand,
            jobRole: jobRole || item.jobRole,
            confidenceScore: Math.min(99, item.confidenceScore + 5),
            verificationSource: "Manual Outcome Engine Update",
          };
        }
        return item;
      })
    );
  };

  const simulateFollowup = (id: string) => {
    setFollowups((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: "Responded",
            responseDate: new Date().toISOString().split("T")[0],
            responseContent: "Trainee verified status: Employed at full capacity.",
          };
        }
        return item;
      })
    );
  };

  const sendNewFollowup = (
    traineeId: string,
    milestone: "T+30" | "T+90" | "T+180" | "T+365",
    channel: "WhatsApp" | "SMS" | "IVR"
  ) => {
    const targetTrainee = trainees.find((t) => t.id === traineeId);
    const newRecord: FollowUpRecord = {
      id: `FOL-${Math.floor(800 + Math.random() * 200)}`,
      traineeId,
      traineeName: targetTrainee ? targetTrainee.name : "Trainee",
      milestone,
      channel,
      status: "Sent",
      sentDate: new Date().toISOString().split("T")[0],
    };
    setFollowups((prev) => [newRecord, ...prev]);

    // Auto-progress status after 1.5 seconds to simulate real-time notification loop
    setTimeout(() => {
      setFollowups((prev) =>
        prev.map((f) => (f.id === newRecord.id ? { ...f, status: "Delivered" } : f))
      );
    }, 1200);
  };

  const updateEmployerVerification = (
    id: string,
    status: "Verified" | "Rejected" | "Correction Requested",
    notes?: string
  ) => {
    setVerifications((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            verificationStatus: status,
            confidenceScore: status === "Verified" ? 98 : 40,
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return item;
      })
    );
  };

  const toggleConsent = (traineeId: string, field: keyof ConsentRecord) => {
    setConsents((prev) => {
      const current = prev[traineeId] || {
        traineeId,
        personalInfo: true,
        employmentFollowup: true,
        employerVerification: true,
        communication: true,
        analytics: true,
        dataSharing: true,
        consentDate: "2025-06-10",
        status: "Active",
        history: [],
      };

      if (typeof current[field] === "boolean") {
        const updatedVal = !current[field];
        const updatedHistory = [
          {
            date: new Date().toISOString().split("T")[0],
            action: `Toggled ${String(field)} to ${updatedVal ? "Granted" : "Revoked"}`,
            actor: "Trainee Portal",
          },
          ...current.history,
        ];
        return {
          ...prev,
          [traineeId]: {
            ...current,
            [field]: updatedVal,
            history: updatedHistory,
          },
        };
      }
      return prev;
    });
  };

  const addRemedialAction = (actionData: Omit<RemedialActionItem, "id">) => {
    const newItem: RemedialActionItem = {
      ...actionData,
      id: `ACT-${Math.floor(104 + Math.random() * 90)}`,
    };
    setRemedialActions((prev) => [newItem, ...prev]);
  };

  const updateRemedialStatus = (id: string, status: RemedialActionItem["status"]) => {
    setRemedialActions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedTraineeId,
        setSelectedTraineeId,
        language,
        setLanguage,
        userRole,
        setUserRole,
        t,
        trainees,
        updateTraineeOutcome,
        followups,
        simulateFollowup,
        sendNewFollowup,
        verifications,
        updateEmployerVerification,
        consents,
        toggleConsent,
        remedialActions,
        addRemedialAction,
        updateRemedialStatus,
        isGuidedDemoActive,
        setIsGuidedDemoActive,
        guidedStep,
        setGuidedStep,
        viewTraineeProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
