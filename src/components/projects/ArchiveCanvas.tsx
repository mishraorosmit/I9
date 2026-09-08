/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { NexusProject, AppRoute } from '../../types.ts';
import { PROJECTS_REGISTRY } from '../../data/projects.ts';
import { ArchiveSystemBar } from './ArchiveSystemBar.tsx';
import { ArchiveControlBar } from './ArchiveControlBar.tsx';
import { ArchiveTrajectoryOverlay } from './ArchiveTrajectoryOverlay.tsx';
import { ProjectFolderObject } from './ProjectFolderObject.tsx';
import { ArchiveContextMenu } from './ArchiveContextMenu.tsx';
import { ProjectPropertiesModal } from './ProjectPropertiesModal.tsx';
import { ProjectWorkspaceWindow } from './ProjectWorkspaceWindow.tsx';
import {
  ContextMenuState,
  ProjectWindowState,
  ArchiveSortMode,
  ArchiveViewMode,
} from './types.ts';
import {
  Compass,
  FolderSearch,
  RotateCcw,
  Terminal,
  FolderOpen,
  Maximize2,
} from 'lucide-react';

interface ArchiveCanvasProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * ARCHIVE CANVAS — SIGNATURE INTERACTION SYSTEM FOR NEXUS PROJECTS
 *
 * Core Principles:
 * - Living archive feel with responding orange trajectory network
 * - 1-8px microinteractions, hairline border signals, and abstract geometric motifs
 * - Deep query search indexing across full project architecture and deliverables
 * - Deterministic sorting (Edition, Name, Technology, Domain)
 * - Factual contextual properties and workspace window
 * - Full keyboard accessibility, clean unmounts, and reduced-motion support
 */
