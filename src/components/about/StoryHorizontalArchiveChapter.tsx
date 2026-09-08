/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles, Layers, SlidersHorizontal, Image as ImageIcon, Compass } from 'lucide-react';

export interface VisualArchiveMoment {
  id: string;
  number: string;
  step: string;
  category: string;
  title: string;
  subtitle: string;
  caption: string;
  location: string;
  timeline: string;
  imageUrl: string;
  svgAsset: string;
  tag: string;
  quote: string;
  spec: string;
}

export const VISUAL_ARCHIVE_MOMENTS: VisualArchiveMoment[] = [
  {
    id: 'moment-01-question',
    number: '01',
    step: 'QUESTION',
    category: 'THE INITIAL INQUIRY',
    title: 'Questioning Academic Boundaries',
    subtitle: 'RAW WHITEBOARD INQUIRIES',
    caption: 'Late afternoon critique: debating interface metaphors, algorithmic proofs, and ergonomic constraints across disciplines.',
    location: 'Critique Hall 2B',
    timeline: 'OCT 2026 // SPRINT 01',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=85',
    svgAsset: '/images/nexus/story/01-question.svg',
    tag: 'IDEATION & CRITIQUE',
    quote: 'Every breakthrough starts as an uncomfortable conversation across disciplines.',
    spec: 'LATENCY < 8MS // SENSORY MAPPING',
  },
  {
    id: 'moment-02-connection',
    number: '02',
    step: 'CONNECTION',
    category: 'MULTIDISCIPLINARY SQUAD MATCHING',
    title: 'Complementary Minds Matching',
    subtitle: 'CROSS-DISCIPLINE TEAM FORMATION',
    caption: 'Software engineers pairing with interaction designers and hardware prototypers at the main studio bench.',
    location: 'Nexus Central Atrium',
    timeline: 'SEP 2026 // COHORT FORMATION',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85',
    svgAsset: '/images/nexus/story/02-connection.svg',
    tag: 'PEOPLE & SQUADS',
    quote: 'No single-discipline silos. Every build squad unites software, visual craft, and physical computing.',
    spec: 'TRIAD SQUADS // 1:1:1 RATIO',
  },
  {
    id: 'moment-03-experiment',
    number: '03',
    step: 'EXPERIMENT',
    category: 'HARDWARE & CODE TELEMETRY',
    title: 'Oscilloscopes & Variable Glyphs',
    subtitle: 'TACTILE SENSORS & TYPOGRAPHY',
    caption: 'Testing ESP32 sensor telemetry and inspecting OpenType variable font axes under real optical bench conditions.',
    location: 'Lab 4B Hardware Bench',
    timeline: 'OCT 2026 // HARDWARE SPRINT',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
    svgAsset: '/images/nexus/story/03-experiment.svg',
    tag: 'EXPERIMENTATION',
    quote: 'We do not guess latency; we measure it on the bench until the interaction feels instantaneous.',
    spec: '1,000 HZ POLLING // 16-BIT ADC',
  },
  {
    id: 'moment-04-build',
    number: '04',
    step: 'BUILD',
    category: 'PHYSICAL FABRICATION & CODE',
    title: 'Crafting at the 1:00 AM Bench',
    subtitle: 'WOODSHOP MILLING & PIPELINES',
    caption: 'CNC milling solid walnut MIDI faceplates and pair-programming core Canvas rendering pipelines late into the night.',
    location: 'Makerspace Woodshop',
    timeline: 'NOV 2026 // FABRICATION',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=85',
    svgAsset: '/images/nexus/story/04-build.svg',
    tag: 'PHYSICAL FABRICATION',
    quote: 'When you encase code inside tactile wood and milled metal, it becomes an heirloom.',
    spec: 'AMERICAN WALNUT // CNC MILLED',
  },
  {
    id: 'moment-05-iterate',
    number: '05',
    step: 'ITERATE',
    category: 'TESTING & STRESS CRITIQUE',
    title: 'Breaking, Testing & Refining',
    subtitle: 'THE RAPID PROTOTYPING LOOP',
    caption: 'Stress-testing latency thresholds on real-time WebSockets and tuning capacitive sensor responsiveness.',
    location: 'Studio Bench 08',
    timeline: 'DEC 2026 // SPRINT TUNING',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85',
    svgAsset: '/images/nexus/story/05-iteration.svg',
    tag: 'ITERATION & REFINEMENT',
    quote: 'The mark of a serious builder is how quickly you learn from the debris.',
    spec: '4 RAPID CYCLES // V1.0 SHIPPED',
  },
  {
    id: 'moment-06-share',
    number: '06',
    step: 'SHARE',
    category: 'CAMPUS DEMONSTRATION',
    title: 'Courtyard Demonstrations',
    subtitle: 'PUBLIC DEMO EXHIBITION',
    caption: 'Presenting live tactile hardware instruments and web software to hundreds of visiting students and faculty.',
    location: 'Engineering Courtyard',
    timeline: 'JAN 2027 // DEMO NIGHT',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=85',
    svgAsset: '/images/nexus/story/06-share.svg',
    tag: 'PUBLIC DEMONSTRATION',
    quote: 'A project is complete when someone who had nothing to do with building it falls in love with using it.',
    spec: '420+ VISITORS // 0 CRASHES',
  },
  {
    id: 'moment-07-community',
    number: '07',
    step: 'COMMUNITY',
    category: 'THE ENDURING REPOSITORY',
    title: 'The Permanent Studio Bench',
    subtitle: 'OPEN-SOURCE COLLECTIVE ARCHIVE',
    caption: 'Open-sourcing every schematic and repository for upcoming cohorts to inherit, build upon, and remix.',
    location: 'Nexus Studio Hall',
    timeline: 'FEB 2027 // ENDURING ARCHIVE',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85',
    svgAsset: '/images/nexus/story/07-community.svg',
    tag: 'ENDURING COMMUNITY',
    quote: 'We build for the students who have not arrived on campus yet.',
    spec: 'MIT LICENSE // OPEN HARDWARE',
  },
];

