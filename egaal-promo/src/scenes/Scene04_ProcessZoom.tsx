import React from 'react';
import { useCurrentFrame, interpolate, Easing, Img, staticFile } from 'remotion';
import { BG, BG_ELEVATED, GOLD, WHITE_TEXT, GREY_TEXT } from '../colors';
import { SYNE, OUTFIT } from '../fonts';

const STEPS = ['Discover', 'Plan', 'Wireframe', 'Architecture'];

const StepCard: React.FC<{
  label: string;
  delay: number;
  frame: number;
  isActive: boolean;
}> = ({ label, delay, frame, isActive }) => {
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = isActive
    ? interpolate(frame, [delay + 15, delay + 28], [1, 1.05], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  return (
    <div
      style={{
        padding: '22px 38px',
        border: `2px solid ${isActive ? GOLD : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 10,
        backgroundColor: isActive ? 'rgba(232, 197, 71, 0.08)' : BG_ELEVATED,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: isActive ? '0 0 32px rgba(232, 197, 71, 0.22)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: SYNE,
          fontSize: 24,
          fontWeight: 700,
          color: isActive ? GOLD : WHITE_TEXT,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const Scene04_ProcessZoom: React.FC = () => {
  const frame = useCurrentFrame();

  const imageScale = interpolate(frame, [0, 80], [1.0, 1.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(frame, [0, 15], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const activeStep = Math.min(Math.floor(frame / 28), 3);
  const stepDelays = [0, 15, 30, 45];

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: BG }}>
      <div
        style={{
          position: 'absolute',
          right: 60,
          top: 60,
          opacity: 0.22,
          transform: `scale(${imageScale})`,
          transformOrigin: 'top right',
        }}
      >
        <Img
          src={staticFile('Our-proccess.png')}
          style={{ width: 720, height: 'auto', objectFit: 'contain', borderRadius: 12 }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 100,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          maxWidth: 860,
        }}
      >
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 54,
            fontWeight: 800,
            color: WHITE_TEXT,
            lineHeight: 1.2,
            marginBottom: 18,
          }}
        >
          From understanding your goals…
        </div>
        <div style={{ fontFamily: OUTFIT, fontSize: 26, color: GREY_TEXT }}>
          to designing, building, and delivering scalable systems.
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 150,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        {STEPS.map((step, i) => (
          <StepCard
            key={step}
            label={step}
            delay={stepDelays[i]}
            frame={frame}
            isActive={activeStep === i}
          />
        ))}
      </div>
    </div>
  );
};
