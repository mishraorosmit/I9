/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, X, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { ArchiveSortMode } from './types.ts';

interface ArchiveControlBarProps {
  selectedEdition: string;
  onSelectEdition: (edition: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortMode: ArchiveSortMode;
  onSortChange: (mode: ArchiveSortMode) => void;
  filteredCount: number;
  totalCount: number;
  searchRef?: React.RefObject<HTMLInputElement | null>;
  editionListRef?: React.RefObject<HTMLDivElement | null>;
}

const EDITIONS = [
  { id: 'ALL', label: 'ALL PACKAGES', code: 'E1–E5' },
  { id: 'NEXUS E1', label: 'E1', title: 'ALGOLOG' },
  { id: 'NEXUS E2', label: 'E2', title: 'ARCANUM' },
  { id: 'NEXUS E3', label: 'E3', title: 'CAMPUS COMMUTE' },
  { id: 'NEXUS E4', label: 'E4', title: 'SOA LIMS' },
  { id: 'NEXUS E5', label: 'E5', title: 'SOA CLUBSPHERE' },
];

/**
 * ARCHIVE CONTROL BAR
 * Precision archive navigation utility for filtering, searching, and deterministic sorting.
 * Deep index search matches names, editions, technologies, domains, features, and keywords.
 */
export const ArchiveControlBar: React.FC<ArchiveControlBarProps> = ({
  selectedEdition,
  onSelectEdition,
  searchQuery,
  onSearchChange,
  sortMode,
  onSortChange,
  filteredCount,
  totalCount,
  searchRef,
  editionListRef,
}) => {
  return (
    <div
      id="nexus-archive-controls"
      className="w-full bg-[#FAF6F0] border-b border-[rgba(10,10,9,0.1)] px-4 sm:px-6 md:px-8 py-2.5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 text-[#0A0A09] font-mono text-xs select-none"
    >
      {/* 1. Edition Filter Stepper */}
      <div
        ref={editionListRef}
        tabIndex={-1}
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto py-0.5 outline-none"
      >
        <span className="text-[10px] text-[#8C8881] uppercase tracking-[0.2em] font-dosis font-bold mr-1 hidden sm:inline">
          EDITIONS:
        </span>

        {EDITIONS.map((ed) => {
          const isSelected =
            ed.id === 'ALL'
              ? selectedEdition === 'ALL'
              : selectedEdition.toLowerCase() === ed.id.toLowerCase() ||
                selectedEdition.toLowerCase().includes(ed.label.toLowerCase());

          return (
            <button
              key={ed.id}
              onClick={() => onSelectEdition(ed.id)}
              className={`relative px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs rounded-[2px] border transition-all duration-150 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? 'bg-[#FAF6F0] text-[#0A0A09] border-[#EF5A2A] font-bold shadow-2xs'
                  : 'bg-transparent text-[#66615A] border-[rgba(10,10,9,0.12)] hover:border-[#0A0A09] hover:text-[#0A0A09]'
              }`}
            >
              {/* Subtle orange active signal dot */}
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A] inline-block shrink-0 shadow-[0_0_4px_rgba(239,90,42,0.8)]" />
              )}
              <span>{ed.label}</span>
              {ed.code && (
                <span className="text-[9px] text-[#8C8881] font-normal">[{ed.code}]</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Search & Deterministic Sort Controls */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end">
        {/* Sort Selector */}
        <div className="flex items-center gap-1.5 bg-[#F3EEE5] px-2 py-1 rounded-[2px] border border-[rgba(10,10,9,0.12)] text-[11px] shrink-0">
          <ArrowUpDown className="w-3 h-3 text-[#8C8881] shrink-0" />
          <span className="text-[#8C8881] text-[10px] hidden xs:inline">SORT:</span>
          <select
            value={sortMode}
            onChange={(e) => onSortChange(e.target.value as ArchiveSortMode)}
            className="bg-transparent text-[#0A0A09] font-mono text-[11px] font-medium outline-none cursor-pointer pr-1"
            aria-label="Sort projects by"
          >
            <option value="edition">Edition (E1 → E5)</option>
            <option value="name">Name (A–Z)</option>
            <option value="technology">Technology Stack</option>
            <option value="domain">Domain Area</option>
          </select>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex-1 sm:w-64 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C8881]" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search stack / domain (Ctrl+K)..."
            className="w-full bg-[#F3EEE5] text-[#0A0A09] placeholder:text-[#8C8881] text-xs font-mono pl-8 pr-7 py-1.5 rounded-[2px] border border-[rgba(10,10,9,0.14)] focus:outline-none focus:border-[#EF5A2A] focus:bg-[#FFFDF9] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8C8881] hover:text-[#0A0A09] cursor-pointer"
              title="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Match Count Indicator */}
        <div className="text-[10px] sm:text-[11px] text-[#8C8881] whitespace-nowrap font-mono shrink-0">
          <span className="font-bold text-[#0A0A09]">{filteredCount}</span>/{totalCount}
        </div>
      </div>
    </div>
  );
};
