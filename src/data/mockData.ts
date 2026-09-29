import {
  Trainee,
  ConsentRecord,
  FollowUpRecord,
  EmployerVerificationRecord,
  TrainingProvider,
  DistrictMetric,
  RemedialActionItem,
} from "../types";

export const COURSES = [
  "Data Entry & Office Automation",
  "Solar PV Installer & Technician",
  "Retail Sales Associate",
  "Healthcare Assistant / GDA",
  "Electrician & Wiring Specialist",
  "CNC Machine Operator",
  "Automotive Service Technician",
  "Digital Marketing Executive",
];

export const DISTRICTS = [
  "Pune",
  "Mumbai Suburban",
  "Nagpur",
  "Nashik",
  "Chhatrapati Sambhajinagar",
  "Thane",
  "Solapur",
  "Amravati",
];

export const MOCK_PROVIDERS: TrainingProvider[] = [
  {
    id: "TP-101",
    name: "Apex Skill Development Institute",
    district: "Pune",
    traineesTrained: 420,
    certificationRate: 94.2,
    placementRate: 78.5,
    retentionRate90: 82.1,
    wageGrowthRate: 14.3,
    traceabilityRate: 96.0,
    skillGapRate: 18.5,
  },
  {
    id: "TP-102",
    name: "Maharashtra Vocational Training Centre",
    district: "Mumbai Suburban",
    traineesTrained: 650,
    certificationRate: 91.0,
    placementRate: 72.0,
    retentionRate90: 75.4,
    wageGrowthRate: 11.2,
    traceabilityRate: 91.5,
    skillGapRate: 24.1,
  },
  {
    id: "TP-103",
    name: "Sahyadri Technical Academy",
    district: "Nashik",
    traineesTrained: 310,
    certificationRate: 96.5,
    placementRate: 84.0,
    retentionRate90: 88.0,
    wageGrowthRate: 18.0,
    traceabilityRate: 98.2,
    skillGapRate: 12.0,
  },
  {
    id: "TP-104",
    name: "Vidarbha Industrial Skilling Foundation",
    district: "Nagpur",
    traineesTrained: 290,
    certificationRate: 88.4,
    placementRate: 64.5,
    retentionRate90: 68.2,
    wageGrowthRate: 8.5,
    traceabilityRate: 85.0,
    skillGapRate: 31.0,
  },
  {
    id: "TP-105",
    name: "Marathwada Skill Excellence Center",
    district: "Chhatrapati Sambhajinagar",
    traineesTrained: 380,
    certificationRate: 92.8,
    placementRate: 69.4,
    retentionRate90: 71.0,
    wageGrowthRate: 9.8,
    traceabilityRate: 89.0,
    skillGapRate: 27.5,
  },
  {
    id: "TP-106",
    name: "Thane GreenTech Skilling Hub",
    district: "Thane",
    traineesTrained: 510,
    certificationRate: 95.0,
    placementRate: 81.2,
    retentionRate90: 84.5,
    wageGrowthRate: 16.5,
    traceabilityRate: 94.0,
    skillGapRate: 15.2,
  },
  {
    id: "TP-107",
    name: "Solapur Rural Livelihood Institute",
    district: "Solapur",
    traineesTrained: 240,
    certificationRate: 89.0,
    placementRate: 61.0,
    retentionRate90: 62.5,
    wageGrowthRate: 6.4,
    traceabilityRate: 82.0,
    skillGapRate: 35.0,
  },
  {
    id: "TP-108",
    name: "Amravati Vocational Training Trust",
    district: "Amravati",
    traineesTrained: 280,
    certificationRate: 90.5,
    placementRate: 65.0,
    retentionRate90: 69.0,
    wageGrowthRate: 7.9,
    traceabilityRate: 86.5,
    skillGapRate: 29.8,
  },
  {
    id: "TP-109",
    name: "Konkan Maritime & Logistics Academy",
    district: "Thane",
    traineesTrained: 330,
    certificationRate: 97.0,
    placementRate: 86.4,
    retentionRate90: 89.2,
    wageGrowthRate: 19.1,
    traceabilityRate: 97.5,
    skillGapRate: 10.5,
  },
  {
    id: "TP-110",
    name: "Pune Advanced Robotics & CNC Center",
    district: "Pune",
    traineesTrained: 490,
    certificationRate: 98.1,
    placementRate: 89.0,
    retentionRate90: 91.5,
    wageGrowthRate: 22.4,
    traceabilityRate: 99.0,
    skillGapRate: 8.4,
  },
];

