import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BG, GOLD, WHITE_TEXT } from '../colors';
import { SYNE, OUTFIT } from '../fonts';

// Timeline (280 frames total ≈ 9.3s):
//   0  – 20  : content fades in
//   20 – 250 : brand sits visible (5-6 seconds of breathing room after VO)
//   250– 280 : brand slides off-screen right with whoosh acceleration
const SLIDE_START = 250;
const SLIDE_END = 280;

export const Scene12_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in
  const contentOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shimmer sweep across brand name (plays once, frames 20–60)
  const shimmerX = interpolate(frame, [20, 60], [-20, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // URL fades in slightly after brand name
  const urlOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlY = interpolate(frame, [15, 35], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slide-out: brand accelerates off-screen to the right
  const slideX = interpolate(frame, [SLIDE_START, SLIDE_END], [0, 520], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Fade opacity simultaneously with slide
  const slideOpacity = interpolate(frame, [SLIDE_START, SLIDE_END - 5], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });

  const combinedOpacity = contentOpacity * slideOpacity;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: BG,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
      }}
    >
      <div
        style={{
          opacity: combinedOpacity,
          textAlign: 'center',
          transform: `translateX(${slideX}px)`,
        }}
      >
        {/* Brand name with shimmer sweep */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            style={{
              fontFamily: SYNE,
              fontSize: 68,
              fontWeight: 800,
              color: WHITE_TEXT,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Egaal Software Solutions
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, transparent ${shimmerX - 15}%, rgba(255,255,255,0.3) ${shimmerX}%, rgba(255,255,255,0.48) ${shimmerX + 5}%, rgba(255,255,255,0.3) ${shimmerX + 10}%, transparent ${shimmerX + 26}%)`,
              borderRadius: 4,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* URL */}
        <div
          style={{
            fontFamily: OUTFIT,
            fontSize: 34,
            fontWeight: 400,
            color: GOLD,
            marginTop: 16,
            letterSpacing: 1,
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
          }}
        >
          builtbyegaal.com
        </div>
      </div>
    </div>
  );
};
