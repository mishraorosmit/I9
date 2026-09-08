/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ArchiveTrajectoryOverlayProps {
  hoveredIndex: number | null;
  selectedIndex: number | null;
  isWindowOpen?: boolean;
}

const TRAJECTORY_STAGES = [
  { id: 'E1', code: '01', label: 'IDEAS & COGNITION', sub: 'DSA Practice & AI Analysis', domain: 'Problem Solving' },
  { id: 'E2', code: '02', label: 'ACADEMIC SYSTEMS', sub: 'Discourse & Knowledge Exchange', domain: 'Academic Discourse' },
  { id: 'E3', code: '03', label: 'CAMPUS MOBILITY', sub: 'Real-Time Bus Telemetry', domain: 'Transportation' },
  { id: 'E4', code: '04', label: 'INSTITUTIONAL OPS', sub: 'Digital Library OS & FinTech', domain: 'Institutional Infra' },
  { id: 'E5', code: '05', label: 'CAMPUS ECOSYSTEM', sub: 'Event Lifecycle & Governance', domain: 'Ecosystem' },
];

/**
 * ARCHIVE TRAJECTORY OVERLAY
 * A subtle, signature orange trajectory system connecting the 5 project editions.
 * - Default: Almost invisible, fine technical hairline.
 * - Hover / Select: The local evolutionary path lights up in restrained NEXUS orange (#EF5A2A).
 * - Open Window: Signals visual convergence toward the active workspace.
 */
export const ArchiveTrajectoryOverlay: React.FC<ArchiveTrajectoryOverlayProps> = ({
  hoveredIndex,
  selectedIndex,
  isWindowOpen = false,
}) => {
  const activeIdx = hoveredIndex !== null ? hoveredIndex : selectedIndex;

  return (
    <div
      className="pointer-events-none w-full border-b border-[rgba(10,10,9,0.08)] bg-[#FAF6F0]/80 transition-colors duration-200"
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Trajectory Header Identity */}
        <div className="space-y-0.5 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIdx !== null ? 'bg-[#EF5A2A] shadow-[0_0_8px_rgba(239,90,42,0.6)]' : 'bg-[#8C8881]/50'
              }`}
            />
            <span className="font-dosis font-bold text-[11px] tracking-[0.22em] text-[#0A0A09] uppercase">
              ARCHIVE TRAJECTORY NETWORK
            </span>
          </div>
          <p className="font-mono text-[10px] text-[#8C8881] uppercase tracking-wider flex items-center gap-1.5">
            <span>E1</span>
            <span className={activeIdx !== null && activeIdx >= 1 ? 'text-[#EF5A2A] font-bold' : 'text-[#8C8881]/40'}>→</span>
            <span>E2</span>
            <span className={activeIdx !== null && activeIdx >= 2 ? 'text-[#EF5A2A] font-bold' : 'text-[#8C8881]/40'}>→</span>
            <span>E3</span>
            <span className={activeIdx !== null && activeIdx >= 3 ? 'text-[#EF5A2A] font-bold' : 'text-[#8C8881]/40'}>→</span>
            <span>E4</span>
            <span className={activeIdx !== null && activeIdx >= 4 ? 'text-[#EF5A2A] font-bold' : 'text-[#8C8881]/40'}>→</span>
            <span>E5</span>
            {isWindowOpen && (
              <span className="text-[#EF5A2A] font-bold text-[9px] ml-1 bg-[#EF5A2A]/10 px-1 py-0.2 rounded-[2px]">
                [WORKSPACE ACTIVE]
              </span>
            )}
          </p>
        </div>

        {/* 5-Phase Trajectory Stepper with SVG Flow Vectors */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
            {TRAJECTORY_STAGES.map((stg, idx) => {
              const isDirectActive = activeIdx === idx;
              const isPreceding = activeIdx !== null && activeIdx > idx;

              return (
                <div
                  key={stg.id}
                  className={`relative p-2 rounded-[2px] border transition-all duration-200 select-none ${
                    isDirectActive
                      ? 'bg-[#FFFDF9] border-[#EF5A2A] shadow-[0_2px_8px_rgba(239,90,42,0.1)] -translate-y-0.5'
                      : isPreceding
                      ? 'bg-[#FAF6F0] border-[rgba(239,90,42,0.25)]'
                      : 'bg-[#F3EEE5]/50 border-[rgba(10,10,9,0.06)]'
                  }`}
                >
                  {/* Subtle top hairline connection signal */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[1.5px] transition-colors duration-200 ${
                      isDirectActive
                        ? 'bg-[#EF5A2A]'
                        : isPreceding
                        ? 'bg-[#EF5A2A]/40'
                        : 'bg-transparent'
                    }`}
                  />

                  <div className="flex items-center justify-between font-mono text-[9px] mb-1">
                    <span
                      className={`font-bold transition-colors ${
                        isDirectActive
                          ? 'text-[#EF5A2A]'
                          : isPreceding
                          ? 'text-[#0A0A09]'
                          : 'text-[#8C8881]'
                      }`}
                    >
                      {stg.code} // {stg.id}
                    </span>
                    {isDirectActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A] animate-pulse" />
                    )}
                  </div>

                  <div className="font-dosis font-bold text-[10px] sm:text-[11px] tracking-wider text-[#0A0A09] uppercase leading-tight truncate">
                    {stg.label}
                  </div>

                  <div className="font-mono text-[8.5px] text-[#8C8881] truncate hidden sm:block mt-0.5">
                    {stg.domain}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
