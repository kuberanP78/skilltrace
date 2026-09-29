export type OutcomeType =
  | "Employed"
  | "Retained"
  | "Wage Growth"
  | "Self-employed"
  | "Apprenticeship"
  | "Further Study"
  | "Unemployed"
  | "Seeking Employment"
  | "Untraceable";

export type VerificationStatus = "Verified" | "Pending" | "Unverified" | "Rejected";

export interface Trainee {
  id: string;
  tokenId: string; // ST-7X29-AB84
  name: string;
  course: string;
  provider: string;
  district: string;
  certificationStatus: "Certified" | "In Training" | "Assessment Pending";
  currentOutcome: OutcomeType;
  salaryBand: string;
  employer: string;
  jobRole: string;
  retentionDays: number; // 30, 90, 180, 365
  confidenceScore: number; // e.g. 92%
  lastFollowup: string;
  status: "Active" | "Inactive" | "Archived";
  gender: "Male" | "Female" | "Other";
  ageGroup: "18-21" | "22-25" | "26-30" | "30+";
  enrolledDate: string;
  certificationDate: string;
  verificationSource: string;
  skills: string[];
  skillGaps: string[];
  unemploymentReason?: string;
}

export interface ConsentRecord {
  traineeId: string;
  personalInfo: boolean;
  employmentFollowup: boolean;
  employerVerification: boolean;
  communication: boolean;
  analytics: boolean;
  dataSharing: boolean;
  consentDate: string;
  status: "Active" | "Withdrawn" | "Partial";
  history: {
    date: string;
    action: string;
    actor: string;
  }[];
}

export interface FollowUpRecord {
  id: string;
  traineeId: string;
  traineeName: string;
  milestone: "T+30" | "T+90" | "T+180" | "T+365";
  channel: "WhatsApp" | "SMS" | "IVR" | "Assisted Call";
  status: "Pending" | "Sent" | "Delivered" | "Responded" | "Unresponsive";
  sentDate: string;
  responseDate?: string;
  responseContent?: string;
}

export interface EmployerVerificationRecord {
  id: string;
  traineeId: string;
  traineeName: string;
  employerName: string;
  jobRole: string;
  joiningDate: string;
  salaryBand: string;
  employmentStatus: "Full-Time" | "Part-Time" | "Contract" | "Left";
  retentionConfirmed: boolean;
  verificationStatus: "Verified" | "Pending" | "Rejected" | "Correction Requested";
  confidenceScore: number;
  updatedAt: string;
}

export interface TrainingProvider {
  id: string;
  name: string;
  district: string;
  traineesTrained: number;
  certificationRate: number;
  placementRate: number;
  retentionRate90: number;
  wageGrowthRate: number;
  traceabilityRate: number;
  skillGapRate: number;
}

export interface DistrictMetric {
  name: string;
  code: string;
  traineesCount: number;
  placementRate: number;
  skillGapIntensity: number; // percentage / score
  unemploymentRate: number;
  retentionRate: number;
}

export interface RemedialActionItem {
  id: string;
  title: string;
  problem: string;
  detectedReason: string;
  recommendedAction: string;
  assignedDepartment: string;
  deadline: string;
  status: "Draft" | "Assigned" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  affectedCourse?: string;
  affectedDistrict?: string;
}

export type Language = "en" | "mr" | "hi";
export type UserRole = "Administrator" | "Training Provider" | "Employer" | "Trainee";
