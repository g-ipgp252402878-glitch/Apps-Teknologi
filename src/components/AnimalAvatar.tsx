import React from 'react';
import { AnimalType } from '../types';

interface AnimalAvatarProps {
  type: AnimalType;
  color?: string;
  pawColor?: string;
  accessory?: string;
  size?: number;
  className?: string;
  isTalking?: boolean;
  isSad?: boolean;
  isTrapped?: boolean;
}

export const AnimalAvatar: React.FC<AnimalAvatarProps> = ({
  type,
  color,
  pawColor = '#ffffff',
  accessory = 'none',
  size = 120,
  className = '',
  isTalking = false,
  isSad = false,
  isTrapped = false,
}) => {
  // Vibrant, cheerful pastel base colors
  const baseColor = color || (
    type === 'tiger' ? '#f59e0b' :
    type === 'cat' ? '#fb923c' :
    type === 'rabbit' ? '#fdf2f8' :
    type === 'bear' ? '#92400e' :
    type === 'panda' ? '#ffffff' :
    type === 'fox' ? '#ea580c' : '#fb923c'
  );

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        className="overflow-visible transition-transform duration-200"
      >
        <defs>
          <radialGradient id={`bellyGrad-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.4" />
          </radialGradient>
          <filter id="cuteShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1e293b" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* CAGE OVERLAY if trapped */}
        {isTrapped && (
          <g className="animate-pulse">
            <rect x="15" y="15" width="130" height="130" rx="20" fill="rgba(15, 23, 42, 0.45)" />
          </g>
        )}

        {/* EARS */}
        {type === 'rabbit' && (
          <g>
            {/* Super Cute Floppy / Tall Bunny Ears */}
            <ellipse cx="56" cy="30" rx="14" ry="36" fill={baseColor} stroke="#cbd5e1" strokeWidth="2.5" transform="rotate(-12 56 30)" />
            <ellipse cx="56" cy="30" rx="7" ry="26" fill="#f472b6" transform="rotate(-12 56 30)" opacity="0.8" />
            <ellipse cx="104" cy="30" rx="14" ry="36" fill={baseColor} stroke="#cbd5e1" strokeWidth="2.5" transform="rotate(12 104 30)" />
            <ellipse cx="104" cy="30" rx="7" ry="26" fill="#f472b6" transform="rotate(12 104 30)" opacity="0.8" />
          </g>
        )}

        {type === 'cat' && (
          <g>
            {/* Cute Pointy Cat Ears */}
            <polygon points="36,68 54,22 76,58" fill={baseColor} stroke="#c2410c" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="44,62 55,32 70,54" fill="#fbcfe8" />
            <polygon points="124,68 106,22 84,58" fill={baseColor} stroke="#c2410c" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="116,62 105,32 90,54" fill="#fbcfe8" />
          </g>
        )}

        {type === 'tiger' && (
          <g>
            {/* Chubby Round Tiger Ears */}
            <circle cx="44" cy="46" r="20" fill="#78350f" />
            <circle cx="44" cy="46" r="15" fill={baseColor} />
            <circle cx="44" cy="46" r="8" fill="#fef08a" />
            <circle cx="116" cy="46" r="20" fill="#78350f" />
            <circle cx="116" cy="46" r="15" fill={baseColor} />
            <circle cx="116" cy="46" r="8" fill="#fef08a" />
          </g>
        )}

        {type === 'fox' && (
          <g>
            {/* Big Alert Fox Ears */}
            <polygon points="34,70 50,16 76,58" fill={baseColor} stroke="#9a3412" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="42,65 51,28 69,54" fill="#ffffff" />
            <polygon points="126,70 110,16 84,58" fill={baseColor} stroke="#9a3412" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="118,65 109,28 91,54" fill="#ffffff" />
          </g>
        )}

        {(type === 'bear' || type === 'panda') && (
          <g>
            {/* Cute Round Teddy Ears */}
            <circle cx="42" cy="48" r="20" fill={type === 'panda' ? '#0f172a' : baseColor} stroke="#451a03" strokeWidth="2" />
            <circle cx="42" cy="48" r="11" fill={type === 'panda' ? '#334155' : '#fde68a'} />
            <circle cx="118" cy="48" r="20" fill={type === 'panda' ? '#0f172a' : baseColor} stroke="#451a03" strokeWidth="2" />
            <circle cx="118" cy="48" r="11" fill={type === 'panda' ? '#334155' : '#fde68a'} />
          </g>
        )}

        {/* CHUBBY KAWAII HEAD */}
        <circle cx="80" cy="92" r="50" fill={baseColor} filter="url(#cuteShadow)" stroke="#000000" strokeWidth="2.5" opacity="0.98" />

        {/* PANDA EYE PATCHES */}
        {type === 'panda' && (
          <g>
            <ellipse cx="60" cy="86" rx="16" ry="13" fill="#0f172a" transform="rotate(-15 60 86)" />
            <ellipse cx="100" cy="86" rx="16" ry="13" fill="#0f172a" transform="rotate(15 100 86)" />
          </g>
        )}

        {/* TIGER STRIPES */}
        {type === 'tiger' && (
          <g fill="#451a03">
            {/* Cute forehead stripes */}
            <polygon points="80,50 76,64 84,64" />
            <polygon points="70,56 75,67 69,67" />
            <polygon points="90,56 85,67 91,67" />
            {/* Cheek stripes */}
            <polygon points="34,84 46,88 34,92" />
            <polygon points="126,84 114,88 126,92" />
          </g>
        )}

        {/* FOX FLUFFY WHITE CHEEKS */}
        {type === 'fox' && (
          <g fill="#ffffff">
            <path d="M 38 95 Q 60 118 80 120 Q 100 118 122 95 Q 80 138 38 95 Z" opacity="0.95" />
          </g>
        )}

        {/* SNOUT / CHUBBY MUZZLE */}
        <ellipse
          cx="80"
          cy="100"
          rx="24"
          ry="17"
          fill={type === 'panda' || type === 'cat' || type === 'rabbit' ? '#ffffff' : '#fef3c7'}
          stroke="#e2e8f0"
          strokeWidth="1.5"
        />

        {/* NOSE */}
        <path
          d="M 74 94 Q 80 91 86 94 Q 80 102 74 94 Z"
          fill={type === 'rabbit' || type === 'cat' ? '#f43f5e' : '#1e293b'}
        />

        {/* MOUTH & TONGUE */}
        {isTalking ? (
          <g>
            <ellipse cx="80" cy="107" rx="8" ry="7" fill="#dc2626" />
            <path d="M 75 108 Q 80 114 85 108" fill="#fda4af" />
          </g>
        ) : isSad ? (
          <path d="M 73 108 Q 80 103 87 108" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          /* Adorable Cat/Chibi Smile :3 */
          <g stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 73 104 Q 77 110 80 105 Q 83 110 87 104" />
          </g>
        )}

        {/* EYES */}
        {isSad ? (
          <g stroke="#1e293b" strokeWidth="3.5" fill="none" strokeLinecap="round">
            <path d="M 55 85 Q 63 79 70 86" />
            <path d="M 105 85 Q 97 79 90 86" />
            {/* Glistening Tear Drop */}
            <circle cx="58" cy="95" r="3.5" fill="#38bdf8" />
          </g>
        ) : (
          <g>
            {/* Big Sparkling Anime/Storybook Eyes */}
            <ellipse cx="62" cy="82" rx="8.5" ry="9.5" fill="#0f172a" />
            <circle cx="59" cy="79" r="3.5" fill="#ffffff" />
            <circle cx="65" cy="85" r="2" fill="#ffffff" />
            <circle cx="60" cy="87" r="1" fill="#fde047" />

            <ellipse cx="98" cy="82" rx="8.5" ry="9.5" fill="#0f172a" />
            <circle cx="95" cy="79" r="3.5" fill="#ffffff" />
            <circle cx="101" cy="85" r="2" fill="#ffffff" />
            <circle cx="96" cy="87" r="1" fill="#fde047" />

            {/* Rosy Glowing Blush Cheeks */}
            <ellipse cx="48" cy="96" rx="8" ry="5.5" fill="#fb7185" opacity="0.75" />
            <ellipse cx="112" cy="96" rx="8" ry="5.5" fill="#fb7185" opacity="0.75" />
          </g>
        )}

        {/* WHISKERS */}
        {(type === 'cat' || type === 'tiger' || type === 'rabbit') && (
          <g stroke="#475569" strokeWidth="1.8" strokeLinecap="round" opacity="0.65">
            <line x1="42" y1="98" x2="22" y2="94" />
            <line x1="42" y1="104" x2="24" y2="107" />
            <line x1="118" y1="98" x2="138" y2="94" />
            <line x1="118" y1="104" x2="136" y2="107" />
          </g>
        )}

        {/* PAWS AT THE FRONT (Customizable Paw Color) */}
        <g filter="url(#cuteShadow)">
          {/* Left Paw */}
          <ellipse cx="55" cy="138" rx="14" ry="11" fill={pawColor} stroke="#94a3b8" strokeWidth="1.8" />
          <circle cx="49" cy="136" r="2.5" fill={pawColor === '#f43f5e' || pawColor === '#ec4899' ? '#ffffff' : '#f43f5e'} opacity="0.8" />
          <circle cx="55" cy="133" r="2.5" fill={pawColor === '#f43f5e' || pawColor === '#ec4899' ? '#ffffff' : '#f43f5e'} opacity="0.8" />
          <circle cx="61" cy="136" r="2.5" fill={pawColor === '#f43f5e' || pawColor === '#ec4899' ? '#ffffff' : '#f43f5e'} opacity="0.8" />
          <ellipse cx="55" cy="140" rx="5" ry="3.5" fill={pawColor === '#f43f5e' || pawColor === '#ec4899' ? '#ffffff' : '#f43f5e'} opacity="0.75" />

          {/* Right Paw */}
          <ellipse cx="105" cy="138" rx="14" ry="11" fill={pawColor} stroke="#94a3b8" strokeWidth="1.8" />
          <circle cx="99" cy="136" r="2.5" fill={pawColor === '#f43f5e' || pawColor === '#ec4899' ? '#ffffff' : '#f43f5e'} opacity="0.8" />
          <circle cx="105" cy="133" r="2.5" fill={pawColor === '#f43f5e' || pawColor === '#ec4899' ? '#ffffff' : '#f43f5e'} opacity="0.8" />
          <circle cx="111" cy="136" r="2.5" fill={pawColor === '#f43f5e' || pawColor === '#ec4899' ? '#ffffff' : '#f43f5e'} opacity="0.8" />
          <ellipse cx="105" cy="140" rx="5" ry="3.5" fill={pawColor === '#f43f5e' || pawColor === '#ec4899' ? '#ffffff' : '#f43f5e'} opacity="0.75" />
        </g>

        {/* ACCESSORIES */}
        {accessory === 'bandana' && (
          <g>
            <polygon points="46,120 114,120 80,148" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
            {/* White polka dots */}
            <circle cx="80" cy="126" r="3" fill="#ffffff" />
            <circle cx="68" cy="128" r="2.5" fill="#ffffff" />
            <circle cx="92" cy="128" r="2.5" fill="#ffffff" />
            <circle cx="80" cy="138" r="2.5" fill="#ffffff" />
          </g>
        )}

        {accessory === 'crown' && (
          <g>
            <polygon points="54,54 58,28 70,42 80,22 90,42 102,28 106,54" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <circle cx="80" cy="22" r="3.5" fill="#ef4444" />
            <circle cx="58" cy="28" r="3" fill="#38bdf8" />
            <circle cx="102" cy="28" r="3" fill="#10b981" />
          </g>
        )}

        {accessory === 'glasses' && (
          <g stroke="#2563eb" strokeWidth="3.5" fill="rgba(255,255,255,0.4)">
            <circle cx="62" cy="82" r="14" />
            <circle cx="98" cy="82" r="14" />
            <line x1="76" y1="82" x2="84" y2="82" />
          </g>
        )}

        {accessory === 'cape' && (
          <g>
            <path d="M 36 122 L 18 156 L 40 150 L 52 126 Z" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1.5" />
            <path d="M 124 122 L 142 156 L 120 150 L 108 126 Z" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1.5" />
          </g>
        )}

        {accessory === 'bell' && (
          <g>
            <rect x="50" y="122" width="60" height="9" rx="4" fill="#ef4444" />
            <circle cx="80" cy="133" r="8" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="80" cy="135" r="2" fill="#1e293b" />
          </g>
        )}

        {accessory === 'flower' && (
          <g transform="translate(108, 54)">
            <circle cx="-5" cy="0" r="5.5" fill="#f43f5e" />
            <circle cx="5" cy="0" r="5.5" fill="#f43f5e" />
            <circle cx="0" cy="-5" r="5.5" fill="#f43f5e" />
            <circle cx="0" cy="5" r="5.5" fill="#f43f5e" />
            <circle cx="0" cy="0" r="4.5" fill="#fef08a" />
          </g>
        )}

        {/* PRISON BARS OVERLAY if trapped */}
        {isTrapped && (
          <g stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" opacity="0.95">
            <line x1="36" y1="20" x2="36" y2="140" />
            <line x1="65" y1="20" x2="65" y2="140" />
            <line x1="95" y1="20" x2="95" y2="140" />
            <line x1="124" y1="20" x2="124" y2="140" />
            <rect x="20" y="20" width="120" height="120" rx="12" fill="none" stroke="#64748b" strokeWidth="7" />
            {/* Lock padlock */}
            <circle cx="95" cy="85" r="9" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
            <path d="M 90 80 A 5 5 0 0 1 100 80" stroke="#334155" strokeWidth="3" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
