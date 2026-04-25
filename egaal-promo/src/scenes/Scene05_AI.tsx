import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BG, GOLD, WHITE_TEXT, GREY_TEXT } from '../colors';
import { SYNE, OUTFIT } from '../fonts';

const NODE_POSITIONS = [
  { x: 960, y: 390 },
  { x: 740, y: 530 },
  { x: 1180, y: 530 },
  { x: 810, y: 680 },
  { x: 1110, y: 680 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 4], [2, 3], [3, 4],
];

const NODE_LABELS = ['AI Core', 'Automation', 'Analytics', 'Data Layer', 'Output'];

export const Scene05_AI: React.FC = () => {
  const frame = useCurrentFrame();

  const line1Opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1Y = interpolate(frame, [0, 15], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const line2Opacity = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Y = interpolate(frame, [20, 35], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const glowPulse = 1 + 0.15 * Math.sin(frame * 0.14);

  const getLineProgress = (idx: number) => {
    const startF = 15 + idx * 8;
    return interpolate(frame, [startF, startF + 22], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });
  };

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: BG }}>
      <div style={{ position: 'absolute', top: 90, left: 100, maxWidth: 820 }}>
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 58,
            fontWeight: 800,
            color: WHITE_TEXT,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            marginBottom: 18,
            lineHeight: 1.2,
          }}
        >
          We <span style={{ color: GOLD }}>10x</span> your production speed
        </div>
        <div
          style={{
            fontFamily: OUTFIT,
            fontSize: 28,
            color: GREY_TEXT,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          using AI-driven software and intelligent automation.
        </div>
      </div>

      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        viewBox="0 0 1920 1080"
      >
        {CONNECTIONS.map(([a, b], idx) => {
          const from = NODE_POSITIONS[a];
          const to = NODE_POSITIONS[b];
          const progress = getLineProgress(idx);
          return (
            <line
              key={idx}
              x1={from.x}
              y1={from.y}
              x2={from.x + (to.x - from.x) * progress}
              y2={from.y + (to.y - from.y) * progress}
              stroke={GOLD}
              strokeWidth={1.5}
              opacity={0.55}
            />
          );
        })}

        {NODE_POSITIONS.map((pos, idx) => {
          const nodeDelay = idx * 7;
          const nodeScale = interpolate(frame, [nodeDelay + 10, nodeDelay + 26], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          });

          return (
            <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
              <circle
                r={28 * glowPulse}
                fill="none"
                stroke={GOLD}
                strokeWidth={1}
                opacity={0.18 * nodeScale}
              />
              <circle
                r={18}
                fill={BG}
                stroke={GOLD}
                strokeWidth={2}
                transform={`scale(${nodeScale})`}
              />
              <circle r={6} fill={GOLD} transform={`scale(${nodeScale})`} />
              <text
                textAnchor="middle"
                dy={42}
                fill={GREY_TEXT}
                fontSize={15}
                fontFamily="sans-serif"
                opacity={nodeScale}
              >
                {NODE_LABELS[idx]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
