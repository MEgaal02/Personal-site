import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { BG, GOLD } from '../colors';
import { SYNE } from '../fonts';

export const Scene11_Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Spr = spring({ frame, fps, config: { mass: 0.5, stiffness: 100, damping: 12 } });
  const line1Scale = interpolate(line1Spr, [0, 1], [0.8, 1]);
  const line1Opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line2Spr = spring({ frame: frame - 18, fps, config: { mass: 0.5, stiffness: 100, damping: 12 } });
  const line2Scale = interpolate(line2Spr, [0, 1], [0.8, 1]);
  const line2Opacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowPulse = 1 + 0.1 * Math.sin(frame * 0.18);

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
        gap: 8,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(232,197,71,${0.08 * glowPulse}) 0%, transparent 60%)`,
        }}
      />

      <div
        style={{
          fontFamily: SYNE,
          fontSize: 118,
          fontWeight: 800,
          color: GOLD,
          opacity: line1Opacity,
          transform: `scale(${line1Scale})`,
          letterSpacing: '-2px',
          lineHeight: 1,
          textShadow: '0 0 80px rgba(232,197,71,0.38)',
          position: 'relative',
        }}
      >
        MORE VOLUME.
      </div>

      <div
        style={{
          fontFamily: SYNE,
          fontSize: 118,
          fontWeight: 800,
          color: GOLD,
          opacity: line2Opacity,
          transform: `scale(${line2Scale})`,
          letterSpacing: '-2px',
          lineHeight: 1,
          textShadow: '0 0 80px rgba(232,197,71,0.38)',
          position: 'relative',
        }}
      >
        MORE VALUE.
      </div>
    </div>
  );
};
