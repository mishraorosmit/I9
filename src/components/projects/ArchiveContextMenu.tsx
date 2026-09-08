/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { ContextMenuState, ArchiveSortMode, ArchiveViewMode } from './types.ts';
import { NexusProject } from '../../types.ts';
import {
  FolderOpen,
  FileText,
  GitBranch,
  Info,
  RotateCcw,
  ArrowUpDown,
  Layers,
  Sparkles,
  ExternalLink,
  Check,
} from 'lucide-react';

interface ArchiveContextMenuProps {
  state: ContextMenuState;
  onClose: () => void;
  onOpenProject: (project: NexusProject, initialTab?: 'overview' | 'documentation' | 'deliverables' | 'spec') => void;
  onOpenProperties: (project: NexusProject) => void;
  onRefreshArchive: () => void;
  onSortChange: (sortMode: ArchiveSortMode) => void;
  onViewChange: (viewMode: ArchiveViewMode) => void;
  onClearSelection: () => void;
  currentSort: ArchiveSortMode;
  currentView: ArchiveViewMode;
}

/**
 * ARCHIVE CONTEXT MENU
 * Editorial right-click contextual menu for NEXUS projects and empty desktop canvas.
 */
export const ArchiveContextMenu: React.FC<ArchiveContextMenuProps> = ({
  state,
  onClose,
  onOpenProject,
  onOpenProperties,
  onRefreshArchive,
  onSortChange,
  onViewChange,
  onClearSelection,
  currentSort,
  currentView,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isOpen, onClose]);

  if (!state.isOpen) return null;

  // Clamping position within window
  const menuWidth = 220;
  const menuHeight = state.targetType === 'project' ? 210 : 250;
  const x = Math.min(state.x, window.innerWidth - menuWidth - 10);
  const y = Math.min(state.y, window.innerHeight - menuHeight - 10);

  const project = state.targetProject;
  const repoUrl =
    typeof project?.repository === 'string'
      ? project.repository
      : project?.repository?.url || project?.githubUrl;
  const hasRepo = Boolean(repoUrl);

  return (
    <div
      ref={menuRef}
      style={{ left: `${x}px`, top: `${y}px` }}
      className="fixed z-50 w-56 bg-[#FAF6F0] rounded-[3px] border border-[rgba(10,10,9,0.18)] shadow-xl py-1.5 font-mono text-xs text-[#0A0A09] select-none animate-fadeIn"
    >
      {/* PROJECT TARGET ACTIONS */}
      {state.targetType === 'project' && project && (
        <>
          <div className="px-3 py-1.5 border-b border-[rgba(10,10,9,0.08)] mb-1">
            <span className="text-[10px] text-[#EF5A2A] font-bold tracking-wider uppercase block">
              {project.nexusEdition}
            </span>
            <span className="font-bold text-[#0A0A09] text-xs truncate block font-fraunces">
              {project.name}
            </span>
          </div>

          <button
            onClick={() => {
              onOpenProject(project, 'overview');
              onClose();
            }}
            className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#F3EEE5] hover:text-[#EF5A2A] transition-colors cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#EF5A2A]" />
            <span className="font-bold">OPEN</span>
          </button>

          <button
            onClick={() => {
              onOpenProject(project, 'overview');
              onClose();
            }}
            className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#F3EEE5] hover:text-[#EF5A2A] transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-[#66615A]" />
            <span>OPEN PROJECT VIEW</span>
          </button>

          <button
            onClick={() => {
              onOpenProject(project, 'documentation');
              onClose();
            }}
            className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#F3EEE5] hover:text-[#EF5A2A] transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#66615A]" />
            <span>VIEW DOCUMENTATION</span>
          </button>

          {/* REPOSITORY ACTION - ONLY IF ACTUAL REPO EXISTS */}
          {hasRepo && repoUrl && (
            <button
              onClick={() => {
                window.open(repoUrl, '_blank', 'noopener,noreferrer');
                onClose();
              }}
              className="w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-[#F3EEE5] hover:text-[#EF5A2A] transition-colors cursor-pointer text-[#227C4E]"
            >
              <div className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5" />
                <span className="font-bold">OPEN REPOSITORY</span>
              </div>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}

          <div className="my-1 border-t border-[rgba(10,10,9,0.08)]" />

          <button
            onClick={() => {
              onOpenProperties(project);
              onClose();
            }}
            className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#F3EEE5] hover:text-[#EF5A2A] transition-colors cursor-pointer text-[#66615A]"
          >
            <Info className="w-3.5 h-3.5" />
            <span>PROPERTIES</span>
          </button>
        </>
      )}

      {/* EMPTY DESKTOP / ARCHIVE CANVAS ACTIONS */}
      {state.targetType === 'desktop' && (
        <>
          <div className="px-3 py-1 text-[10px] text-[#8C8881] font-bold uppercase tracking-widest border-b border-[rgba(10,10,9,0.08)] mb-1">
            ARCHIVE OPERATING VFS
          </div>

          <button
            onClick={() => {
              onRefreshArchive();
              onClose();
            }}
            className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#F3EEE5] hover:text-[#EF5A2A] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#66615A]" />
            <span>REFRESH ARCHIVE</span>
          </button>

          <button
            onClick={() => {
              onClearSelection();
              onClose();
            }}
            className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#F3EEE5] hover:text-[#EF5A2A] transition-colors cursor-pointer text-[#66615A]"
          >
            <span className="w-3.5 text-center font-bold">×</span>
            <span>CLEAR SELECTION</span>
          </button>

          <div className="my-1 border-t border-[rgba(10,10,9,0.08)]" />

          {/* SORT SUB-SECTION */}
          <div className="px-3 py-1 text-[10px] text-[#8C8881] uppercase font-bold tracking-wider">
            SORT BY:
          </div>

          <button
            onClick={() => {
              onSortChange('edition');
              onClose();
            }}
            className="w-full px-3 py-1 text-left flex items-center justify-between hover:bg-[#F3EEE5] transition-colors cursor-pointer text-[11px]"
          >
            <span className={currentSort === 'edition' ? 'font-bold text-[#EF5A2A]' : ''}>
              Edition (E1 → E5)
            </span>
            {currentSort === 'edition' && <Check className="w-3 h-3 text-[#EF5A2A]" />}
          </button>

          <button
            onClick={() => {
              onSortChange('name');
              onClose();
            }}
            className="w-full px-3 py-1 text-left flex items-center justify-between hover:bg-[#F3EEE5] transition-colors cursor-pointer text-[11px]"
          >
            <span className={currentSort === 'name' ? 'font-bold text-[#EF5A2A]' : ''}>
              Project Name (A–Z)
            </span>
            {currentSort === 'name' && <Check className="w-3 h-3 text-[#EF5A2A]" />}
          </button>

          <button
            onClick={() => {
              onSortChange('technology');
              onClose();
            }}
            className="w-full px-3 py-1 text-left flex items-center justify-between hover:bg-[#F3EEE5] transition-colors cursor-pointer text-[11px]"
          >
            <span className={currentSort === 'technology' ? 'font-bold text-[#EF5A2A]' : ''}>
              Technology Stack
            </span>
            {currentSort === 'technology' && <Check className="w-3 h-3 text-[#EF5A2A]" />}
          </button>

          <button
            onClick={() => {
              onSortChange('domain');
              onClose();
            }}
            className="w-full px-3 py-1 text-left flex items-center justify-between hover:bg-[#F3EEE5] transition-colors cursor-pointer text-[11px]"
          >
            <span className={currentSort === 'domain' ? 'font-bold text-[#EF5A2A]' : ''}>
              Domain Classification
            </span>
            {currentSort === 'domain' && <Check className="w-3 h-3 text-[#EF5A2A]" />}
          </button>

          <div className="my-1 border-t border-[rgba(10,10,9,0.08)]" />

          {/* VIEW MODE */}
          <div className="px-3 py-1 text-[10px] text-[#8C8881] uppercase font-bold tracking-wider">
            VIEW LAYOUT:
          </div>

          <button
            onClick={() => {
              onViewChange('spatial');
              onClose();
            }}
            className="w-full px-3 py-1 text-left flex items-center justify-between hover:bg-[#F3EEE5] transition-colors cursor-pointer text-[11px]"
          >
            <span className={currentView === 'spatial' ? 'font-bold text-[#EF5A2A]' : ''}>
              Spatial Trajectory
            </span>
            {currentView === 'spatial' && <Check className="w-3 h-3 text-[#EF5A2A]" />}
          </button>

          <button
            onClick={() => {
              onViewChange('compact');
              onClose();
            }}
            className="w-full px-3 py-1 text-left flex items-center justify-between hover:bg-[#F3EEE5] transition-colors cursor-pointer text-[11px]"
          >
            <span className={currentView === 'compact' ? 'font-bold text-[#EF5A2A]' : ''}>
              Compact Archive
            </span>
            {currentView === 'compact' && <Check className="w-3 h-3 text-[#EF5A2A]" />}
          </button>
        </>
      )}
    </div>
  );
};
