/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppRoute } from '../../types.ts';
import { InteractiveNexusX } from '../brand/NexusLogo.tsx';
import { ArrowLeft, Activity, Layers, Radio } from 'lucide-react';

interface ArchiveSystemBarProps {
  totalProjects: number;
  activeFilter: string;
  onRouteChange: (route: AppRoute) => void;
}

/**
 * ARCHIVE SYSTEM BAR
 * Subtle top system bar for the NEXUS Project Operating Environment.
 * Clean, warm editorial styling with technical metadata and quick navigation.
 */
export const ArchiveSystemBar: React.FC<ArchiveSystemBarProps> = ({
  totalProjects,
  activeFilter,
  onRouteChange,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="nexus-archive-system-bar"
      className="sticky top-0 z-40 w-full bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[rgba(10,10,9,0.12)] px-4 sm:px-6 md:px-8 py-2.5 flex items-center justify-between text-[#0A0A09] font-mono text-xs select-none"
    >
      {/* Left: Brand Identity & Archive Classification */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => onRouteChange('/')}
          className="group flex items-center gap-2 text-[#0A0A09] hover:text-[#EF5A2A] transition-colors cursor-pointer"
          title="Return to NEXUS Home"
          aria-label="NEXUS Home"
        >
          <span className="font-fraunces font-bold text-base tracking-tight flex items-center">
            NE
            <InteractiveNexusX sizeClass="w-3.5 h-3.5 mx-0.5 inline-block -translate-y-0.5" />
            US
          </span>
        </button>

        <span className="text-[#8C8881]/50 font-sans hidden xs:inline">•</span>

        <div className="flex items-center gap-2">
          <span className="font-dosis font-bold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#66615A]">
            PROJECT ARCHIVE
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-[#EBE5DB] text-[#0A0A09] rounded-[2px] text-[10px] font-semibold tracking-wider uppercase border border-[rgba(10,10,9,0.08)]">
            VFS // 2026
          </span>
        </div>
      </div>

      {/* Center: System Status & Package Count (Desktop) */}
      <div className="hidden md:flex items-center gap-4 text-[11px] text-[#66615A]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF5A2A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF5A2A]" />
          </span>
          <span className="font-semibold text-[#0A0A09]">
            {totalProjects} PACKAGES ONLINE
          </span>
        </div>

        <span className="text-[#8C8881]/40">•</span>

        <span className="text-[#66615A] tracking-wider uppercase">
          TRAJECTORY: <span className="text-[#EF5A2A] font-semibold">{activeFilter}</span>
        </span>
      </div>

      {/* Right: Clock & Return to Website CTA */}
      <div className="flex items-center gap-3 sm:gap-5">
        {timeStr && (
          <span className="text-[#8C8881] text-[11px] tracking-wider hidden lg:inline-block">
            {timeStr}
          </span>
        )}

        <button
          onClick={() => onRouteChange('/')}
          className="group inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A0A09] hover:bg-[#EF5A2A] text-[#F3EEE5] rounded-[2px] font-dosis font-bold text-[11px] sm:text-xs tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>EXIT ARCHIVE</span>
        </button>
      </div>
    </header>
  );
};