export const ArchiveCanvas: React.FC<ArchiveCanvasProps> = ({ onRouteChange }) => {
  const [selectedEdition, setSelectedEdition] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortMode, setSortMode] = useState<ArchiveSortMode>('edition');
  const [viewMode, setViewMode] = useState<ArchiveViewMode>('spatial');

  // Interactive Selection State
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    PROJECTS_REGISTRY[0]?.id || null
  );
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Active Open Project Window State
  const [windowState, setWindowState] = useState<ProjectWindowState | null>(null);

  // Active Properties Modal State
  const [propertiesProject, setPropertiesProject] = useState<NexusProject | null>(null);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    targetType: 'desktop',
  });

  // References for Keyboard Shortcuts
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const editionBarRef = useRef<HTMLDivElement | null>(null);

  // 1. Comprehensive Deep Index Search & Deterministic Sorting
  const sortedAndFilteredProjects = useMemo(() => {
    let result = PROJECTS_REGISTRY.filter((project) => {
      // 1a. Edition filter
      const matchesEdition =
        selectedEdition === 'ALL' ||
        project.nexusEdition.toLowerCase().includes(selectedEdition.toLowerCase()) ||
        selectedEdition.toLowerCase().includes(project.nexusEdition.toLowerCase());

      if (!matchesEdition) return false;

      // 1b. Deep Search Indexing across all project fields
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      // Names & Identifiers
      const nameMatch =
        project.name.toLowerCase().includes(q) ||
        project.title.toLowerCase().includes(q) ||
        (project.shortName || '').toLowerCase().includes(q) ||
        project.id.toLowerCase().includes(q) ||
        project.nexusEdition.toLowerCase().includes(q) ||
        project.projectNumber.toLowerCase().includes(q);

      // Descriptions & Summaries
      const textMatch =
        (project.description || '').toLowerCase().includes(q) ||
        (project.summary || '').toLowerCase().includes(q) ||
        (project.subtitle || '').toLowerCase().includes(q);

      // Technologies & Architecture (includes "Socket", "Redis", "Razorpay", etc.)
      const techList: string[] = [];
      if (Array.isArray(project.technologies)) {
        techList.push(...project.technologies);
      } else if (project.technologies) {
        if (project.technologies.all) techList.push(...project.technologies.all);
        if (project.technologies.frontend) techList.push(...project.technologies.frontend);
        if (project.technologies.backend) techList.push(...project.technologies.backend);
        if (project.technologies.database) techList.push(...project.technologies.database);
      }
      if (project.tags) techList.push(...project.tags);

      const techMatch = techList.some((t) => t.toLowerCase().includes(q));

      // Architecture Layers
      const archOverview =
        typeof project.architecture === 'string'
          ? project.architecture
          : (project.architecture?.overview || '') +
            ' ' +
            (project.architecture?.components || []).join(' ') +
            ' ' +
            (project.architecture?.lifecycle || []).join(' ');
      const archMatch = archOverview.toLowerCase().includes(q);

      // Domains, Categories & Disciplines
      const domainMatch =
        (project.domains || []).some((d) => d.toLowerCase().includes(q)) ||
        (project.category || '').toLowerCase().includes(q) ||
        (project.disciplines || '').toLowerCase().includes(q);

      // Deliverables & Milestones (e.g. "Flashcards", "OCR", "Live bus", "Fines")
      const delivMatch = (project.deliverables || []).some((d) =>
        d.toLowerCase().includes(q)
      );

      // Users & Squad Leads
      const peopleMatch =
        (project.leadStudents || []).some((l) => l.toLowerCase().includes(q)) ||
        (project.users || []).some((u) => u.toLowerCase().includes(q));

      return (
        nameMatch ||
        textMatch ||
        techMatch ||
        archMatch ||
        domainMatch ||
        delivMatch ||
        peopleMatch
      );
    });

    // 2. Deterministic Sorting
    result = [...result].sort((a, b) => {
      if (sortMode === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortMode === 'domain') {
        const domainA = a.domains?.[0] || a.category || '';
        const domainB = b.domains?.[0] || b.category || '';
        return domainA.localeCompare(domainB);
      }
      if (sortMode === 'technology') {
        const countA = Array.isArray(a.technologies) ? a.technologies.length : a.tags.length;
        const countB = Array.isArray(b.technologies) ? b.technologies.length : b.tags.length;
        if (countB !== countA) return countB - countA;
        return a.name.localeCompare(b.name);
      }
      // Default: Edition sequence (E1 -> E5)
      return a.nexusEdition.localeCompare(b.nexusEdition);
    });

    return result;
  }, [selectedEdition, searchQuery, sortMode]);

  // Selected Project Object
  const selectedProject = useMemo(() => {
    return (
      PROJECTS_REGISTRY.find((p) => p.id === selectedProjectId) ||
      sortedAndFilteredProjects[0] ||
      null
    );
  }, [selectedProjectId, sortedAndFilteredProjects]);

  // Trajectory hover and selected indices
  const hoveredIndex = useMemo(() => {
    if (!hoveredProjectId) return null;
    return PROJECTS_REGISTRY.findIndex((p) => p.id === hoveredProjectId);
  }, [hoveredProjectId]);

  const selectedIndex = useMemo(() => {
    if (!selectedProjectId) return null;
    return PROJECTS_REGISTRY.findIndex((p) => p.id === selectedProjectId);
  }, [selectedProjectId]);

  // 2. Open Project Workspace Handler
  const handleOpenProject = useCallback(
    (
      project: NexusProject,
      initialTab: 'overview' | 'documentation' | 'deliverables' | 'spec' = 'overview'
    ) => {
      setSelectedProjectId(project.id);
      setWindowState({
        isOpen: true,
        project,
        activeTab: initialTab,
        isMaximized: false,
        isMinimized: false,
        x: 0,
        y: 0,
        width: 900,
        height: 640,
        zIndex: 40,
      });
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
    },
    []
  );

  // 3. Switch Project inside Active Window
  const handleSwitchProjectInWindow = useCallback((project: NexusProject) => {
    setSelectedProjectId(project.id);
    setWindowState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        project,
      };
    });
  }, []);

  // 4. Scoped Keyboard Shortcuts (Projects Environment Only!)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isInputActive = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // Ctrl/Cmd + L: Focus edition list
      if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        const firstBtn = editionBarRef.current?.querySelector('button');
        firstBtn?.focus();
        return;
      }

      // Escape: Close overlays / menus / window
      if (e.key === 'Escape') {
        if (contextMenu.isOpen) {
          setContextMenu((prev) => ({ ...prev, isOpen: false }));
          return;
        }
        if (propertiesProject) {
          setPropertiesProject(null);
          return;
        }
        if (windowState?.isOpen) {
          setWindowState(null);
          return;
        }
        if (isInputActive) {
          (document.activeElement as HTMLElement)?.blur();
          return;
        }
      }

      // If user is typing inside an input field, do not hijack navigation keys
      if (isInputActive) return;

      // Enter: Open selected project
      if (e.key === 'Enter' && selectedProject && !windowState?.isOpen && !propertiesProject) {
        e.preventDefault();
        handleOpenProject(selectedProject);
        return;
      }

      // Arrow Keys: Navigate between projects in archive
      if (sortedAndFilteredProjects.length > 0) {
        const currentIndex = sortedAndFilteredProjects.findIndex(
          (p) => p.id === selectedProjectId
        );

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex =
            currentIndex === -1 || currentIndex === sortedAndFilteredProjects.length - 1
              ? 0
              : currentIndex + 1;
          const nextProject = sortedAndFilteredProjects[nextIndex];
          if (nextProject) setSelectedProjectId(nextProject.id);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex =
            currentIndex <= 0
              ? sortedAndFilteredProjects.length - 1
              : currentIndex - 1;
          const prevProject = sortedAndFilteredProjects[prevIndex];
          if (prevProject) setSelectedProjectId(prevProject.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    contextMenu.isOpen,
    propertiesProject,
    windowState,
    selectedProject,
    sortedAndFilteredProjects,
    selectedProjectId,
    handleOpenProject,
  ]);

  // 5. Context Menu Handlers
  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      targetType: 'desktop',
    });
  };

  const handleProjectContextMenu = (e: React.MouseEvent, project: NexusProject) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProjectId(project.id);
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      targetType: 'project',
      targetProject: project,
    });
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'nexus-archive-stage' || target.id === 'nexus-archive-canvas-bg') {
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
    }
  };

  return (
    <div
      id="nexus-archive-operating-environment"
      onClick={handleCanvasClick}
      onContextMenu={handleDesktopContextMenu}
      className="relative w-full min-h-screen bg-[#F3EEE5] text-[#0A0A09] flex flex-col font-sans selection:bg-[#EF5A2A] selection:text-white"
    >
      {/* 1. Header / Top System Bar */}
      <ArchiveSystemBar
        totalProjects={PROJECTS_REGISTRY.length}
        activeFilter={selectedEdition}
        onRouteChange={onRouteChange}
      />

      {/* 2. Archive Control Bar (Filters, Deep Search, Deterministic Sort, Shortcuts) */}
      <ArchiveControlBar
        selectedEdition={selectedEdition}
        onSelectEdition={(ed) => {
          setSelectedEdition(ed);
          setSelectedProjectId(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortMode={sortMode}
        onSortChange={setSortMode}
        filteredCount={sortedAndFilteredProjects.length}
        totalCount={PROJECTS_REGISTRY.length}
        searchRef={searchInputRef}
        editionListRef={editionBarRef}
      />

      {/* 3. Responsive Evolutionary Trajectory Network (E1 → E2 → E3 → E4 → E5) */}
      <ArchiveTrajectoryOverlay
        hoveredIndex={hoveredIndex}
        selectedIndex={selectedIndex}
        isWindowOpen={Boolean(windowState?.isOpen && !windowState?.isMinimized)}
      />

      {/* 4. Expansive Spatial Archive Stage */}
      <main
        id="nexus-archive-stage"
        className="flex-1 relative w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-7xl mx-auto flex flex-col justify-between"
      >
        {/* Subtle Architectural Grid & Spatial Watermark */}
        <div
          id="nexus-archive-canvas-bg"
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0A0A09 1px, transparent 1px),
              linear-gradient(to bottom, #0A0A09 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        {/* Canvas Background Coordinate Labels */}
        <div className="absolute top-4 right-6 pointer-events-none opacity-25 font-mono text-[10px] text-right space-y-0.5 hidden md:block select-none">
          <div>LOC: SOA_CAMPUS_ITERATION_2026</div>
          <div>CANVAS: SPATIAL_ARCHIVE_V3</div>
          <div>STATUS: VFS_ONLINE_RO</div>
        </div>

        {/* Spatial Project Folders Grid */}
        {sortedAndFilteredProjects.length > 0 ? (
          <div
            className={`relative z-10 grid gap-6 sm:gap-8 lg:gap-10 items-start justify-items-center ${
              viewMode === 'compact'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {sortedAndFilteredProjects.map((project, idx) => {
              const globalIndex = PROJECTS_REGISTRY.findIndex((p) => p.id === project.id);
              const isSelected = selectedProjectId === project.id;

              return (
                <div
                  key={project.id}
                  className={`w-full flex justify-center transition-transform duration-300 motion-reduce:transform-none ${
                    viewMode === 'spatial'
                      ? globalIndex === 1
                        ? 'lg:translate-y-4'
                        : globalIndex === 2
                        ? 'lg:translate-y-2'
                        : globalIndex === 3
                        ? 'lg:translate-y-6'
                        : globalIndex === 4
                        ? 'lg:translate-y-3'
                        : ''
                      : ''
                  }`}
                >
                  <ProjectFolderObject
                    project={project}
                    index={globalIndex !== -1 ? globalIndex : idx}
                    isHovered={hoveredProjectId === project.id}
                    isSelected={isSelected}
                    onHoverStart={() => setHoveredProjectId(project.id)}
                    onHoverEnd={() => setHoveredProjectId(null)}
                    onSelect={(p) => {
                      setSelectedProjectId(p.id);
                      setContextMenu((prev) => ({ ...prev, isOpen: false }));
                    }}
                    onOpen={(p) => handleOpenProject(p)}
                    onContextMenu={handleProjectContextMenu}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Restrained NEXUS Archive Empty State */
          <div className="relative z-10 py-16 text-center max-w-lg mx-auto space-y-4 animate-fadeIn">
            <div className="p-6 bg-[#FAF6F0] rounded-[3px] border border-[rgba(10,10,9,0.14)] shadow-xs space-y-3 text-left font-mono">
              <div className="flex items-center justify-between border-b border-[rgba(10,10,9,0.08)] pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EF5A2A] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#0A0A09] uppercase tracking-wider">
                    VFS QUERY STATUS // 404_NOT_FOUND
                  </span>
                </div>
                <span className="text-[10px] text-[#8C8881]">INDEX: 0/5 MATCHES</span>
              </div>

              <div className="space-y-1 py-1">
                <p className="text-sm font-bold text-[#0A0A09]">
                  NOTHING MATCHED THE CURRENT QUERY.
                </p>
                <p className="text-xs text-[#66615A] leading-relaxed">
                  No registered project matches <span className="text-[#EF5A2A] font-bold">"{searchQuery}"</span>.
                  Try queries like <span className="underline decoration-[#EF5A2A]">Socket</span>, <span className="underline decoration-[#EF5A2A]">Redis</span>, <span className="underline decoration-[#EF5A2A]">Flashcards</span>, <span className="underline decoration-[#EF5A2A]">Razorpay</span>, or <span className="underline decoration-[#EF5A2A]">React</span>.
                </p>
              </div>

              <div className="pt-2 border-t border-[rgba(10,10,9,0.08)] flex items-center justify-between">
                <span className="text-[10px] text-[#8C8881]">
                  QUERY RUNTIME: 0.04ms
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedEdition('ALL');
                    setSortMode('edition');
                  }}
                  className="px-3 py-1.5 bg-[#0A0A09] hover:bg-[#EF5A2A] text-[#F3EEE5] rounded-[2px] text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESET QUERY</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Spatial Stage Footer Hint & Active Selection HUD */}
        <div className="mt-14 pt-6 border-t border-[rgba(10,10,9,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#66615A] select-none">
          <div className="flex items-center gap-3">
            <Compass className="w-3.5 h-3.5 text-[#EF5A2A]" />
            <span>
              {selectedProject
                ? `SELECTED: ${selectedProject.nexusEdition} (${selectedProject.name}) — DOUBLE-CLICK TO OPEN WORKSPACE`
                : 'CLICK TO SELECT • DOUBLE-CLICK TO OPEN WORKSPACE • RIGHT-CLICK FOR ACTIONS'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-[#8C8881]">
            <span className="hidden sm:inline">SHORTCUTS: [↑↓←→] NAVIGATE • [ENTER] OPEN • [ESC] CLOSE</span>
            <span>NEXUS REGISTRY // SOA</span>
          </div>
        </div>
      </main>

      {/* 5. Minimized Window Bottom Tray Bar */}
      {windowState?.isOpen && windowState.isMinimized && (
        <div className="fixed bottom-4 left-6 z-40 animate-fadeIn">
          <button
            onClick={() =>
              setWindowState((prev) => (prev ? { ...prev, isMinimized: false } : null))
            }
            className="px-4 py-2 bg-[#0A0A09] hover:bg-[#EF5A2A] text-[#F3EEE5] rounded-[2px] font-mono text-xs flex items-center gap-2 shadow-xl border border-white/10 transition-colors cursor-pointer"
            title="Restore project workspace"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#EF5A2A]" />
            <span className="font-bold">{windowState.project.nexusEdition}:</span>
            <span>{windowState.project.name}</span>
            <Maximize2 className="w-3 h-3 ml-2 opacity-70" />
          </button>
        </div>
      )}

      {/* 6. Active Project Workspace Window (Draggable & Full-Featured) */}
      {windowState?.isOpen && !windowState.isMinimized && (
        <ProjectWorkspaceWindow
          project={windowState.project}
          activeTab={windowState.activeTab}
          onTabChange={(tab) =>
            setWindowState((prev) => (prev ? { ...prev, activeTab: tab } : null))
          }
          onProjectSwitch={handleSwitchProjectInWindow}
          onClose={() => setWindowState(null)}
          onMinimize={() =>
            setWindowState((prev) => (prev ? { ...prev, isMinimized: true } : null))
          }
          isMaximized={windowState.isMaximized}
          onToggleMaximize={() =>
            setWindowState((prev) =>
              prev ? { ...prev, isMaximized: !prev.isMaximized } : null
            )
          }
          onOpenProperties={(p) => setPropertiesProject(p)}
        />
      )}

      {/* 7. Factual Properties Modal */}
      {propertiesProject && (
        <ProjectPropertiesModal
          project={propertiesProject}
          onClose={() => setPropertiesProject(null)}
        />
      )}

      {/* 8. Right-Click Context Menu */}
      <ArchiveContextMenu
        state={contextMenu}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onOpenProject={handleOpenProject}
        onOpenProperties={(p) => setPropertiesProject(p)}
        onRefreshArchive={() => {
          setSelectedEdition('ALL');
          setSearchQuery('');
          setSortMode('edition');
          setSelectedProjectId(PROJECTS_REGISTRY[0]?.id || null);
        }}
        onSortChange={(mode) => setSortMode(mode)}
        onViewChange={(mode) => setViewMode(mode)}
        onClearSelection={() => setSelectedProjectId(null)}
        currentSort={sortMode}
        currentView={viewMode}
      />
    </div>
  );
};
