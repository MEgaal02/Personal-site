import React from 'react';
import { useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';
import { BG, BG_ELEVATED, GOLD, WHITE_TEXT, GREY_TEXT } from '../colors';
import { SYNE, OUTFIT } from '../fonts';

const PlatformPanel: React.FC<{
  label: string;
  sublabel: string;
  side: 'left' | 'right';
  frame: number;
  fps: number;
  delay: number;
}> = ({ label, sublabel, side, frame, fps, delay }) => {
  const spr = spring({ frame: frame - delay, fps, config: { mass: 0.6, stiffness: 80, damping: 14 } });
  const xOffset = interpolate(spr, [0, 1], [side === 'left' ? -240 : 240, 0]);
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const BAR_WIDTHS = [75, 55, 88, 42, 66];

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateX(${xOffset}px)`,
        opacity,
        gap: 28,
      }}
    >
      <div
        style={{
          width: 500,
          height: 330,
          backgroundColor: BG_ELEVATED,
          border: `1px solid rgba(232, 197, 71, 0.22)`,
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          padding: '0 40px',
        }}
      >
        {BAR_WIDTHS.map((w, i) => {
          const barOpacity = interpolate(frame - delay, [i * 5, i * 5 + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const barY = interpolate(frame - delay, [i * 5, i * 5 + 18], [8, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: 11,
                backgroundColor: i % 2 === 0 ? 'rgba(232, 197, 71, 0.28)' : 'rgba(255,255,255,0.07)',
                borderRadius: 6,
                transform: `translateY(${barY}px)`,
                opacity: barOpacity,
              }}
            />
          );
        })}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: SYNE, fontSize: 32, fontWeight: 800, color: GOLD, letterSpacing: 2 }}>
          {label}
        </div>
        <div style={{ fontFamily: OUTFIT, fontSize: 18, color: GREY_TEXT, marginTop: 8 }}>
          {sublabel}
        </div>
      </div>
    </div>
  );
};

export const Scene07_Prototypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', paddingTop: 56, opacity: textOpacity }}>
        <div style={{ fontFamily: OUTFIT, fontSize: 24, color: GREY_TEXT }}>
          Whether it's B2B platforms… or B2C products…
        </div>
        <div style={{ fontFamily: SYNE, fontSize: 30, fontWeight: 700, color: WHITE_TEXT, marginTop: 8 }}>
          you see your system before it goes live.
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '8%',
            bottom: '8%',
            width: 1,
            backgroundColor: 'rgba(232, 197, 71, 0.18)',
            transform: 'translateX(-50%)',
          }}
        />
        <PlatformPanel
          label="B2B PLATFORMS"
          sublabel="Enterprise dashboards & integrations"
          side="left"
          frame={frame}
          fps={fps}
          delay={0}
        />
        <PlatformPanel
          label="B2C PRODUCTS"
          sublabel="Consumer apps & mobile experiences"
          side="right"
          frame={frame}
          fps={fps}
          delay={10}
        />
      </div>
    </div>
  );
};
