import React from 'react';

interface StorybookBackgroundProps {
  sceneId: number;
}

export const StorybookBackground: React.FC<StorybookBackgroundProps> = ({ sceneId }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* ========================================================
          BABAK 1: Hutan Rimba Cahaya yang Ceria & Berwarna-warni
          ======================================================== */}
      {sceneId === 1 && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#7dd3fc" />
              <stop offset="80%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#bbf7d0" />
            </linearGradient>
            <linearGradient id="hillFar1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="hillNear1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
            <radialGradient id="sunBurst" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky */}
          <rect width="800" height="450" fill="url(#sky1)" />

          {/* Vibrant Rainbow in the sunny background */}
          <g opacity="0.65">
            <path d="M 80 320 A 340 220 0 0 1 720 320" stroke="#f43f5e" strokeWidth="6" fill="none" />
            <path d="M 86 320 A 334 214 0 0 1 714 320" stroke="#fb923c" strokeWidth="6" fill="none" />
            <path d="M 92 320 A 328 208 0 0 1 708 320" stroke="#facc15" strokeWidth="6" fill="none" />
            <path d="M 98 320 A 322 202 0 0 1 702 320" stroke="#4ade80" strokeWidth="6" fill="none" />
            <path d="M 104 320 A 316 196 0 0 1 696 320" stroke="#38bdf8" strokeWidth="6" fill="none" />
            <path d="M 110 320 A 310 190 0 0 1 690 320" stroke="#c084fc" strokeWidth="6" fill="none" />
          </g>

          {/* Golden Smiling Sun */}
          <circle cx="700" cy="80" r="48" fill="#fbbf24" stroke="#f59e0b" strokeWidth="4" />
          <circle cx="700" cy="80" r="85" fill="url(#sunBurst)" />
          {/* Sunbeams */}
          <polygon points="700,80 580,450 660,450" fill="#ffffff" opacity="0.18" />
          <polygon points="700,80 400,450 500,450" fill="#ffffff" opacity="0.14" />
          <polygon points="700,80 200,450 300,450" fill="#ffffff" opacity="0.1" />

          {/* Fluffy White Clouds */}
          <g fill="#ffffff" opacity="0.95">
            <circle cx="120" cy="80" r="26" />
            <circle cx="145" cy="70" r="32" />
            <circle cx="175" cy="75" r="28" />
            <circle cx="200" cy="85" r="20" />
            <circle cx="450" cy="60" r="24" />
            <circle cx="480" cy="50" r="30" />
            <circle cx="510" cy="55" r="24" />
          </g>

          {/* Flying Cheerful Songbirds */}
          <path d="M 230 70 Q 240 58 250 70 Q 260 58 270 70" stroke="#065f46" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 285 85 Q 293 75 300 85 Q 308 75 315 85" stroke="#065f46" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Distant Emerald Mountains */}
          <path d="M 0 240 Q 180 150 360 210 Q 560 140 740 220 L 800 240 L 800 450 L 0 450 Z" fill="#6ee7b7" opacity="0.8" />

          {/* Rolling Green Hills with Flowers */}
          <path d="M 0 270 Q 220 190 460 280 Q 660 200 800 250 L 800 450 L 0 450 Z" fill="url(#hillFar1)" />

          {/* Foreground Flower Meadow */}
          <path d="M 0 315 Q 240 280 480 325 Q 680 295 800 315 L 800 450 L 0 450 Z" fill="url(#hillNear1)" />

          {/* Colorful Big Fairy Trees */}
          {/* Left Tree with Fruits */}
          <path d="M 45 160 Q 15 240 40 370 L 80 370 Q 70 240 70 160 Z" fill="#78350f" />
          <circle cx="55" cy="140" r="65" fill="#10b981" />
          <circle cx="25" cy="120" r="48" fill="#34d399" />
          <circle cx="85" cy="120" r="52" fill="#059669" />
          <circle cx="55" cy="95" r="46" fill="#a7f3d0" />
          {/* Red Apples / Berries */}
          <circle cx="35" cy="130" r="6" fill="#ef4444" />
          <circle cx="65" cy="110" r="6" fill="#ef4444" />
          <circle cx="80" cy="145" r="6" fill="#ef4444" />

          {/* Right Tree with Yellow Berries */}
          <path d="M 735 170 Q 715 250 730 370 L 770 370 Q 765 250 760 170 Z" fill="#78350f" />
          <circle cx="745" cy="150" r="60" fill="#059669" />
          <circle cx="720" cy="130" r="48" fill="#10b981" />
          <circle cx="770" cy="135" r="50" fill="#34d399" />
          <circle cx="735" cy="140" r="6" fill="#facc15" />
          <circle cx="760" cy="120" r="6" fill="#facc15" />

          {/* Cute Wooden Signpost "Lembah Sungai Hijau" */}
          <rect x="135" y="285" width="10" height="55" fill="#92400e" rx="2" />
          <polygon points="110,270 185,270 200,285 185,300 110,300" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
          <text x="116" y="287" fill="#78350f" fontSize="10" fontWeight="bold" fontFamily="sans-serif">🌿 LEMBAH HIJAU</text>

          {/* Giant Cute Polka-dot Mushrooms */}
          <g>
            {/* Red Mushroom */}
            <path d="M 215 365 Q 230 335 245 365 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            <circle cx="224" cy="350" r="2.5" fill="#ffffff" />
            <circle cx="236" cy="348" r="3" fill="#ffffff" />
            <rect x="226" y="365" width="8" height="12" fill="#fef3c7" rx="3" />

            {/* Blue Mushroom */}
            <path d="M 640 365 Q 652 340 664 365 Z" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2" />
            <circle cx="648" cy="353" r="2.5" fill="#ffffff" />
            <circle cx="658" cy="352" r="2" fill="#ffffff" />
            <rect x="649" y="365" width="6" height="10" fill="#fef3c7" rx="2" />
          </g>

          {/* Colorful Blooming Flowers */}
          <g>
            <circle cx="310" cy="360" r="7" fill="#f43f5e" />
            <circle cx="310" cy="360" r="3.5" fill="#fef08a" />
            <circle cx="340" cy="370" r="6" fill="#a855f7" />
            <circle cx="340" cy="370" r="3" fill="#fef08a" />
            <circle cx="560" cy="355" r="7" fill="#fb923c" />
            <circle cx="560" cy="355" r="3.5" fill="#ffffff" />
          </g>

          {/* Animated-looking Butterflies */}
          <g transform="translate(370, 150)">
            <ellipse cx="-5" cy="-5" rx="8" ry="5.5" fill="#ec4899" transform="rotate(-30)" />
            <ellipse cx="5" cy="-5" rx="8" ry="5.5" fill="#ec4899" transform="rotate(30)" />
            <circle cx="0" cy="0" r="2" fill="#facc15" />
          </g>
          <g transform="translate(510, 180)">
            <ellipse cx="-4" cy="-4" rx="7" ry="5" fill="#38bdf8" transform="rotate(-25)" />
            <ellipse cx="4" cy="-4" rx="7" ry="5" fill="#38bdf8" transform="rotate(25)" />
            <circle cx="0" cy="0" r="2" fill="#ffffff" />
          </g>
        </svg>
      )}

      {/* ========================================================
          BABAK 2: Awan Gelap, Kilat & Hutan Kabut Pak Beruang
          ======================================================== */}
      {sceneId === 2 && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="stormSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="40%" stopColor="#312e81" />
              <stop offset="75%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="spookyGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Dark Purple-Blue Storm Sky */}
          <rect width="800" height="450" fill="url(#stormSky)" />

          {/* Heavy Swirling Storm Clouds */}
          <path d="M 0 0 L 800 0 L 800 150 Q 680 190 560 140 Q 420 200 280 140 Q 140 190 0 130 Z" fill="#0f172a" opacity="0.95" />
          <path d="M 0 60 Q 160 170 380 110 Q 580 180 800 100 L 800 0 L 0 0 Z" fill="#334155" opacity="0.8" />

          {/* Bright Yellow Lightning Flashes */}
          <polygon points="460,30 440,95 465,100 430,175 450,115 430,110" fill="#fde047" stroke="#ffffff" strokeWidth="2" />
          <polygon points="210,40 195,85 212,88 185,145 200,98 185,95" fill="#fde047" opacity="0.8" />

          {/* Rain Streaks */}
          <g stroke="#93c5fd" strokeWidth="2" opacity="0.5" strokeDasharray="8 16">
            <line x1="60" y1="20" x2="20" y2="300" />
            <line x1="170" y1="10" x2="130" y2="320" />
            <line x1="290" y1="30" x2="250" y2="340" />
            <line x1="410" y1="15" x2="370" y2="330" />
            <line x1="530" y1="25" x2="490" y2="350" />
            <line x1="650" y1="10" x2="610" y2="310" />
            <line x1="760" y1="35" x2="720" y2="360" />
          </g>

          {/* Twisted Spooky Ancient Trees */}
          <g stroke="#0f172a" strokeWidth="16" strokeLinecap="round" fill="none">
            <path d="M 80 390 Q 70 260 120 170" />
            <path d="M 100 240 Q 155 210 175 160" strokeWidth="10" />
            <path d="M 115 180 Q 90 140 75 105" strokeWidth="7" />

            <path d="M 720 390 Q 745 250 680 160" />
            <path d="M 710 230 Q 655 190 635 150" strokeWidth="10" />
          </g>

          {/* Swirling Fog Ground */}
          <path d="M 0 310 Q 220 270 420 320 Q 640 265 800 310 L 800 450 L 0 450 Z" fill="url(#spookyGround)" />

          {/* Glowing Violet Mist */}
          <ellipse cx="260" cy="340" rx="180" ry="30" fill="#a855f7" opacity="0.3" />
          <ellipse cx="580" cy="335" rx="190" ry="32" fill="#38bdf8" opacity="0.25" />

          {/* Pak Beruang's Luggage of Heavy Worries */}
          <g transform="translate(510, 280)">
            <rect x="0" y="10" width="60" height="42" rx="8" fill="#92400e" stroke="#451a03" strokeWidth="3" />
            <path d="M 22 10 L 22 0 L 38 0 L 38 10" fill="none" stroke="#451a03" strokeWidth="3.5" />
            <line x1="20" y1="10" x2="20" y2="52" stroke="#451a03" strokeWidth="2.5" />
            <line x1="40" y1="10" x2="40" y2="52" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="30" cy="30" r="10" fill="#dc2626" />
            <text x="24" y="34" fill="#ffffff" fontSize="13">💔</text>
            <rect x="-10" y="58" width="80" height="18" rx="6" fill="#1e1b4b" stroke="#fca5a5" strokeWidth="1.5" />
            <text x="-4" y="70" fill="#fca5a5" fontSize="8.5" fontWeight="bold">Masalah Terpendam</text>
          </g>
        </svg>
      )}

      {/* ========================================================
          BABAK 3: Pintu Gua Masalah Terpendam (Sahabat Terkurung)
          ======================================================== */}
      {sceneId === 3 && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="caveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
            <radialGradient id="crystalViolet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e879f9" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="crystalCyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep Dark Mysterious Cavern */}
          <rect width="800" height="450" fill="url(#caveGradient)" />

          {/* Jagged Cavern Ceiling & Stalactites */}
          <path d="M 0 0 L 800 0 L 800 130 L 730 65 L 680 150 L 610 75 L 550 180 L 490 85 L 430 160 L 360 75 L 300 170 L 240 85 L 180 160 L 120 65 L 60 140 L 0 85 Z" fill="#0f172a" stroke="#334155" strokeWidth="5" />

          {/* Giant Glowing Enchanted Crystals */}
          <g>
            {/* Violet Crystals Left */}
            <polygon points="65,360 85,270 105,360" fill="#a855f7" stroke="#e879f9" strokeWidth="2" />
            <polygon points="85,360 105,245 125,360" fill="#c084fc" stroke="#f5d0fe" strokeWidth="2" />
            <polygon points="110,360 128,290 145,360" fill="#e879f9" />
            <circle cx="105" cy="280" r="55" fill="url(#crystalViolet)" />

            {/* Cyan Crystals Right */}
            <polygon points="705,360 725,260 745,360" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="725,360 745,235 765,360" fill="#38bdf8" stroke="#bae6fd" strokeWidth="2" />
            <polygon points="750,360 765,280 780,360" fill="#818cf8" />
            <circle cx="740" cy="270" r="55" fill="url(#crystalCyan)" />
          </g>

          {/* Stone Cavern Portal & Prison Cage */}
          <g transform="translate(290, 140)">
            {/* Massive Stone Arch */}
            <path d="M 10 190 L 10 75 Q 110 0 210 75 L 210 190" fill="none" stroke="#334155" strokeWidth="28" strokeLinecap="round" />
            <path d="M 22 190 L 22 80 Q 110 16 198 80 L 198 190" fill="#020617" />

            {/* Heavy Glowing Iron Bars */}
            <g stroke="#94a3b8" strokeWidth="7" strokeLinecap="round">
              <line x1="50" y1="60" x2="50" y2="190" />
              <line x1="85" y1="38" x2="85" y2="190" />
              <line x1="120" y1="28" x2="120" y2="190" />
              <line x1="155" y1="38" x2="155" y2="190" />
              <line x1="190" y1="60" x2="190" y2="190" />
              {/* Horizontal cross bars */}
              <line x1="28" y1="90" x2="192" y2="90" />
              <line x1="28" y1="145" x2="192" y2="145" />
            </g>

            {/* Golden Padlock */}
            <rect x="98" y="112" width="34" height="28" rx="6" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
            <path d="M 106 112 L 106 98 Q 115 88 124 98 L 124 112" fill="none" stroke="#d97706" strokeWidth="4.5" />
            <circle cx="115" cy="126" r="3.5" fill="#1e293b" />
          </g>

          {/* Ground */}
          <path d="M 0 330 Q 250 310 500 330 Q 660 315 800 330 L 800 450 L 0 450 Z" fill="#0b0f19" />
        </svg>
      )}

      {/* ========================================================
          BABAK 4: Ekspedisi Merentasi Jeram Sungai & Titi Kayu
          ======================================================== */}
      {sceneId === 4 && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="riverSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id="riverRapid" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="30%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Bright Cyan Sky */}
          <rect width="800" height="450" fill="url(#riverSky)" />

          {/* Dramatic Jungle Mountains in Background */}
          <polygon points="0,260 150,90 280,260" fill="#047857" />
          <polygon points="200,260 370,60 520,260" fill="#065f46" />
          <polygon points="460,260 620,80 760,260" fill="#047857" />

          {/* Rushing Turquoise River */}
          <path d="M 0 280 Q 260 230 480 280 Q 680 320 800 270 L 800 450 L 0 450 Z" fill="url(#riverRapid)" />

          {/* Rushing River Wave Foam */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8">
            <path d="M 40 320 Q 120 305 200 330" />
            <path d="M 270 300 Q 360 285 440 310" />
            <path d="M 500 330 Q 590 315 670 340" />
            <circle cx="180" cy="325" r="5" fill="#ffffff" />
            <circle cx="410" cy="305" r="6" fill="#ffffff" />
            <circle cx="630" cy="335" r="5" fill="#ffffff" />
          </g>

          {/* Wooden Suspension Log Bridge */}
          <g transform="translate(130, 235)">
            <path d="M 0 40 Q 270 65 540 30" stroke="#78350f" strokeWidth="22" strokeLinecap="round" fill="none" />
            <path d="M 0 40 Q 270 65 540 30" stroke="#b45309" strokeWidth="14" strokeLinecap="round" fill="none" />
            <rect x="20" y="10" width="16" height="70" fill="#451a03" rx="3" />
            <rect x="505" y="0" width="16" height="70" fill="#451a03" rx="3" />
            <path d="M 28 15 Q 270 45 512 8" stroke="#facc15" strokeWidth="4.5" fill="none" strokeDasharray="8 5" />
          </g>

          {/* Giant Tropical Palms & Pink Water Lilies */}
          <g fill="#15803d">
            {/* Left Fern */}
            <path d="M 0 420 Q 90 340 40 260 Q 75 320 120 290 Q 85 350 150 330 Q 80 380 0 420 Z" />
            {/* Right Fern */}
            <path d="M 800 420 Q 710 340 760 260 Q 725 320 680 290 Q 715 350 650 330 Q 720 380 800 420 Z" />
          </g>

          {/* Floating Pink Water Lily on River */}
          <g transform="translate(680, 360)">
            <ellipse cx="0" cy="0" rx="20" ry="8" fill="#15803d" />
            <circle cx="0" cy="-4" r="7" fill="#f43f5e" />
            <circle cx="0" cy="-4" r="3.5" fill="#fef08a" />
          </g>
        </svg>
      )}

      {/* ========================================================
          BABAK 5: Air Terjun Budi & Puncak Kunci Hati Ajaib
          ======================================================== */}
      {sceneId === 5 && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="fallsSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="40%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id="fallsWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <radialGradient id="rainbowAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Vivid Sky */}
          <rect width="800" height="450" fill="url(#fallsSky)" />

          {/* Giant Twin Cliffs */}
          <polygon points="0,0 260,0 210,340 0,380" fill="#1e293b" />
          <polygon points="540,0 800,0 800,380 590,340" fill="#1e293b" />

          {/* Huge Sparkling Rainbow */}
          <g>
            <path d="M 160 240 A 260 190 0 0 1 640 240" stroke="#f43f5e" strokeWidth="7" fill="none" />
            <path d="M 166 240 A 254 184 0 0 1 634 240" stroke="#fb923c" strokeWidth="7" fill="none" />
            <path d="M 172 240 A 248 178 0 0 1 628 240" stroke="#facc15" strokeWidth="7" fill="none" />
            <path d="M 178 240 A 242 172 0 0 1 622 240" stroke="#22c55e" strokeWidth="7" fill="none" />
            <path d="M 184 240 A 236 166 0 0 1 616 240" stroke="#06b6d4" strokeWidth="7" fill="none" />
            <path d="M 190 240 A 230 160 0 0 1 610 240" stroke="#a855f7" strokeWidth="7" fill="none" />
          </g>

          {/* Cascading Grand Waterfall Center */}
          <path d="M 270 30 L 530 30 L 560 360 L 240 360 Z" fill="url(#fallsWater)" />

          {/* Shimmering Water Lines */}
          <g stroke="#ffffff" strokeWidth="3.5" opacity="0.85">
            <line x1="310" y1="30" x2="300" y2="350" />
            <line x1="360" y1="30" x2="350" y2="350" />
            <line x1="400" y1="30" x2="400" y2="350" />
            <line x1="440" y1="30" x2="450" y2="350" />
            <line x1="490" y1="30" x2="500" y2="350" />
          </g>

          {/* Fluffy Water Mist Pool */}
          <ellipse cx="400" cy="355" rx="190" ry="38" fill="#f0f9ff" opacity="0.95" />

          {/* Central Magical Pedestal with 3 Glowing Keys */}
          <g transform="translate(320, 150)">
            <ellipse cx="80" cy="80" rx="85" ry="26" fill="#334155" />
            <rect x="25" y="80" width="110" height="45" fill="#1e293b" />
            <ellipse cx="80" cy="125" rx="75" ry="20" fill="#0f172a" />

            {/* Radiant Golden Glow */}
            <circle cx="80" cy="20" r="85" fill="url(#rainbowAura)" />

            {/* KUNCI 1: Mendengar (Golden Key) */}
            <g transform="translate(10, -20)">
              <circle cx="20" cy="20" r="16" fill="#facc15" stroke="#b45309" strokeWidth="3" />
              <rect x="17" y="34" width="6" height="26" fill="#facc15" />
              <rect x="23" y="46" width="9" height="4.5" fill="#facc15" />
              <text x="12" y="26" fontSize="15">👂</text>
            </g>

            {/* KUNCI 2: Kata Semangat (Radiant Cyan Key, Elevated) */}
            <g transform="translate(60, -42)">
              <circle cx="20" cy="20" r="18" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
              <rect x="17" y="36" width="7" height="28" fill="#38bdf8" />
              <rect x="24" y="48" width="10" height="5" fill="#38bdf8" />
              <text x="11" y="27" fontSize="16">💬</text>
            </g>

            {/* KUNCI 3: Pelukan Kasih (Ruby Pink Key) */}
            <g transform="translate(110, -20)">
              <circle cx="20" cy="20" r="16" fill="#f43f5e" stroke="#9f1239" strokeWidth="3" />
              <rect x="17" y="34" width="6" height="26" fill="#f43f5e" />
              <rect x="23" y="46" width="9" height="4.5" fill="#f43f5e" />
              <text x="12" y="26" fontSize="15">💖</text>
            </g>
          </g>
        </svg>
      )}

      {/* ========================================================
          BABAK 6: Berdepan Pak Beruang Dengan Kelembutan Senja
          ======================================================== */}
      {sceneId === 6 && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#581c87" />
              <stop offset="35%" stopColor="#c026d3" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Warm Magical Sunset Sky */}
          <rect width="800" height="450" fill="url(#sunsetSky)" />

          {/* Giant Setting Golden Sun */}
          <circle cx="400" cy="220" r="90" fill="#fef08a" opacity="0.85" />

          {/* Cave Arch in the distance glowing with soft warm amber */}
          <path d="M 270 320 Q 400 150 530 320 Z" fill="#312e81" />
          <path d="M 290 320 Q 400 170 510 320 Z" fill="#fef08a" opacity="0.4" />

          {/* Mountain Silhouette */}
          <path d="M 0 310 Q 200 270 400 310 Q 620 260 800 300 L 800 450 L 0 450 Z" fill="#1e1b4b" />

          {/* Peaceful Willow Tree & Hanging Lantern */}
          <g transform="translate(630, 150)">
            <path d="M 60 180 Q 70 80 10 30" stroke="#78350f" strokeWidth="18" fill="none" strokeLinecap="round" />
            <line x1="20" y1="35" x2="20" y2="75" stroke="#451a03" strokeWidth="3.5" />
            <circle cx="20" cy="90" r="38" fill="url(#lanternGlow)" />
            <rect x="10" y="76" width="20" height="26" rx="5" fill="#f59e0b" stroke="#78350f" strokeWidth="3" />
            <circle cx="20" cy="89" r="6" fill="#ffffff" />
          </g>

          {/* Swarm of Magical Twinkling Fireflies */}
          <g fill="#fef08a">
            <circle cx="150" cy="240" r="4" className="animate-pulse" />
            <circle cx="210" cy="190" r="3" />
            <circle cx="280" cy="260" r="4.5" className="animate-pulse" />
            <circle cx="490" cy="210" r="3.5" />
            <circle cx="550" cy="240" r="4" className="animate-pulse" />
            <circle cx="360" cy="180" r="3" />
          </g>

          {/* Ground */}
          <path d="M 0 340 Q 260 320 520 340 Q 660 330 800 340 L 800 450 L 0 450 Z" fill="#0f172a" />
        </svg>
      )}

      {/* ========================================================
          BABAK 7: Pintu Terbuka, Pelangi & Pesta Persahabatan
          ======================================================== */}
      {sceneId === 7 && (
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="victorySky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="40%" stopColor="#38bdf8" />
              <stop offset="80%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#bbf7d0" />
            </linearGradient>
            <radialGradient id="goldenBurst" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Radiant Party Sky */}
          <rect width="800" height="450" fill="url(#victorySky)" />

          {/* Giant Grand Rainbow */}
          <g>
            <path d="M 80 290 A 320 210 0 0 1 720 290" stroke="#ef4444" strokeWidth="9" fill="none" />
            <path d="M 88 290 A 312 202 0 0 1 712 290" stroke="#f97316" strokeWidth="9" fill="none" />
            <path d="M 96 290 A 304 194 0 0 1 704 290" stroke="#eab308" strokeWidth="9" fill="none" />
            <path d="M 104 290 A 296 186 0 0 1 696 290" stroke="#22c55e" strokeWidth="9" fill="none" />
            <path d="M 112 290 A 288 178 0 0 1 688 290" stroke="#06b6d4" strokeWidth="9" fill="none" />
            <path d="M 120 290 A 280 170 0 0 1 680 290" stroke="#a855f7" strokeWidth="9" fill="none" />
          </g>

          {/* Cave Door OPEN with Radiant Golden Light Bursting Out */}
          <g transform="translate(325, 145)">
            <path d="M 10 175 L 10 55 Q 75 0 140 55 L 140 175 Z" fill="#fef08a" />
            <circle cx="75" cy="85" r="110" fill="url(#goldenBurst)" />
            {/* Bursting Golden Sunrays */}
            <polygon points="75,85 -60,210 0,210" fill="#ffffff" opacity="0.45" />
            <polygon points="75,85 150,210 210,210" fill="#ffffff" opacity="0.45" />
            {/* Open Doors Swung Wide */}
            <polygon points="10,55 -30,75 -30,175 10,175" fill="#64748b" stroke="#1e293b" strokeWidth="3" />
            <polygon points="140,55 180,75 180,175 140,175" fill="#64748b" stroke="#1e293b" strokeWidth="3" />
          </g>

          {/* Celebratory Colorful Bunting Pennant Flags */}
          <path d="M 30 70 Q 220 135 400 90 Q 580 135 770 70" stroke="#78350f" strokeWidth="3" fill="none" />
          {/* Rainbow Flags */}
          <polygon points="80,84 105,89 92,118" fill="#ef4444" />
          <polygon points="140,96 165,100 152,129" fill="#3b82f6" />
          <polygon points="200,105 225,107 212,136" fill="#facc15" />
          <polygon points="260,107 285,106 272,135" fill="#10b981" />
          <polygon points="320,102 345,98 332,127" fill="#ec4899" />
          <polygon points="455,98 480,102 468,127" fill="#ef4444" />
          <polygon points="515,106 540,107 528,135" fill="#8b5cf6" />
          <polygon points="575,107 600,105 588,136" fill="#f97316" />
          <polygon points="635,100 660,96 648,129" fill="#06b6d4" />
          <polygon points="695,89 720,84 708,118" fill="#facc15" />

          {/* Lush Green Meadow with Blooming Sunflowers */}
          <path d="M 0 310 Q 260 270 520 310 Q 660 280 800 300 L 800 450 L 0 450 Z" fill="#16a34a" />
          <path d="M 0 340 Q 200 320 400 345 Q 650 315 800 335 L 800 450 L 0 450 Z" fill="#15803d" />

          {/* Floating Confetti Hearts and Star Petals */}
          <g>
            <circle cx="110" cy="180" r="5" fill="#ef4444" />
            <circle cx="270" cy="140" r="6" fill="#facc15" />
            <circle cx="530" cy="130" r="5.5" fill="#3b82f6" />
            <circle cx="690" cy="190" r="6" fill="#10b981" />
            <circle cx="370" cy="120" r="5" fill="#ec4899" />
            <circle cx="630" cy="160" r="5.5" fill="#f97316" />
            <text x="210" y="210" fontSize="16">💖</text>
            <text x="580" y="220" fontSize="16">⭐</text>
            <text x="390" y="80" fontSize="18">🎉</text>
          </g>
        </svg>
      )}

      {/* STORYBOOK BORDER DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none border-8 sm:border-12 border-[#451a03]/25 rounded-2xl">
        <div className="absolute top-2 left-2 text-lg sm:text-xl text-amber-300 drop-shadow-md">⚜️</div>
        <div className="absolute top-2 right-2 text-lg sm:text-xl text-amber-300 drop-shadow-md">⚜️</div>
        <div className="absolute bottom-2 left-2 text-lg sm:text-xl text-amber-300 drop-shadow-md">⚜️</div>
        <div className="absolute bottom-2 right-2 text-lg sm:text-xl text-amber-300 drop-shadow-md">⚜️</div>
      </div>
    </div>
  );
};
