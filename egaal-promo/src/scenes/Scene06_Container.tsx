import React from 'react';
import { useCurrentFrame, interpolate, Easing, Img, staticFile, spring, useVideoConfig } from 'remotion';
import { BG, WHITE_TEXT, GREY_TEXT, GREEN } from '../colors';
import { SYNE, OUTFIT } from '../fonts';

export const Scene06_Container: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgProgress = spring({ frame, fps, config: { mass: 0.7, stiffness: 70, damping: 14 } });
  const imageY = interpolate(imgProgress, [0, 1], [100, 0]);
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(frame, [35, 50], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const dotScale = 1 + 0.2 * Math.sin(frame * 0.2);

  const badgeOpacity = interpolate(frame, [25, 40], [0, 1], {
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
          position: 'relative',
          opacity: imageOpacity,
          transform: `translateY(${imageY}px)`,
        }}
      >
        <Img
          src={staticFile('container_your_app.png')}
          style={{
            width: 1100,
            height: 'auto',
            maxHeight: 560,
            objectFit: 'contain',
            borderRadius: 12,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: 'rgba(0,0,0,0.82)',
            border: `1px solid ${GREEN}`,
            borderRadius: 8,
            padding: '8px 18px',
            opacity: badgeOpacity,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: GREEN,
              transform: `scale(${dotScale})`,
            }}
          />
          <span style={{ fontFamily: OUTFIT, fontSize: 16, fontWeight: 600, color: GREEN }}>
            Live Prototype Running
          </span>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div style={{ fontFamily: SYNE, fontSize: 38, fontWeight: 700, color: WHITE_TEXT, marginBottom: 10 }}>
          We containerise your application…
        </div>
        <div style={{ fontFamily: OUTFIT, fontSize: 24, color: GREY_TEXT }}>
          so you can test and interact with live prototypes in real-time.
        </div>
      </div>
    </div>
  );
};
