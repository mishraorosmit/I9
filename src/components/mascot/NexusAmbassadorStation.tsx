/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import { Container } from '../primitives/Container.tsx';
import { NexusPenguinSprite } from './NexusPenguinSprite.tsx';
import { usePenguin } from './PenguinContext.tsx';

/**
 * NEXUS OFFICIAL MASCOT AMBASSADOR STATION
 * Interactive platform above the footer governed by the central Penguin Behaviour Engine.
 */
export const NexusAmbassadorStation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const stationRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const {
    snapshot,
    notifyFooterInView,
    notifyFooterOutOfView,
    startDrag,
    updateDrag,
    endDrag,
    setPointerHoveringStation,
    registerMascotElement,
  } = usePenguin();

  const isDragging = snapshot.state === 'DRAGGING' || snapshot.state === 'STRUGGLING';
  const isAnnoyed = snapshot.state === 'ANNOYED';

  // Spring physics for physical drag resistance and snappy settle
  const springConfig = { damping: 24, stiffness: 280, mass: 0.85 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);
  const springRotate = useSpring(0, springConfig);

  // Sync springs with controller's clamped drag offsets and subtle environmental gaze
  useEffect(() => {
    if (isDragging) {
      springX.set(snapshot.dragPosition.clampedX);
      springY.set(snapshot.dragPosition.clampedY);
      springRotate.set(shouldReduceMotion ? 0 : snapshot.dragPosition.rotation);
    } else {
      springX.set(0);
      springY.set(0);
      springRotate.set(shouldReduceMotion ? 0 : snapshot.subtleGazeAngle);
    }
  }, [
    isDragging,
    snapshot.dragPosition.clampedX,
    snapshot.dragPosition.clampedY,
    snapshot.dragPosition.rotation,
    snapshot.subtleGazeAngle,
    shouldReduceMotion,
    springX,
    springY,
    springRotate,
  ]);

  // Register physical character element with environmental awareness controller
  useEffect(() => {
    registerMascotElement(characterRef.current);
    return () => registerMascotElement(null);
  }, [registerMascotElement]);

  // 1. Viewport Intersection: Signals the central engine when footer is visible
  useEffect(() => {
    const el = stationRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          notifyFooterInView();
        } else {
          notifyFooterOutOfView();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [notifyFooterInView, notifyFooterOutOfView]);

  // Drag Gesture State & Scroll Safety
  const pointerOriginRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
    isTouch: boolean;
  } | null>(null);
  const isDragActiveRef = useRef(false);

  // 2. Pointer Down: Record origin, do NOT prematurely hijack touch or prevent scroll
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to primary click for mouse
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (!snapshot.canDrag) return;

    pointerOriginRef.current = {
      x: e.clientX,
      y: e.clientY,
      pointerId: e.pointerId,
      isTouch: e.pointerType === 'touch',
    };
    isDragActiveRef.current = false;
  };

  // 3. Pointer Move: Distinguish intentional drag from accidental movements and page scrolls
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragActiveRef.current) {
      e.preventDefault();
      updateDrag(e.clientX, e.clientY);
      return;
    }

    if (!pointerOriginRef.current || !snapshot.canDrag) {
      setPointerHoveringStation(isHovered);
      return;
    }

    const dx = e.clientX - pointerOriginRef.current.x;
    const dy = e.clientY - pointerOriginRef.current.y;
    const dist = Math.hypot(dx, dy);

    // Touch device scroll protection: if vertical movement is dominant, yield to native page scroll
    if (pointerOriginRef.current.isTouch) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
        pointerOriginRef.current = null;
        return;
      }
    }

    // Minimum movement threshold to begin dragging (prevent accidental tiny clicks)
    const threshold = pointerOriginRef.current.isTouch ? 10 : 6;
    if (dist >= threshold) {
      isDragActiveRef.current = true;
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(pointerOriginRef.current.pointerId);
      } catch {
        // Ignore
      }
      startDrag(pointerOriginRef.current.x, pointerOriginRef.current.y);
      updateDrag(e.clientX, e.clientY);
    }
  };

  // 4. Pointer Up / Cancel: Clean release and spring rebound
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerOriginRef.current) {
      try {
        if (isDragActiveRef.current) {
          e.currentTarget.releasePointerCapture(pointerOriginRef.current.pointerId);
        }
      } catch {
        // Ignore
      }
    }

    if (isDragActiveRef.current) {
      isDragActiveRef.current = false;
      endDrag();
    }
    pointerOriginRef.current = null;
  };

  return (
    <section
      id="nexus-ambassador-station"
      aria-label="NEXUS Official Brand Mascot Station"
      className="w-full bg-[#110F0E] text-[#F3EEE5] py-10 sm:py-14 border-t border-[rgba(243,238,229,0.08)] select-none"
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Station Editorial Descriptor */}
          <div className="space-y-2 max-w-md text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[rgba(239,90,42,0.12)] border border-[rgba(239,90,42,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A] animate-pulse" />
              <span className="font-dosis text-[11px] font-bold tracking-[0.25em] text-[#EF5A2A] uppercase">
                COMMUNITY AMBASSADOR
              </span>
            </div>
            <h3 className="font-dosis text-xl sm:text-2xl font-bold uppercase tracking-[0.14em] text-[#F3EEE5]">
              THE NEXUS PENGUIN
            </h3>
            <p className="font-bitter text-xs sm:text-sm text-[#F3EEE5]/70 leading-relaxed">
              Our resident pixel-art mascot and companion. Built with authentic character physics,
              spatial curiosity, and playful resistance.
            </p>
          </div>

          {/* Minimalist NEXUS Ground Platform */}
          <div
            ref={stationRef}
            onMouseEnter={() => {
              setIsHovered(true);
              setPointerHoveringStation(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setPointerHoveringStation(false);
            }}
            className="relative w-full max-w-[340px] sm:max-w-[380px] h-[160px] bg-[#0A0908] border border-[rgba(243,238,229,0.12)] hover:border-[rgba(239,90,42,0.4)] transition-colors duration-300 px-6 pt-5 pb-4 flex flex-col justify-between overflow-visible"
          >
            {/* Subtle Station Grid Texture */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(243, 238, 229, 0.3) 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Station Header & Node Connection Status */}
            <div className="relative z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#F3EEE5]/40 tracking-wider">
                  SYS_MASCOT // V2.6
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-dosis text-xs font-bold tracking-widest text-[#EF5A2A] uppercase">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDragging
                      ? 'bg-[#E63946] animate-ping'
                      : snapshot.connectionActive
                      ? 'bg-[#EF5A2A]'
                      : 'bg-[#555]'
                  }`}
                />
                <span>
                  {isDragging
                    ? 'STRUGGLING'
                    : snapshot.connectionActive
                    ? 'LINKED'
                    : 'STANDBY'}
                </span>
              </div>
            </div>

            {/* Ambient Orange Anchor Point & Dynamic Connection Line Effect */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 380 160"
            >
              {/* Permanent Orange Anchor Point on Platform Surface */}
              <circle cx="110" cy="115" r="2.5" fill="#EF5A2A" />
              <circle
                cx="110"
                cy="115"
                r="4.5"
                fill="none"
                stroke="#EF5A2A"
                strokeWidth="0.8"
                className="opacity-40"
              />

              {/* Dynamic Geometric Connection Network (Activates causally upon touch) */}
              <g
                className={`transition-opacity duration-700 ${
                  snapshot.connectionActive ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <line
                  x1="110"
                  y1="115"
                  x2="235"
                  y2="115"
                  stroke="#EF5A2A"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-60"
                />
                <line
                  x1="235"
                  y1="115"
                  x2="310"
                  y2="55"
                  stroke="#EF5A2A"
                  strokeWidth="1"
                  className="opacity-40"
                />
                <circle cx="235" cy="115" r="2.5" fill="#EF5A2A" />
                <circle cx="310" cy="55" r="3" fill="#EF5A2A" />
                <circle
                  cx="110"
                  cy="115"
                  r="5.5"
                  fill="none"
                  stroke="#EF5A2A"
                  strokeWidth="1"
                  className="animate-ping opacity-45 origin-center"
                />
              </g>
            </svg>

            {/* Character Stage & Grounding Platform */}
            <div className="relative z-20 flex items-end justify-between h-full pt-2">
              {/* Draggable Mascot Character (Scale ~3.2x) */}
              <div className="relative" style={{ minWidth: '70px', minHeight: '85px' }}>
                {/* Dynamic Pixel Shadow Underneath */}
                <motion.div
                  style={{
                    x: springX,
                    opacity: isDragging
                      ? snapshot.dragPosition.clampedY < -10
                        ? 0.2
                        : 0.45
                      : 0.65,
                    scaleX: isDragging
                      ? snapshot.dragPosition.clampedY < -10
                        ? 0.75
                        : 1.1
                      : 1,
                  }}
                  className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-14 h-2 bg-[#000000] rounded-full filter blur-[1px] pointer-events-none transition-opacity duration-150"
                />

                <motion.div
                  ref={characterRef}
                  style={{
                    x: springX,
                    y: springY,
                    rotate: springRotate,
                    scaleX: isDragging
                      ? snapshot.dragPosition.clampedY < -10
                        ? 0.95
                        : snapshot.dragPosition.clampedY > 10
                        ? 1.05
                        : 1
                      : 1,
                    scaleY: isDragging
                      ? snapshot.dragPosition.clampedY < -10
                        ? 1.05
                        : snapshot.dragPosition.clampedY > 10
                        ? 0.95
                        : 1
                      : 1,
                    touchAction: 'none',
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className={`relative select-none ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  } focus:outline-none`}
                  title="NEXUS Mascot — Drag and pull to play!"
                  aria-label="NEXUS Mascot Character"
                >
                  <NexusPenguinSprite
                    frame={snapshot.frame}
                    scale={3.2}
                    className="filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              </div>

              {/* Minimalist Right Status Indicator */}
              <div className="flex flex-col items-end text-right space-y-1 pb-1 pointer-events-none">
                <span className="font-mono text-[9px] text-[#F3EEE5]/40 tracking-widest uppercase">
                  INTERACTION
                </span>
                <span className="font-dosis font-bold text-[11px] text-[#F3EEE5]/80 tracking-wider uppercase">
                  {isDragging
                    ? 'RESISTING PULL'
                    : isAnnoyed
                    ? 'ANNOYED'
                    : snapshot.hasRecognizedVisitor
                    ? 'RECOGNIZES VISITOR'
                    : 'AWARE & CURIOUS'}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#EF5A2A]/70 uppercase pt-0.5">
                  {isDragging ? 'RELEASE TO SETTLE' : 'GRAB & PULL'}
                </span>
              </div>
            </div>

            {/* Crisp Ground Baseline Line */}
            <div className="absolute bottom-3.5 left-6 right-6 h-[1px] bg-[rgba(243,238,229,0.14)] pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
};
