"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { LandingPage } from "@/components/LandingPage";
import { AdminDashboard } from "@/components/AdminDashboard";
import { TraineeManagement } from "@/components/TraineeManagement";
import { TraineeProfile } from "@/components/TraineeProfile";
import { ConsentManager } from "@/components/ConsentManager";
import { TokenIdentityResolution } from "@/components/TokenIdentityResolution";
import { FollowUpEngine } from "@/components/FollowUpEngine";
import { EmployerVerification } from "@/components/EmployerVerification";
import { OutcomeEngine } from "@/components/OutcomeEngine";
import { SelfEmpApprenticeship } from "@/components/SelfEmpApprenticeship";
import { SkillGapAI } from "@/components/SkillGapAI";
import { UnemploymentReasons } from "@/components/UnemploymentReasons";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { ProviderScorecard } from "@/components/ProviderScorecard";
import { DistrictHeatmap } from "@/components/DistrictHeatmap";
import { ReportsModule } from "@/components/ReportsModule";
import { RemedialAction } from "@/components/RemedialAction";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import { GuidedDemoModal } from "@/components/GuidedDemoModal";

export default function Home() {
  const { activeView } = useApp();

  if (activeView === "landing") {
    return (
      <main className="min-h-screen bg-slate-50">
        <LandingPage />
        <GuidedDemoModal />
      </main>
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <AdminDashboard />;
      case "trainees":
        return <TraineeManagement />;
      case "trainee-profile":
        return <TraineeProfile />;
      case "consent":
        return <ConsentManager />;
      case "token-identity":
        return <TokenIdentityResolution />;
      case "followups":
        return <FollowUpEngine />;
      case "employer-verif":
        return <EmployerVerification />;
      case "outcomes":
        return <OutcomeEngine />;
      case "self-emp-apprentice":
        return <SelfEmpApprenticeship />;
      case "skill-gap":
        return <SkillGapAI />;
      case "unemployment":
        return <UnemploymentReasons />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "providers":
        return <ProviderScorecard />;
      case "districts":
        return <DistrictHeatmap />;
      case "reports":
        return <ReportsModule />;
      case "remedial":
        return <RemedialAction />;
      case "architecture":
        return <SystemArchitecture />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Header />
        <main className="flex-1">{renderActiveView()}</main>
        <GuidedDemoModal />
      </div>
    </div>
  );
}
