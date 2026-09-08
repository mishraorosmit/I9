/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NexusProject,
  ProjectContributor,
  ProjectDeployment,
  ProjectArchitecture,
  ProjectTechnologies,
} from '../types.ts';

/**
 * ============================================================================
 * AUTHORITATIVE NEXUS PROJECT REGISTRY
 * Source of truth for the complete NEXUS Project Catalogue (Editions 1 through 5).
 * ============================================================================
 */
export const PROJECTS_REGISTRY: NexusProject[] = [
  // --------------------------------------------------------------------------
  // NEXUS E1: ALGOLOG — A DSA JOURNEY PLATFORM SYSTEM
  // --------------------------------------------------------------------------
  {
    id: 'nexus-e1',
    nexusEdition: 'NEXUS E1',
    name: 'ALGOLOG — A DSA JOURNEY PLATFORM SYSTEM',
    shortName: 'ALGOLOG',
    subtitle:
      'A student-first browser-based productivity tool that helps students document, retain, and revise their coding journey from DSA through interview preparation.',
    description:
      'A student-first browser-based productivity tool that helps students document, retain, and revise their coding journey from DSA through interview preparation. Features automated problem scraping across major coding platforms, Gemini-powered code analysis and summaries, synchronized GitHub repository backups, and active recall revision flashcards.',
    problem:
      'Students preparing for technical interviews solve hundreds of coding problems across LeetCode, GeeksforGeeks, CodeChef, and HackerRank, but lack an automated, centralized way to record solutions, analyze algorithmic intuition, and systematically review concepts prior to interview rounds.',
    solution:
      'A unified browser-based productivity platform combining a browser extension for one-click scraping, serverless Gemini AI analysis for automated summaries and edge-case documentation, direct GitHub repository commit synchronization, and spaced-repetition flashcards.',
    domains: ['Developer Tools', 'EdTech', 'AI Systems', 'Productivity'],
    users: ['Students', 'DSA Learners', 'Job & Technical Interview Candidates'],
    features: [
      'GitHub integration',
      'AI summaries',
      'Revision flashcards',
      'GitHub OAuth',
      'Dashboard',
      'Questions solved tracking',
      'Difficulty distribution',
      'Daily activity heatmap',
      'Calendar',
      'Recent activity',
      'Searchable/filterable submissions',
      'Topics for revision',
      'Flashcards',
      'Profile/settings',
      'Browser extension workflow',
      'CodeChef / GFG / HackerRank / LeetCode scraping',
      'GitHub repository synchronization',
      'AI-powered code analysis',
      'Gemini-based analysis',
      'MongoDB-backed user system',
    ],
    architecture: {
      overview:
        'Client-extension workflow scraping multi-platform submissions with backend Gemini AI processing, synced to MongoDB and automated GitHub repo synchronization.',
      components: [
        'Browser Extension (Scraping engine for LeetCode, GFG, CodeChef, HackerRank)',
        'Web Dashboard (Activity heatmap, question analytics, difficulty distribution)',
        'AI Processing Pipeline (Gemini-powered code explanations, complexity analysis, summaries)',
        'Revision Engine (Spaced-repetition flashcards and curated topic review queues)',
        'GitHub Sync Subsystem (Automated repository commit and backup pipeline)',
      ],
    },
    technologies: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Browser Extension API'],
      backend: ['Node.js', 'Express'],
      database: ['MongoDB'],
      devops: ['GitHub Actions', 'Vercel'],
      libraries: ['Gemini AI SDK', 'Heatmap Visualizer', 'OAuth 2.0 Client'],
      all: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'MongoDB',
        'Gemini AI',
        'Browser Extension API',
        'GitHub OAuth',
      ],
    },
    integrations: [
      'GitHub OAuth & Repository Sync',
      'Google Gemini AI API',
      'LeetCode Scraping Engine',
      'GeeksforGeeks Scraping Engine',
      'CodeChef Scraping Engine',
      'HackerRank Scraping Engine',
    ],
    workflow: [
      'Solve DSA problem on LeetCode / GFG / CodeChef / HackerRank',
      'Browser extension extracts code solution, complexity, and problem metadata',
      'Gemini AI analyzes code to generate structured summary, intuition, and edge cases',
      'Solution and AI notes synchronize directly to student\'s personal GitHub repository',
      'Dashboard updates activity heatmap, difficulty distribution, and generates revision flashcards',
    ],
    deployment: undefined,
    repository: undefined,
    frontend: undefined,
    backend: undefined,
    contributors: [],
    futurePlans: [
      'Automated spaced repetition notifications and email reminders',
      'Mock technical interview simulator with real-time AI code feedback',
      'Peer benchmark comparisons and collaborative study rooms',
    ],
    documentationSource: 'NEXUS Project Catalogue — Edition 1',
    status: 'Active',

    // UI Compatibility Properties
    projectNumber: 'NEXUS E1',
    title: 'ALGOLOG',
    category: 'Technology',
    year: '2026',
    summary:
      'A student-first browser-based productivity tool that helps students document, retain, and revise their coding journey from DSA through interview preparation.',
    disciplines: 'DEV TOOLS × AI × EDTECH',
    leadStudents: ['NEXUS Core Engineering Squad'],
    tags: ['React', 'TypeScript', 'Gemini AI', 'MongoDB', 'Browser Extension', 'GitHub OAuth'],
    deliverables: [
      'Browser Extension for Multi-Platform Scraping',
      'Interactive Activity Heatmap & Analytics Dashboard',
      'Automated GitHub Solution Sync Pipeline',
      'Gemini AI Code Analysis & Flashcard Engine',
    ],
    githubUrl: undefined,
    demoUrl: undefined,
  },

  // --------------------------------------------------------------------------
  // NEXUS E2: ARCANUM — ALL-IN-ONE ACADEMIC COMMUNICATION PLATFORM
  // --------------------------------------------------------------------------
  {
    id: 'nexus-e2',
    nexusEdition: 'NEXUS E2',
    name: 'ARCANUM — ALL-IN-ONE ACADEMIC COMMUNICATION PLATFORM',
    shortName: 'ARCANUM',
    subtitle:
      'A secure academic communication platform connecting teachers and students in one professional environment.',
    description:
      'A secure academic communication platform connecting teachers and students in one professional environment. Unifies academic discourse, smart notes and reading distribution with access tracking, indexed Doubt Corner discussions, and faculty consultation scheduling.',
    problem:
      'Academic communication is fractured across informal chat channels and legacy portals, resulting in lost lecture materials, disorganized query discussions, missed consultation hours, and blurred privacy boundaries between students and educators.',
    solution:
      'A dedicated, role-oriented academic workspace with distinct teacher and student toolsets, searchable Doubt Corner discussion threads, smart course material distribution with read tracking, and consultation scheduling.',
    domains: ['Academic Systems', 'EdTech', 'Communication', 'Information Security'],
    users: ['Teachers / Faculty', 'Students', 'Teaching Assistants', 'Academic Mentors'],
    features: [
      'Unified academic communication',
      'Smart notes/material distribution',
      'Resource access tracking',
      'Doubt Corner',
      'Searchable doubt discussions',
      'Consultation hours',
      'Attachments',
      'Notifications',
      'Teacher tools',
      'Student tools',
      'Role-oriented interaction',
      'Security/privacy focus',
    ],
    architecture: {
      overview:
        'Role-based academic communication platform with secure document distribution, searchable discussion threads, and consultation booking.',
      components: [
        'Role-Oriented Access Control (Teacher, Student, Admin personas)',
        'Smart Material Distribution Engine with read/access tracking',
        'Doubt Corner Discussion Matrix with full-text search and tagging',
        'Faculty Consultation Hours Booking and Notification System',
        'Attachment & Media Storage Pipeline',
      ],
    },
    technologies: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'Express'],
      database: ['PostgreSQL / MongoDB'],
      devops: ['Docker', 'Vercel'],
      libraries: ['WebSockets', 'JWT Authentication', 'Markdown Parser'],
      all: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'PostgreSQL',
        'WebSockets',
        'JWT Authentication',
      ],
    },
    integrations: [
      'Campus Directory Authentication',
      'Cloud Document Storage',
      'Email Notification Relay',
    ],
    workflow: [
      'Faculty uploads lecture notes, lab sheets, and assigns reading materials',
      'System tracks student access rates and delivers push/email notifications',
      'Students post conceptual questions in the searchable Doubt Corner',
      'Peers and instructors answer in threaded discussions with rich attachments',
      'Students book 1-on-1 consultation hours directly through teacher availability calendars',
    ],
    deployment: undefined,
    repository: undefined,
    frontend: undefined,
    backend: undefined,
    contributors: [],
    futurePlans: [
      'End-to-end encrypted direct office hours conferencing',
      'Automated syllabus milestone tracker',
      'Integration with university gradebooks and assignment portals',
    ],
    documentationSource: 'NEXUS Project Catalogue — Edition 2',
    status: 'Active',

    // UI Compatibility Properties
    projectNumber: 'NEXUS E2',
    title: 'ARCANUM',
    category: 'Research & Software',
    year: '2026',
    summary:
      'A secure academic communication platform connecting teachers and students in one professional environment.',
    disciplines: 'ACADEMIC SYSTEMS × COMMUNICATION',
    leadStudents: ['NEXUS Academic Tech Squad'],
    tags: ['React', 'TypeScript', 'WebSockets', 'Node.js', 'PostgreSQL', 'JWT Auth'],
    deliverables: [
      'Role-Based Academic Portal for Faculty & Students',
      'Searchable Doubt Corner Discussion Engine',
      'Smart Notes & Resource Tracking Pipeline',
      'Faculty Consultation Hours Booking Module',
    ],
    githubUrl: undefined,
    demoUrl: undefined,
  },

  // --------------------------------------------------------------------------
  // NEXUS E3: CAMPUS COMMUTE — LIVE COLLEGE BUS TRACKING WEBAPP
  // --------------------------------------------------------------------------
  {
    id: 'nexus-e3',
    nexusEdition: 'NEXUS E3',
    name: 'CAMPUS COMMUTE — LIVE COLLEGE BUS TRACKING WEBAPP',
    shortName: 'CAMPUS COMMUTE',
    subtitle:
      'A real-time campus transport management and bus tracking platform for students, drivers, and administrators.',
    description:
      'A real-time campus transport management and bus tracking platform for students, drivers, and administrators. Delivers bidirectional Socket.IO GPS telemetry, live interactive route and stoppage tracking, driver verification, and fleet operations management.',
    problem:
      'Students and campus staff frequently experience missed buses and prolonged wait times due to unpredictable transit delays, lack of live vehicle telemetry, and uncoordinated route schedules.',
    solution:
      'A full-stack live bus tracking ecosystem with driver GPS transmission via mobile web, real-time map telemetry for students, and comprehensive route and fleet administration controls.',
    domains: ['Campus Mobility', 'IoT & Geolocation', 'Real-Time Systems', 'Transit Operations'],
    users: ['Students', 'College Bus Drivers', 'Transport Administrators'],
    features: [
      'Real-time bus location',
      'Route visibility',
      'Stoppage information',
      'Student portal',
      'Driver portal',
      'Admin controls',
      'Socket.IO real-time communication',
      'JWT authentication',
      'Google OAuth',
      'OTP verification',
      'MongoDB',
      'React/Vite/TypeScript/Tailwind',
      'Node/Express',
      'Railway + Vercel deployment',
    ],
    architecture: {
      overview:
        'Full-stack reactive WebSocket infrastructure with driver-side HTML5 Geolocation streaming over Socket.IO to Express backend on Railway, broadcasting live coordinates to student React web clients on Vercel.',
      components: [
        'Driver Telemetry Portal (Mobile GPS coordinate broadcaster with route controls)',
        'Student Transit Map (Live vector bus markers, stoppage timelines, ETA estimator)',
        'Fleet Management Console (Driver authentication, vehicle assignments, route editor)',
        'Socket.IO Real-Time Gateway (Bi-directional low-latency location broadcaster)',
        'Auth & Security Layer (Google OAuth 2.0 + JWT + OTP SMS/Email verification)',
      ],
    },
    technologies: {
      frontend: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'Express'],
      database: ['MongoDB'],
      devops: ['Railway (Backend)', 'Vercel (Frontend)'],
      libraries: ['Socket.IO', 'JWT', 'Google OAuth SDK', 'Leaflet / OpenStreetMap'],
      all: [
        'React',
        'Vite',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'MongoDB',
        'Socket.IO',
        'JWT',
        'Google OAuth',
        'OTP Verification',
        'Railway',
        'Vercel',
      ],
    },
    integrations: [
      'Google OAuth 2.0',
      'HTML5 Geolocation API',
      'OTP SMS/Email Service',
      'Leaflet OpenStreetMap Tiles',
    ],
    workflow: [
      'Driver logs into driver portal with OTP verification and activates GPS route broadcast on departure',
      'Mobile coordinates stream over Socket.IO to the Express backend cluster on Railway',
      'Backend calculates distance matrix and predicted arrival times for downstream stoppages',
      'Students observe live moving bus marker on the map with accurate stoppage timings',
      'Admins monitor fleet health, delay alerts, and manage route configurations',
    ],
    deployment: {
      frontend: 'https://campus-commute-vrpq.vercel.app/',
      backend: 'https://campus-commute.up.railway.app',
      liveUrl: 'https://campus-commute-vrpq.vercel.app/',
      platform: 'Railway + Vercel',
    },
    repository: 'https://github.com/nexushuborg/Nexus-E3',
    frontend: 'https://campus-commute-vrpq.vercel.app/',
    backend: 'https://campus-commute.up.railway.app',
    contributors: [],
    futurePlans: [
      'Crowd density estimation at major campus pickup points',
      'Automated SMS proximity alerts when bus is within 500m of student\'s stop',
      'Offline route timetable caching via Service Worker',
    ],
    documentationSource: 'NEXUS Project Catalogue — Edition 3',
    status: 'Active',

    // UI Compatibility Properties
    projectNumber: 'NEXUS E3',
    title: 'CAMPUS COMMUTE',
    category: 'Technology',
    year: '2026',
    summary:
      'A real-time campus transport management and bus tracking platform for students, drivers, and administrators.',
    disciplines: 'CAMPUS MOBILITY × REAL-TIME IOT',
    leadStudents: ['NEXUS Mobility Squad'],
    tags: ['React', 'Vite', 'TypeScript', 'Socket.IO', 'Node.js', 'MongoDB', 'Railway', 'Vercel'],
    deliverables: [
      'Driver GPS Telemetry Web Portal',
      'Live Student Transit Map & Stoppage Visualizer',
      'Socket.IO Real-Time Geolocation Broadcast Server',
      'Fleet Administration & Driver Verification Suite',
    ],
    githubUrl: 'https://github.com/nexushuborg/Nexus-E3',
    demoUrl: 'https://campus-commute-vrpq.vercel.app/',
  },

  // --------------------------------------------------------------------------
  // NEXUS E4: SOA LIBRARY INFORMATION MANAGEMENT SYSTEM (LIMS)
  // --------------------------------------------------------------------------
  {
    id: 'nexus-e4',
    nexusEdition: 'NEXUS E4',
    name: 'SOA LIBRARY INFORMATION MANAGEMENT SYSTEM (LIMS)',
    shortName: 'SOA LIMS',
    subtitle:
      'A full-stack digital library platform for students, librarians and administrators.',
    description:
      'A full-stack digital library platform for students, librarians and administrators. Features a dynamic catalog explorer, real-time inventory tracking, automated overdue email dispatch via node-cron, Razorpay fine clearance, PDF activity reporting, and Chart.js analytics.',
    problem:
      'University libraries face administrative bottlenecks with manual book circulation logging, delayed overdue notices, friction in fine collection, and lack of actionable inventory insights.',
    solution:
      'An end-to-end library operating system with dynamic catalog exploration, automated overdue cron notifications, Razorpay fine clearance, PDF activity reports, and librarian circulation dashboards.',
    domains: ['Library Science', 'Campus Administration', 'FinTech & Payments', 'Analytics & Reporting'],
    users: ['Students', 'Librarians', 'Library Administrators'],
    features: [
      'Dynamic library explorer',
      'Real-time inventory',
      'Personalized student dashboard',
      'Issue/due tracking',
      'Fine tracking',
      'Theme store',
      'Razorpay payments',
      'PDF activity reports',
      'Librarian inventory management',
      'Student administration',
      'Circulation control',
      'Automated overdue emails',
      'Admin analytics',
      'Chart.js visualizations',
      'Financial monitoring',
      'System health metrics',
      'MongoDB',
      'Express',
      'Node.js',
      'REST APIs',
      'node-cron',
      'Nodemailer',
    ],
    architecture: {
      overview:
        'Full-stack REST API and background scheduler system integrating payment gateways, transactional email queues, and catalog database.',
      components: [
        'Student Library Explorer & Account Dashboard',
        'Circulation & Barcode Management Desk for Librarians',
        'Cron Scheduler (node-cron) for daily overdue scans & automated Nodemailer alerts',
        'Razorpay Payment Gateway integration for instant fine settlements',
        'Admin Analytics & Financial Health Suite with Chart.js visualizations',
        'PDF Generation Subsystem for borrowing receipts and audit logs',
      ],
    },
    technologies: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'Express', 'REST APIs'],
      database: ['MongoDB'],
      devops: ['Vercel'],
      libraries: ['Razorpay SDK', 'node-cron', 'Nodemailer', 'Chart.js', 'PDFKit / jsPDF'],
      all: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'MongoDB',
        'REST APIs',
        'node-cron',
        'Nodemailer',
        'Razorpay',
        'Chart.js',
        'Vercel',
      ],
    },
    integrations: [
      'Razorpay Payment Gateway API',
      'Nodemailer SMTP Email Relay',
      'PDF Generation Engine',
    ],
    workflow: [
      'Student searches dynamic catalog and reserves or checks out books',
      'Librarian validates physical checkout through circulation control dashboard',
      'node-cron triggers nightly scans to identify overdue items and dispatch warning emails via Nodemailer',
      'Student views fines on dashboard and pays instantly via Razorpay',
      'System logs transactions, generates downloadable PDF reports, and refreshes administrative analytics',
    ],
    deployment: {
      frontend: 'https://nexus-p1.vercel.app/',
      liveUrl: 'https://nexus-p1.vercel.app/',
      platform: 'Vercel',
    },
    repository: 'https://github.com/nexushuborg/Nexus-E4',
    frontend: 'https://nexus-p1.vercel.app/',
    backend: undefined,
    contributors: [],
    futurePlans: [
      'RFID automated shelf scanner integration',
      'E-book and research paper PDF viewer with digital annotations',
      'Inter-library book exchange protocol across campus branches',
    ],
    documentationSource: 'NEXUS Project Catalogue — Edition 4',
    status: 'Active',

    // UI Compatibility Properties
    projectNumber: 'NEXUS E4',
    title: 'SOA LIMS',
    category: 'Community Tools',
    year: '2026',
    summary:
      'A full-stack digital library platform for students, librarians and administrators.',
    disciplines: 'CAMPUS ADMIN × FINTECH × DATABASES',
    leadStudents: ['NEXUS Library Systems Squad'],
    tags: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Razorpay',
      'node-cron',
      'Nodemailer',
      'Chart.js',
    ],
    deliverables: [
      'Dynamic Library Explorer & Inventory Portal',
      'Student Borrowing & Fine Management Dashboard',
      'Automated Overdue Email Worker with node-cron & Nodemailer',
      'Razorpay Fine Payment & PDF Activity Report Engine',
    ],
    githubUrl: 'https://github.com/nexushuborg/Nexus-E4',
    demoUrl: 'https://nexus-p1.vercel.app/',
  },

  // --------------------------------------------------------------------------
  // NEXUS E5: SOA CLUBSPHERE — CAMPUS EVENT & CLUB MANAGEMENT PORTAL VERSION 2.0
  // --------------------------------------------------------------------------
  {
    id: 'nexus-e5',
    nexusEdition: 'NEXUS E5',
    name: 'SOA CLUBSPHERE — CAMPUS EVENT & CLUB MANAGEMENT PORTAL VERSION 2.0',
    shortName: 'SOA CLUBSPHERE',
    subtitle: 'A centralized campus club and event management ecosystem.',
    description:
      'A centralized campus club and event management ecosystem. Features club discovery, event RSVPs, structured event feedback, real-time WebSocket announcements, and an enterprise multi-tier approval state machine.',
    problem:
      'Campus clubs and societies operate in isolation with disjointed event promotion, complex manual approval paper trails through student councils, and fragmented participant feedback.',
    solution:
      'An enterprise-grade campus event portal featuring club discovery, event RSVP, multi-tier approval state machine, real-time WebSockets announcements, and interactive Q&A.',
    domains: [
      'Campus Life',
      'Event Management',
      'Governance & Workflow',
      'Enterprise Backend Systems',
    ],
    users: [
      'Students / Attendees',
      'Club Leads / Organizers',
      'Student Council Officers',
      'University Administration',
    ],
    features: [
      'Club discovery',
      'Event discovery',
      'RSVP',
      'Event feedback',
      'Club management',
      'Event approval workflow',
      'Role-based access',
      'Google OAuth',
      'WebSockets',
      'Real-time announcements',
      'Q&A',
      'PostgreSQL',
      'Spring Boot',
      'Spring Security',
      'Redis',
      'S3/MinIO',
      'asynchronous notifications',
      'scheduled operations',
      'soft deletes',
      'pagination',
      'API versioning',
      'rate limiting',
      'OpenAPI/Swagger',
      'event lifecycle state machine',
    ],
    architecture: {
      overview:
        'Enterprise Spring Boot microservice architecture with PostgreSQL relational persistence, Redis cache and message pub/sub, MinIO/S3 object storage, and WebSocket live broadcasting.',
      lifecycle: ['PENDING', 'COUNCIL_APPROVED', 'APPROVED', 'COMPLETED'],
      components: [
        'Club Discovery & Membership Hub',
        'Event Lifecycle State Machine (PENDING → COUNCIL_APPROVED → APPROVED → COMPLETED / REJECTED)',
        'Real-time WebSockets & Redis Pub/Sub for live broadcast announcements & Q&A',
        'Spring Security RBAC with Google OAuth 2.0 and JWT token validation',
        'MinIO / S3 Object Storage for high-resolution event banners and media assets',
        'OpenAPI / Swagger 3.0 documented REST API layer with rate limiting and pagination',
      ],
    },
    technologies: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS'],
      backend: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs'],
      database: ['PostgreSQL', 'Redis'],
      devops: ['Docker', 'MinIO / AWS S3'],
      libraries: ['WebSockets', 'Google OAuth 2.0', 'OpenAPI / Swagger', 'Spring Data JPA'],
      all: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Java',
        'Spring Boot',
        'Spring Security',
        'PostgreSQL',
        'Redis',
        'MinIO / S3',
        'WebSockets',
        'Google OAuth',
        'OpenAPI / Swagger',
      ],
    },
    integrations: [
      'Google OAuth 2.0',
      'AWS S3 / MinIO Object Storage',
      'Redis Pub/Sub Channel',
      'OpenAPI / Swagger API Docs',
    ],
    workflow: [
      'Club leads draft an event proposal with banner uploads to S3/MinIO',
      'Event enters PENDING state and routes to Student Council for review',
      'Council approves (COUNCIL_APPROVED) and routes to Administration for final sanction (APPROVED)',
      'Approved event appears on public campus feed where students RSVP and receive notifications',
      'During and after event, attendees participate in live Q&A, real-time announcements, and submit structured feedback until event transitions to COMPLETED',
    ],
    deployment: undefined,
    repository: undefined,
    frontend: undefined,
    backend: undefined,
    contributors: [],
    futurePlans: [
      'QR code ticket check-in at event venue gates',
      'Budget allocation and reimbursement tracking for student clubs',
      'Automated Certificate of Participation generation for verified attendees',
    ],
    documentationSource: 'NEXUS Project Catalogue — Edition 5 (v2.0)',
    status: 'Active',

    // UI Compatibility Properties
    projectNumber: 'NEXUS E5',
    title: 'SOA CLUBSPHERE',
    category: 'Community Tools',
    year: '2026',
    summary: 'A centralized campus club and event management ecosystem.',
    disciplines: 'CAMPUS LIFE × SPRING BOOT × DISTRIBUTED SYSTEMS',
    leadStudents: ['NEXUS Enterprise Squad'],
    tags: [
      'Spring Boot',
      'Java',
      'PostgreSQL',
      'Redis',
      'WebSockets',
      'React',
      'TypeScript',
      'MinIO',
      'OAuth 2.0',
    ],
    deliverables: [
      'Club Discovery & Event RSVP Portal',
      'Multi-Tier Event Approval State Machine Engine',
      'Real-Time WebSocket Announcement & Q&A Service',
      'Spring Boot 3 + PostgreSQL + Redis Enterprise API',
    ],
    githubUrl: undefined,
    demoUrl: undefined,
  },
];

