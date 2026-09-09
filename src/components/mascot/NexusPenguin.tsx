/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { NexusPenguinSprite } from './NexusPenguinSprite.tsx';
import { PixelHeart } from './PixelHeart.tsx';
import { usePenguin, CONTEXT_TARGET_SELECTORS } from './PenguinContext.tsx';

/**
 * NEXUS PENGUIN FLOATING VIEW
 * Renders the page-context sneak peek when the penguin is active on standard website pages.
 * Controlled authoritatively by the unified PenguinState Machine.
 */
export const NexusPenguin: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const mascotRef = useRef<HTMLDivElement>(null);
  const { snapshot, registerMascotElement } = usePenguin();

  // Dynamic relative target orientation ('left' | 'right' | 'center')
  const [targetDirection, setTargetDirection] = useState<'left' | 'right' | 'center'>('left');

  useEffect(() => {
    if (snapshot.state !== 'HIDDEN' && snapshot.context !== 'FOOTER') {
      registerMascotElement(mascotRef.current);
    }
  }, [snapshot.state, snapshot.context, registerMascotElement]);

  // Responsive target detection: calculates target orientation from live DOM bounding boxes
  const evaluateTargetDirection = useCallback(() => {
    if (snapshot.state === 'HIDDEN' || snapshot.context === 'FOOTER' || snapshot.context === 'HOME') {
      return;
    }

    const selector = CONTEXT_TARGET_SELECTORS[snapshot.context];
    if (!selector) return;

    const targetEl = document.querySelector(selector);
    const mascotEl = mascotRef.current;
    if (!targetEl || !mascotEl) return;

    const targetRect = targetEl.getBoundingClientRect();
    const mascotRect = mascotEl.getBoundingClientRect();

    const targetCenterX = targetRect.left + targetRect.width / 2;
    const mascotCenterX = mascotRect.left + mascotRect.width / 2;

    if (targetCenterX < mascotCenterX - 16) {
      setTargetDirection('left');
    } else if (targetCenterX > mascotCenterX + 16) {
      setTargetDirection('right');
    } else {
      setTargetDirection('center');
    }
  }, [snapshot.context, snapshot.state]);

  useEffect(() => {
    evaluateTargetDirection();

    let resizeTimer: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        evaluateTargetDirection();
      }, 100);
    };

    let scrollRaf: number | null = null;
    let lastScrollEval = 0;
    const handleScroll = () => {
      const now = Date.now();
      // Throttle live layout bounding-box measurements to max once per 150ms during active scrolling
      if (now - lastScrollEval > 150) {
        lastScrollEval = now;
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(evaluateTargetDirection);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [evaluateTargetDirection]);

  // If the mascot is hidden or currently situated at the Footer Ambassador Station, do not render page peek
  if (snapshot.state === 'HIDDEN' || snapshot.context === 'FOOTER') {
    return null;
  }

  // Determine whether to mirror horizontally towards target
  // Standard sprite faces left naturally. If target is to the right on a left-placed mascot, mirror to face right.
  const isFacingRight = targetDirection === 'right' && snapshot.context !== 'HOME';

  return (
    <AnimatePresence>
      <div ref={mascotRef} className={snapshot.positionClass} aria-hidden="true">
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : snapshot.initialY,
            x: shouldReduceMotion ? 0 : snapshot.initialX,
            rotate: 0,
          }}
          animate={{
            opacity: 1,
            y: snapshot.peekOffsetPx,
            x: shouldReduceMotion ? 0 : snapshot.shiftXPx,
            rotate: shouldReduceMotion ? 0 : (snapshot.leanDeg || snapshot.subtleGazeAngle),
            scaleX: isFacingRight ? -1 : 1,
          }}
          exit={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : snapshot.initialY,
            x: shouldReduceMotion ? 0 : snapshot.initialX,
            rotate: 0,
            transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex items-center justify-center"
        >
          {/* 3–5 Tiny Pixel Hearts for Home Greeting (Target: 4) */}
          {snapshot.showHearts && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none">
              <PixelHeart delay={0} startX={-10} startY={0} driftX={-6} scale={1.8} />
              <PixelHeart delay={0.2} startX={8} startY={-2} driftX={7} scale={2.0} />
              <PixelHeart delay={0.38} startX={-3} startY={-6} driftX={-2} scale={2.2} />
              <PixelHeart delay={0.55} startX={6} startY={-10} driftX={5} scale={1.6} />
            </div>
          )}

          {/* Crisp Pixel-Art Mascot Sprite (Integer scale 2.4x) */}
          <NexusPenguinSprite
            frame={snapshot.frame}
            scale={2.4}
            className="filter drop-shadow-[0_4px_10px_rgba(10,10,9,0.25)]"
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
