import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BG, GOLD, GREY_TEXT } from '../colors';
import { SYNE, OUTFIT } from '../fonts';

export const Scene01_Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const line1Opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line1Y = interpolate(frame, [0, 15], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const line2Opacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line2Y = interpolate(frame, [20, 35], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const cursorVisible = frame % 30 < 15;
  const flickerBrightness = 1 + 0.018 * Math.sin(frame * 0.8) * Math.sin(frame * 1.3);

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
        filter: `brightness(${flickerBrightness})`,
      }}
    >
      <div
        style={{
          width: 60,
          height: 3,
          backgroundColor: GOLD,
          marginBottom: 32,
          opacity: line1Opacity,
        }}
      />

      <div
        style={{
          fontFamily: SYNE,
          fontSize: 72,
          fontWeight: 800,
          color: GOLD,
          opacity: line1Opacity,
          transform: `translateY(${line1Y}px)`,
          textAlign: 'center',
          letterSpacing: '-1px',
          marginBottom: 28,
        }}
      >
        You have a business problem…
      </div>

      <div
        style={{
          fontFamily: OUTFIT,
          fontSize: 30,
          fontWeight: 400,
          color: GREY_TEXT,
          opacity: line2Opacity,
          transform: `translateY(${line2Y}px)`,
          textAlign: 'center',
          maxWidth: 920,
          lineHeight: 1.6,
        }}
      >
        Production inefficiencies… slow systems…
        <br />
        and outdated workflows.
        <span
          style={{
            opacity: cursorVisible ? 1 : 0,
            color: GOLD,
            marginLeft: 4,
          }}
        >
          |
        </span>
      </div>
    </div>
  );
};
