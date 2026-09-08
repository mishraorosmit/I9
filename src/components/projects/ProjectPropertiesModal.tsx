/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { NexusProject } from '../../types.ts';
import {
  X,
  Info,
  GitBranch,
  ExternalLink,
  Layers,
  Users,
  CheckCircle2,
  Calendar,
  Lock,
  Cpu,
} from 'lucide-react';

interface ProjectPropertiesModalProps {
  project: NexusProject | null;
  onClose: () => void;
}

/**
 * PROJECT PROPERTIES MODAL
 * Displays factual, authentic metadata from the project data model.
 * Styled in warm cream with editorial typography and fine hairline borders.
 */
export const ProjectPropertiesModal: React.FC<ProjectPropertiesModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const repoUrl =
    typeof project.repository === 'string'
      ? project.repository
      : project.repository?.url || project.githubUrl;
  const demoUrl =
    typeof project.deployment === 'string'
      ? project.deployment
      : project.deployment?.liveUrl || project.deployment?.frontend || project.demoUrl;

  const stackString = Array.isArray(project.technologies)
    ? project.technologies.join(' / ')
    : project.technologies?.all?.join(' / ') || project.tags.join(' / ');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="properties-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF6F0] rounded-[3px] border border-[rgba(10,10,9,0.18)] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#F3EEE5] border-b border-[rgba(10,10,9,0.12)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF5A2A]" />
            <h2 id="properties-modal-title" className="font-mono text-xs font-bold text-[#0A0A09] uppercase tracking-wider">
              {project.nexusEdition} // PROPERTIES & FACTSHEET
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#66615A] hover:text-[#0A0A09] hover:bg-[#EAE4D9] rounded-[2px] transition-colors cursor-pointer"
            aria-label="Close properties"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#0A0A09] text-xs font-mono select-text">
          {/* Main Identifier */}
          <div className="pb-3 border-b border-[rgba(10,10,9,0.1)]">
            <div className="text-[10px] text-[#EF5A2A] font-bold uppercase tracking-widest mb-0.5">
              {project.projectNumber} • COHORT {project.year}
            </div>
            <div className="font-fraunces font-bold text-2xl text-[#0A0A09] tracking-tight">
              {project.name}
            </div>
            <div className="text-[11px] text-[#66615A] uppercase tracking-wider mt-0.5">
              {project.subtitle || project.disciplines}
            </div>
          </div>

          {/* Factual Grid Properties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Edition */}
            <div className="p-3 bg-[#FFFDF9] border border-[rgba(10,10,9,0.08)] rounded-[2px]">
              <span className="text-[9px] text-[#8C8881] uppercase tracking-widest block mb-1">
                EDITION
              </span>
              <span className="font-bold text-[#0A0A09] text-xs">
                {project.nexusEdition}
              </span>
            </div>

            {/* Domain */}
            <div className="p-3 bg-[#FFFDF9] border border-[rgba(10,10,9,0.08)] rounded-[2px]">
              <span className="text-[9px] text-[#8C8881] uppercase tracking-widest block mb-1">
                DOMAIN
              </span>
              <span className="font-bold text-[#0A0A09] text-xs">
                {project.domains?.[0] || project.category}
              </span>
            </div>

            {/* Repository */}
            <div className="p-3 bg-[#FFFDF9] border border-[rgba(10,10,9,0.08)] rounded-[2px]">
              <span className="text-[9px] text-[#8C8881] uppercase tracking-widest block mb-1">
                REPOSITORY
              </span>
              {repoUrl ? (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#EF5A2A] hover:underline flex items-center gap-1 truncate"
                >
                  <GitBranch className="w-3 h-3 shrink-0" />
                  <span className="truncate">available</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                </a>
              ) : (
                <span className="text-[#8C8881] flex items-center gap-1">
                  <Lock className="w-3 h-3 shrink-0" />
                  <span>restricted // internal</span>
                </span>
              )}
            </div>

            {/* Deployment */}
            <div className="p-3 bg-[#FFFDF9] border border-[rgba(10,10,9,0.08)] rounded-[2px]">
              <span className="text-[9px] text-[#8C8881] uppercase tracking-widest block mb-1">
                DEPLOYMENT
              </span>
              {demoUrl ? (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#227C4E] hover:underline flex items-center gap-1 truncate"
                >
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span className="truncate">live active</span>
                </a>
              ) : (
                <span className="text-[#8C8881]">local / unhosted</span>
              )}
            </div>
          </div>

          {/* Full Stack String */}
          <div className="p-3 bg-[#FFFDF9] border border-[rgba(10,10,9,0.08)] rounded-[2px] space-y-1">
            <span className="text-[9px] text-[#8C8881] uppercase tracking-widest block font-bold">
              TECHNOLOGY STACK
            </span>
            <p className="text-xs text-[#23211E] leading-relaxed font-mono">
              {stackString}
            </p>
          </div>

          {/* Squad Leads */}
          <div className="p-3 bg-[#FFFDF9] border border-[rgba(10,10,9,0.08)] rounded-[2px] space-y-1.5">
            <span className="text-[9px] text-[#8C8881] uppercase tracking-widest block font-bold flex items-center gap-1.5">
              <Users className="w-3 h-3 text-[#EF5A2A]" />
              <span>SQUAD LEADS & CONTRIBUTORS</span>
            </span>
            <div className="flex flex-wrap gap-2 text-xs text-[#0A0A09]">
              {project.leadStudents?.map((lead) => (
                <span key={lead} className="px-2 py-0.5 bg-[#F3EEE5] rounded-[2px] border border-[rgba(10,10,9,0.08)]">
                  {lead}
                </span>
              ))}
            </div>
          </div>

          {/* Target Users */}
          {project.users && project.users.length > 0 && (
            <div className="p-3 bg-[#FFFDF9] border border-[rgba(10,10,9,0.08)] rounded-[2px] space-y-1">
              <span className="text-[9px] text-[#8C8881] uppercase tracking-widest block font-bold">
                AUDIENCE & USER SEGMENTS
              </span>
              <div className="text-xs text-[#23211E]">
                {project.users.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#F3EEE5] border-t border-[rgba(10,10,9,0.12)] flex items-center justify-between text-[11px] font-mono text-[#66615A]">
          <span>VERIFIED BY NEXUS REGISTRY</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#0A0A09] hover:bg-[#EF5A2A] text-[#F3EEE5] rounded-[2px] font-bold uppercase transition-colors cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};
