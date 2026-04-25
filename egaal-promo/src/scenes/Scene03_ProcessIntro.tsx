import React from 'react';
import { useCurrentFrame, interpolate, Easing, Img, staticFile, spring, useVideoConfig } from 'remotion';
import { BG, GOLD, GOLD_GLOW } from '../colors';
import { SYNE } from '../fonts';

export const Scene03_ProcessIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 15], [-18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const imgProgress = spring({ frame: frame - 10, fps, config: { mass: 0.6, stiffness: 80, damping: 14 } });
  const imageY = interpolate(imgProgress, [0, 1], [120, 0]);
  const imageOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowScale = interpolate(frame, [30, 65, 100], [0.95, 1.06, 0.95], {
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
        gap: 40,
      }}
    >
      <div
        style={{
          fontFamily: SYNE,
          fontSize: 20,
          fontWeight: 600,
          color: GOLD,
          letterSpacing: 7,
          textTransform: 'uppercase',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        OUR BESPOKE PROCESS
      </div>

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
            inset: -50,
            background: `radial-gradient(ellipse at center, ${GOLD_GLOW} 0%, transparent 70%)`,
            transform: `scale(${glowScale})`,
            borderRadius: 20,
          }}
        />
        <Img
          src={staticFile('Our-proccess.png')}
          style={{
            width: 1200,
            height: 'auto',
            maxHeight: 680,
            objectFit: 'contain',
            borderRadius: 14,
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
};
