/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NexusProject } from '../../types.ts';

export type ArchiveSortMode = 'edition' | 'name' | 'technology' | 'domain';
export type ArchiveViewMode = 'spatial' | 'compact';

export interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
  targetType: 'desktop' | 'project';
  targetProject?: NexusProject;
}

export interface ProjectWindowState {
  isOpen: boolean;
  project: NexusProject;
  activeTab: 'overview' | 'documentation' | 'deliverables' | 'spec';
  isMaximized: boolean;
  isMinimized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}
