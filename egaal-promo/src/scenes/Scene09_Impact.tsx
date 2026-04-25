import React from 'react';
import { useCurrentFrame, interpolate, Img, staticFile, spring, useVideoConfig } from 'remotion';
import { BG, GOLD, WHITE_TEXT, GREY_TEXT } from '../colors';
import { SYNE, OUTFIT } from '../fonts';

const UK_NODES = [
  { x: 550, y: 315, label: 'London' },
  { x: 440, y: 220, label: 'Manchester' },
  { x: 460, y: 250, label: 'Birmingham' },
  { x: 510, y: 210, label: 'Leeds' },
  { x: 420, y: 190, label: 'Liverpool' },
];

const UK_CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [1, 4], [1, 3], [2, 3],
];

export const Scene09_Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgProgress = spring({ frame, fps, config: { mass: 0.8, stiffness: 60, damping: 15 } });
  const imageY = interpolate(imgProgress, [0, 1], [80, 0]);
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [32, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const getLineProgress = (idx: number) =>
    interpolate(frame, [20 + idx * 8, 40 + idx * 8], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const nodePulse = 1 + 0.2 * Math.sin(frame * 0.18);

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
          src={staticFile('our_impact.png')}
          style={{
            width: 1100,
            height: 'auto',
            maxHeight: 560,
            objectFit: 'contain',
            borderRadius: 12,
            display: 'block',
          }}
        />
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 1100 560"
          preserveAspectRatio="none"
        >
          {UK_CONNECTIONS.map(([a, b], idx) => {
            const from = UK_NODES[a];
            const to = UK_NODES[b];
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
                opacity={0.75}
              />
            );
          })}
          {UK_NODES.map((node, idx) => {
            const nodeOpacity = interpolate(frame, [22 + idx * 5, 38 + idx * 5], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <g key={idx}>
                <circle cx={node.x} cy={node.y} r={9 * nodePulse} fill="none" stroke={GOLD} strokeWidth={1} opacity={0.28 * nodeOpacity} />
                <circle cx={node.x} cy={node.y} r={5} fill={GOLD} opacity={nodeOpacity} />
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ textAlign: 'center', opacity: textOpacity }}>
        <div style={{ fontFamily: SYNE, fontSize: 42, fontWeight: 700, color: WHITE_TEXT, marginBottom: 10 }}>
          Our impact spans across the <span style={{ color: GOLD }}>UK</span>
        </div>
        <div style={{ fontFamily: OUTFIT, fontSize: 24, color: GREY_TEXT }}>
          connecting industries… transforming businesses.
        </div>
      </div>
    </div>
  );
};
