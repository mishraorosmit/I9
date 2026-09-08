/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppRoute } from '../types.ts';
import { ArchiveCanvas } from '../components/projects/ArchiveCanvas.tsx';

interface ProjectsPageProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * PROJECTS PAGE — NEXUS PROJECT ARCHIVE / OPERATING ENVIRONMENT
 *
 * An intentional NEXUS digital archive and operating environment for ideas.
 * Projects exist as carefully positioned project folders/objects along an
 * evolutionary trajectory (E1 → E2 → E3 → E4 → E5).
 * Styled in warm cream, charcoal typography, and restrained NEXUS orange.
 */
export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onRouteChange }) => {
  return (
    <div id="nexus-projects-workspace" className="w-full h-full min-h-screen bg-[#F3EEE5]">
      <ArchiveCanvas onRouteChange={onRouteChange} />
    </div>
  );
};

export default ProjectsPage;

