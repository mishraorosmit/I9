/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NexusProject } from '../../types.ts';
import {
  X,
  GitBranch,
  ExternalLink,
  Copy,
  Check,
  Users,
  Tag,
  CheckCircle2,
  FolderOpen,
  Lock,
  Layers,
} from 'lucide-react';

interface ProjectInspectDrawerProps {
  project: NexusProject | null;
  onClose: () => void;
}

/**
 * PROJECT INSPECT DRAWER
 * A clean, restrained slide-over archive inspector.
 * Displays authoritative project metadata without launching fake desktop windows.
 */
export const ProjectInspectDrawer: React.FC<ProjectInspectDrawerProps> = ({
  project,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(project, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenGithub = () => {
    const url = project.repository?.url || project.githubUrl;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenDemo = () => {
    const url = project.deployment?.liveUrl || project.demoUrl;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const repoUrl = project.repository?.url || project.githubUrl;
  const demoUrl = project.deployment?.liveUrl || project.demoUrl;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[2px] animate-fadeIn">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} aria-label="Close inspector" />

      {/* Slide-over Archive Dossier */}
      <div className="relative w-full max-w-lg bg-[#FAF6F0] h-full shadow-2xl border-l border-[rgba(10,10,9,0.16)] flex flex-col z-10 overflow-hidden">
        {/* Dossier Header */}
        <div className="p-4 sm:p-5 bg-[#FAF6F0] border-b border-[rgba(10,10,9,0.1)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF5A2A]" />
            <span className="font-mono text-xs font-bold text-[#0A0A09]">
              ARCHIVE DOSSIER // {project.nexusEdition}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 text-[#66615A] hover:text-[#0A0A09] bg-[#F3EEE5] hover:bg-[#EBE5DB] rounded-[2px] transition-colors cursor-pointer border border-[rgba(10,10,9,0.08)]"
              title="Copy project metadata JSON"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#EF5A2A]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#66615A] hover:text-[#0A0A09] bg-[#F3EEE5] hover:bg-[#EBE5DB] rounded-[2px] transition-colors cursor-pointer border border-[rgba(10,10,9,0.08)]"
              title="Close dossier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dossier Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-[#0A0A09]">
          {/* Project Title and Identity */}
          <div className="space-y-1.5 pb-4 border-b border-[rgba(10,10,9,0.1)]">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#EF5A2A]">
              <span>{project.projectNumber}</span>
              <span>//</span>
              <span>{project.status?.toUpperCase() || 'COMPLETED'}</span>
              <span>//</span>
              <span>COHORT {project.year}</span>
            </div>
            <h2 className="font-fraunces font-bold text-2xl sm:text-3xl text-[#0A0A09] tracking-tight">
              {project.name}
            </h2>
            <p className="font-mono text-xs text-[#66615A] uppercase tracking-wider">
              {project.disciplines || project.category}
            </p>
          </div>

          {/* Core Summary */}
          <div className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.1)] rounded-[2px]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF5A2A] block mb-1 font-bold">
              SYSTEM PURPOSE
            </span>
            <p className="font-bitter text-sm text-[#23211E] leading-relaxed">
              {project.description || project.summary}
            </p>
          </div>

          {/* Links & Repository Status */}
          <div className="flex flex-wrap gap-2 pt-1">
            {demoUrl && (
              <button
                onClick={handleOpenDemo}
                className="px-3 py-1.5 bg-[#0A0A09] hover:bg-[#EF5A2A] text-[#F3EEE5] font-mono text-xs rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span>VISIT LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {repoUrl ? (
              <button
                onClick={handleOpenGithub}
                className="px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#EBE5DB] text-[#0A0A09] font-mono text-xs rounded-[2px] border border-[rgba(10,10,9,0.16)] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <GitBranch className="w-3.5 h-3.5 text-[#EF5A2A]" />
                <span>GITHUB REPOSITORY</span>
                <ExternalLink className="w-3 h-3 text-[#66615A]" />
              </button>
            ) : (
              <span className="px-3 py-1.5 bg-[#F3EEE5] text-[#8C8881] font-mono text-xs rounded-[2px] border border-[rgba(10,10,9,0.08)] flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>REPOSITORY RESTRICTED // INTERNAL</span>
              </span>
            )}
          </div>

          {/* Contributors & Leads */}
          <div className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.1)] rounded-[2px] space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF5A2A] flex items-center gap-1.5 font-bold">
              <Users className="w-3 h-3" />
              <span>STUDENT CONTRIBUTORS & LEADS</span>
            </span>
            <ul className="space-y-1">
              {project.leadStudents?.map((lead) => (
                <li key={lead} className="font-mono text-xs text-[#0A0A09] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EF5A2A] rounded-full" />
                  <span>{lead}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Matrix */}
          <div className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.1)] rounded-[2px] space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF5A2A] flex items-center gap-1.5 font-bold">
              <Tag className="w-3 h-3" />
              <span>STACK & ARCHITECTURE</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#F3EEE5] text-[#23211E] font-mono text-[11px] rounded-[2px] border border-[rgba(10,10,9,0.08)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables Checklist */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.1)] rounded-[2px] space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF5A2A] block font-bold">
                SHIPPED ARTIFACT MILESTONES
              </span>
              <ul className="space-y-1.5">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-mono text-xs text-[#4A4640]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#227C4E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Dossier Footer Bar */}
        <div className="p-3 bg-[#FAF6F0] border-t border-[rgba(10,10,9,0.1)] flex items-center justify-between font-mono text-[10px] text-[#8C8881] shrink-0">
          <span>PATH: /archive/nexus/{project.id}</span>
          <span className="text-[#EF5A2A] font-bold">VERIFIED SPEC</span>
        </div>
      </div>
    </div>
  );
};