/**
 * Standard alias export for existing consumers
 */
export const PROJECTS = PROJECTS_REGISTRY;

/**
 * ============================================================================
 * AUTHORITATIVE HELPER FUNCTIONS
 * Safe, robust query utilities that gracefully tolerate missing optional values.
 * ============================================================================
 */

/**
 * Returns all projects in the authoritative catalogue.
 */
export function getProjects(): NexusProject[] {
  return [...PROJECTS_REGISTRY];
}

/**
 * Retrieves a single project by its ID, edition, or title (case-insensitive).
 */
export function getProjectById(id: string): NexusProject | undefined {
  if (!id) return undefined;
  const cleanId = id.trim().toLowerCase();

  return PROJECTS_REGISTRY.find((p) => {
    const pId = p.id.toLowerCase();
    const pEdition = p.nexusEdition.toLowerCase();
    const pShortName = p.shortName.toLowerCase();
    const pTitle = (p.title || '').toLowerCase();
    const pName = p.name.toLowerCase();

    return (
      pId === cleanId ||
      pEdition === cleanId ||
      pShortName === cleanId ||
      pTitle === cleanId ||
      pName.includes(cleanId) ||
      cleanId.endsWith(pId) ||
      pId.endsWith(cleanId)
    );
  });
}

/**
 * Retrieves projects matching a specific NEXUS edition (e.g. "NEXUS E1", "E1", "nexus-e1").
 */
