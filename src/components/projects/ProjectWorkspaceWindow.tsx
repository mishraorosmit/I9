/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NexusProject } from '../../types.ts';
import { PROJECTS_REGISTRY } from '../../data/projects.ts';
import {
  X,
  Minus,
  Maximize2,
  Minimize2,
  GitBranch,
  ExternalLink,
  Copy,
  Check,
  Layers,
  FileText,
  CheckCircle2,
  Code,
  Users,
  Tag,
  Lock,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface ProjectWorkspaceWindowProps {
  project: NexusProject;
  activeTab: 'overview' | 'documentation' | 'deliverables' | 'spec';
  onTabChange: (tab: 'overview' | 'documentation' | 'deliverables' | 'spec') => void;
  onProjectSwitch: (project: NexusProject) => void;
  onClose: () => void;
  onMinimize: () => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onOpenProperties: (project: NexusProject) => void;
}

/**
 * PROJECT WORKSPACE WINDOW
 * A refined, draggable project workspace environment.
 * Reusable for all 5 NEXUS editions with instant project switching,
 * rich technical tabs, and responsive mobile adaptation.
 */
export const ProjectWorkspaceWindow: React.FC<ProjectWorkspaceWindowProps> = ({
  project,
  activeTab,
  onTabChange,
  onProjectSwitch,
  onClose,
  onMinimize,
  isMaximized,
  onToggleMaximize,
  onOpenProperties,
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Dragging State (Desktop only)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial centering on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !isMobile) {
      const initialWidth = Math.min(920, window.innerWidth - 60);
      const initialHeight = Math.min(680, window.innerHeight - 100);
      const initX = Math.max(20, (window.innerWidth - initialWidth) / 2);
      const initY = Math.max(30, (window.innerHeight - initialHeight) / 2 - 20);
      setPosition({ x: initX, y: initY });
    }
  }, [isMobile]);

  // Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized || isMobile) return;
    // Only drag when clicking the header bar itself, not interactive buttons
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) {
      return;
    }

    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isMaximized || isMobile) return;

    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;

    const newX = Math.max(10, Math.min(window.innerWidth - 200, dragStartRef.current.posX + dx));
    const newY = Math.max(10, Math.min(window.innerHeight - 100, dragStartRef.current.posY + dy));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe ignore
      }
    }
  };

  const handleCopySpec = () => {
    navigator.clipboard.writeText(JSON.stringify(project, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const repoUrl =
    typeof project.repository === 'string'
      ? project.repository
      : project.repository?.url || project.githubUrl;
  const demoUrl =
    typeof project.deployment === 'string'
      ? project.deployment
      : project.deployment?.liveUrl || project.deployment?.frontend || project.demoUrl;

  const stackList = Array.isArray(project.technologies)
    ? project.technologies
    : project.technologies?.all || project.tags;

  return (
    <div
      style={
        isMaximized || isMobile
          ? { left: 0, top: 0, width: '100%', height: '100%' }
          : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${Math.min(920, window.innerWidth - 40)}px`,
              height: `${Math.min(680, window.innerHeight - 80)}px`,
            }
      }
      className={`fixed z-40 bg-[#FAF6F0] rounded-[3px] border border-[rgba(10,10,9,0.18)] shadow-2xl flex flex-col overflow-hidden select-none ${
        isMaximized || isMobile ? 'inset-0 rounded-none' : ''
      }`}
    >
      {/* 1. TOP WINDOW TITLEBAR (DRAGGABLE) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`h-11 px-4 bg-[#F3EEE5] border-b border-[rgba(10,10,9,0.12)] flex items-center justify-between gap-3 text-[#0A0A09] font-mono text-xs shrink-0 select-none ${
          !isMaximized && !isMobile ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        {/* Left: Window Identity & Stage */}
        <div className="flex items-center gap-2.5 truncate">
          <span className="w-2 h-2 rounded-full bg-[#EF5A2A] shrink-0" />
          <span className="font-bold text-[#EF5A2A]">{project.nexusEdition}</span>
          <span className="text-[#8C8881]/50">//</span>
          <span className="font-fraunces font-bold text-sm text-[#0A0A09] truncate">
            {project.name}
          </span>
        </div>

        {/* Center: Subtle Project Switcher (E1 → E5) */}
        <div className="hidden sm:flex items-center gap-1 bg-[#EAE4D9] p-0.5 rounded-[2px] border border-[rgba(10,10,9,0.08)]">
          {PROJECTS_REGISTRY.map((p) => {
            const isActive = p.id === project.id;
            const edShort = p.nexusEdition.replace('NEXUS ', '');

            return (
              <button
                key={p.id}
                onClick={() => onProjectSwitch(p)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-[2px] transition-colors cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#FAF6F0] text-[#0A0A09] font-bold shadow-2xs'
                    : 'text-[#66615A] hover:text-[#0A0A09] hover:bg-white/40'
                }`}
                title={`Switch to ${p.nexusEdition}: ${p.name}`}
              >
                {isActive && <span className="w-1 h-1 rounded-full bg-[#EF5A2A]" />}
                <span>{edShort}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Window Controls (Minimize, Maximize, Close) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onOpenProperties(project)}
            className="px-2 py-1 bg-white/60 hover:bg-white text-[#66615A] hover:text-[#0A0A09] text-[10px] font-mono rounded-[2px] border border-[rgba(10,10,9,0.08)] transition-colors cursor-pointer hidden md:inline-flex"
            title="View factual properties"
          >
            PROPERTIES
          </button>

          {!isMobile && (
            <button
              onClick={onMinimize}
              className="p-1.5 text-[#66615A] hover:text-[#0A0A09] hover:bg-[#EAE4D9] rounded-[2px] transition-colors cursor-pointer"
              title="Minimize window"
              aria-label="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          )}

          {!isMobile && (
            <button
              onClick={onToggleMaximize}
              className="p-1.5 text-[#66615A] hover:text-[#0A0A09] hover:bg-[#EAE4D9] rounded-[2px] transition-colors cursor-pointer"
              title={isMaximized ? 'Restore window size' : 'Maximize detail view'}
              aria-label="Maximize"
            >
              {isMaximized ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1.5 text-[#66615A] hover:text-[#EF5A2A] hover:bg-[#EAE4D9] rounded-[2px] transition-colors cursor-pointer"
            title="Close project workspace"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. SUB-BAR: TAB SELECTORS & REPO ACTIONS */}
      <div className="h-10 px-4 bg-[#FAF6F0] border-b border-[rgba(10,10,9,0.1)] flex items-center justify-between gap-3 text-xs font-mono shrink-0 overflow-x-auto no-scrollbar">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTabChange('overview')}
            className={`px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#0A0A09] text-[#F3EEE5] font-bold'
                : 'text-[#66615A] hover:text-[#0A0A09] hover:bg-[#EAE4D9]'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>OVERVIEW</span>
          </button>

          <button
            onClick={() => onTabChange('documentation')}
            className={`px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'documentation'
                ? 'bg-[#0A0A09] text-[#F3EEE5] font-bold'
                : 'text-[#66615A] hover:text-[#0A0A09] hover:bg-[#EAE4D9]'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>DOCUMENTATION</span>
          </button>

          <button
            onClick={() => onTabChange('deliverables')}
            className={`px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'deliverables'
                ? 'bg-[#0A0A09] text-[#F3EEE5] font-bold'
                : 'text-[#66615A] hover:text-[#0A0A09] hover:bg-[#EAE4D9]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>DELIVERABLES</span>
          </button>

          <button
            onClick={() => onTabChange('spec')}
            className={`px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'spec'
                ? 'bg-[#0A0A09] text-[#F3EEE5] font-bold'
                : 'text-[#66615A] hover:text-[#0A0A09] hover:bg-[#EAE4D9]'
            }`}
          >
            <Code className="w-3 h-3" />
            <span>RAW SPEC</span>
          </button>
        </div>

        {/* Action Links (External Repo & Demo) */}
        <div className="flex items-center gap-2 shrink-0">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-[#227C4E] hover:bg-[#1b643e] text-white rounded-[2px] font-mono text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-[#FAF6F0] hover:bg-[#EAE4D9] text-[#0A0A09] rounded-[2px] font-mono text-[11px] font-bold border border-[rgba(10,10,9,0.16)] flex items-center gap-1.5 transition-colors"
            >
              <GitBranch className="w-3 h-3 text-[#EF5A2A]" />
              <span>GIT REPO</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#66615A]" />
            </a>
          ) : (
            <span
              title="Repository is currently internal or restricted"
              className="px-2 py-1 text-[#8C8881] bg-[#F3EEE5] rounded-[2px] font-mono text-[10px] border border-[rgba(10,10,9,0.06)] flex items-center gap-1 cursor-default"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>INTERNAL REPO</span>
            </span>
          )}
        </div>
      </div>

      {/* 3. WORKSPACE TAB BODY (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 text-[#0A0A09] select-text">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="max-w-3xl space-y-6 animate-fadeIn">
            {/* Header Block */}
            <div className="pb-4 border-b border-[rgba(10,10,9,0.1)]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#EF5A2A] mb-1">
                <span>{project.projectNumber}</span>
                <span>//</span>
                <span>STATUS: {project.status?.toUpperCase() || 'COMPLETED'}</span>
                <span>//</span>
                <span>COHORT {project.year}</span>
              </div>
              <h1 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] tracking-tight">
                {project.name}
              </h1>
              <p className="font-mono text-xs text-[#66615A] uppercase tracking-wider mt-1">
                {project.subtitle || project.disciplines}
              </p>
            </div>

            {/* Executive Summary */}
            <div className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.1)] rounded-[2px]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF5A2A] font-bold block mb-1">
                EXECUTIVE PURPOSE
              </span>
              <p className="font-bitter text-base text-[#23211E] leading-relaxed">
                {project.description || project.summary}
              </p>
            </div>

            {/* Leads & Technologies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Squad Leads */}
              <div className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.1)] rounded-[2px] space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF5A2A] font-bold flex items-center gap-1.5">
                  <Users className="w-3 h-3" />
                  <span>SQUAD LEADS & AUTHORS</span>
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

              {/* Technologies */}
              <div className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.1)] rounded-[2px] space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF5A2A] font-bold flex items-center gap-1.5">
                  <Tag className="w-3 h-3" />
                  <span>CORE TECH STACK</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stackList.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-[#F3EEE5] text-[#23211E] font-mono text-[11px] rounded-[2px] border border-[rgba(10,10,9,0.08)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables Checklist */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.1)] rounded-[2px] space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF5A2A] font-bold block">
                  SHIPPED MILESTONES & ARTIFACTS
                </span>
                <ul className="space-y-1.5">
                  {project.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-mono text-xs text-[#23211E]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#227C4E] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DOCUMENTATION */}
        {activeTab === 'documentation' && (
          <div className="max-w-3xl font-mono text-xs space-y-4 animate-fadeIn">
            <div className="p-5 bg-[#FFFDF9] border border-[rgba(10,10,9,0.12)] rounded-[2px] space-y-5 leading-relaxed">
              <div className="pb-3 border-b border-[rgba(10,10,9,0.1)]">
                <span className="text-[#EF5A2A] font-bold"># </span>
                <span className="font-bold text-base text-[#0A0A09]">{project.name} ARCHITECTURAL SPECIFICATION</span>
                <p className="text-[#66615A] text-xs mt-1">{project.subtitle || project.summary}</p>
              </div>

              <div>
                <span className="text-[#EF5A2A] font-bold">## 1. Domain & Purpose</span>
                <p className="text-[#23211E] font-bitter text-sm mt-1 leading-relaxed">
                  {project.description || project.summary}
                </p>
              </div>

              {project.architecture && (
                <div>
                  <span className="text-[#EF5A2A] font-bold">## 2. System Architecture</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                    <div className="p-2.5 bg-[#F3EEE5] rounded-[2px] border border-[rgba(10,10,9,0.08)]">
                      <span className="text-[10px] text-[#8C8881] uppercase font-bold block mb-1">FRONTEND</span>
                      <span className="text-xs text-[#0A0A09] font-bold">{project.architecture.frontend}</span>
                    </div>
                    <div className="p-2.5 bg-[#F3EEE5] rounded-[2px] border border-[rgba(10,10,9,0.08)]">
                      <span className="text-[10px] text-[#8C8881] uppercase font-bold block mb-1">BACKEND</span>
                      <span className="text-xs text-[#0A0A09] font-bold">{project.architecture.backend}</span>
                    </div>
                    <div className="p-2.5 bg-[#F3EEE5] rounded-[2px] border border-[rgba(10,10,9,0.08)]">
                      <span className="text-[10px] text-[#8C8881] uppercase font-bold block mb-1">DATA LAYER</span>
                      <span className="text-xs text-[#0A0A09] font-bold">{project.architecture.database}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <span className="text-[#EF5A2A] font-bold">## 3. Target User Segment</span>
                <p className="text-[#23211E] mt-1">
                  {project.users?.join(', ') || 'SOA Campus Community'}
                </p>
              </div>

              {repoUrl && (
                <div className="pt-3 border-t border-[rgba(10,10,9,0.1)] flex items-center justify-between">
                  <span className="text-[#66615A]">Authentic Repository:</span>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EF5A2A] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{repoUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DELIVERABLES */}
        {activeTab === 'deliverables' && (
          <div className="max-w-3xl font-mono text-xs space-y-4 animate-fadeIn">
            <div className="p-5 bg-[#FFFDF9] border border-[rgba(10,10,9,0.12)] rounded-[2px] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(10,10,9,0.1)]">
                <div>
                  <div className="text-[#EF5A2A] font-bold uppercase">
                    === VERIFIED MILESTONE ARTIFACTS: {project.projectNumber} ===
                  </div>
                  <div className="text-[11px] text-[#8C8881] mt-0.5">
                    Cohort {project.year} // Edition: {project.nexusEdition}
                  </div>
                </div>
                <span className="px-2 py-1 bg-[#E8F4EC] text-[#227C4E] font-bold rounded-[2px] text-[10px]">
                  ALL VERIFIED
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {project.deliverables?.map((item, idx) => (
                  <div key={item} className="flex items-start gap-2.5 p-2.5 bg-[#F3EEE5]/60 rounded-[2px] border border-[rgba(10,10,9,0.06)]">
                    <span className="text-[#EF5A2A] font-bold shrink-0">0{idx + 1}.</span>
                    <span className="text-[#23211E] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[rgba(10,10,9,0.1)] text-[11px] text-[#8C8881]">
                Logged and maintained in the authoritative NEXUS Project Catalogue.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RAW SPEC */}
        {activeTab === 'spec' && (
          <div className="max-w-3xl space-y-2 font-mono text-xs animate-fadeIn">
            <div className="flex items-center justify-between pb-2">
              <span className="text-[#66615A] uppercase text-[10px] tracking-wider">
                AUTHORITATIVE REGISTRY JSON SCHEMA
              </span>
              <button
                onClick={handleCopySpec}
                className="px-2.5 py-1 bg-[#F3EEE5] hover:bg-[#EAE4D9] text-[#0A0A09] text-[11px] rounded-[2px] border border-[rgba(10,10,9,0.1)] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#EF5A2A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY JSON'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#FFFDF9] border border-[rgba(10,10,9,0.12)] rounded-[2px] text-[#23211E] overflow-x-auto text-[11px] leading-relaxed select-text">
              {JSON.stringify(project, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* 4. WINDOW STATUS FOOTER */}
      <div className="h-7 px-4 bg-[#F3EEE5] border-t border-[rgba(10,10,9,0.1)] flex items-center justify-between font-mono text-[10px] text-[#8C8881] shrink-0">
        <div className="flex items-center gap-3">
          <span>VFS: /archive/nexus/{project.id}</span>
          <span>•</span>
          <span className="text-[#0A0A09] font-bold">{project.nexusEdition}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A]" />
          <span className="uppercase text-[#0A0A09]">{project.category}</span>
        </div>
      </div>
    </div>
  );
};
