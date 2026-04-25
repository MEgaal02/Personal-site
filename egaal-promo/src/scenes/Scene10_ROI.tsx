import React from 'react';
import { useCurrentFrame, interpolate, Easing, Img, staticFile, spring, useVideoConfig } from 'remotion';
import { BG, GOLD, WHITE_TEXT } from '../colors';
import { SYNE } from '../fonts';

export const Scene10_ROI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgProgress = spring({ frame, fps, config: { mass: 0.7, stiffness: 70, damping: 14 } });
  const imageY = interpolate(imgProgress, [0, 1], [80, 0]);
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [38, 54], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(frame, [38, 54], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const glowIntensity = interpolate(frame, [50, 78], [0.08, 0.26], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        gap: 48,
      }}
    >
      <div
        style={{
          position: 'relative',
          opacity: imageOpacity,
          transform: `translateY(${imageY}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: -30,
            background: `radial-gradient(ellipse at center, rgba(232,197,71,${glowIntensity}) 0%, transparent 70%)`,
            borderRadius: 20,
          }}
        />
        <Img
          src={staticFile('increased_roi.png')}
          style={{
            width: 1000,
            height: 'auto',
            maxHeight: 520,
            objectFit: 'contain',
            borderRadius: 12,
            position: 'relative',
            display: 'block',
          }}
        />
      </div>

      <div
        style={{
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div style={{ fontFamily: SYNE, fontSize: 42, fontWeight: 700, color: WHITE_TEXT, marginBottom: 8 }}>
          More adoption… more efficiency…
        </div>
        <div style={{ fontFamily: SYNE, fontSize: 42, fontWeight: 700, color: GOLD }}>
          more return on investment.
        </div>
      </div>
    </div>
  );
};
