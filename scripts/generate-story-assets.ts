/**
 * Generates 7 bespoke editorial documentary visual assets for the NEXUS Horizontal Story Chapter.
 * Palette: Warm Paper (#FAF6EE, #EFE8DA, #DFD5C3), Deep Studio Charcoal (#151413, #0A0A09),
 * Rich Amber/Timber (#5C4E43, #8C7355), and NEXUS Signature Vermilion (#EF5A2A).
 */
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'public/images/nexus/story');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 01 / QUESTION - Whiteboard Inquiries & Mathematical Sketches
const svg01 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <radialGradient id="vignette01" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#22201D"/>
      <stop offset="60%" stop-color="#141312"/>
      <stop offset="100%" stop-color="#0A0A09"/>
    </radialGradient>
    <pattern id="grid01" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FAF6EE" stroke-width="0.5" stroke-opacity="0.07"/>
      <circle cx="0" cy="0" r="1.2" fill="#EF5A2A" fill-opacity="0.4"/>
    </pattern>
    <filter id="glow01">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1600" height="1000" fill="url(#vignette01)"/>
  <rect width="1600" height="1000" fill="url(#grid01)"/>

  <!-- Left Studio Plate: Blackboard / Whiteboard Ideation -->
  <g transform="translate(100, 100)">
    <rect width="780" height="800" rx="4" fill="#1C1A17" stroke="#FAF6EE" stroke-opacity="0.15" stroke-width="1.5"/>
    <text x="50" y="70" font-family="'Dosis', sans-serif" font-size="14" font-weight="700" fill="#EF5A2A" letter-spacing="4">NEXUS CHAPTER ARCHIVE // 01 QUESTION</text>
    <text x="50" y="110" font-family="'Fraunces', serif" font-size="32" font-weight="700" fill="#FAF6EE">The Fundamental Query</text>
    <text x="50" y="145" font-family="'Bitter', serif" font-size="16" fill="#A8A29E" font-style="italic">Why do tools isolate our senses rather than amplify them?</text>
    
    <line x1="50" y1="180" x2="730" y2="180" stroke="#FAF6EE" stroke-opacity="0.1" stroke-width="1"/>

    <!-- Geometric & System Node Formations -->
    <g transform="translate(80, 240)">
      <circle cx="160" cy="160" r="140" fill="none" stroke="#EF5A2A" stroke-width="1.5" stroke-dasharray="6,6"/>
      <circle cx="160" cy="160" r="90" fill="none" stroke="#FAF6EE" stroke-opacity="0.3" stroke-width="1.5"/>
      <circle cx="160" cy="160" r="10" fill="#EF5A2A"/>

      <!-- Tangent vectors -->
      <line x1="160" y1="20" x2="480" y2="100" stroke="#FAF6EE" stroke-opacity="0.4" stroke-width="1.5"/>
      <line x1="160" y1="300" x2="480" y2="220" stroke="#FAF6EE" stroke-opacity="0.4" stroke-width="1.5"/>
      <rect x="440" y="70" width="160" height="180" rx="3" fill="#292622" stroke="#FAF6EE" stroke-opacity="0.2"/>
      <text x="460" y="110" font-family="'Dosis', sans-serif" font-size="11" font-weight="600" fill="#EF5A2A" letter-spacing="2">SYNTHESIS NODE</text>
      <text x="460" y="140" font-family="'Bitter', serif" font-size="13" fill="#FAF6EE">Latency &lt; 8ms</text>
      <text x="460" y="170" font-family="'Bitter', serif" font-size="13" fill="#A8A29E">Tactile Feedback</text>
      <text x="460" y="200" font-family="'Bitter', serif" font-size="13" fill="#A8A29E">Dynamic Variable Glyph</text>
    </g>

    <!-- Handwritten Marginalia / Equations -->
    <g transform="translate(60, 620)" font-family="monospace" font-size="13" fill="#D6D0C4">
      <text x="0" y="0">∫ ψ(t) · e^{-iωt} dt  =&gt;  Continuous Spatial Mapping</text>
      <text x="0" y="30" fill="#EF5A2A">Δx · Δp ≥ ℏ/2  // Physical constraint boundaries</text>
      <text x="0" y="60" fill="#8C827A">// Team Debate: October 14, 2026 // Critique Room 2B</text>
    </g>
  </g>

  <!-- Right Perspective Diagram: Isometric Workshop Desk -->
  <g transform="translate(940, 100)">
    <rect width="560" height="800" rx="4" fill="#181614" stroke="#FAF6EE" stroke-opacity="0.12" stroke-width="1.5"/>
    <text x="40" y="70" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#A8A29E" letter-spacing="3">SKETCHBOOK SCAN #041</text>
    
    <!-- Isometric Grid Desk Scene -->
    <g transform="translate(80, 200)">
      <polygon points="200,0 400,100 200,200 0,100" fill="#252320" stroke="#FAF6EE" stroke-opacity="0.3" stroke-width="1.5"/>
      <polygon points="0,100 200,200 200,380 0,280" fill="#1C1B18" stroke="#FAF6EE" stroke-opacity="0.2" stroke-width="1.5"/>
      <polygon points="200,200 400,100 400,280 200,380" fill="#151412" stroke="#FAF6EE" stroke-opacity="0.2" stroke-width="1.5"/>

      <!-- Milled Knob on Desk -->
      <cylinder cx="200" cy="140" r="30" fill="#EF5A2A"/>
      <circle cx="200" cy="130" r="35" fill="none" stroke="#EF5A2A" stroke-width="2"/>
      <circle cx="200" cy="130" r="4" fill="#EF5A2A"/>
      <line x1="200" y1="95" x2="200" y2="65" stroke="#EF5A2A" stroke-width="1.5"/>
      <text x="215" y="70" font-family="'Dosis', sans-serif" font-size="11" font-weight="700" fill="#EF5A2A">ROTARY ENCODER</text>
    </g>

    <text x="40" y="730" font-family="'Bitter', serif" font-size="14" fill="#78716C">"Every breakthrough starts as an uncomfortable conversation across disciplines."</text>
  </g>
</svg>`;

// 02 / CONNECTION - Squad Pairing & Cross-Discipline Convergence
const svg02 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <radialGradient id="vignette02" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#24211D"/>
      <stop offset="60%" stop-color="#151412"/>
      <stop offset="100%" stop-color="#0A0A09"/>
    </radialGradient>
    <pattern id="grid02" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FAF6EE" stroke-width="0.5" stroke-opacity="0.06"/>
      <circle cx="25" cy="25" r="1" fill="#FAF6EE" fill-opacity="0.15"/>
    </pattern>
  </defs>

  <rect width="1600" height="1000" fill="url(#vignette02)"/>
  <rect width="1600" height="1000" fill="url(#grid02)"/>

  <!-- Center Multidisciplinary Nexus Web -->
  <g transform="translate(100, 100)">
    <rect width="1400" height="800" rx="4" fill="#181715" stroke="#FAF6EE" stroke-opacity="0.14" stroke-width="1.5"/>

    <text x="60" y="70" font-family="'Dosis', sans-serif" font-size="14" font-weight="700" fill="#EF5A2A" letter-spacing="4">NEXUS CHAPTER ARCHIVE // 02 CONNECTION</text>
    <text x="60" y="115" font-family="'Fraunces', serif" font-size="34" font-weight="700" fill="#FAF6EE">The Multidisciplinary Triad</text>
    <text x="60" y="150" font-family="'Bitter', serif" font-size="16" fill="#A8A29E">Pairing systems engineers, typography artists, and hardware fabricators.</text>

    <!-- Connected Nodes Network -->
    <g transform="translate(100, 200)">
      <!-- Central Hub -->
      <circle cx="600" cy="280" r="110" fill="#201E1A" stroke="#EF5A2A" stroke-width="2"/>
      <circle cx="600" cy="280" r="90" fill="none" stroke="#EF5A2A" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="600" y="275" font-family="'Fraunces', serif" font-size="24" font-weight="700" fill="#FAF6EE" text-anchor="middle">THE NEXUS</text>
      <text x="600" y="300" font-family="'Dosis', sans-serif" font-size="12" font-weight="600" fill="#EF5A2A" letter-spacing="3" text-anchor="middle">SHARED BENCH</text>

      <!-- Node 1: Computer Science & Systems -->
      <line x1="240" y1="120" x2="510" y2="230" stroke="#EF5A2A" stroke-width="2" stroke-opacity="0.8"/>
      <circle cx="200" cy="100" r="80" fill="#28241F" stroke="#FAF6EE" stroke-opacity="0.3" stroke-width="1.5"/>
      <text x="200" y="95" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#FAF6EE" text-anchor="middle">SYSTEMS &amp; CODE</text>
      <text x="200" y="118" font-family="'Bitter', serif" font-size="11" fill="#A8A29E" text-anchor="middle">WebSockets • GLSL • C++</text>

      <!-- Node 2: Design & Interaction -->
      <line x1="960" y1="120" x2="690" y2="230" stroke="#EF5A2A" stroke-width="2" stroke-opacity="0.8"/>
      <circle cx="1000" cy="100" r="80" fill="#28241F" stroke="#FAF6EE" stroke-opacity="0.3" stroke-width="1.5"/>
      <text x="1000" y="95" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#FAF6EE" text-anchor="middle">HUMAN INTERACTION</text>
      <text x="1000" y="118" font-family="'Bitter', serif" font-size="11" fill="#A8A29E" text-anchor="middle">Type Axes • Ergonomics • Motion</text>

      <!-- Node 3: Electrical & Fabrication -->
      <line x1="600" y1="480" x2="600" y2="390" stroke="#EF5A2A" stroke-width="2" stroke-opacity="0.8"/>
      <circle cx="600" cy="490" r="80" fill="#28241F" stroke="#FAF6EE" stroke-opacity="0.3" stroke-width="1.5"/>
      <text x="600" y="485" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#FAF6EE" text-anchor="middle">HARDWARE &amp; FAB</text>
      <text x="600" y="508" font-family="'Bitter', serif" font-size="11" fill="#A8A29E" text-anchor="middle">ESP32 • CNC Wood • PCBs</text>
    </g>

    <!-- Bottom Metric Callouts -->
    <g transform="translate(60, 700)">
      <line x1="0" y1="0" x2="1280" y2="0" stroke="#FAF6EE" stroke-opacity="0.1" stroke-width="1"/>
      <text x="0" y="40" font-family="'Dosis', sans-serif" font-size="12" font-weight="700" fill="#EF5A2A" letter-spacing="2">COHORT PRINCIPLE:</text>
      <text x="170" y="40" font-family="'Bitter', serif" font-size="14" fill="#D6D0C4">"No single-discipline silos. Every build squad unites software, visual craft, and physical computing."</text>
    </g>
  </g>
</svg>`;

// 03 / EXPERIMENT - Hands, Sensors, Oscilloscopes & Variable Glyphs
const svg03 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <radialGradient id="vignette03" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#231F1C"/>
      <stop offset="60%" stop-color="#141311"/>
      <stop offset="100%" stop-color="#0A0A09"/>
    </radialGradient>
  </defs>

  <rect width="1600" height="1000" fill="url(#vignette03)"/>

  <!-- Main Oscilloscope Display Console -->
  <g transform="translate(100, 100)">
    <rect width="1400" height="800" rx="4" fill="#141816" stroke="#22C55E" stroke-opacity="0.3" stroke-width="2"/>

    <!-- Header -->
    <g transform="translate(50, 60)">
      <text font-family="'Dosis', sans-serif" font-size="14" font-weight="700" fill="#22C55E" letter-spacing="4">TELEMETRY &amp; EXPERIMENTATION LAB // RIG 03</text>
      <text y="40" font-family="'Fraunces', serif" font-size="32" font-weight="700" fill="#FAF6EE">Real-Time Waveform &amp; Optical Calibration</text>
    </g>

    <!-- Phosphor Green Waveform Graticule -->
    <g transform="translate(60, 160)">
      <rect width="840" height="520" rx="4" fill="#0A0E0C" stroke="#22C55E" stroke-opacity="0.4" stroke-width="1.5"/>
      
      <!-- Grid lines -->
      <path d="M 0 65 H 840 M 0 130 H 840 M 0 195 H 840 M 0 260 H 840 M 0 325 H 840 M 0 390 H 840 M 0 455 H 840" stroke="#22C55E" stroke-opacity="0.1" stroke-width="1"/>
      <path d="M 105 0 V 520 M 210 0 V 520 M 315 0 V 520 M 420 0 V 520 M 525 0 V 520 M 630 0 V 520 M 735 0 V 520" stroke="#22C55E" stroke-opacity="0.1" stroke-width="1"/>
      
      <!-- Primary Waveform (Sine + Harmonics) -->
      <path d="M 0 260 Q 105 80 210 260 T 420 260 T 630 260 T 840 260" fill="none" stroke="#22C55E" stroke-width="3"/>
      <!-- Secondary Distorted Waveform (Tactile Sensor Input) -->
      <path d="M 0 260 Q 80 180 160 300 T 320 220 T 480 340 T 640 180 T 840 260" fill="none" stroke="#EF5A2A" stroke-width="2" stroke-opacity="0.9"/>

      <text x="20" y="40" font-family="monospace" font-size="12" fill="#22C55E">CH1: 2.45 Vpp // 440 Hz SINE</text>
      <text x="20" y="65" font-family="monospace" font-size="12" fill="#EF5A2A">CH2: CAPACITIVE TOUCH TELEMETRY</text>
    </g>

    <!-- Side Calibration Controls -->
    <g transform="translate(940, 160)">
      <rect width="400" height="520" rx="4" fill="#1B1C1A" stroke="#FAF6EE" stroke-opacity="0.15" stroke-width="1.5"/>
      <text x="30" y="45" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#EF5A2A" letter-spacing="2">SENSOR PARAMETERS</text>

      <g transform="translate(30, 80)" font-family="monospace" font-size="12" fill="#FAF6EE">
        <text y="0">Sampling Rate: 1,000 Hz</text>
        <text y="30">Filter: 4-pole Butterworth</text>
        <text y="60">ADC Resolution: 16-bit</text>
        <text y="90">Tactile Pressure: 1.42 N</text>
      </g>

      <!-- Physical Knob Graphics -->
      <g transform="translate(100, 260)">
        <circle cx="60" cy="60" r="50" fill="#292723" stroke="#EF5A2A" stroke-width="2"/>
        <circle cx="60" cy="60" r="35" fill="#1C1A17"/>
        <line x1="60" y1="60" x2="60" y2="20" stroke="#EF5A2A" stroke-width="3"/>
        <text x="60" y="135" font-family="'Dosis', sans-serif" font-size="11" font-weight="700" fill="#FAF6EE" text-anchor="middle">FREQUENCY</text>

        <circle cx="200" cy="60" r="50" fill="#292723" stroke="#22C55E" stroke-width="2"/>
        <circle cx="200" cy="60" r="35" fill="#1C1A17"/>
        <line x1="200" y1="60" x2="225" y2="35" stroke="#22C55E" stroke-width="3"/>
        <text x="200" y="135" font-family="'Dosis', sans-serif" font-size="11" font-weight="700" fill="#FAF6EE" text-anchor="middle">GAIN / SENS</text>
      </g>
    </g>

    <text x="60" y="740" font-family="'Bitter', serif" font-size="14" fill="#78716C">"We do not guess latency; we measure it on the bench until the interaction feels instantaneous."</text>
  </g>
</svg>`;

// 04 / BUILD - Physical Woodshop Milling, Walnut MIDI Enclosure & Soldering
const svg04 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <radialGradient id="vignette04" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#261E17"/>
      <stop offset="60%" stop-color="#15120F"/>
      <stop offset="100%" stop-color="#0A0A09"/>
    </radialGradient>
    <linearGradient id="walnutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A3B32"/>
      <stop offset="50%" stop-color="#362B24"/>
      <stop offset="100%" stop-color="#241C17"/>
    </linearGradient>
  </defs>

  <rect width="1600" height="1000" fill="url(#vignette04)"/>

  <!-- Construction Workshop Table -->
  <g transform="translate(100, 100)">
    <rect width="1400" height="800" rx="4" fill="#1A1815" stroke="#FAF6EE" stroke-opacity="0.14" stroke-width="1.5"/>

    <text x="60" y="70" font-family="'Dosis', sans-serif" font-size="14" font-weight="700" fill="#EF5A2A" letter-spacing="4">NEXUS CHAPTER ARCHIVE // 04 PHYSICAL BUILD</text>
    <text x="60" y="115" font-family="'Fraunces', serif" font-size="34" font-weight="700" fill="#FAF6EE">Crafting at the 1:00 AM Bench</text>
    <text x="60" y="150" font-family="'Bitter', serif" font-size="16" fill="#A8A29E">Milling solid American Walnut chassis and custom anodized aluminum faceplates.</text>

    <!-- Isometric Enclosure Chassis Render -->
    <g transform="translate(300, 240)">
      <!-- Wood Base Block -->
      <polygon points="400,0 750,140 400,320 50,180" fill="url(#walnutGrad)" stroke="#FAF6EE" stroke-opacity="0.3" stroke-width="2"/>
      <polygon points="50,180 400,320 400,420 50,280" fill="#2E231D" stroke="#FAF6EE" stroke-opacity="0.2" stroke-width="1.5"/>
      <polygon points="400,320 750,140 750,240 400,420" fill="#1E1713" stroke="#FAF6EE" stroke-opacity="0.2" stroke-width="1.5"/>

      <!-- Aluminum Top Inset Plate -->
      <polygon points="400,30 690,140 400,290 110,180" fill="#2A2927" stroke="#FAF6EE" stroke-opacity="0.5" stroke-width="1.5"/>

      <!-- Cutout Holes for 16 Arcade Buttons & Encoders -->
      <ellipse cx="250" cy="180" rx="16" ry="10" fill="#EF5A2A"/>
      <ellipse cx="320" cy="150" rx="16" ry="10" fill="#EF5A2A"/>
      <ellipse cx="390" cy="120" rx="16" ry="10" fill="#EF5A2A"/>
      <ellipse cx="460" cy="90" rx="16" ry="10" fill="#EF5A2A"/>

      <ellipse cx="300" cy="220" rx="16" ry="10" fill="#FAF6EE" fill-opacity="0.4"/>
      <ellipse cx="370" cy="190" rx="16" ry="10" fill="#FAF6EE" fill-opacity="0.4"/>
      <ellipse cx="440" cy="160" rx="16" ry="10" fill="#FAF6EE" fill-opacity="0.4"/>
      <ellipse cx="510" cy="130" rx="16" ry="10" fill="#FAF6EE" fill-opacity="0.4"/>

      <!-- OLED Screen Cutout -->
      <polygon points="560,110 650,145 590,190 500,155" fill="#0A0E0C" stroke="#22C55E" stroke-width="1.5"/>
      <text x="575" y="155" font-family="monospace" font-size="10" fill="#22C55E">NEXUS MIDI</text>
    </g>

    <!-- Annotation Callouts -->
    <g transform="translate(1000, 260)" font-family="'Dosis', sans-serif">
      <rect width="320" height="280" rx="3" fill="#211E1A" stroke="#FAF6EE" stroke-opacity="0.15"/>
      <text x="25" y="40" font-size="13" font-weight="700" fill="#EF5A2A" letter-spacing="2">FABRICATION LOG</text>
      
      <g transform="translate(25, 75)" font-family="'Bitter', serif" font-size="13" fill="#D6D0C4">
        <text y="0">• CNC Feed Rate: 1200 mm/min</text>
        <text y="30">• 1/4" Upcut Solid Carbide Endmill</text>
        <text y="60">• Hand-rubbed organic Danish oil finish</text>
        <text y="90">• Gold-plated Cherry MX tactile switches</text>
        <text y="120">• Custom 4-layer PCB with USB-C isolator</text>
      </g>
    </g>

    <text x="60" y="740" font-family="'Bitter', serif" font-size="14" fill="#78716C">"Software is ephemeral. When you encase code inside tactile wood and milled metal, it becomes an heirloom."</text>
  </g>
</svg>`;

// 05 / ITERATE - Rapid Stress Testing, Discarded Schematics & Refinement
const svg05 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <radialGradient id="vignette05" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#24201C"/>
      <stop offset="60%" stop-color="#141311"/>
      <stop offset="100%" stop-color="#0A0A09"/>
    </radialGradient>
  </defs>

  <rect width="1600" height="1000" fill="url(#vignette05)"/>

  <g transform="translate(100, 100)">
    <rect width="1400" height="800" rx="4" fill="#181614" stroke="#FAF6EE" stroke-opacity="0.14" stroke-width="1.5"/>

    <text x="60" y="70" font-family="'Dosis', sans-serif" font-size="14" font-weight="700" fill="#EF5A2A" letter-spacing="4">NEXUS CHAPTER ARCHIVE // 05 ITERATE</text>
    <text x="60" y="115" font-family="'Fraunces', serif" font-size="34" font-weight="700" fill="#FAF6EE">The Redesign Matrix</text>
    <text x="60" y="150" font-family="'Bitter', serif" font-size="16" fill="#A8A29E">Four prototyping cycles before shipping: discovering failure modes early.</text>

    <!-- 4 Prototyping Cycle Stages in Grid -->
    <g transform="translate(60, 200)">
      <!-- Cycle 1 -->
      <rect x="0" y="0" width="290" height="460" rx="3" fill="#1E1C19" stroke="#FAF6EE" stroke-opacity="0.12"/>
      <text x="25" y="40" font-family="'Dosis', sans-serif" font-size="12" font-weight="700" fill="#A8A29E" letter-spacing="2">STAGE 01 // CARDBOARD</text>
      <text x="25" y="70" font-family="'Fraunces', serif" font-size="20" font-weight="700" fill="#FAF6EE">Cardboard &amp; Tape</text>
      <text x="25" y="105" font-family="'Bitter', serif" font-size="13" fill="#8C827A">Ergonomic shape validation; discovered 45° angle causes wrist fatigue after 20 minutes.</text>
      <text x="25" y="420" font-family="monospace" font-size="11" fill="#EF5A2A">STATUS: SCRAPPED</text>

      <!-- Cycle 2 -->
      <rect x="320" y="0" width="290" height="460" rx="3" fill="#1E1C19" stroke="#FAF6EE" stroke-opacity="0.12"/>
      <text x="345" y="40" font-family="'Dosis', sans-serif" font-size="12" font-weight="700" fill="#A8A29E" letter-spacing="2">STAGE 02 // 3D PRINT</text>
      <text x="345" y="70" font-family="'Fraunces', serif" font-size="20" font-weight="700" fill="#FAF6EE">PLA Breadboard</text>
      <text x="345" y="105" font-family="'Bitter', serif" font-size="13" fill="#8C827A">Wiring fits, but layer lines delaminate under thermal load. Button spacing too cramped.</text>
      <text x="345" y="420" font-family="monospace" font-size="11" fill="#EF5A2A">STATUS: RE-ENGINEERED</text>

      <!-- Cycle 3 -->
      <rect x="640" y="0" width="290" height="460" rx="3" fill="#1E1C19" stroke="#FAF6EE" stroke-opacity="0.12"/>
      <text x="665" y="40" font-family="'Dosis', sans-serif" font-size="12" font-weight="700" fill="#A8A29E" letter-spacing="2">STAGE 03 // CNC ACRYLIC</text>
      <text x="665" y="70" font-family="'Fraunces', serif" font-size="20" font-weight="700" fill="#FAF6EE">Frosted Acrylic</text>
      <text x="665" y="105" font-family="'Bitter', serif" font-size="13" fill="#8C827A">Optical diffusion works; capacitive latency reduced to 4.2ms. Weight balance ideal.</text>
      <text x="665" y="420" font-family="monospace" font-size="11" fill="#EF5A2A">STATUS: APPROVED FOR WOOD</text>

      <!-- Cycle 4 -->
      <rect x="960" y="0" width="290" height="460" rx="3" fill="#24211D" stroke="#EF5A2A" stroke-width="2"/>
      <text x="985" y="40" font-family="'Dosis', sans-serif" font-size="12" font-weight="700" fill="#EF5A2A" letter-spacing="2">STAGE 04 // FINAL V1.0</text>
      <text x="985" y="70" font-family="'Fraunces', serif" font-size="20" font-weight="700" fill="#FAF6EE">Walnut &amp; Brass</text>
      <text x="985" y="105" font-family="'Bitter', serif" font-size="13" fill="#D6D0C4">Flawless ergonomic curve, zero dropped frames, tactile click feedback confirmed.</text>
      <text x="985" y="420" font-family="monospace" font-size="11" fill="#22C55E">STATUS: SHIPPED</text>
    </g>

    <text x="60" y="740" font-family="'Bitter', serif" font-size="14" fill="#78716C">"The mark of a serious builder is not avoiding mistakes, but how quickly you learn from the debris."</text>
  </g>
</svg>`;

// 06 / SHARE - Live Campus Demonstration, Public Showcase & Feedback
const svg06 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <radialGradient id="vignette06" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#261F1A"/>
      <stop offset="60%" stop-color="#161310"/>
      <stop offset="100%" stop-color="#0A0A09"/>
    </radialGradient>
  </defs>

  <rect width="1600" height="1000" fill="url(#vignette06)"/>

  <g transform="translate(100, 100)">
    <rect width="1400" height="800" rx="4" fill="#181614" stroke="#FAF6EE" stroke-opacity="0.14" stroke-width="1.5"/>

    <text x="60" y="70" font-family="'Dosis', sans-serif" font-size="14" font-weight="700" fill="#EF5A2A" letter-spacing="4">NEXUS CHAPTER ARCHIVE // 06 PUBLIC SHARE</text>
    <text x="60" y="115" font-family="'Fraunces', serif" font-size="34" font-weight="700" fill="#FAF6EE">The Courtyard Demo Exhibition</text>
    <text x="60" y="150" font-family="'Bitter', serif" font-size="16" fill="#A8A29E">Putting student instruments into the hands of hundreds of visiting campus peers.</text>

    <!-- Main Live Demo Stage Art -->
    <g transform="translate(60, 200)">
      <rect width="840" height="480" rx="3" fill="#201D19" stroke="#FAF6EE" stroke-opacity="0.2"/>
      
      <!-- Projection Screen Glow -->
      <rect x="80" y="40" width="680" height="340" rx="2" fill="#0D0E13" stroke="#EF5A2A" stroke-width="1.5"/>
      <text x="420" y="180" font-family="'Fraunces', serif" font-size="28" font-weight="700" fill="#FAF6EE" text-anchor="middle">LIVE PHYSICAL AUDIOSPHERE</text>
      <text x="420" y="220" font-family="'Dosis', sans-serif" font-size="14" font-weight="600" fill="#EF5A2A" letter-spacing="4" text-anchor="middle">INTERACTIVE PERFORMANCE RUNTIME</text>

      <!-- Wave visualizer on screen -->
      <path d="M 120 300 C 240 240 360 360 480 300 S 600 240 720 300" fill="none" stroke="#EF5A2A" stroke-width="3"/>
      <path d="M 120 310 C 240 270 360 330 480 290 S 600 270 720 310" fill="none" stroke="#FAF6EE" stroke-opacity="0.4" stroke-width="1.5"/>
    </g>

    <!-- Live Telemetry Side Panel -->
    <g transform="translate(940, 200)">
      <rect width="400" height="480" rx="3" fill="#211E1A" stroke="#FAF6EE" stroke-opacity="0.15"/>
      <text x="30" y="45" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#EF5A2A" letter-spacing="2">DEMO TELEMETRY</text>

      <g transform="translate(30, 90)" font-family="'Bitter', serif" font-size="14" fill="#D6D0C4">
        <text y="0">Visitors Tested: 420+ students</text>
        <text y="35">Average Session: 4.8 minutes</text>
        <text y="70">Sensor Actuations: 18,400</text>
        <text y="105">Crash Count: 0</text>
        <text y="140">Open Source Clones: 34</text>
      </g>
    </g>

    <text x="60" y="740" font-family="'Bitter', serif" font-size="14" fill="#78716C">"A project only becomes complete when someone who had nothing to do with building it falls in love with using it."</text>
  </g>
</svg>`;

// 07 / COMMUNITY - The Enduring Archive, Open Source Repositories & Future Cohorts
const svg07 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <radialGradient id="vignette07" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#241E19"/>
      <stop offset="60%" stop-color="#141210"/>
      <stop offset="100%" stop-color="#0A0A09"/>
    </radialGradient>
  </defs>

  <rect width="1600" height="1000" fill="url(#vignette07)"/>

  <g transform="translate(100, 100)">
    <rect width="1400" height="800" rx="4" fill="#181614" stroke="#FAF6EE" stroke-opacity="0.14" stroke-width="1.5"/>

    <text x="60" y="70" font-family="'Dosis', sans-serif" font-size="14" font-weight="700" fill="#EF5A2A" letter-spacing="4">NEXUS CHAPTER ARCHIVE // 07 COMMUNITY</text>
    <text x="60" y="115" font-family="'Fraunces', serif" font-size="34" font-weight="700" fill="#FAF6EE">The Permanent Archive</text>
    <text x="60" y="150" font-family="'Bitter', serif" font-size="16" fill="#A8A29E">Every schematic, repository, and design token documented for future student generations.</text>

    <!-- Open Source Architecture Stacks -->
    <g transform="translate(60, 200)">
      <!-- Left Repository Card -->
      <rect x="0" y="0" width="400" height="460" rx="3" fill="#201D19" stroke="#FAF6EE" stroke-opacity="0.2"/>
      <text x="30" y="45" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#EF5A2A" letter-spacing="2">OPEN SOURCE REPOSITORY</text>
      <text x="30" y="85" font-family="'Fraunces', serif" font-size="22" font-weight="700" fill="#FAF6EE">nexus-core-runtime</text>
      <text x="30" y="120" font-family="'Bitter', serif" font-size="13" fill="#A8A29E">MIT Licensed C++ &amp; WebGL engine powering tactile sensor feedback.</text>
      
      <g transform="translate(30, 200)" font-family="monospace" font-size="12" fill="#D6D0C4">
        <text y="0">✓ 2,400+ Git Commits</text>
        <text y="30">✓ Full KiCAD Schematics</text>
        <text y="60">✓ STEP 3D CAD Files</text>
        <text y="90">✓ Interactive Storyboard</text>
      </g>
      <text x="30" y="420" font-family="monospace" font-size="11" fill="#22C55E">ACTIVE // PUBLIC DOMAIN</text>

      <!-- Center Community Roster Card -->
      <rect x="440" y="0" width="400" height="460" rx="3" fill="#201D19" stroke="#FAF6EE" stroke-opacity="0.2"/>
      <text x="470" y="45" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#EF5A2A" letter-spacing="2">THE STUDENT COLLECTIVE</text>
      <text x="470" y="85" font-family="'Fraunces', serif" font-size="22" font-weight="700" fill="#FAF6EE">40+ Active Builders</text>
      <text x="470" y="120" font-family="'Bitter', serif" font-size="13" fill="#A8A29E">Engineers, graphic designers, physical fabricators, and sonic researchers.</text>

      <g transform="translate(470, 200)" font-family="'Dosis', sans-serif" font-size="13" fill="#D6D0C4">
        <text y="0">• Computer Science &amp; AI</text>
        <text y="28">• Interaction &amp; Typography</text>
        <text y="56">• Electrical &amp; Robotics</text>
        <text y="84">• Architecture &amp; Woodcraft</text>
        <text y="112">• Sonic Arts &amp; Synthesis</text>
      </g>
      <text x="470" y="420" font-family="'Dosis', sans-serif" font-size="12" font-weight="700" fill="#EF5A2A" letter-spacing="2">NEXT COHORT OPENING</text>

      <!-- Right Vision Card -->
      <rect x="880" y="0" width="400" height="460" rx="3" fill="#231F1B" stroke="#EF5A2A" stroke-width="1.5"/>
      <text x="910" y="45" font-family="'Dosis', sans-serif" font-size="13" font-weight="700" fill="#EF5A2A" letter-spacing="2">THE HORIZON</text>
      <text x="910" y="85" font-family="'Fraunces', serif" font-size="22" font-weight="700" fill="#FAF6EE">Remixing the Future</text>
      <text x="910" y="120" font-family="'Bitter', serif" font-size="13" fill="#D6D0C4">This is not a temporary club; it is an enduring laboratory for people who refuse to stay in one lane.</text>

      <g transform="translate(910, 220)" font-family="'Fraunces', serif" font-size="18" fill="#FAF6EE" font-style="italic">
        <text y="0">"What starts at 1:00 AM</text>
        <text y="30">becomes the foundation</text>
        <text y="60">for everything we build next."</text>
      </g>
    </g>

    <text x="60" y="740" font-family="'Bitter', serif" font-size="14" fill="#78716C">"We build for the students who haven't arrived on campus yet."</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(outDir, '01-question.svg'), svg01, 'utf8');
fs.writeFileSync(path.join(outDir, '02-connection.svg'), svg02, 'utf8');
fs.writeFileSync(path.join(outDir, '03-experiment.svg'), svg03, 'utf8');
fs.writeFileSync(path.join(outDir, '04-build.svg'), svg04, 'utf8');
fs.writeFileSync(path.join(outDir, '05-iteration.svg'), svg05, 'utf8');
fs.writeFileSync(path.join(outDir, '06-share.svg'), svg06, 'utf8');
fs.writeFileSync(path.join(outDir, '07-community.svg'), svg07, 'utf8');

console.log('Successfully generated all 7 NEXUS Story SVG assets in /public/images/nexus/story/');