export const MOCK_DISTRICTS: DistrictMetric[] = [
  {
    name: "Pune",
    code: "PU",
    traineesCount: 910,
    placementRate: 84.2,
    skillGapIntensity: 13.5,
    unemploymentRate: 9.8,
    retentionRate: 86.8,
  },
  {
    name: "Mumbai Suburban",
    code: "MS",
    traineesCount: 1120,
    placementRate: 79.5,
    skillGapIntensity: 18.2,
    unemploymentRate: 12.1,
    retentionRate: 80.4,
  },
  {
    name: "Nashik",
    code: "NK",
    traineesCount: 540,
    placementRate: 83.0,
    skillGapIntensity: 14.1,
    unemploymentRate: 10.5,
    retentionRate: 85.0,
  },
  {
    name: "Thane",
    code: "TH",
    traineesCount: 840,
    placementRate: 83.8,
    skillGapIntensity: 13.2,
    unemploymentRate: 10.2,
    retentionRate: 86.1,
  },
  {
    name: "Nagpur",
    code: "NG",
    traineesCount: 480,
    placementRate: 65.4,
    skillGapIntensity: 31.0,
    unemploymentRate: 22.4,
    retentionRate: 68.0,
  },
  {
    name: "Chhatrapati Sambhajinagar",
    code: "CS",
    traineesCount: 610,
    placementRate: 70.1,
    skillGapIntensity: 26.8,
    unemploymentRate: 18.5,
    retentionRate: 72.3,
  },
  {
    name: "Solapur",
    code: "SO",
    traineesCount: 390,
    placementRate: 62.0,
    skillGapIntensity: 34.5,
    unemploymentRate: 25.2,
    retentionRate: 63.5,
  },
  {
    name: "Amravati",
    code: "AM",
    traineesCount: 410,
    placementRate: 66.2,
    skillGapIntensity: 29.4,
    unemploymentRate: 21.0,
    retentionRate: 69.2,
  },
];

