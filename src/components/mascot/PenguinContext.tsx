/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import {
  PenguinState,
  PenguinContext as MascotContextType,
  TriggerSource,
  PenguinControllerSnapshot,
  DragPosition,
  InteractionPriority,
  SequenceStep,
} from './types.ts';
import { PENGUIN_TIMING } from './penguinTiming.ts';
import { PAGE_PROFILES, routeToPenguinContext } from './pageProfiles.ts';
import { CONTEXTUAL_IDLE_CONFIGS } from './idleProfiles.ts';
import { PenguinFrameKey } from './penguinData.ts';
import { AppRoute } from '../../types.ts';

export const CONTEXT_TARGET_SELECTORS: Partial<Record<MascotContextType, string>> = {
  HOME: '#nexus-home-page, #hero-section, main',
  ABOUT: '#story-chapter-01, #nexus-about-story-page, [data-story-chapter], section',
  PROJECTS: '#nexus-projects-workspace, [id^="project-folder-"], .project-folder-card',
  GALLERY: '#nexus-gallery-page, [id^="gallery-tile-"], .gallery-tile',
  TEAM: '#nexus-team-page, [id^="team-member-"], .team-card',
  CLUBS: '#clubs-container, [data-club-object], .club-card',
  CONTACT: '#nexus-contact-page, form',
};

interface PenguinContextValue {
  snapshot: PenguinControllerSnapshot;
  setPointerHoveringStation: (hovering: boolean) => void;
  notifyFooterInView: () => void;
  notifyFooterOutOfView: () => void;
  startDrag: (startX: number, startY: number) => void;
  updateDrag: (currentX: number, currentY: number) => void;
  endDrag: () => void;
  forceEscape: () => void;
  registerMascotElement: (el: HTMLElement | null) => void;
}

const PenguinContext = createContext<PenguinContextValue | null>(null);

const SESSION_STORAGE_KEY = 'nexus_penguin_sighting_records';
const SESSION_VISITED_STATION_KEY = 'nexus_penguin_station_visited';
const SESSION_HOME_COMPLETED_KEY = 'nexus_penguin_home_completed';

interface SightingRecord {
  count: number;
  lastTimestamp: number;
  completed?: boolean;
}

function getStoredSightings(): Record<string, SightingRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStoredSightings(records: Record<string, SightingRecord>): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Ignore storage issues
  }
}

interface PenguinProviderProps {
  children: ReactNode;
  currentRoute: AppRoute;
  preloaderFinished?: boolean;
}

