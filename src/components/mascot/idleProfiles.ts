/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PenguinContext } from './types.ts';
import { PenguinFrameKey } from './penguinData.ts';

export interface ContextualIdleConfig {
  context: PenguinContext;
  glanceFrame: PenguinFrameKey;
  tiltFrame: PenguinFrameKey;
  postureFrame: PenguinFrameKey;
  rareFrame: PenguinFrameKey;
  tone: 'friendly' | 'observational' | 'analytical' | 'contemplative' | 'hesitant' | 'relaxed';
}

export const CONTEXTUAL_IDLE_CONFIGS: Record<PenguinContext, ContextualIdleConfig> = {
  HOME: {
    context: 'HOME',
    glanceFrame: 'look_left',
    tiltFrame: 'curious',
    postureFrame: 'recover',
    rareFrame: 'happy',
    tone: 'friendly',
  },
  ABOUT: {
    context: 'ABOUT',
    glanceFrame: 'look_right',
    tiltFrame: 'curious',
    postureFrame: 'idle',
    rareFrame: 'look_right',
    tone: 'observational',
  },
  PROJECTS: {
    context: 'PROJECTS',
    glanceFrame: 'look_right',
    tiltFrame: 'curious',
    postureFrame: 'recover',
    rareFrame: 'inspect',
    tone: 'analytical',
  },
  GALLERY: {
    context: 'GALLERY',
    glanceFrame: 'look_up',
    tiltFrame: 'curious',
    postureFrame: 'idle',
    rareFrame: 'admire',
    tone: 'contemplative',
  },
  TEAM: {
    context: 'TEAM',
    glanceFrame: 'look_left',
    tiltFrame: 'curious',
    postureFrame: 'recover',
    rareFrame: 'happy',
    tone: 'friendly',
  },
  CLUBS: {
    context: 'CLUBS',
    glanceFrame: 'look_left',
    tiltFrame: 'curious',
    postureFrame: 'idle',
    rareFrame: 'curious',
    tone: 'observational',
  },
  CONTACT: {
    context: 'CONTACT',
    glanceFrame: 'shy',
    tiltFrame: 'look_right',
    postureFrame: 'recover',
    rareFrame: 'shy',
    tone: 'hesitant',
  },
  FOOTER: {
    context: 'FOOTER',
    glanceFrame: 'look_right',
    tiltFrame: 'curious',
    postureFrame: 'recover',
    rareFrame: 'look_left',
    tone: 'relaxed',
  },
};
