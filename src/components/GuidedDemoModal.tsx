"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { PlayCircle, ArrowRight, CheckCircle2, ChevronRight, X } from "lucide-react";

export const GuidedDemoModal: React.FC = () => {
  const {
    isGuidedDemoActive,
    setIsGuidedDemoActive,
    guidedStep,
    setGuidedStep,
    setActiveView,
    viewTraineeProfile,
    trainees,
    simulateFollowup,
    followups,
  } = useApp();

  if (!isGuidedDemoActive) return null;

  const demoSteps = [
    {
      step: 1,
      title: "1. Open Admin Dashboard",
      desc: "Overview of state-wide KPIs and initial outcome tracking metrics.",
      action: () => setActiveView("dashboard"),
    },
    {
      step: 2,
      title: "2. Select Trainee (Aarav Sharma)",
      desc: "Open Trainee Management directory to locate candidate.",
      action: () => setActiveView("trainees"),
    },
    {
      step: 3,
      title: "3. View Secure Token ID (ST-7X29-AB84)",
      desc: "Examine privacy-preserving zero-knowledge Token ID identity mapping.",
      action: () => viewTraineeProfile("TR-2026-1001"),
    },
    {
      step: 4,
      title: "4. Open Longitudinal Timeline",
      desc: "Observe the 30, 90, 180, and 365-day outcome tracking milestones.",
      action: () => setActiveView("trainee-profile"),
    },
    {
      step: 5,
      title: "5. Training & Certification Records",
      desc: "Confirm certified skills and course completion status.",
      action: () => setActiveView("token-identity"),
    },
    {
      step: 6,
      title: "6. Simulate 30-Day Follow-Up",
      desc: "Trigger multi-channel WhatsApp check-in and receive response.",
      action: () => {
        setActiveView("followups");
        if (followups[0]) simulateFollowup(followups[0].id);
      },
    },
    {
      step: 7,
      title: "7. Employer Verification Portal",
      desc: "Corporate portal confirms employment status, designation, and wage band.",
      action: () => setActiveView("employer-verif"),
    },
    {
      step: 8,
      title: "8. Update Employment Outcome",
      desc: "Outcome engine classifies trainee into 'Employed & Retained'.",
      action: () => setActiveView("outcomes"),
    },
    {
      step: 9,
      title: "9. Verify Confidence Score (96%)",
      desc: "Check cross-verified confidence rating score.",
      action: () => setActiveView("outcomes"),
    },
    {
      step: 10,
      title: "10. Open Skill-Gap AI Engine",
      desc: "Inspect live market demand vs curriculum mismatch analysis.",
      action: () => setActiveView("skill-gap"),
    },
    {
      step: 11,
      title: "11. Detected Skill Gap Insights",
      desc: "Review AI-generated recommended training modules.",
      action: () => setActiveView("skill-gap"),
    },
    {
      step: 12,
      title: "12. Open Advanced Analytics",
      desc: "Examine retention curves and provider benchmark funnels.",
      action: () => setActiveView("analytics"),
    },
    {
      step: 13,
      title: "13. District & Provider Benchmarks",
      desc: "Observe how outcome updates flow into district statistics.",
      action: () => setActiveView("districts"),
    },
    {
      step: 14,
      title: "14. Mandate Remedial Action Item",
      desc: "Create policy intervention and assign department deadline.",
      action: () => setActiveView("remedial"),
    },
  ];

  const currentStepObj = demoSteps.find((s) => s.step === guidedStep) || demoSteps[0];

  const handleNext = () => {
    if (guidedStep < demoSteps.length) {
      const nextStep = guidedStep + 1;
      setGuidedStep(nextStep);
      demoSteps.find((s) => s.step === nextStep)?.action();
    } else {
      setIsGuidedDemoActive(false);
    }
  };

  const handlePrev = () => {
    if (guidedStep > 1) {
      const prevStep = guidedStep - 1;
      setGuidedStep(prevStep);
      demoSteps.find((s) => s.step === prevStep)?.action();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-slate-900 text-white border-2 border-teal-500/80 rounded-2xl shadow-2xl p-5 space-y-4 backdrop-blur-xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-teal-400" />
          <span className="font-extrabold text-xs uppercase tracking-wider text-teal-300">
            SIH 2026 Presentation Tour
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">
            Step {guidedStep} / {demoSteps.length}
          </span>
          <button
            onClick={() => setIsGuidedDemoActive(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-extrabold text-white">{currentStepObj.title}</h4>
        <p className="text-xs text-slate-300 leading-relaxed">{currentStepObj.desc}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gov-teal h-full transition-all duration-300"
          style={{ width: `${(guidedStep / demoSteps.length) * 100}%` }}
        />
      </div>

      {/* Controller Buttons */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          disabled={guidedStep === 1}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg transition-all"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-1.5 bg-gov-teal hover:bg-teal-600 text-slate-950 font-extrabold text-xs rounded-lg flex items-center gap-1.5 shadow-md transition-all"
        >
          <span>{guidedStep === demoSteps.length ? "Finish Tour" : "Next Step"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