// Helper to generate 100 realistic synthetic trainees
const generateMockTrainees = (): Trainee[] => {
  const names = [
    "Aarav Sharma", "Priya Kulkarni", "Rahul Patil", "Ananya Deshmukh", "Siddharth Joshi",
    "Sneha Pawar", "Rohan Shinde", "Pooja Jadhav", "Aditya More", "Tanvi Bhosale",
    "Vikram Chavan", "Neha Gaikwad", "Karan Wagh", "Divya Sawant", "Amit Mane",
    "Rutuja Kamble", "Sagar Salunkhe", "Meera Gokhale", "Akash Jagtap", "Swati Kadam",
    "Omkar Phadke", "Isha Apte", "Pranav Kale", "Sayali Gadgil", "Abhishek Thorat",
    "Shruti Muley", "Harshvardhan Gore", "Ashwini Mahajan", "Tejas Nawale", "Pallavi Shirke",
    "Nikhil Bandal", "Shraddha Chaudhari", "Mayur Dhumal", "Komal Sonawane", "Varun Chitre",
    "Prachi Shelar", "Deepak Koli", "Trupti Nikam", "Sanjay Bhandari", "Radhika Godbole",
    "Gaurav Ingle", "Bhagyashree Kharat", "Chetan Mahadik", "Urmila Solanki", "Dhananjay Surve",
    "Monika Ghoge", "Swapnil Devkar", "Ragini Borse", "Vinay Rane", "Sanika Londhe",
    "Mahesh Sutar", "Ankita Shelke", "Vikas Popat", "Aarti Shelke", "Nilesh Kambale",
    "Pramod Paranjape", "Kavita Datar", "Yogesh Bapat", "Richa Chiplunkar", "Sujoy Kelkar",
    "Standard Trainee 61", "Standard Trainee 62", "Standard Trainee 63", "Standard Trainee 64", "Standard Trainee 65",
    "Standard Trainee 66", "Standard Trainee 67", "Standard Trainee 68", "Standard Trainee 69", "Standard Trainee 70",
    "Standard Trainee 71", "Standard Trainee 72", "Standard Trainee 73", "Standard Trainee 74", "Standard Trainee 75",
    "Standard Trainee 76", "Standard Trainee 77", "Standard Trainee 78", "Standard Trainee 79", "Standard Trainee 80",
    "Standard Trainee 81", "Standard Trainee 82", "Standard Trainee 83", "Standard Trainee 84", "Standard Trainee 85",
    "Standard Trainee 86", "Standard Trainee 87", "Standard Trainee 88", "Standard Trainee 89", "Standard Trainee 90",
    "Standard Trainee 91", "Standard Trainee 92", "Standard Trainee 93", "Standard Trainee 94", "Standard Trainee 95",
    "Standard Trainee 96", "Standard Trainee 97", "Standard Trainee 98", "Standard Trainee 99", "Standard Trainee 100"
  ];

  const outcomes = [
    "Employed", "Employed", "Employed", "Retained", "Wage Growth",
    "Self-employed", "Apprenticeship", "Further Study", "Unemployed", "Untraceable"
  ] as const;

  const employers = [
    "Tata Consultancy Services", "Mahindra & Mahindra", "Bajaj Auto Ltd", "Infosys BPM",
    "Reliance Retail", "Larsen & Toubro", "Kirloskar Brothers", "Force Motors", "Self Enterprise", "N/A"
  ];

  const salaryBands = ["₹12,000 - ₹15,000", "₹15,001 - ₹20,000", "₹20,001 - ₹28,000", "₹28,000+", "Stipend ₹8,500", "N/A"];

  return Array.from({ length: 100 }).map((_, i) => {
    const id = `TR-2026-${(1001 + i).toString()}`;
    const tokenHex1 = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const tokenHex2 = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const tokenId = `ST-${tokenHex1.padStart(4, '7X')}-${tokenHex2.padStart(4, 'AB')}`;
    const outcome = outcomes[i % outcomes.length];
    const course = COURSES[i % COURSES.length];
    const providerObj = MOCK_PROVIDERS[i % MOCK_PROVIDERS.length];
    const district = DISTRICTS[i % DISTRICTS.length];
    const gender = i % 2 === 0 ? "Male" : "Female";
    const ageGroup = (["18-21", "22-25", "26-30", "30+"] as const)[i % 4];
    const retentionDays = [30, 90, 180, 365][i % 4];
    const confidenceScore = Math.floor(75 + Math.random() * 23);

    let employer = employers[i % (employers.length - 1)];
    let salaryBand = salaryBands[i % 4];
    let jobRole = "Junior Specialist";

    if (course.includes("Data Entry")) jobRole = "Data Entry Operator / Assistant";
    if (course.includes("Solar")) jobRole = "Solar Installation Technician";
    if (course.includes("Retail")) jobRole = "Customer Sales Executive";
    if (course.includes("Healthcare")) jobRole = "General Duty Assistant";
    if (course.includes("CNC")) jobRole = "CNC Machine Operator";

    if (outcome === "Self-employed") {
      employer = `${names[i].split(" ")[0]} Micro-Services`;
      salaryBand = "₹18,000 - ₹25,000";
      jobRole = "Proprietor / Independent Contractor";
    } else if (outcome === "Apprenticeship") {
      employer = "Government Industrial Workshop";
      salaryBand = "Stipend ₹9,000";
      jobRole = "Trade Apprentice";
    } else if (outcome === "Unemployed" || outcome === "Untraceable" || outcome === "Further Study") {
      employer = "N/A";
      salaryBand = "N/A";
      jobRole = outcome === "Further Study" ? "Diploma Student" : "N/A";
    }

    const unemploymentReason = outcome === "Unemployed"
      ? ["Lack of required skills", "Salary too low", "No suitable local jobs", "Course-job mismatch"][i % 4]
      : undefined;

    return {
      id,
      tokenId,
      name: names[i] || `Trainee #${i + 1}`,
      course,
      provider: providerObj.name,
      district,
      certificationStatus: i % 12 === 0 ? "Assessment Pending" : "Certified",
      currentOutcome: outcome,
      salaryBand,
      employer,
      jobRole,
      retentionDays,
      confidenceScore,
      lastFollowup: `2026-0${(i % 8) + 1}-15`,
      status: "Active",
      gender,
      ageGroup,
      enrolledDate: "2025-06-10",
      certificationDate: "2025-09-25",
      verificationSource: outcome === "Employed" || outcome === "Retained" ? "Employer Portal (API)" : "Self-Reported via WhatsApp",
      skills: ["Basic Operation", "Safety Protocols", "Tool Handling"],
      skillGaps: outcome === "Unemployed" ? ["Advanced Excel", "Communication", "AI Productivity Tools"] : ["Advanced Certification"],
      unemploymentReason,
    };
  });
};

export const MOCK_TRAINEES: Trainee[] = generateMockTrainees();

export const MOCK_CONSENTS: Record<string, ConsentRecord> = {
  "TR-2026-1001": {
    traineeId: "TR-2026-1001",
    personalInfo: true,
    employmentFollowup: true,
    employerVerification: true,
    communication: true,
    analytics: true,
    dataSharing: true,
    consentDate: "2025-06-10",
    status: "Active",
    history: [
      { date: "2025-06-10", action: "Consent Granted at Enrollment", actor: "Trainee via Digital Signature" },
      { date: "2025-09-25", action: "Consent Re-verified at Certification", actor: "Training Center Kiosk" }
    ]
  }
};

