import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BG, WHITE_TEXT, GREY_TEXT, RED } from '../colors';
import { SYNE, OUTFIT } from '../fonts';

const BrokenBox: React.FC<{
  label: string;
  delay: number;
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
  fromLeft: boolean;
}> = ({ label, delay, x, y, width, height, frame, fromLeft }) => {
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slideX = interpolate(frame, [delay, delay + 20], [fromLeft ? -60 : 60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        border: `1px dashed ${RED}`,
        borderRadius: 8,
        opacity,
        transform: `translateX(${slideX}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.04)',
      }}
    >
      <span style={{ fontFamily: OUTFIT, fontSize: 20, color: GREY_TEXT }}>{label}</span>
    </div>
  );
};

const WarningDot: React.FC<{ x: number; y: number; delay: number; frame: number }> = ({
  x,
  y,
  delay,
  frame,
}) => {
  const pulse = 1 + 0.15 * Math.sin((frame - delay) * 0.2);
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: RED,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${pulse})`,
        opacity,
        color: 'white',
        fontSize: 24,
        fontWeight: 800,
        fontFamily: SYNE,
      }}
    >
      !
    </div>
  );
};

export const Scene02_Outdated: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(frame, [55, 70], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const lineOpacity = interpolate(frame, [18, 28], [0, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: BG }}>
      <BrokenBox label="CRM" delay={0} x={200} y={200} width={270} height={160} frame={frame} fromLeft />
      <BrokenBox label="Accounting" delay={8} x={700} y={280} width={270} height={160} frame={frame} fromLeft={false} />
      <BrokenBox label="Operations" delay={5} x={1400} y={200} width={270} height={160} frame={frame} fromLeft={false} />
      <BrokenBox label="Reporting" delay={12} x={1000} y={160} width={270} height={160} frame={frame} fromLeft />

      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1920 1080"
      >
        <line x1={470} y1={280} x2={560} y2={360} stroke={RED} strokeWidth={2} strokeDasharray="8 6" opacity={lineOpacity} />
        <line x1={610} y1={360} x2={700} y2={360} stroke={RED} strokeWidth={2} strokeDasharray="8 6" opacity={lineOpacity} />
        <line x1={970} y1={360} x2={1260} y2={280} stroke={RED} strokeWidth={2} strokeDasharray="8 6" opacity={interpolate(frame, [22, 32], [0, 0.55], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
        <line x1={900} y1={240} x2={1000} y2={240} stroke={RED} strokeWidth={2} strokeDasharray="8 6" opacity={lineOpacity} />
      </svg>

      <WarningDot x={575} y={325} delay={22} frame={frame} />
      <WarningDot x={1215} y={250} delay={30} frame={frame} />

      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div style={{ fontFamily: SYNE, fontSize: 48, fontWeight: 700, color: WHITE_TEXT, marginBottom: 14 }}>
          Instead of automation…
        </div>
        <div style={{ fontFamily: OUTFIT, fontSize: 28, color: GREY_TEXT }}>
          you're stuck with manual processes… disconnected systems… and lost opportunities.
        </div>
      </div>
    </div>
  );
};