export const StoryHorizontalArchiveChapter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>('photo');
  const [isSectionVisible, setIsSectionVisible] = useState(true);

  // Monitor visibility to pause expensive transforms when out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { rootMargin: '200px 0px 200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous vertical scroll measurement across the extended story track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track progress to update the current active moment indicator (01/07 to 07/07)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Map the horizontal movement zone (0.14 -> 0.86) to index 0..6
    const normalized = Math.max(0, Math.min(1, (latest - 0.12) / 0.74));
    const targetIdx = Math.min(
      VISUAL_ARCHIVE_MOMENTS.length - 1,
      Math.floor(normalized * VISUAL_ARCHIVE_MOMENTS.length)
    );
    setActiveMomentIndex(targetIdx);
  });

  // =========================================================================
  // SCROLL-DRIVEN TRANSFORMS (NO WHEEL INTERCEPTION, NATURAL STICKY VIEWPORT)
  // =========================================================================

  // 1. Entrance Transition:
  // Text settles: "These ideas are not abstract. They become people. They become experiments. They become things."
  const introHeadlineOpacity = useTransform(scrollYProgress, [0.0, 0.07, 0.14], [1, 1, 0]);
  const introHeadlineY = useTransform(scrollYProgress, [0.0, 0.14], [0, -40]);
  const introFrameScale = useTransform(scrollYProgress, [0.03, 0.15], [0.72, 1]);
  const introFrameOpacity = useTransform(scrollYProgress, [0.0, 0.05, 0.12], [0.4, 0.8, 1]);

  // 2. Horizontal Translation across 7 large visual plates:
  // Maps proportional vertical travel to horizontal translation without snapping or hijack
  const horizontalTranslate = useTransform(
    scrollYProgress,
    [0.14, 0.86],
    ['0%', '-79%']
  );

  // 3. Subtle Parallax for interior imagery:
  const innerParallaxX = useTransform(
    scrollYProgress,
    [0.14, 0.86],
    ['0%', '15%']
  );

  // 4. Exit Transition:
  // As the 7th image reaches its climax, it reduces scale, slides aside slightly, and exposes Chapter 03 seamlessly
  const exitScale = useTransform(scrollYProgress, [0.86, 0.98, 1.0], [1, 0.94, 0.88]);
  const exitOpacity = useTransform(scrollYProgress, [0.88, 0.98, 1.0], [1, 0.85, 0.5]);
  const exitTrackY = useTransform(scrollYProgress, [0.88, 1.0], [0, -30]);

  // Subtle pointer reaction on desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSectionVisible || shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMousePosition({ x, y });
  };

  const currentMoment = VISUAL_ARCHIVE_MOMENTS[activeMomentIndex] || VISUAL_ARCHIVE_MOMENTS[0];

  return (
    <section
      ref={containerRef}
      id="chapter-horizontal-journey"
      onMouseMove={handleMouseMove}
      className="horizontal-story relative w-full h-[450vh] bg-[#0A0A09] text-[#F3EEE5] select-none"
    >
      {/* Sticky Viewport Frame: 100vh viewport locked during vertical scroll */}
      <div className="horizontal-sticky-frame sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-7">
        
        {/* Subtle Warm Studio Atmosphere Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(239,90,42,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

        {/* =========================================================================
            TOP EDITORIAL METADATA & CONTINUOUS PROGRESS INDICATOR
            ========================================================================= */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-[#EF5A2A] text-[#0A0A09] font-dosis font-bold text-xs tracking-[0.2em] uppercase rounded-[2px]">
                VISUAL ARCHIVE
              </span>
              <span className="font-dosis text-xs text-[#F3EEE5]/75 uppercase tracking-[0.22em] font-semibold hidden sm:inline">
                CHRONOLOGY OF CRAFT (01–07)
              </span>
            </div>

            {/* View Mode Switcher & Real-Time Progress Bar */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Toggle Photo vs Schematic */}
              <div className="hidden md:inline-flex p-0.5 bg-white/10 rounded-[2px] border border-white/15 text-[11px] font-dosis uppercase font-bold tracking-wider">
                <button
                  onClick={() => setViewMode('photo')}
                  className={`px-2.5 py-1 rounded-[1px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'photo' ? 'bg-[#EF5A2A] text-[#0A0A09]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Documentary</span>
                </button>
                <button
                  onClick={() => setViewMode('schematic')}
                  className={`px-2.5 py-1 rounded-[1px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'schematic' ? 'bg-[#EF5A2A] text-[#0A0A09]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Schematic</span>
                </button>
              </div>

              {/* Continuous Step Number: 01 / 07 */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#F3EEE5]">
                  <span className="text-[#EF5A2A] font-bold text-sm tracking-wider">
                    {currentMoment.number}
                  </span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/80 font-semibold">07</span>
                  <span className="hidden lg:inline font-dosis text-xs uppercase tracking-wider text-[#F3EEE5]/70 pl-2">
                    // {currentMoment.step}
                  </span>
                </div>

                {/* Sleek Progress Hairline */}
                <div className="w-16 sm:w-28 h-[2px] bg-white/20 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${((activeMomentIndex + 1) / VISUAL_ARCHIVE_MOMENTS.length) * 100}%`,
                    }}
                    className="h-full bg-[#EF5A2A] transition-all duration-300 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            NATURAL ENTRANCE TRANSITION OVERLAY
            "These ideas are not abstract. They become people. They become experiments. They become things."
            ========================================================================= */}
        <motion.div
          style={{
            opacity: introHeadlineOpacity,
            y: introHeadlineY,
          }}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-6 text-center"
        >
          <div className="max-w-2xl space-y-4 bg-[#0A0A09]/95 backdrop-blur-md p-8 sm:p-10 rounded-[2px] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <span className="font-dosis text-xs font-bold text-[#EF5A2A] uppercase tracking-[0.24em] block">
              FROM ABSTRACT THOUGHT TO TACTILE REALITY
            </span>
            <h2 className="font-fraunces font-bold text-3xl sm:text-5xl text-white leading-tight">
              These ideas are not abstract.
            </h2>
            <div className="font-bitter text-base sm:text-xl text-[#F3EEE5]/90 italic space-y-1.5">
              <p>They become people.</p>
              <p>They become experiments.</p>
              <p className="text-[#EF5A2A] font-semibold not-italic font-dosis tracking-[0.16em] uppercase text-sm sm:text-base pt-1">
                They become things.
              </p>
            </div>
            <div className="pt-3 flex items-center justify-center gap-2 font-dosis text-xs text-[#F3EEE5]/60 tracking-widest uppercase">
              <span>SCROLL TO ENTER HORIZONTAL WORLD</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EF5A2A] animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            MAIN HORIZONTAL TRAVEL TRACK
            Large Editorial Cards (~58–68vw width, ~56–66vh height) with breathing room
            ========================================================================= */}
        <motion.div
          style={{
            scale: introFrameScale,
            opacity: introFrameOpacity,
            y: exitTrackY,
          }}
          className="relative flex-1 flex items-center overflow-hidden z-10 my-auto"
        >
          <motion.div
            style={{
              x: shouldReduceMotion ? '0%' : horizontalTranslate,
              scale: exitScale,
              opacity: exitOpacity,
            }}
            className="horizontal-track flex items-center gap-8 sm:gap-14 md:gap-20 pl-4 sm:pl-12 lg:pl-20 pr-32 will-change-transform"
          >
            {VISUAL_ARCHIVE_MOMENTS.map((moment, idx) => {
              const isActive = idx === activeMomentIndex;
              const isNearby = Math.abs(idx - activeMomentIndex) <= 1;

              return (
                <div
                  key={moment.id}
                  className={`shrink-0 transition-all duration-500 ease-out flex flex-col justify-between select-none ${
                    isActive
                      ? 'w-[84vw] sm:w-[70vw] lg:w-[62vw] max-w-5xl opacity-100 scale-100'
                      : isNearby
                      ? 'w-[80vw] sm:w-[66vw] lg:w-[58vw] max-w-4xl opacity-70 scale-[0.98]'
                      : 'w-[76vw] sm:w-[62vw] lg:w-[54vw] max-w-3xl opacity-45 scale-[0.95]'
                  }`}
                >
                  {/* Top Editorial Label Bar (Outside important image area) */}
                  <div className="flex items-center justify-between pb-2.5 mb-1.5 text-xs font-dosis border-b border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="font-bold text-[#EF5A2A] tracking-[0.2em]">
                        {moment.number} // {moment.step}
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="text-[#F3EEE5]/75 tracking-wider uppercase font-semibold hidden sm:inline">
                        {moment.category}
                      </span>
                    </div>
                    <span className="text-[#F3EEE5]/60 tracking-widest font-mono text-[11px] uppercase">
                      {moment.timeline}
                    </span>
                  </div>

                  {/* Main Large Visual Frame with Subtle Parallax & Light Response */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[2px] overflow-hidden border border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.7)] bg-[#121210] group">
                    <motion.div
                      style={{
                        transform:
                          isActive && !shouldReduceMotion
                            ? `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`
                            : 'none',
                      }}
                      className="w-full h-full relative"
                    >
                      {/* Active Media Layer (Photo or High-Resolution Generated Technical Schematic) */}
                      {viewMode === 'photo' ? (
                        <motion.img
                          style={{
                            x: shouldReduceMotion ? '0%' : innerParallaxX,
                          }}
                          src={moment.imageUrl}
                          alt={moment.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                      ) : (
                        <img
                          src={moment.svgAsset}
                          alt={`${moment.title} Schematic`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                      )}

                      {/* Warm Tone & Vignette Grading */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                      {/* Interactive Pointer Light Highlight on Desktop */}
                      {isActive && (
                        <div
                          style={{
                            background: `radial-gradient(circle 350px at ${50 + mousePosition.x * 1.5}% ${
                              50 + mousePosition.y * 1.5
                            }%, rgba(239, 90, 42, 0.12), transparent 70%)`,
                          }}
                          className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
                        />
                      )}

                      {/* In-Image Top Metadata Badges */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 bg-black/80 backdrop-blur-xs border border-white/15 text-[#F3EEE5] font-dosis text-[10px] sm:text-xs uppercase tracking-[0.18em]">
                        <span className="text-[#EF5A2A] font-bold mr-1.5">●</span>
                        <span>{moment.location}</span>
                      </div>

                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 bg-[#EF5A2A] text-[#0A0A09] font-dosis text-[10px] sm:text-xs uppercase font-bold tracking-widest rounded-[1px] shadow-xs">
                        {moment.tag}
                      </div>

                      {/* In-Image Bottom Headline & Technical Spec */}
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 space-y-1">
                        <div className="font-mono text-[10px] sm:text-xs text-[#EF5A2A] uppercase tracking-wider font-semibold">
                          SPEC // {moment.spec}
                        </div>
                        <h3 className="font-fraunces font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-tight drop-shadow-md">
                          {moment.title}
                        </h3>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Editorial Caption & Quote Outside Image Area */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 text-xs">
                    <p className="font-bitter text-[#F3EEE5]/85 text-xs sm:text-sm leading-relaxed max-w-2xl">
                      {moment.caption}
                    </p>
                    <span className="font-dosis uppercase tracking-[0.18em] text-[#EF5A2A] font-bold shrink-0 text-right">
                      {moment.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* =========================================================================
            BOTTOM EDITORIAL FOOTER WITH CHAPTER PROGRESSION HINT
            ========================================================================= */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pt-3.5 border-t border-white/15 text-xs font-dosis text-[#F3EEE5]/65 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EF5A2A] animate-pulse" />
              <span>VERTICAL SCROLL DRIVES HORIZONTAL CHRONOLOGY</span>
            </div>
            <div className="flex items-center gap-2 text-[#F3EEE5] hover:text-[#EF5A2A] transition-colors">
              <span>UNROLLING INTO CHAPTER 03</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EF5A2A]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StoryHorizontalArchiveChapter;
