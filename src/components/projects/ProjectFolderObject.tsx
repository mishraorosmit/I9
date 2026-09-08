/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NexusProject } from '../../types.ts';
import { ProjectMotif } from './ProjectMotifs.tsx';
import {
  GitBranch,
  Lock,
  ArrowUpRight,
  Maximize2,
} from 'lucide-react';

interface ProjectFolderObjectProps {
  project: NexusProject;
  index: number;
  isHovered: boolean;
  isSelected: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: (project: NexusProject) => void;
  onOpen: (project: NexusProject) => void;
  onContextMenu: (e: React.MouseEvent, project: NexusProject) => void;
}

const EDITION_PHASES: Record<string, { stage: string; theme: string }> = {
  'NEXUS E1': {
    stage: 'PHASE 01 // COGNITION',
    theme: 'Ideas & Problem Solving Frameworks',
  },
  'NEXUS E2': {
    stage: 'PHASE 02 // DISCOURSE',
    theme: 'Academic Knowledge Graph & Communication',
  },
  'NEXUS E3': {
    stage: 'PHASE 03 // MOBILITY',
    theme: 'Live Campus Geolocation Telemetry',
  },
  'NEXUS E4': {
    stage: 'PHASE 04 // INSTITUTION',
    theme: 'Digital Library OS, Automation & Payments',
  },
  'NEXUS E5': {
    stage: 'PHASE 05 // ECOSYSTEM',
    theme: 'Campus-Wide Community & Event Governance',
  },
};

/**
 * PROJECT FOLDER OBJECT
 * An intentional archive object representing a NEXUS project.
 * Microinteractions:
 * - 1–8px vertical displacement
 * - 2px text label tracking displacement
 * - Orange signal beacon activation
 * - Hairline border illumination
 * - Abstract geometric motif with contextual cue
 * - Accessible ARIA states and keyboard handlers
 */
