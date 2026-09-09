/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageBehaviourProfile, PenguinContext } from './types.ts';
import { PENGUIN_TIMING } from './penguinTiming.ts';
import { AppRoute } from '../../types.ts';

export const PAGE_PROFILES: Record<PenguinContext, PageBehaviourProfile> = {
  HOME: {
    context: 'HOME',
    entryDelayMs: PENGUIN_TIMING.homePeekDelay,
    initialFrame: 'peek_bottom',
    positionClass: 'fixed bottom-0 right-6 sm:right-16 z-30 pointer-events-none',
    initialY: 54,
    initialX: 0,
    peekOffsetPx: 32,
    canDrag: false,
    exitFrame: 'peek_bottom',
    sequence: [
      // 1. Tiny peek (only tuft and top of head emerging) + decisive pause
      {
        state: 'ENTERING',
        frame: 'peek_bottom',
        peekOffsetPx: 32,
        durationMs: PENGUIN_TIMING.homePeekStep1Duration,
      },
      // 2. Pause & slightly more visible (eyes/beak peek over rim) + pause
      {
        state: 'CURIOUS',
        frame: 'peek_bottom',
        peekOffsetPx: 20,
        durationMs: PENGUIN_TIMING.homePeekStep2Duration,
      },
      // 3. Notice User: eyes & face react toward visitor
      {
        state: 'WATCHING',
        frame: 'look_left',
        peekOffsetPx: 16,
        durationMs: PENGUIN_TIMING.homeNoticeDuration,
      },
      // 4. Smile: expression changes warmly before waving
      {
        state: 'GREETING',
        frame: 'peek_bottom_happy',
        peekOffsetPx: 8,
        durationMs: PENGUIN_TIMING.homeSmileDuration,
      },
      // 5. Wave: Real short physical pixel-art animation sequence (wing flapping)
      {
        state: 'WAVING',
        frame: 'wave',
        peekOffsetPx: 2,
        durationMs: PENGUIN_TIMING.homeWaveBeatDuration,
      },
      {
        state: 'WAVING',
        frame: 'wave_smile',
        peekOffsetPx: 2,
        durationMs: PENGUIN_TIMING.homeWaveBeatDuration,
      },
      {
        state: 'WAVING',
        frame: 'wave',
        peekOffsetPx: 2,
        durationMs: PENGUIN_TIMING.homeWaveBeatDuration,
      },
      {
        state: 'WAVING',
        frame: 'wave_smile',
        peekOffsetPx: 2,
        durationMs: PENGUIN_TIMING.homeWaveBeatDuration,
      },
      // 6. Pixel Hearts: 3-5 maximum, float upward gently
      {
        state: 'HEARTS',
        frame: 'wave_smile',
        peekOffsetPx: 2,
        showHearts: true,
        durationMs: PENGUIN_TIMING.homeHeartsDuration,
      },
      // 7. Pause: quiet relaxed stillness, hearts finish and disappear
      {
        state: 'IDLE',
        frame: 'peek_bottom_happy',
        peekOffsetPx: 4,
        showHearts: false,
        durationMs: PENGUIN_TIMING.homePauseDuration,
      },
      // 8. Shy reaction: looks bashful / slightly embarrassed
      {
        state: 'HESITANT',
        frame: 'shy',
        peekOffsetPx: 10,
        durationMs: PENGUIN_TIMING.homeShyDuration,
      },
      // 9. Backs away / ducks downward
      {
        state: 'RETREATING',
        frame: 'peek_bottom',
        peekOffsetPx: 28,
        durationMs: PENGUIN_TIMING.homeDuckingDuration,
      },
      // 10. Retreats intentionally offscreen to hidden
      {
        state: 'EXITING',
        frame: 'peek_bottom',
        peekOffsetPx: 54,
        durationMs: PENGUIN_TIMING.homeRetreatDuration,
      },
    ],
  },

  ABOUT: {
    context: 'ABOUT',
    entryDelayMs: PENGUIN_TIMING.aboutPeekDelay,
    initialFrame: 'peek_bottom',
    positionClass: 'fixed bottom-0 left-6 sm:left-14 z-30 pointer-events-none',
    initialY: 42,
    initialX: 0,
    peekOffsetPx: 14,
    canDrag: false,
    exitFrame: 'peek_bottom',
    sequence: [
      // 1. Emerge: Quiet entrance into reading margin
      {
        state: 'ENTERING',
        frame: 'peek_bottom',
        peekOffsetPx: 12,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.aboutEmergeDuration,
      },
      // 2. Look at user
      {
        state: 'WATCHING',
        frame: 'look_right',
        peekOffsetPx: 10,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.aboutLookDuration,
      },
      // 3. Observe: Calm, thoughtful gaze at story narrative
      {
        state: 'WATCHING',
        frame: 'look_right',
        peekOffsetPx: 8,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.aboutObserveDuration,
      },
      // 4. Blink
      {
        state: 'IDLE',
        frame: 'blink',
        peekOffsetPx: 8,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.aboutBlinkDuration,
      },
      // 5. Head tilt: Curious observation ("Hmm. Interesting.")
      {
        state: 'CURIOUS',
        frame: 'curious',
        peekOffsetPx: 8,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.aboutTiltDuration,
      },
      // 6. Brief stillness
      {
        state: 'IDLE',
        frame: 'look_right',
        peekOffsetPx: 10,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.aboutStillnessDuration,
      },
      // 7. Disappear: Quiet, calm descent back into margin
      {
        state: 'RETREATING',
        frame: 'peek_bottom',
        peekOffsetPx: 48,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.aboutDisappearDuration,
      },
    ],
  },

  PROJECTS: {
    context: 'PROJECTS',
    entryDelayMs: PENGUIN_TIMING.projectPeekDelay,
    initialFrame: 'peek_bottom',
    positionClass: 'fixed bottom-8 right-8 sm:right-20 z-30 pointer-events-none',
    initialY: 42,
    initialX: 0,
    peekOffsetPx: 16,
    canDrag: false,
    exitFrame: 'peek_bottom',
    sequence: [
      // 1. Appear naturally within project visual environment
      {
        state: 'ENTERING',
        frame: 'peek_bottom',
        peekOffsetPx: 16,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.projectAppearDuration,
      },
      // 2. Notice project/object (eye direction oriented toward project object)
      {
        state: 'WATCHING',
        frame: 'look_left',
        peekOffsetPx: 10,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.projectNoticeDuration,
      },
      // 3. Approach or lean toward it
      {
        state: 'INSPECTING',
        frame: 'walk_1',
        peekOffsetPx: 6,
        shiftXPx: -12,
        leanDeg: -5,
        durationMs: PENGUIN_TIMING.projectApproachDuration,
      },
      // 4. Inspect: Magnifying glass / analytical examining posture toward object
      {
        state: 'INSPECTING',
        frame: 'inspect',
        peekOffsetPx: 4,
        shiftXPx: -18,
        leanDeg: -8,
        durationMs: PENGUIN_TIMING.projectInspectDuration,
      },
      // 5. Head tilt: Curious scrutiny
      {
        state: 'CURIOUS',
        frame: 'curious',
        peekOffsetPx: 4,
        shiftXPx: -18,
        leanDeg: -4,
        durationMs: PENGUIN_TIMING.projectTiltDuration,
      },
      // 6. Small analytical pause
      {
        state: 'WATCHING',
        frame: 'inspect',
        peekOffsetPx: 4,
        shiftXPx: -18,
        leanDeg: -6,
        durationMs: PENGUIN_TIMING.projectAnalyticalPauseDuration,
      },
      // 7. Step/shift backward
      {
        state: 'RETREATING',
        frame: 'peek_bottom',
        peekOffsetPx: 14,
        shiftXPx: -4,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.projectStepBackDuration,
      },
      // 8. Leave: Seamless exit transition to hidden
      {
        state: 'EXITING',
        frame: 'peek_bottom',
        peekOffsetPx: 52,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.projectLeaveDuration,
      },
    ],
  },

  GALLERY: {
    context: 'GALLERY',
    entryDelayMs: PENGUIN_TIMING.galleryPeekDelay,
    initialFrame: 'peek_bottom',
    positionClass: 'fixed bottom-0 right-10 sm:right-28 z-30 pointer-events-none',
    initialY: 42,
    initialX: 0,
    peekOffsetPx: 18,
    canDrag: false,
    exitFrame: 'peek_bottom',
    sequence: [
      // 1. Appear
      {
        state: 'ENTERING',
        frame: 'peek_bottom',
        peekOffsetPx: 18,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.galleryAppearDuration,
      },
      // 2. Notice artwork (gazing upward at photography record)
      {
        state: 'WATCHING',
        frame: 'look_up',
        peekOffsetPx: 12,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.galleryNoticeDuration,
      },
      // 3. Stop: Pauses completely still
      {
        state: 'IDLE',
        frame: 'idle',
        peekOffsetPx: 10,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.galleryStopDuration,
      },
      // 4. Look: Absorbed quietly in the artwork
      {
        state: 'ADMIRING',
        frame: 'admire',
        peekOffsetPx: 8,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.galleryLookDuration,
      },
      // 5. Head tilt
      {
        state: 'CURIOUS',
        frame: 'curious',
        peekOffsetPx: 8,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.galleryTiltDuration,
      },
      // 6. Slight impressed reaction
      {
        state: 'GREETING',
        frame: 'peek_bottom_happy',
        peekOffsetPx: 6,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.galleryImpressedDuration,
      },
      // 7. Linger: Quiet, absorbed moment
      {
        state: 'ADMIRING',
        frame: 'admire',
        peekOffsetPx: 8,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.galleryLingerDuration,
      },
      // 8. Leave: Smooth retreat to hidden
      {
        state: 'RETREATING',
        frame: 'peek_bottom',
        peekOffsetPx: 48,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.galleryLeaveDuration,
      },
    ],
  },

  TEAM: {
    context: 'TEAM',
    entryDelayMs: PENGUIN_TIMING.teamPeekDelay,
    initialFrame: 'peek_bottom',
    positionClass: 'fixed bottom-0 right-10 sm:right-24 z-30 pointer-events-none',
    initialY: 42,
    initialX: 0,
    peekOffsetPx: 16,
    canDrag: false,
    exitFrame: 'peek_bottom',
    sequence: [
      // 1. Appear
      {
        state: 'ENTERING',
        frame: 'peek_bottom',
        peekOffsetPx: 16,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.teamAppearDuration,
      },
      // 2. Notice team area (looks left across directory)
      {
        state: 'WATCHING',
        frame: 'look_left',
        peekOffsetPx: 10,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.teamNoticeDuration,
      },
      // 3. Friendly expression
      {
        state: 'GREETING',
        frame: 'peek_bottom_happy',
        peekOffsetPx: 6,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.teamFriendlyDuration,
      },
      // 4. Small wave (two concise pixel beats)
      {
        state: 'WAVING',
        frame: 'wave',
        peekOffsetPx: 4,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.teamWaveDuration,
      },
      {
        state: 'WAVING',
        frame: 'wave_smile',
        peekOffsetPx: 4,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.teamWaveDuration,
      },
      // 5. Tiny nod
      {
        state: 'GREETING',
        frame: 'happy',
        peekOffsetPx: 4,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.teamNodDuration,
      },
      // 6. Pause: Socially confident composure
      {
        state: 'IDLE',
        frame: 'idle',
        peekOffsetPx: 6,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.teamPauseDuration,
      },
      // 7. Leave: Clear exit path
      {
        state: 'RETREATING',
        frame: 'peek_bottom',
        peekOffsetPx: 46,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.teamLeaveDuration,
      },
    ],
  },

  CLUBS: {
    context: 'CLUBS',
    entryDelayMs: PENGUIN_TIMING.clubsPeekDelay,
    initialFrame: 'peek_bottom',
    positionClass: 'fixed bottom-0 right-12 sm:right-24 z-30 pointer-events-none',
    initialY: 42,
    initialX: 0,
    peekOffsetPx: 16,
    canDrag: false,
    exitFrame: 'peek_bottom',
    sequence: [
      // 1. Appear
      {
        state: 'ENTERING',
        frame: 'peek_bottom',
        peekOffsetPx: 16,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.clubsAppearDuration,
      },
      // 2. Notice a club/object
      {
        state: 'WATCHING',
        frame: 'look_left',
        peekOffsetPx: 10,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.clubsNoticeDuration,
      },
      // 3. Become curious
      {
        state: 'CURIOUS',
        frame: 'curious',
        peekOffsetPx: 8,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.clubsCuriousDuration,
      },
      // 4. Explore
      {
        state: 'INSPECTING',
        frame: 'inspect',
        peekOffsetPx: 6,
        shiftXPx: -8,
        leanDeg: -4,
        durationMs: PENGUIN_TIMING.clubsExploreDuration,
      },
      // 5. React
      {
        state: 'GREETING',
        frame: 'happy',
        peekOffsetPx: 4,
        shiftXPx: -4,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.clubsReactDuration,
      },
      // 6. Leave: Exit path to hidden
      {
        state: 'RETREATING',
        frame: 'peek_bottom',
        peekOffsetPx: 46,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.clubsLeaveDuration,
      },
    ],
  },

  CONTACT: {
    context: 'CONTACT',
    entryDelayMs: PENGUIN_TIMING.contactPeekDelay,
    initialFrame: 'shy',
    positionClass: 'fixed bottom-0 left-8 sm:left-20 z-30 pointer-events-none',
    initialY: 42,
    initialX: 0,
    peekOffsetPx: 22,
    canDrag: false,
    exitFrame: 'peek_bottom',
    sequence: [
      // 1. Appear carefully (low peek, cautious)
      {
        state: 'ENTERING',
        frame: 'shy',
        peekOffsetPx: 22,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.contactAppearDuration,
      },
      // 2. Look around
      {
        state: 'WATCHING',
        frame: 'look_left',
        peekOffsetPx: 18,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.contactLookAroundDuration,
      },
      {
        state: 'WATCHING',
        frame: 'look_right',
        peekOffsetPx: 18,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.contactLookAroundDuration,
      },
      // 3. Notice contact context
      {
        state: 'CURIOUS',
        frame: 'curious',
        peekOffsetPx: 14,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.contactNoticeDuration,
      },
      // 4. Approach slightly (comic hesitant creep)
      {
        state: 'INSPECTING',
        frame: 'walk_1',
        peekOffsetPx: 8,
        shiftXPx: 10,
        leanDeg: 3,
        durationMs: PENGUIN_TIMING.contactApproachDuration,
      },
      // 5. Hesitate ("Should I really be here?")
      {
        state: 'HESITANT',
        frame: 'shy',
        peekOffsetPx: 8,
        shiftXPx: 10,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.contactHesitateDuration,
      },
      // 6. Pull back
      {
        state: 'RETREATING',
        frame: 'peek_bottom',
        peekOffsetPx: 16,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.contactPullBackDuration,
      },
      // 7. Look again (comic double check)
      {
        state: 'WATCHING',
        frame: 'look_right',
        peekOffsetPx: 16,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.contactLookAgainDuration,
      },
      // 8. Finally leave: Clean exit path
      {
        state: 'EXITING',
        frame: 'peek_bottom',
        peekOffsetPx: 50,
        shiftXPx: 0,
        leanDeg: 0,
        durationMs: PENGUIN_TIMING.contactLeaveDuration,
      },
    ],
  },

  FOOTER: {
    context: 'FOOTER',
    entryDelayMs: 0,
    initialFrame: 'walk_1',
    positionClass: 'relative',
    initialY: 0,
    initialX: 0,
    peekOffsetPx: 0,
    canDrag: true,
    exitFrame: 'idle',
    sequence: [],
  },
};

export function routeToPenguinContext(route: AppRoute | string): PenguinContext {
  switch (route) {
    case '/':
      return 'HOME';
    case '/about':
      return 'ABOUT';
    case '/projects':
      return 'PROJECTS';
    case '/gallery':
      return 'GALLERY';
    case '/team':
      return 'TEAM';
    case '/clubs':
      return 'CLUBS';
    case '/contact':
      return 'CONTACT';
    default:
      return 'HOME';
  }
}
