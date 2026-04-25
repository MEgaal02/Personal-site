import React from 'react';
import { useCurrentFrame, interpolate, Easing, Img, staticFile, spring, useVideoConfig } from 'remotion';
import { BG, GOLD, WHITE_TEXT } from '../colors';
import { SYNE } from '../fonts';

export const Scene08_Code: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgProgress = spring({ frame, fps, config: { mass: 0.7, stiffness: 70, damping: 14 } });
  const imageY = interpolate(imgProgress, [0, 1], [100, 0]);
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line1Opacity = interpolate(frame, [25, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1Y = interpolate(frame, [25, 40], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const line2Opacity = interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Y = interpolate(frame, [40, 55], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const sweepX = interpolate(frame, [28, 72], [-15, 115], {
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
        gap: 44,
      }}
    >
      <div
        style={{
          position: 'relative',
          opacity: imageOpacity,
          transform: `translateY(${imageY}px)`,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <Img
          src={staticFile('IDE.png')}
          style={{
            width: 1200,
            height: 'auto',
            maxHeight: 580,
            objectFit: 'contain',
            borderRadius: 12,
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, transparent ${sweepX - 5}%, rgba(232,197,71,0.07) ${sweepX}%, rgba(232,197,71,0.11) ${sweepX + 5}%, rgba(232,197,71,0.07) ${sweepX + 10}%, transparent ${sweepX + 16}%)`,
            pointerEvents: 'none',
          }}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 52,
            fontWeight: 800,
            color: WHITE_TEXT,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            marginBottom: 10,
          }}
        >
          Behind every product…
        </div>
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 52,
            fontWeight: 800,
            color: GOLD,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          is powerful engineering.
        </div>
      </div>
    </div>
  );
};