export const PenguinProvider: React.FC<PenguinProviderProps> = ({
  children,
  currentRoute,
  preloaderFinished = true,
}) => {
  const currentContext = routeToPenguinContext(currentRoute);

  // Core State Machine State
  const [state, setState] = useState<PenguinState>('HIDDEN');
  const [activeContext, setActiveContext] = useState<MascotContextType>(currentContext);
  const [frame, setFrame] = useState<PenguinFrameKey>('idle');
  const [showHearts, setShowHearts] = useState(false);
  const [currentPeekOffset, setCurrentPeekOffset] = useState<number>(() => {
    return PAGE_PROFILES[currentContext]?.initialY ?? 54;
  });
  const [currentShiftX, setCurrentShiftX] = useState<number>(0);
  const [currentLeanDeg, setCurrentLeanDeg] = useState<number>(0);
  const [isFooterActive, setIsFooterActive] = useState(false);
  const [connectionActive, setConnectionActive] = useState(false);
  const [hasRecognizedVisitor, setHasRecognizedVisitor] = useState(false);
  const [canDrag, setCanDrag] = useState(false);

  // Environmental Awareness & Subtle Gaze
  const [subtleGazeAngle, setSubtleGazeAngle] = useState<number>(0);
  const [isGazingAtUser, setIsGazingAtUser] = useState<boolean>(false);

  // Interaction Priority & Context Awareness State
  const [priority, setPriority] = useState<InteractionPriority>('PENGUIN_IDLE');

  // Drag State
  const [dragPosition, setDragPosition] = useState<DragPosition>({
    rawDeltaX: 0,
    rawDeltaY: 0,
    clampedX: 0,
    clampedY: 0,
    rotation: 0,
    direction: null,
  });

  const dragOriginRef = useRef<{ x: number; y: number } | null>(null);

  // User activity & context awareness tracking
  const isUserTypingRef = useRef<boolean>(false);
  const isUserClickingRef = useRef<boolean>(false);
  const isFastScrollingRef = useRef<boolean>(false);
  const isNavOrModalOpenRef = useRef<boolean>(false);
  const isTargetInViewRef = useRef<boolean>(false);
  const isTabPausedRef = useRef<boolean>(false);

  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clickingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollStabilizeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef<number>(Date.now());
  const targetObserverRef = useRef<IntersectionObserver | null>(null);

  // Cleanly pausable active sequence tracker (resumes without restarting from step 0)
  const activeSequenceRef = useRef<{
    ctx: MascotContextType;
    steps: SequenceStep[];
    stepIndex: number;
    stepStartTime: number;
    remainingDuration: number;
    exitFrame: PenguinFrameKey;
    initialY: number;
    timer: NodeJS.Timeout | null;
  } | null>(null);

  // Timers, Refs & Awareness State
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);
  const hasMountedRouteRef = useRef<string | null>(null);

  // Home appearance guard: strictly prevents re-triggers across re-renders, state updates, scroll, and StrictMode
  const homeEncounterLockedRef = useRef<boolean>(
    typeof window !== 'undefined'
      ? (() => {
          try {
            return sessionStorage.getItem(SESSION_HOME_COMPLETED_KEY) === 'true';
          } catch {
            return false;
          }
        })()
      : false
  );

  const mascotElementRef = useRef<HTMLElement | null>(null);
  const isPointerNearbyRef = useRef<boolean>(false);
  const isGazingAtUserRef = useRef<boolean>(false);
  const isFooterInViewRef = useRef<boolean>(false);
  const idleActionCooldownUntilRef = useRef<number>(0);
  const proximityCooldownUntilRef = useRef<number>(0);
  const proximitySettleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (proximitySettleTimerRef.current) {
      clearTimeout(proximitySettleTimerRef.current);
      proximitySettleTimerRef.current = null;
    }
  }, []);

  const registerMascotElement = useCallback((el: HTMLElement | null) => {
    mascotElementRef.current = el;
  }, []);

  const markHomeEncounterCompleted = useCallback(() => {
    homeEncounterLockedRef.current = true;
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(SESSION_HOME_COMPLETED_KEY, 'true');
      } catch {
        // ignore
      }
    }
    const sightings = getStoredSightings();
    sightings['HOME'] = {
      count: 1,
      lastTimestamp: Date.now(),
      completed: true,
    };
    setStoredSightings(sightings);
  }, []);

  // Check whether this route can trigger a sneak peek
  const canTriggerSneakPeek = useCallback((ctx: MascotContextType): boolean => {
    // Strict Home Guard: rare secret encounter, never retriggered once locked/completed
    if (ctx === 'HOME') {
      if (homeEncounterLockedRef.current) return false;
      if (typeof window !== 'undefined') {
        try {
          if (sessionStorage.getItem(SESSION_HOME_COMPLETED_KEY) === 'true') {
            homeEncounterLockedRef.current = true;
            return false;
          }
          // Do not initiate home peek if user has already scrolled down into content
          if (window.scrollY > 120) {
            return false;
          }
        } catch {
          // ignore
        }
      }
    }

    const sightings = getStoredSightings();
    const record = sightings[ctx];
    if (!record) return true;

    // A completed home encounter is strictly final for the session
    if (ctx === 'HOME' && record.completed) {
      return false;
    }

    // Max sightings per route per session
    if (record.count >= PENGUIN_TIMING.sessionMaxSightingsPerRoute) {
      return false;
    }

    // Cooldown elapsed check
    const now = Date.now();
    if (now - record.lastTimestamp < PENGUIN_TIMING.routeCooldownMs) {
      return false;
    }

    return true;
  }, []);

  const recordSighting = useCallback((ctx: MascotContextType) => {
    const sightings = getStoredSightings();
    const current = sightings[ctx] || { count: 0, lastTimestamp: 0 };
    sightings[ctx] = {
      count: current.count + 1,
      lastTimestamp: Date.now(),
    };
    setStoredSightings(sightings);
  }, []);

  // Check whether visitor was seen in previous routes
  const checkPreviousSightings = useCallback((): boolean => {
    const sightings = getStoredSightings();
    let total = 0;
    for (const key of Object.keys(sightings)) {
      total += sightings[key]?.count || 0;
    }
    return total > 0;
  }, []);

  // -------------------------------------------------------------
  // CONTROLLED IDLE SYSTEM & STILLNESS RULE
  // Stillness dominates: ~70% still, ~15% blink, ~5% tilt, ~5% posture, ~5% glance
  // -------------------------------------------------------------
  const scheduleNextIdleAction = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    // Visibility optimization: Pause loops if page is hidden or footer is offscreen
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      return;
    }
    if (activeContext === 'FOOTER' && !isFooterInViewRef.current) {
      return;
    }

    // Stillness is the primary baseline. Irregular evaluation interval: 4.4s to 8.2s
    const delay =
      PENGUIN_TIMING.idleMinIntervalMs +
      Math.random() * (PENGUIN_TIMING.idleMaxIntervalMs - PENGUIN_TIMING.idleMinIntervalMs);

    idleTimerRef.current = setTimeout(() => {
      // Must be currently in IDLE state and not currently interacting, gazing, or dragging
      if (state !== 'IDLE' || isGazingAtUserRef.current || dragOriginRef.current !== null) {
        scheduleNextIdleAction();
        return;
      }

      const now = Date.now();
      if (now < idleActionCooldownUntilRef.current) {
        // Enforce cooldown: stay still and re-evaluate later
        scheduleNextIdleAction();
        return;
      }

      const cfg = CONTEXTUAL_IDLE_CONFIGS[activeContext] || CONTEXTUAL_IDLE_CONFIGS.HOME;
      const roll = Math.random();

      // STILLNESS STRICTLY DOMINATES:
      // ~70%: DO NOTHING. Maintain grounded calm stillness.
      if (roll < PENGUIN_TIMING.idleStillnessThreshold) {
        setFrame('idle');
        scheduleNextIdleAction();
        return;
      }

      // ~15%: BLINK (clean single blink, rare natural double-blink)
      if (roll < PENGUIN_TIMING.idleBlinkThreshold) {
        setFrame('blink');
        idleActionCooldownUntilRef.current = now + PENGUIN_TIMING.idleActionCooldownMs;

        const t1 = setTimeout(() => {
          if (Math.random() < 0.20) {
            // Rare natural double blink
            setFrame('idle');
            const t2 = setTimeout(() => {
              setFrame('blink');
              const t3 = setTimeout(() => {
                setFrame('idle');
                scheduleNextIdleAction();
              }, 120);
              timersRef.current.push(t3);
            }, PENGUIN_TIMING.idleDoubleBlinkIntervalMs);
            timersRef.current.push(t2);
          } else {
            setFrame('idle');
            scheduleNextIdleAction();
          }
        }, PENGUIN_TIMING.idleBlinkDurationMs);

        timersRef.current.push(t1);
        return;
      }

      // ~5%: SMALL HEAD TILT (curious observant tilt)
      if (roll < PENGUIN_TIMING.idleHeadTiltThreshold) {
        setFrame(cfg.tiltFrame);
        idleActionCooldownUntilRef.current = now + PENGUIN_TIMING.idleActionCooldownMs;

        const tTilt = setTimeout(() => {
          setFrame('idle');
          scheduleNextIdleAction();
        }, PENGUIN_TIMING.idleTiltDurationMs);

        timersRef.current.push(tTilt);
        return;
      }

      // ~5%: SUBTLE BODY BOB / POSTURE CORRECTION (breath or tiny weight shift)
      if (roll < PENGUIN_TIMING.idlePostureThreshold) {
        const postureFrame = Math.random() < 0.5 ? cfg.postureFrame : 'walk_1';
        setFrame(postureFrame);
        idleActionCooldownUntilRef.current = now + PENGUIN_TIMING.idleActionCooldownMs;

        const tPosture = setTimeout(() => {
          setFrame('idle');
          scheduleNextIdleAction();
        }, PENGUIN_TIMING.idlePostureDurationMs);

        timersRef.current.push(tPosture);
        return;
      }

      // ~5%: SMALL DIRECTIONAL GLANCE / TINY VARIATION
      const glanceFrame = Math.random() < 0.65 ? cfg.glanceFrame : cfg.rareFrame;
      setFrame(glanceFrame);
      idleActionCooldownUntilRef.current = now + PENGUIN_TIMING.idleActionCooldownMs;

      const tGlance = setTimeout(() => {
        setFrame('idle');
        scheduleNextIdleAction();
      }, PENGUIN_TIMING.idleGlanceDurationMs);

      timersRef.current.push(tGlance);
    }, delay);
  }, [activeContext, state]);

  // -------------------------------------------------------------
  // FOOTER ENTRANCE CHOREOGRAPHY
  // -------------------------------------------------------------
  const startFooterSequence = useCallback(() => {
    clearTimers();
    setActiveContext('FOOTER');
    setIsFooterActive(true);
    setState('ENTERING');
    setCanDrag(false);
    setConnectionActive(false);

    const hasSeenBefore = checkPreviousSightings();
    setHasRecognizedVisitor(hasSeenBefore);

    // Step 1: FOOTER ENTER (slow, deliberate walk step on platform)
    setFrame('walk_1');
    const t1 = setTimeout(() => {
      setFrame('walk_2');
    }, PENGUIN_TIMING.footerStepInterval);

    // Step 2: WANDER / SETTLE (short settling phase - relaxed stillness)
    let elapsed = PENGUIN_TIMING.footerStepInterval * 2;
    const t2 = setTimeout(() => {
      setState('WATCHING');
      setFrame('idle');
    }, elapsed);

    // Step 3: NOTICE TINY ORANGE POINT (eye direction downwards/right)
    elapsed += PENGUIN_TIMING.footerSettleDuration;
    const t3 = setTimeout(() => {
      setState('WATCHING');
      setFrame('look_right');
    }, elapsed);

    // Step 4: CURIOUS (head tilt & body orientation toward the anchor point)
    elapsed += PENGUIN_TIMING.footerNoticePointDuration;
    const t4 = setTimeout(() => {
      setState('CURIOUS');
      setFrame('curious');
    }, elapsed);

    // Step 5: APPROACH (tiny approach toward point)
    elapsed += PENGUIN_TIMING.footerCuriousDuration;
    const t5 = setTimeout(() => {
      setState('INSPECTING');
      setFrame('walk_1');
    }, elapsed);

    elapsed += PENGUIN_TIMING.footerApproachStepDuration;
    const t6 = setTimeout(() => {
      setFrame('nexus_touch');
    }, elapsed);

    // Step 6: PAUSE before connection activates (causal pause)
    elapsed += PENGUIN_TIMING.footerTouchDuration;
    const t7 = setTimeout(() => {
      setState('CONNECTION_DISCOVERY');
    }, elapsed);

    // Step 7: DISCOVER NEXUS CONNECTION (activates only after the pause)
    elapsed += PENGUIN_TIMING.footerPreConnectionPause;
    const t8 = setTimeout(() => {
      setState('CONNECTED');
      setConnectionActive(true);
      // Connection reaction: tiny surprise
      setFrame('surprised');
    }, elapsed);

    // Step 8: REACT (tiny surprise -> look at line -> look at point -> look at user)
    elapsed += PENGUIN_TIMING.footerSurpriseDuration;
    const t9 = setTimeout(() => {
      setFrame('look_up'); // Look at glowing line
    }, elapsed);

    elapsed += PENGUIN_TIMING.footerLookLineDuration;
    const t10 = setTimeout(() => {
      setFrame('inspect'); // Look back at point
    }, elapsed);

    elapsed += PENGUIN_TIMING.footerLookPointDuration;
    const t11 = setTimeout(() => {
      setFrame('look_left'); // Look at user
    }, elapsed);

    // Step 9: WAVE
    elapsed += PENGUIN_TIMING.footerLookUserDuration;
    const t12 = setTimeout(() => {
      setState('WAVING');
      setFrame('wave_smile');
    }, elapsed);

    // Step 10: IDLE (enters relaxed idle, enables drag)
    elapsed += PENGUIN_TIMING.footerWaveDuration;
    const t13 = setTimeout(() => {
      setState('IDLE');
      setFrame('idle');
      setCanDrag(true);
      scheduleNextIdleAction();
    }, elapsed);

    timersRef.current.push(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13);
  }, [checkPreviousSightings, clearTimers, scheduleNextIdleAction]);

  // -------------------------------------------------------------
  // NOTIFY FOOTER IN VIEW / OUT OF VIEW
  // -------------------------------------------------------------
  const notifyFooterInView = useCallback(() => {
    isFooterInViewRef.current = true;
    if (isFooterActive) {
      if (state === 'IDLE') {
        scheduleNextIdleAction();
      }
      return;
    }
    // Cancel any active page sneak-peek
    clearTimers();
    setShowHearts(false);
    startFooterSequence();
  }, [isFooterActive, state, clearTimers, startFooterSequence, scheduleNextIdleAction]);

  const notifyFooterOutOfView = useCallback(() => {
    isFooterInViewRef.current = false;
    // When footer leaves view, pause idle and reset gaze
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (proximitySettleTimerRef.current) {
      clearTimeout(proximitySettleTimerRef.current);
      proximitySettleTimerRef.current = null;
    }
    setSubtleGazeAngle(0);
    setIsGazingAtUser(false);
    isGazingAtUserRef.current = false;
    if (state === 'IDLE') {
      setFrame('idle');
    }
  }, [state]);

  // -------------------------------------------------------------
  // ENVIRONMENTAL AWARENESS & SUBTLE LOOK DIRECTION
  // -------------------------------------------------------------
  useEffect(() => {
    // Only monitor environmental awareness when mascot is visible in IDLE state and not dragging
    if (state !== 'IDLE' || (activeContext === 'FOOTER' && !isFooterInViewRef.current)) {
      setSubtleGazeAngle(0);
      setIsGazingAtUser(false);
      isGazingAtUserRef.current = false;
      return;
    }

    let rafId: number | null = null;
    let lastMoveTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      // Throttle pointer checks to max 30fps
      if (now - lastMoveTime < 32) return;
      lastMoveTime = now;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = mascotElementRef.current;
        if (!el || state !== 'IDLE' || dragOriginRef.current !== null) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);

        // Case A: Cursor is in nearby awareness radius
        if (distance <= PENGUIN_TIMING.proximityRadiusPx) {
          // Calculate subtle gaze angle: strictly clamped to tiny range (-3° to +3°)
          const rawAngle =
            (dx / PENGUIN_TIMING.proximityRadiusPx) * PENGUIN_TIMING.proximityMaxGazeAngleDeg;
          const clampedAngle = Math.max(
            -PENGUIN_TIMING.proximityMaxGazeAngleDeg,
            Math.min(PENGUIN_TIMING.proximityMaxGazeAngleDeg, rawAngle)
          );
          setSubtleGazeAngle(clampedAngle);
          setIsGazingAtUser(true);
          isGazingAtUserRef.current = true;

          // Pointer suddenly approaches (transition from outside)
          if (!isPointerNearbyRef.current) {
            isPointerNearbyRef.current = true;
            const currentTime = Date.now();
            if (currentTime > proximityCooldownUntilRef.current) {
              proximityCooldownUntilRef.current =
                currentTime + PENGUIN_TIMING.proximityReactionCooldownMs;

              if (distance <= PENGUIN_TIMING.proximityCloseRadiusPx) {
                // User hovers close -> slight curiosity
                setFrame('curious');
              } else {
                // Pointer suddenly approaches -> brief glance
                const glanceFrame: PenguinFrameKey =
                  dy < -60
                    ? 'look_up'
                    : dx < -30
                    ? 'look_left'
                    : dx > 30
                    ? 'look_right'
                    : 'curious';
                setFrame(glanceFrame);
              }
            }
          }

          // User remains nearby: settle timer eventually returns to neutral stillness
          if (proximitySettleTimerRef.current) {
            clearTimeout(proximitySettleTimerRef.current);
          }
          proximitySettleTimerRef.current = setTimeout(() => {
            if (state === 'IDLE' && dragOriginRef.current === null) {
              setFrame('idle');
              setSubtleGazeAngle(0);
              setIsGazingAtUser(false);
              isGazingAtUserRef.current = false;
              scheduleNextIdleAction();
            }
          }, PENGUIN_TIMING.proximitySettleDurationMs);
        } else {
          // Case B: Cursor outside nearby zone
          if (isPointerNearbyRef.current) {
            isPointerNearbyRef.current = false;
            if (proximitySettleTimerRef.current) {
              clearTimeout(proximitySettleTimerRef.current);
              proximitySettleTimerRef.current = null;
            }
            setSubtleGazeAngle(0);
            setIsGazingAtUser(false);
            isGazingAtUserRef.current = false;

            // Pointer suddenly leaves -> small return glance
            const currentTime = Date.now();
            if (state === 'IDLE' && currentTime > proximityCooldownUntilRef.current) {
              const returnGlance: PenguinFrameKey = dx < 0 ? 'look_left' : 'look_right';
              setFrame(returnGlance);
              const tReturn = setTimeout(() => {
                if (state === 'IDLE') {
                  setFrame('idle');
                  scheduleNextIdleAction();
                }
              }, 450);
              timersRef.current.push(tReturn);
            } else if (state === 'IDLE') {
              setFrame('idle');
              scheduleNextIdleAction();
            }
          }
        }
      });
    };

    const handlePointerLeave = () => {
      if (isPointerNearbyRef.current) {
        isPointerNearbyRef.current = false;
        setSubtleGazeAngle(0);
        setIsGazingAtUser(false);
        isGazingAtUserRef.current = false;
        if (state === 'IDLE') {
          setFrame('idle');
          scheduleNextIdleAction();
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [state, activeContext, scheduleNextIdleAction]);

  // -------------------------------------------------------------
  // CONTROLLED CONTEXT AWARENESS & PRIORITY ENGINE
  // Priority order:
  // 1. USER_DIRECT_INTERACTION (Dragging / Struggling / Direct Pointer Proximity)
  // 2. CURRENT_PAGE_ACTION (Typing / Clicking buttons / Opening Nav / Modal / Fast Scroll)
  // 3. PENGUIN_IDLE (Mascot settled in ambient idle)
  // 4. AMBIENT_MICRO_BEHAVIOUR (Subtle eye gaze & micro-adjustments)
  // -------------------------------------------------------------
  const computePriority = useCallback((): InteractionPriority => {
    if (
      state === 'DRAGGING' ||
      state === 'STRUGGLING' ||
      state === 'RELEASED' ||
      state === 'ANNOYED' ||
      isPointerNearbyRef.current
    ) {
      return 'USER_DIRECT_INTERACTION';
    }
    if (
      isUserTypingRef.current ||
      isUserClickingRef.current ||
      isFastScrollingRef.current ||
      isNavOrModalOpenRef.current
    ) {
      return 'CURRENT_PAGE_ACTION';
    }
    if (state === 'IDLE') {
      return 'PENGUIN_IDLE';
    }
    return 'AMBIENT_MICRO_BEHAVIOUR';
  }, [state]);

  // Synchronize priority state
  useEffect(() => {
    setPriority(computePriority());
  }, [computePriority]);

  // User Page Action Interruption Handler:
  // "If the user is: typing, clicking a button, opening navigation, interacting with a form,
  // opening a project, scrolling very quickly - the penguin should reduce its activity.
  // Never compete for attention with core UI."
  const handleUserPageInterruption = useCallback(() => {
    // If mascot is currently peeking on standard pages, retreat immediately without fighting
    if (
      !isFooterActive &&
      state !== 'HIDDEN' &&
      state !== 'RETREATING' &&
      state !== 'EXITING'
    ) {
      if (activeSequenceRef.current?.timer) {
        clearTimeout(activeSequenceRef.current.timer);
        activeSequenceRef.current.timer = null;
      }
      activeSequenceRef.current = null;
      clearTimers();
      setState('RETREATING');
      setFrame('peek_bottom');
      const initY = PAGE_PROFILES[activeContext]?.initialY ?? 54;
      setCurrentPeekOffset(initY);
      setShowHearts(false);

      const t = setTimeout(() => {
        setState('HIDDEN');
      }, 350);
      timersRef.current.push(t);
    }
  }, [isFooterActive, state, activeContext, clearTimers]);

  // -------------------------------------------------------------
  // STEP EXECUTION RUNNER WITH SEAMLESS PAUSE & RESUME
  // (Pauses when tab is hidden or user interrupts; resumes cleanly without restarting from step 0)
  // -------------------------------------------------------------
  const executeSequenceStep = useCallback(
    (stepIndex: number, delayOverride?: number) => {
      const seq = activeSequenceRef.current;
      if (!seq || isFooterActive) return;

      // Completed all sequence steps -> trigger exit
      if (stepIndex >= seq.steps.length) {
        setState('EXITING');
        setFrame(seq.exitFrame);
        setCurrentPeekOffset(seq.initialY);
        setCurrentShiftX(0);
        setCurrentLeanDeg(0);
        setShowHearts(false);

        const hideTimer = setTimeout(() => {
          setState('HIDDEN');
          if (seq.ctx === 'HOME') {
            markHomeEncounterCompleted();
          }
          activeSequenceRef.current = null;
        }, 600);
        timersRef.current.push(hideTimer);
        return;
      }

      const currentStep = seq.steps[stepIndex];
      seq.stepIndex = stepIndex;
      seq.stepStartTime = Date.now();
      seq.remainingDuration = delayOverride !== undefined ? delayOverride : currentStep.durationMs;

      seq.timer = setTimeout(() => {
        setState(currentStep.state);
        setFrame(currentStep.frame);
        if (currentStep.peekOffsetPx !== undefined) {
          setCurrentPeekOffset(currentStep.peekOffsetPx);
        }
        if (currentStep.shiftXPx !== undefined) {
          setCurrentShiftX(currentStep.shiftXPx);
        }
        if (currentStep.leanDeg !== undefined) {
          setCurrentLeanDeg(currentStep.leanDeg);
        }
        if (currentStep.showHearts !== undefined) {
          setShowHearts(currentStep.showHearts);
        }

        executeSequenceStep(stepIndex + 1);
      }, seq.remainingDuration);
    },
    [isFooterActive, markHomeEncounterCompleted]
  );

  // -------------------------------------------------------------
  // ROUTE SNEAK-PEEK CHOREOGRAPHY
  // -------------------------------------------------------------
  const startRouteSequence = useCallback(
    (ctx: MascotContextType) => {
      if (isFooterActive) return;
      if (!canTriggerSneakPeek(ctx)) return;

      const profile = PAGE_PROFILES[ctx];
      if (!profile || profile.sequence.length === 0) return;

      // Lock Home encounter immediately so concurrent triggers or rerenders cannot duplicate it
      if (ctx === 'HOME') {
        homeEncounterLockedRef.current = true;
      }

      clearTimers();
      setActiveContext(ctx);
      setState('WAITING');
      setFrame(profile.initialFrame);
      setCurrentPeekOffset(profile.initialY);
      setCurrentShiftX(0);
      setCurrentLeanDeg(0);
      setShowHearts(false);
      setCanDrag(false);

      // Initialize sequence tracker
      activeSequenceRef.current = {
        ctx,
        steps: profile.sequence,
        stepIndex: 0,
        stepStartTime: Date.now(),
        remainingDuration: profile.entryDelayMs,
        exitFrame: profile.exitFrame,
        initialY: profile.initialY,
        timer: null,
      };

      // Schedule initial entry delay
      const entryTimer = setTimeout(() => {
        // If user has scrolled down the page before entry fires, abort gracefully
        if (ctx === 'HOME' && typeof window !== 'undefined' && window.scrollY > 140) {
          setState('HIDDEN');
          markHomeEncounterCompleted();
          activeSequenceRef.current = null;
          return;
        }

        recordSighting(ctx);
        setState('ENTERING');
        setFrame(profile.initialFrame);
        setCurrentPeekOffset(profile.sequence[0]?.peekOffsetPx ?? profile.peekOffsetPx);

        // Run step 0
        executeSequenceStep(0, 400);
      }, profile.entryDelayMs);

      timersRef.current.push(entryTimer);
    },
    [
      isFooterActive,
      canTriggerSneakPeek,
      clearTimers,
      recordSighting,
      markHomeEncounterCompleted,
      executeSequenceStep,
    ]
  );

  // -------------------------------------------------------------
  // ELIGIBILITY EVALUATION:
  // Triggers only when target is meaningfully visible and user is not busy
  // -------------------------------------------------------------
  const checkAndTriggerIfEligible = useCallback(
    (ctx: MascotContextType) => {
      if (isFooterActive || ctx === 'FOOTER') return;
      if (!isTargetInViewRef.current) return;

      // Check user activity priority
      if (
        isUserTypingRef.current ||
        isUserClickingRef.current ||
        isFastScrollingRef.current ||
        isNavOrModalOpenRef.current
      ) {
        return;
      }

      if (!canTriggerSneakPeek(ctx)) return;
      if (state !== 'HIDDEN') return;

      startRouteSequence(ctx);
    },
    [isFooterActive, canTriggerSneakPeek, state, startRouteSequence]
  );

  // -------------------------------------------------------------
  // GLOBAL USER ACTIVITY OBSERVERS (TYPING / CLICKING / NAV / MODAL)
  // -------------------------------------------------------------
  useEffect(() => {
    const onInputOrKey = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const isFormEl =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;

      if (isFormEl) {
        isUserTypingRef.current = true;
        setPriority(computePriority());
        handleUserPageInterruption();

        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
        typingTimerRef.current = setTimeout(() => {
          isUserTypingRef.current = false;
          setPriority(computePriority());
          checkAndTriggerIfEligible(activeContext);
        }, 1400);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Do not suppress if interacting with mascot itself (that is direct user interaction)
      if (mascotElementRef.current?.contains(target)) return;

      const interactive = target.closest(
        'button, [role="button"], a, input, select, textarea, [aria-expanded], [data-interactive], [role="dialog"], #mobile-menu-drawer'
      );

      if (interactive) {
        isUserClickingRef.current = true;
        setPriority(computePriority());
        handleUserPageInterruption();

        if (clickingTimerRef.current) clearTimeout(clickingTimerRef.current);
        clickingTimerRef.current = setTimeout(() => {
          isUserClickingRef.current = false;
          setPriority(computePriority());
          checkAndTriggerIfEligible(activeContext);
        }, 1000);
      }
    };

    // Periodic detection of open navigation drawer or project modals
    const checkOverlays = () => {
      const navOpen =
        document.querySelector('#mobile-menu-drawer') !== null ||
        document.querySelector('[aria-expanded="true"]') !== null;
      const modalOpen =
        document.querySelector('[role="dialog"], #project-workspace-modal') !== null;

      const wasBusy = isNavOrModalOpenRef.current;
      const isBusy = navOpen || modalOpen;
      isNavOrModalOpenRef.current = isBusy;

      if (!wasBusy && isBusy) {
        setPriority(computePriority());
        handleUserPageInterruption();
      } else if (wasBusy && !isBusy) {
        setPriority(computePriority());
        checkAndTriggerIfEligible(activeContext);
      }
    };

    window.addEventListener('input', onInputOrKey, { passive: true, capture: true });
    window.addEventListener('keydown', onInputOrKey, { passive: true, capture: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true, capture: true });
    const overlayInterval = setInterval(checkOverlays, 350);

    return () => {
      window.removeEventListener('input', onInputOrKey, { capture: true });
      window.removeEventListener('keydown', onInputOrKey, { capture: true });
      window.removeEventListener('pointerdown', onPointerDown, { capture: true });
      clearInterval(overlayInterval);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (clickingTimerRef.current) clearTimeout(clickingTimerRef.current);
    };
  }, [handleUserPageInterruption, activeContext, checkAndTriggerIfEligible, computePriority]);

  // -------------------------------------------------------------
  // INTERSECTION AWARENESS & ROUTE TRANSITION
  // Trigger based on meaningful visibility, not mere DOM existence.
  // When route changes: CANCEL / TRANSITION / CLEANUP.
  // Never reuse old Home state on Projects or Gallery.
  // -------------------------------------------------------------
  useEffect(() => {
    if (!preloaderFinished) return;
    if (isFooterActive || currentContext === 'FOOTER') return;

    // Disconnect any active observer from previous route
    if (targetObserverRef.current) {
      targetObserverRef.current.disconnect();
      targetObserverRef.current = null;
    }
    isTargetInViewRef.current = false;

    // Cancel in-flight sequences and timers on route switch
    if (activeSequenceRef.current?.timer) {
      clearTimeout(activeSequenceRef.current.timer);
      activeSequenceRef.current.timer = null;
    }
    activeSequenceRef.current = null;
    clearTimers();

    // Reset mascot state cleanly for the new route
    setState('HIDDEN');
    setFrame('idle');
    setCurrentPeekOffset(PAGE_PROFILES[currentContext]?.initialY ?? 54);
    setCurrentShiftX(0);
    setCurrentLeanDeg(0);
    setShowHearts(false);
    setCanDrag(false);
    setActiveContext(currentContext);

    // HOME special case: immediately eligible at top of page (window.scrollY < 120)
    if (currentContext === 'HOME') {
      if (typeof window !== 'undefined' && window.scrollY < 120) {
        isTargetInViewRef.current = true;
        checkAndTriggerIfEligible('HOME');
      }
      return;
    }

    // Attach IntersectionObserver to target visual element of the route
    const selector = CONTEXT_TARGET_SELECTORS[currentContext];
    if (!selector) return;

    const setupObserver = () => {
      const targetEl = document.querySelector(selector);
      const fallbackTarget = targetEl || document.querySelector('main');
      if (!fallbackTarget) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          // Requires meaningful visibility (15%+ in viewport)
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            isTargetInViewRef.current = true;
            checkAndTriggerIfEligible(currentContext);
            // Disconnect once triggered for this route visit
            observer.disconnect();
            targetObserverRef.current = null;
          }
        },
        { threshold: [0.15, 0.4] }
      );

      observer.observe(fallbackTarget);
      targetObserverRef.current = observer;
    };

    // Small timeout ensures the new route component has mounted its DOM nodes
    const mountTimer = setTimeout(setupObserver, 80);

    return () => {
      clearTimeout(mountTimer);
      if (targetObserverRef.current) {
        targetObserverRef.current.disconnect();
        targetObserverRef.current = null;
      }
    };
  }, [
    currentRoute,
    preloaderFinished,
    currentContext,
    isFooterActive,
    clearTimers,
    checkAndTriggerIfEligible,
  ]);

  // -------------------------------------------------------------
  // INTERRUPTION: FAST SCROLL & SCROLL ESCAPE
  // Detects rapid scrolling; pauses triggers; allows visible mascot to retreat safely
  // without chasing the viewport. Resumes normal eligibility when scrolling stabilizes.
  // -------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const now = Date.now();
      const timeDiff = now - lastScrollTimeRef.current;
      const dist = Math.abs(currentY - lastScrollYRef.current);
      const velocity = timeDiff > 0 ? dist / timeDiff : 0;

      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;

      // Fast scroll threshold: velocity > 0.65 px/ms or sudden jump > 60px
      if (velocity > 0.65 || dist > 60) {
        isFastScrollingRef.current = true;
        setPriority(computePriority());

        // Mascot does not chase viewport: if visible on standard page, retreat smoothly
        if (
          !isFooterActive &&
          state !== 'HIDDEN' &&
          state !== 'RETREATING' &&
          state !== 'EXITING'
        ) {
          if (activeSequenceRef.current?.timer) {
            clearTimeout(activeSequenceRef.current.timer);
            activeSequenceRef.current.timer = null;
          }
          activeSequenceRef.current = null;
          clearTimers();
          setState('RETREATING');
          setFrame('peek_bottom');
          setCurrentPeekOffset(PAGE_PROFILES[activeContext]?.initialY ?? 54);
          setShowHearts(false);

          const t = setTimeout(() => {
            setState('HIDDEN');
            if (activeContext === 'HOME') {
              markHomeEncounterCompleted();
            }
          }, 350);
          timersRef.current.push(t);
        }
      }

      // Case 1: When user scrolls away from top on HOME
      if (activeContext === 'HOME' && !isFooterActive && currentY > 140) {
        if (
          state !== 'HIDDEN' &&
          state !== 'RETREATING' &&
          state !== 'EXITING'
        ) {
          if (activeSequenceRef.current?.timer) {
            clearTimeout(activeSequenceRef.current.timer);
            activeSequenceRef.current.timer = null;
          }
          activeSequenceRef.current = null;
          clearTimers();
          setState('RETREATING');
          setFrame('peek_bottom');
          setCurrentPeekOffset(54);
          setShowHearts(false);

          const t = setTimeout(() => {
            setState('HIDDEN');
            markHomeEncounterCompleted();
          }, 350);
          timersRef.current.push(t);
        }
      }

      // Scroll stabilization timer: resume normal eligibility after scrolling ceases
      if (scrollStabilizeTimerRef.current) {
        clearTimeout(scrollStabilizeTimerRef.current);
      }
      scrollStabilizeTimerRef.current = setTimeout(() => {
        isFastScrollingRef.current = false;
        setPriority(computePriority());
        if (!isFooterActive && isTargetInViewRef.current && state === 'HIDDEN') {
          checkAndTriggerIfEligible(activeContext);
        }
      }, 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollStabilizeTimerRef.current) clearTimeout(scrollStabilizeTimerRef.current);
    };
  }, [
    isFooterActive,
    state,
    activeContext,
    clearTimers,
    markHomeEncounterCompleted,
    checkAndTriggerIfEligible,
    computePriority,
  ]);

  // -------------------------------------------------------------
  // INTERRUPTION: TAB VISIBILITY (document.visibilityState)
  // When document.visibilityState === 'hidden':
  // Pauses sequence timers, idle timers, and gaze reactions.
  // When visible again: resumes cleanly without restarting from step 0.
  // -------------------------------------------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        isTabPausedRef.current = true;

        // 1. Pause in-flight sequence timer cleanly without resetting progress
        if (activeSequenceRef.current && activeSequenceRef.current.timer) {
          clearTimeout(activeSequenceRef.current.timer);
          activeSequenceRef.current.timer = null;
          const elapsed = Date.now() - activeSequenceRef.current.stepStartTime;
          activeSequenceRef.current.remainingDuration = Math.max(
            100,
            activeSequenceRef.current.remainingDuration - elapsed
          );
        }

        // 2. Pause idle loops and settle timers
        if (idleTimerRef.current) {
          clearTimeout(idleTimerRef.current);
          idleTimerRef.current = null;
        }
        if (proximitySettleTimerRef.current) {
          clearTimeout(proximitySettleTimerRef.current);
          proximitySettleTimerRef.current = null;
        }

        // 3. Reset gaze & pointer awareness
        setSubtleGazeAngle(0);
        setIsGazingAtUser(false);
        isGazingAtUserRef.current = false;
      } else {
        isTabPausedRef.current = false;

        // Tab visible again:
        // A. If a sequence was paused in flight, resume that exact step cleanly (do NOT restart sequence)
        if (
          activeSequenceRef.current &&
          !activeSequenceRef.current.timer &&
          !isUserTypingRef.current &&
          !isUserClickingRef.current &&
          !isFastScrollingRef.current
        ) {
          executeSequenceStep(
            activeSequenceRef.current.stepIndex,
            activeSequenceRef.current.remainingDuration
          );
        }

        // B. If in IDLE state, cleanly resume idle loop
        if (state === 'IDLE') {
          scheduleNextIdleAction();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [state, scheduleNextIdleAction, executeSequenceStep]);

  // -------------------------------------------------------------
  // DRAG & STRUGGLE PHYSICS HANDLERS
  // -------------------------------------------------------------
  const startDrag = useCallback(
    (startX: number, startY: number) => {
      if (!canDrag || state === 'DRAGGING' || state === 'STRUGGLING') return;

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }

      dragOriginRef.current = { x: startX, y: startY };
      setState('DRAGGING');
      setFrame('struggle_start');
    },
    [canDrag, state]
  );

  const updateDrag = useCallback(
    (currentX: number, currentY: number) => {
      if (!dragOriginRef.current) return;

      const rawDeltaX = currentX - dragOriginRef.current.x;
      const rawDeltaY = currentY - dragOriginRef.current.y;

      // Pointer movement = 100%, penguin movement ≈ 65% (spring resistance / physical lag)
      const ratio = PENGUIN_TIMING.dragResistanceRatio; // 0.65

      // Clamped boundary range to strictly stay inside the footer platform
      const clampedX = Math.max(
        -PENGUIN_TIMING.dragMaxHorizontalPx,
        Math.min(PENGUIN_TIMING.dragMaxHorizontalPx, rawDeltaX * ratio)
      );
      const clampedY = Math.max(
        PENGUIN_TIMING.dragMaxVerticalUpPx,
        Math.min(PENGUIN_TIMING.dragMaxVerticalDownPx, rawDeltaY * ratio)
      );

      let dir: 'left' | 'right' | 'up' | 'down' | null = null;
      let rot = 0;
      let struggleFrame: PenguinFrameKey = 'struggle_start';

      if (Math.abs(clampedX) >= Math.abs(clampedY)) {
        if (clampedX > 6) {
          dir = 'right';
          rot = -10; // leans back left to brace feet against rightward pull
          struggleFrame = 'struggle_right';
        } else if (clampedX < -6) {
          dir = 'left';
          rot = 10; // leans back right to brace feet against leftward pull
          struggleFrame = 'struggle_left';
        }
      } else {
        if (clampedY < -6) {
          dir = 'up';
          rot = clampedX > 0 ? -4 : clampedX < 0 ? 4 : 0;
          struggleFrame = 'struggle_up';
        } else if (clampedY > 6) {
          dir = 'down';
          rot = 0;
          struggleFrame = 'struggle_down';
        }
      }

      setState('STRUGGLING');
      setFrame(struggleFrame);
      setDragPosition({
        rawDeltaX,
        rawDeltaY,
        clampedX,
        clampedY,
        rotation: rot,
        direction: dir,
      });
    },
    []
  );

  const endDrag = useCallback(() => {
    if (!dragOriginRef.current) return;
    dragOriginRef.current = null;

    // Reset drag offsets so springs snap back cleanly
    setDragPosition({
      rawDeltaX: 0,
      rawDeltaY: 0,
      clampedX: 0,
      clampedY: 0,
      rotation: 0,
      direction: null,
    });

    // Step 1: Spring back & body recovers / feet settle (RELEASED -> 'recover')
    setState('RELEASED');
    setFrame('recover');

    // Step 2: Head looks toward user
    let t = PENGUIN_TIMING.dragRecoveryDuration;
    const t1 = setTimeout(() => {
      setFrame('look_left');
    }, t);

    // Step 3: Annoyed physical acting: side-eye pout
    t += PENGUIN_TIMING.dragLookUserDuration;
    const t2 = setTimeout(() => {
      setState('ANNOYED');
      setFrame('annoyed');
    }, t);

    // Step 4: Annoyed physical acting: blink
    t += PENGUIN_TIMING.dragAnnoyedSideEyeDuration;
    const t3 = setTimeout(() => {
      setFrame('blink');
    }, t);

    // Step 5: Annoyed physical acting: tiny turn away / little foot stomp
    t += PENGUIN_TIMING.dragAnnoyedBlinkDuration;
    const t4 = setTimeout(() => {
      setFrame('walk_1'); // little foot stomp / adjustment
    }, t);

    // Step 6: Return to IDLE
    t += PENGUIN_TIMING.dragAnnoyedStompDuration;
    const t5 = setTimeout(() => {
      setState('IDLE');
      setFrame('idle');
      scheduleNextIdleAction();
    }, t);

    timersRef.current.push(t1, t2, t3, t4, t5);
  }, [scheduleNextIdleAction]);

  const forceEscape = useCallback(() => {
    clearTimers();
    setState('HIDDEN');
    setShowHearts(false);
  }, [clearTimers]);

  const setPointerHoveringStation = useCallback(
    (hovering: boolean) => {
      if (state === 'IDLE') {
        setFrame(hovering ? 'look_right' : 'idle');
      }
    },
    [state]
  );

  // Deliberate test / reset helper for developer or user testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as Window & { __resetNexusHomeMascot?: () => void }).__resetNexusHomeMascot = () => {
        try {
          sessionStorage.removeItem(SESSION_HOME_COMPLETED_KEY);
        } catch {}
        homeEncounterLockedRef.current = false;
        const sightings = getStoredSightings();
        delete sightings['HOME'];
        setStoredSightings(sightings);
        console.log('[NEXUS Mascot] Home encounter reset. Ready to trigger on next Home view.');
      };
    }
  }, []);

  const profile = PAGE_PROFILES[activeContext] || PAGE_PROFILES.HOME;

  const snapshot: PenguinControllerSnapshot = {
    state,
    context: activeContext,
    priority,
    frame,
    showHearts,
    canDrag,
    dragPosition,
    isFooterActive,
    connectionActive,
    hasRecognizedVisitor,
    positionClass: profile.positionClass,
    initialY: profile.initialY,
    initialX: profile.initialX,
    peekOffsetPx: currentPeekOffset,
    shiftXPx: currentShiftX,
    leanDeg: currentLeanDeg,
    subtleGazeAngle,
    isGazingAtUser,
  };

  return (
    <PenguinContext.Provider
      value={{
        snapshot,
        setPointerHoveringStation,
        notifyFooterInView,
        notifyFooterOutOfView,
        startDrag,
        updateDrag,
        endDrag,
        forceEscape,
        registerMascotElement,
      }}
    >
      {children}
    </PenguinContext.Provider>
  );
};

export const usePenguin = (): PenguinContextValue => {
  const context = useContext(PenguinContext);
  if (!context) {
    throw new Error('usePenguin must be used within a PenguinProvider');
  }
  return context;
};