export const MOCK_FOLLOWUPS: FollowUpRecord[] = [
  {
    id: "FOL-801",
    traineeId: "TR-2026-1001",
    traineeName: "Aarav Sharma",
    milestone: "T+30",
    channel: "WhatsApp",
    status: "Responded",
    sentDate: "2025-10-25",
    responseDate: "2025-10-25",
    responseContent: "Yes, joined Tata Consultancy Services as Data Entry Assistant."
  },
  {
    id: "FOL-802",
    traineeId: "TR-2026-1001",
    traineeName: "Aarav Sharma",
    milestone: "T+90",
    channel: "WhatsApp",
    status: "Responded",
    sentDate: "2025-12-25",
    responseDate: "2025-12-26",
    responseContent: "Still employed at TCS, salary incremented to ₹18,000."
  },
  {
    id: "FOL-803",
    traineeId: "TR-2026-1002",
    traineeName: "Priya Kulkarni",
    milestone: "T+180",
    channel: "SMS",
    status: "Delivered",
    sentDate: "2026-03-10",
  },
  {
    id: "FOL-804",
    traineeId: "TR-2026-1003",
    traineeName: "Rahul Patil",
    milestone: "T+365",
    channel: "IVR",
    status: "Pending",
    sentDate: "2026-09-20",
  },
  {
    id: "FOL-805",
    traineeId: "TR-2026-1009",
    traineeName: "Aditya More",
    milestone: "T+90",
    channel: "Assisted Call",
    status: "Unresponsive",
    sentDate: "2026-08-01",
  }
];

export const MOCK_VERIFICATIONS: EmployerVerificationRecord[] = [
  {
    id: "EMP-V-501",
    traineeId: "TR-2026-1001",
    traineeName: "Aarav Sharma",
    employerName: "Tata Consultancy Services",
    jobRole: "Data Entry Operator / Assistant",
    joiningDate: "2025-10-01",
    salaryBand: "₹18,000 - ₹25,000",
    employmentStatus: "Full-Time",
    retentionConfirmed: true,
    verificationStatus: "Verified",
    confidenceScore: 96,
    updatedAt: "2026-09-15"
  },
  {
    id: "EMP-V-502",
    traineeId: "TR-2026-1002",
    traineeName: "Priya Kulkarni",
    employerName: "Mahindra & Mahindra",
    jobRole: "Solar Installation Technician",
    joiningDate: "2025-10-15",
    salaryBand: "₹20,001 - ₹28,000",
    employmentStatus: "Full-Time",
    retentionConfirmed: true,
    verificationStatus: "Verified",
    confidenceScore: 92,
    updatedAt: "2026-09-10"
  },
  {
    id: "EMP-V-503",
    traineeId: "TR-2026-1009",
    traineeName: "Aditya More",
    employerName: "Reliance Retail",
    jobRole: "Customer Sales Executive",
    joiningDate: "2025-11-01",
    salaryBand: "₹12,000 - ₹15,000",
    employmentStatus: "Left",
    retentionConfirmed: false,
    verificationStatus: "Pending",
    confidenceScore: 64,
    updatedAt: "2026-09-18"
  }
];

export const MOCK_REMEDIAL_ACTIONS: RemedialActionItem[] = [
  {
    id: "ACT-101",
    title: "Upgrade Data Entry Curriculum with AI Tools",
    problem: "High unemployment (28%) among Data Entry graduates in Nagpur due to automated tools.",
    detectedReason: "Skill Mismatch: Employers require Advanced Excel, Power Query, and basic AI prompt engineering.",
    recommendedAction: "Mandate 20-hour module on Advanced Excel + Generative AI productivity tools across all Nagpur ITIs.",
    assignedDepartment: "Directorate of Vocational Education & Training (DVET)",
    deadline: "2026-11-30",
    status: "In Progress",
    priority: "High",
    affectedCourse: "Data Entry & Office Automation",
    affectedDistrict: "Nagpur"
  },
  {
    id: "ACT-102",
    title: "Post-Placement Support & Housing Allowance",
    problem: "Low 180-day retention (58%) for Retail Trainees relocating from Solapur to Pune.",
    detectedReason: "Relocation & Housing Expenses exceeding initial salary bands.",
    recommendedAction: "Introduce ₹2,000/month post-placement stipend support for 3 months for outstation candidates.",
    assignedDepartment: "Maharashtra State Skill Development Society (MSSDS)",
    deadline: "2026-12-15",
    status: "Assigned",
    priority: "High",
    affectedCourse: "Retail Sales Associate",
    affectedDistrict: "Solapur"
  },
  {
    id: "ACT-103",
    title: "Local Solar Micro-Entrepreneurship Scheme",
    problem: "Moderate unemployment in Solar Technicians in Chhatrapati Sambhajinagar despite high rural demand.",
    detectedReason: "Lack of organized local corporate employers.",
    recommendedAction: "Link trainees with MUDRA loans and Solar Vendor registration for self-employment.",
    assignedDepartment: "District Skill Development Committee (DSDC)",
    deadline: "2027-01-20",
    status: "Draft",
    priority: "Medium",
    affectedCourse: "Solar PV Installer & Technician",
    affectedDistrict: "Chhatrapati Sambhajinagar"
  }
];