export function getProjectsByEdition(edition: string): NexusProject[] {
  if (!edition) return [];
  const cleanEdition = edition.trim().toLowerCase();

  return PROJECTS_REGISTRY.filter((p) => {
    const pEdition = p.nexusEdition.toLowerCase();
    const pId = p.id.toLowerCase();
    return (
      pEdition === cleanEdition ||
      pEdition.includes(cleanEdition) ||
      pId === cleanEdition ||
      cleanEdition.includes(pId)
    );
  });
}

/**
 * Retrieves projects belonging to a given domain (e.g. "Developer Tools", "EdTech", "Campus Mobility").
 */
export function getProjectsByDomain(domain: string): NexusProject[] {
  if (!domain) return [];
  const cleanDomain = domain.trim().toLowerCase();

  return PROJECTS_REGISTRY.filter((p) => {
    return (
      p.domains.some((d) => d.toLowerCase().includes(cleanDomain)) ||
      (p.disciplines && p.disciplines.toLowerCase().includes(cleanDomain)) ||
      (p.category && p.category.toLowerCase().includes(cleanDomain))
    );
  });
}

/**
 * Returns the documented Git repository URL for a project, or undefined if not documented.
 * Strictly prevents hallucinating or inventing missing repositories.
 */
export function getProjectRepository(id: string): string | undefined {
  const project = getProjectById(id);
  if (!project) return undefined;
  return project.repository || project.githubUrl || undefined;
}

/**
 * Returns an array of technology strings for a project.
 */
export function getProjectTechnologies(id: string): string[] {
  const project = getProjectById(id);
  if (!project) return [];

  if (Array.isArray(project.technologies)) {
    return [...project.technologies];
  }

  if (typeof project.technologies === 'object' && project.technologies !== null) {
    if (Array.isArray(project.technologies.all) && project.technologies.all.length > 0) {
      return [...project.technologies.all];
    }

    const collected: string[] = [];
    if (project.technologies.frontend) collected.push(...project.technologies.frontend);
    if (project.technologies.backend) collected.push(...project.technologies.backend);
    if (project.technologies.database) collected.push(...project.technologies.database);
    if (project.technologies.devops) collected.push(...project.technologies.devops);
    if (project.technologies.libraries) collected.push(...project.technologies.libraries);
    return Array.from(new Set(collected));
  }

  return project.tags ? [...project.tags] : [];
}
