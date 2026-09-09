/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PenguinFrameKey } from './penguinData.ts';

export type PenguinState =
  | 'HIDDEN'
  | 'WAITING'
  | 'ENTERING'
  | 'IDLE'
  | 'CURIOUS'
  | 'GREETING'
  | 'WATCHING'
  | 'INSPECTING'
  | 'ADMIRING'
  | 'HESITANT'
  | 'CONNECTION_DISCOVERY'
  | 'CONNECTED'
  | 'WAVING'
  | 'HEARTS'
  | 'RETREATING'
  | 'EXITING'
  | 'DRAGGING'
  | 'STRUGGLING'
  | 'RELEASED'
  | 'ANNOYED';

export type PenguinContext =
  | 'HOME'
  | 'ABOUT'
  | 'PROJECTS'
  | 'GALLERY'
  | 'TEAM'
  | 'CLUBS'
  | 'CONTACT'
  | 'FOOTER';

export type TriggerSource =
  | 'ROUTE_ENTERED'
  | 'PAGE_MOUNTED'
  | 'TARGET_IN_VIEW'
  | 'FOOTER_IN_VIEW'
  | 'FOOTER_OUT_OF_VIEW'
  | 'COOLDOWN_ELAPSED'
  | 'USER_PROXIMITY'
  | 'DRAG_START'
  | 'DRAG_MOVE'
  | 'DRAG_RELEASE'
  | 'SCROLL_ESCAPE'
  | 'FAST_SCROLL'
  | 'VISIBILITY_CHANGE'
  | 'ROUTE_LEAVE'
  | 'USER_ACTION_PAUSE'
  | 'USER_ACTION_RESUME'
  | 'RESET';

export type InteractionPriority =
  | 'USER_DIRECT_INTERACTION'
  | 'CURRENT_PAGE_ACTION'
  | 'PENGUIN_IDLE'
  | 'AMBIENT_MICRO_BEHAVIOUR';

export interface SequenceStep {
  state: PenguinState;
  frame: PenguinFrameKey;
  durationMs: number;
  showHearts?: boolean;
  peekOffsetPx?: number;
  shiftXPx?: number;
  leanDeg?: number;
}

export interface PageBehaviourProfile {
  context: PenguinContext;
  entryDelayMs: number;
  initialFrame: PenguinFrameKey;
  positionClass: string;
  initialY: number;
  initialX: number;
  peekOffsetPx: number;
  sequence: SequenceStep[];
  exitFrame: PenguinFrameKey;
  canDrag: boolean;
}

export interface DragPosition {
  rawDeltaX: number;
  rawDeltaY: number;
  clampedX: number;
  clampedY: number;
  rotation: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

export interface PenguinControllerSnapshot {
  state: PenguinState;
  context: PenguinContext;
  frame: PenguinFrameKey;
  showHearts: boolean;
  canDrag: boolean;
  dragPosition: DragPosition;
  isFooterActive: boolean;
  connectionActive: boolean;
  hasRecognizedVisitor: boolean;
  positionClass: string;
  initialY: number;
  initialX: number;
  peekOffsetPx: number;
  shiftXPx: number;
  leanDeg: number;
  subtleGazeAngle: number;
  isGazingAtUser: boolean;
  priority: InteractionPriority;
}
