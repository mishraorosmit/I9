/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ProjectMotifProps {
  edition: string;
  className?: string;
  isHovered?: boolean;
}

/**
 * PROJECT MOTIFS
 * Coherent, abstract geometric motifs for the 5 NEXUS editions.
 * Hand-crafted vector geometry matching the NEXUS technical editorial visual identity.
 *
 * E1: Algorithm / AI Cognition & Code Tree motif
 * E2: Discourse / Knowledge Graph & Dual Academic Nodes motif
 * E3: Transit Route / Live Waypoint Telemetry motif
 * E4: Digital Library / Archival Ledger & Security Stamp motif
 * E5: Campus Community / Event Hub Constellation motif
 */
export const ProjectMotif: React.FC<ProjectMotifProps> = ({
  edition,
  className = 'w-6 h-6',
  isHovered = false,
}) => {
  const strokeColor = isHovered ? '#EF5A2A' : '#66615A';
  const fillColor = isHovered ? '#EF5A2A' : '#0A0A09';

  switch (edition) {
    case 'NEXUS E1':
      // E1 (AlgoLog): Algorithmic Cognition / Tree Structure / Code Matrix
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Root node */}
          <circle cx="5" cy="6" r="2" fill={fillColor} />
          {/* Branching vector trajectories */}
          <path
            d="M5 8v10M5 13h10M5 18h14"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Child nodes */}
          <circle cx="15" cy="13" r="1.75" fill={isHovered ? '#EF5A2A' : 'none'} stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="19" cy="18" r="1.75" fill={fillColor} />
          {/* Code bracket tick */}
          <path
            d="M16 5l2.5 2L16 9"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'NEXUS E2':
      // E2 (Arcanum): Dual Academic Discourse & Intersecting Knowledge Vectors
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Primary discourse node frame */}
          <rect
            x="3"
            y="4"
            width="11"
            height="9"
            rx="1"
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <path d="M5 7h7M5 10h4" stroke={strokeColor} strokeWidth="1.25" strokeLinecap="round" />
          {/* Secondary response node */}
          <rect
            x="10"
            y="11"
            width="11"
            height="9"
            rx="1"
            stroke={strokeColor}
            strokeWidth="1.5"
            fill={isHovered ? 'rgba(239,90,42,0.08)' : 'none'}
          />
          <path d="M12 14h7M12 17h5" stroke={strokeColor} strokeWidth="1.25" strokeLinecap="round" />
          {/* Connection signal dot */}
          <circle cx="10" cy="11" r="1.75" fill={isHovered ? '#EF5A2A' : '#0A0A09'} />
        </svg>
      );

    case 'NEXUS E3':
      // E3 (Campus Commute): Curvilinear Transit Path with Telemetry Waypoints
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Curving transit route line */}
          <path
            d="M4 19c0-5 6-4 8-9s6-4 8-4"
            stroke={strokeColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray={isHovered ? 'none' : 'none'}
          />
          {/* Waypoint origin */}
          <circle cx="4" cy="19" r="2" fill={fillColor} />
          {/* Midpoint transit sensor station */}
          <circle cx="12" cy="10" r="1.75" fill="#FAF6F0" stroke={strokeColor} strokeWidth="1.5" />
          {/* Terminal destination beacon */}
          <circle cx="20" cy="6" r="2.25" fill={isHovered ? '#EF5A2A' : '#0A0A09'} />
          <circle cx="20" cy="6" r="4" stroke={strokeColor} strokeWidth="0.75" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case 'NEXUS E4':
      // E4 (SOA LIMS): Digital Archival Ledger, Folio Register & Verification Stamp
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Spine & Folio cover */}
          <path
            d="M4 4h12a2 2 0 012 2v14H6a2 2 0 01-2-2V4z"
            stroke={strokeColor}
            strokeWidth="1.5"
            fill={isHovered ? 'rgba(239,90,42,0.06)' : 'none'}
          />
          {/* Ledger records */}
          <path d="M7 8h6M7 11h6M7 14h4" stroke={strokeColor} strokeWidth="1.25" strokeLinecap="round" />
          {/* Verification stamp lock / seal */}
          <circle cx="17" cy="16" r="3" fill="#FAF6F0" stroke={isHovered ? '#EF5A2A' : '#0A0A09'} strokeWidth="1.5" />
          <path d="M16 16l1 1 2-2" stroke={isHovered ? '#EF5A2A' : '#0A0A09'} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'NEXUS E5':
      // E5 (SOA ClubSphere): Campus Community Cluster & Event Hub Constellation
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Constellation hub interconnect vectors */}
          <path
            d="M12 4l7 6-3 9H8L5 10l7-6z"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <path d="M12 4v8M19 10l-7 2M5 10l7 2M16 19l-4-7M8 19l4-7" stroke={strokeColor} strokeWidth="1.25" />
          {/* Central command hub */}
          <circle cx="12" cy="12" r="2.25" fill={isHovered ? '#EF5A2A' : '#0A0A09'} />
          {/* Orbiting club satellite nodes */}
          <circle cx="12" cy="4" r="1.5" fill={fillColor} />
          <circle cx="19" cy="10" r="1.5" fill={fillColor} />
          <circle cx="16" cy="19" r="1.5" fill={fillColor} />
          <circle cx="8" cy="19" r="1.5" fill={fillColor} />
          <circle cx="5" cy="10" r="1.5" fill={fillColor} />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );
  }
};
