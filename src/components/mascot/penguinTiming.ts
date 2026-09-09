/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * EXPLICIT CONFIGURABLE TIMING CONSTANTS
 * Authoritative duration and delay thresholds for the NEXUS Penguin Behaviour Engine.
 */
export const PENGUIN_TIMING = {
  // Home Route Timing (Deliberate hidden-secret encounter)
  homePeekDelay: 4200,
  homePeekStep1Duration: 950,
  homePeekStep2Duration: 800,
  homeNoticeDuration: 900,
  homeSmileDuration: 800,
  homeWaveBeatDuration: 280,
  homeHeartsDuration: 1500,
  homePauseDuration: 950,
  homeShyDuration: 900,
  homeDuckingDuration: 550,
  homeRetreatDuration: 650,

  // About Route Timing — "The Observer"
  aboutPeekDelay: 3600,
  aboutEmergeDuration: 900,
  aboutLookDuration: 1200,
  aboutObserveDuration: 1400,
  aboutBlinkDuration: 320,
  aboutTiltDuration: 1200,
  aboutStillnessDuration: 950,
  aboutDisappearDuration: 750,

  // Projects Route Timing — "The Inspector"
  projectPeekDelay: 3400,
  projectAppearDuration: 800,
  projectNoticeDuration: 900,
  projectApproachDuration: 750,
  projectInspectDuration: 1500,
  projectTiltDuration: 1100,
  projectAnalyticalPauseDuration: 900,
  projectStepBackDuration: 800,
  projectLeaveDuration: 700,

  // Gallery Route Timing — "The Admirer"
  galleryPeekDelay: 3600,
  galleryAppearDuration: 850,
  galleryNoticeDuration: 950,
  galleryStopDuration: 750,
  galleryLookDuration: 1400,
  galleryTiltDuration: 1100,
  galleryImpressedDuration: 1000,
  galleryLingerDuration: 1800,
  galleryLeaveDuration: 800,

  // Team Route Timing — "The Greeter"
  teamPeekDelay: 3400,
  teamAppearDuration: 750,
  teamNoticeDuration: 850,
  teamFriendlyDuration: 800,
  teamWaveDuration: 550,
  teamNodDuration: 750,
  teamPauseDuration: 900,
  teamLeaveDuration: 700,

  // Clubs Route Timing — "Explore a Club"
  clubsPeekDelay: 3400,
  clubsAppearDuration: 800,
  clubsNoticeDuration: 900,
  clubsCuriousDuration: 1000,
  clubsExploreDuration: 1300,
  clubsReactDuration: 1000,
  clubsLeaveDuration: 750,

  // Contact Route Timing — "The Hesitant One"
  contactPeekDelay: 3600,
  contactAppearDuration: 950,
  contactLookAroundDuration: 750,
  contactNoticeDuration: 850,
  contactApproachDuration: 700,
  contactHesitateDuration: 1100,
  contactPullBackDuration: 700,
  contactLookAgainDuration: 950,
  contactLeaveDuration: 700,

  // Footer Route / Ambassador Station Timing
  footerStepInterval: 320,
  footerSettleDuration: 850,
  footerNoticePointDuration: 750,
  footerCuriousDuration: 800,
  footerApproachStepDuration: 300,
  footerTouchDuration: 650,
  footerPreConnectionPause: 550,
  footerConnectionPulseDuration: 700,
  footerSurpriseDuration: 320,
  footerLookLineDuration: 550,
  footerLookPointDuration: 500,
  footerLookUserDuration: 500,
  footerWaveDuration: 950,
  footerIdleMinInterval: 3500,
  footerIdleMaxInterval: 6500,

  // Drag Physics & Post-Drag Reactions
  dragThresholdPx: 7,
  dragResistanceRatio: 0.65,
  dragMaxHorizontalPx: 80,
  dragMaxVerticalUpPx: -48,
  dragMaxVerticalDownPx: 26,
  dragRecoveryDuration: 300,
  dragLookUserDuration: 420,
  dragAnnoyedSideEyeDuration: 550,
  dragAnnoyedBlinkDuration: 150,
  dragAnnoyedStompDuration: 320,
  dragAnnoyedDuration: 1170,
  dragGlanceDuration: 550,
  dragReactionDuration: 2100,

  // Idle Behaviour & Stillness Bias
  // Stillness strictly dominates: 70% stay still, 15% blink, 5% tilt, 5% posture, 5% glance
  idleStillnessThreshold: 0.70,
  idleBlinkThreshold: 0.85,
  idleHeadTiltThreshold: 0.90,
  idlePostureThreshold: 0.95,

  idleMinIntervalMs: 4400,
  idleMaxIntervalMs: 8200,
  idleBlinkDurationMs: 160,
  idleDoubleBlinkIntervalMs: 120,
  idleTiltDurationMs: 850,
  idlePostureDurationMs: 650,
  idleGlanceDurationMs: 750,
  idleActionCooldownMs: 3200,

  // Environmental Proximity & Look Direction
  proximityRadiusPx: 210,
  proximityCloseRadiusPx: 75,
  proximityMaxGazeAngleDeg: 3.0, // Strictly tiny angle — never aggressive mouse-following
  proximitySettleDurationMs: 2000, // Returns to stillness if cursor remains nearby
  proximityReactionCooldownMs: 3500, // Prevents endless reaction loops

  // Safety, Interruptions & Cooldowns
  scrollEscapeVelocity: 40,
  routeCooldownMs: 14000,
  sessionMaxSightingsPerRoute: 2,
} as const;

export type PenguinTiming = typeof PENGUIN_TIMING;
