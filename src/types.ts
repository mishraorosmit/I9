/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppRoute = '/' | '/about' | '/projects' | '/gallery' | '/team' | '/contact';

export interface NavItem {
  label: string;
  href: AppRoute;
  description?: string;
}

export interface ProjectContributor {
  name: string;
  role?: string;
  domain?: string;
  github?: string;
  avatar?: string;
}

export interface ProjectDeployment {
  frontend?: string;
  backend?: string;
  liveUrl?: string;
  platform?: string;
}

export interface ProjectArchitecture {
  overview?: string;
  lifecycle?: string[];
  components?: string[];
  diagram?: string;
}

export interface ProjectTechnologies {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  devops?: string[];
  libraries?: string[];
  all?: string[];
}

export interface NexusProject {
  id: string;
  nexusEdition: string;
  name: string;
  shortName: string;
  subtitle?: string;
  description: string;
  problem?: string;
  solution?: string;
  domains: string[];
  users?: string[];
  features: string[];
  architecture?: ProjectArchitecture | string;
  technologies: ProjectTechnologies | string[];
  integrations?: string[];
  workflow?: string[];
  deployment?: ProjectDeployment;
  repository?: string;
  frontend?: string;
  backend?: string;
  contributors?: ProjectContributor[];
  futurePlans?: string[];
  documentationSource?: string;
  status: 'Active' | 'Completed' | 'Incubating' | 'In Development' | 'Production' | string;

  // Backward compatibility fields for existing UI components
  projectNumber: string; // e.g. "NEXUS E1"
  title: string;
  category: 'Technology' | 'Creative Production' | 'Physical Computing' | 'Interactive Systems' | 'Community Tools' | 'Research & Software' | string;
  year: string;
  summary: string;
  disciplines: string;
  leadStudents: string[];
  tags: string[];
  deliverables?: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export type Project = NexusProject;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  group: 'LEADS' | 'CORE MEMBERS' | 'ADVISORS / MENTORS' | 'TECH' | 'DESIGN' | 'MEDIA' | 'PROJECTS' | 'CORE TEAM';
  discipline: string;
  yearOfStudy: string;
  bio?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'People' | 'Workshops' | 'Projects' | 'Events' | 'Prototyping' | 'Collaboration' | 'Presentations';
  eventDate: string;
  description: string;
  location?: string;
  caption: string;
  imageUrl?: string;
  author?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | '21/9' | 'portrait';
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  subtitle: string;
  outcome: string;
}