export const ProjectFolderObject: React.FC<ProjectFolderObjectProps> = ({
  project,
  index,
  isHovered,
  isSelected,
  onHoverStart,
  onHoverEnd,
  onSelect,
  onOpen,
  onContextMenu,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const phaseInfo = EDITION_PHASES[project.nexusEdition] || {
    stage: `EDITION 0${index + 1}`,
    theme: project.disciplines || 'SYSTEMS ARCHIVE',
  };

  const repoUrl =
    typeof project.repository === 'string'
      ? project.repository
      : project.repository?.url || project.githubUrl;
  const hasRepo = Boolean(repoUrl);
  const displayTech = Array.isArray(project.technologies)
    ? project.technologies.slice(0, 4)
    : project.technologies?.all?.slice(0, 4) || project.tags.slice(0, 4);

  const isActive = isHovered || isFocused || isSelected;

  return (
    <div
      id={`project-folder-${project.id}`}
      tabIndex={0}
      role="button"
      aria-label={`${project.nexusEdition}: ${project.name}. Press Enter to open workspace.`}
      aria-selected={isSelected}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={() => {
        setIsFocused(true);
        onHoverStart();
      }}
      onBlur={() => {
        setIsFocused(false);
        onHoverEnd();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen(project);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu(e, project);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onOpen(project);
        } else if (e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className={`relative w-full max-w-[420px] transition-all duration-200 ease-out outline-none cursor-pointer group select-none motion-reduce:transform-none ${
        isActive ? '-translate-y-2' : 'translate-y-0'
      }`}
    >
      {/* 1. SELECTION BOUNDARY / HALO (1px crisp orange border offset) */}
      {isSelected && (
        <div
          className="absolute -inset-1.5 bg-[#EF5A2A]/10 rounded-[4px] border border-[#EF5A2A]/40 pointer-events-none z-0 transition-opacity duration-150 motion-reduce:transition-none"
          aria-hidden="true"
        />
      )}

      {/* 2. ARCHIVE FOLDER TAB (Asymmetric stamped tab with orange signal dot) */}
      <div className="relative z-10 flex items-end justify-between pr-2">
        <div
          className={`relative px-4 pt-1.5 pb-1 rounded-t-[3px] border-t border-l border-r font-mono text-[10px] tracking-wider uppercase font-bold flex items-center gap-2 transition-colors duration-150 ${
            isSelected
              ? 'bg-[#FAF6F0] border-[#EF5A2A] text-[#0A0A09] shadow-xs'
              : isActive
              ? 'bg-[#FAF6F0] border-[#EF5A2A] text-[#0A0A09]'
              : 'bg-[#EAE4D9] border-[rgba(10,10,9,0.14)] text-[#66615A]'
          }`}
        >
          {/* Restrained orange cursor / signal dot */}
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              isActive ? 'bg-[#EF5A2A] shadow-[0_0_6px_rgba(239,90,42,0.6)]' : 'bg-[#8C8881]/50'
            }`}
          />
          <span className="transition-transform duration-150 group-hover:translate-x-0.5">
            {project.nexusEdition}
          </span>
          <span className="text-[#8C8881]/60">//</span>
          <span className="text-[9px] text-[#8C8881] font-normal">PKG.0{index + 1}</span>

          {/* Hairline tab bottom connector */}
          <div className="absolute -bottom-px left-0 right-0 h-px bg-[#FAF6F0] z-20" />
        </div>

        {/* Top Right Stage Metadata Cue */}
        <div className="text-[9px] font-mono tracking-widest text-[#8C8881] uppercase hidden xs:block">
          {phaseInfo.stage}
        </div>
      </div>

      {/* 3. MAIN FOLDER CONTAINER */}
      <div
        className={`relative z-10 w-full p-5 sm:p-6 bg-[#FAF6F0] rounded-b-[3px] rounded-tr-[3px] border transition-all duration-200 ${
          isSelected
            ? 'border-[#EF5A2A] shadow-[0_8px_24px_rgba(239,90,42,0.14)] bg-[#FFFDF9] ring-1 ring-[#EF5A2A]'
            : isActive
            ? 'border-[#EF5A2A] shadow-[0_6px_20px_rgba(10,10,9,0.08)] bg-[#FFFDF9]'
            : 'border-[rgba(10,10,9,0.14)] shadow-[0_2px_8px_rgba(10,10,9,0.02)]'
        }`}
      >
        {/* Subtle geometric microgrid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] rounded-b-[3px]"
          style={{
            backgroundImage: 'radial-gradient(#0A0A09 0.75px, transparent 0.75px)',
            backgroundSize: '12px 12px',
          }}
          aria-hidden="true"
        />

        {/* Top Header: Domain & Authentic Repository Indicator */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-3.5 border-b border-[rgba(10,10,9,0.08)]">
          <span className="font-dosis font-bold text-[10px] sm:text-[11px] tracking-[0.22em] text-[#EF5A2A] uppercase truncate max-w-[230px]">
            {project.domains?.[0] || project.category}
          </span>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#66615A]">
            {hasRepo ? (
              <span className="inline-flex items-center gap-1 text-[#227C4E] bg-[#E8F4EC] px-1.5 py-0.5 rounded-[2px] border border-[#227C4E]/20">
                <GitBranch className="w-2.5 h-2.5" />
                <span className="text-[9px] font-bold">REPO</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#8C8881] bg-[#F3EEE5] px-1.5 py-0.5 rounded-[2px] border border-[rgba(10,10,9,0.06)]">
                <Lock className="w-2.5 h-2.5" />
                <span className="text-[9px]">INTERNAL</span>
              </span>
            )}
          </div>
        </div>

        {/* Bespoke Geometric Motif & Project Identifier */}
        <div className="relative z-10 flex items-start gap-3.5 mb-3.5">
          <div
            className={`p-2.5 rounded-[2px] border transition-colors duration-200 shrink-0 ${
              isActive
                ? 'bg-[#EF5A2A]/10 border-[#EF5A2A] text-[#EF5A2A]'
                : 'bg-[#F3EEE5] border-[rgba(10,10,9,0.1)] text-[#66615A]'
            }`}
          >
            <ProjectMotif
              edition={project.nexusEdition}
              className="w-5 h-5"
              isHovered={isActive}
            />
          </div>

          <div className="space-y-0.5 flex-1 min-w-0">
            <h3 className="font-fraunces font-bold text-xl sm:text-2xl text-[#0A0A09] uppercase tracking-tight leading-tight group-hover:text-[#EF5A2A] transition-colors truncate">
              {project.shortName || project.title}
            </h3>
            <p className="font-mono text-[10px] text-[#66615A] tracking-wider uppercase truncate">
              {phaseInfo.theme}
            </p>
          </div>
        </div>

        {/* Project Core Description */}
        <p className="relative z-10 font-bitter text-xs sm:text-[13px] text-[#4A4640] leading-relaxed mb-4 line-clamp-2">
          {project.subtitle || project.summary}
        </p>

        {/* Technology Stack Matrix */}
        <div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
          {displayTech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-[#F3EEE5] text-[#4A4640] font-mono text-[10px] rounded-[2px] border border-[rgba(10,10,9,0.08)] tracking-tight group-hover:border-[rgba(10,10,9,0.16)] transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 text-[#8C8881] font-mono text-[10px]">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Bottom Interaction Cue & Target Audience */}
        <div className="relative z-10 pt-3 border-t border-[rgba(10,10,9,0.08)] flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-[#8C8881]">
            <span className="font-dosis font-semibold tracking-wider uppercase text-[10px]">
              AUDIENCE:
            </span>
            <span className="text-[#0A0A09] font-medium text-[10px] truncate max-w-[140px]">
              {project.users?.[0] || 'SOA Campus'}
            </span>
          </div>

          <div className="flex items-center gap-1 font-dosis font-bold text-xs tracking-[0.16em] uppercase text-[#EF5A2A] group-hover:text-[#0A0A09] transition-colors">
            <span>{isSelected ? 'DOUBLE-CLICK TO OPEN' : 'OPEN'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
