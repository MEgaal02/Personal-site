import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { Scene01_Problem } from './scenes/Scene01_Problem';
import { Scene02_Outdated } from './scenes/Scene02_Outdated';
import { Scene03_ProcessIntro } from './scenes/Scene03_ProcessIntro';
import { Scene04_ProcessZoom } from './scenes/Scene04_ProcessZoom';
import { Scene05_AI } from './scenes/Scene05_AI';
import { Scene06_Container } from './scenes/Scene06_Container';
import { Scene07_Prototypes } from './scenes/Scene07_Prototypes';
import { Scene08_Code } from './scenes/Scene08_Code';
import { Scene09_Impact } from './scenes/Scene09_Impact';
import { Scene10_ROI } from './scenes/Scene10_ROI';
import { Scene11_Tagline } from './scenes/Scene11_Tagline';
import { Scene12_Outro } from './scenes/Scene12_Outro';

// Scene durations = actual VO frames + 30f (1s breathing room)
// 11 transitions × 20f overlap → total composition = 2182f ≈ 72.7s @ 30fps
const T = 20;

export const PromoVideo: React.FC = () => {
  return (
    <>
      {/* ── Global ambient pad — A-minor drone, barely perceptible ── */}
      <Audio src={staticFile('sfx_ambient.wav')} volume={1} />

      <TransitionSeries>

        {/* ── Scene 01 — The Problem (243f / 8.1s) ── */}
        <TransitionSeries.Sequence durationInFrames={243}>
          <Audio src={staticFile('vo_scene01.mp3')} />
          <Scene01_Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 02 — Outdated Systems (273f / 9.1s) ── */}
        <TransitionSeries.Sequence durationInFrames={273}>
          <Audio src={staticFile('vo_scene02.mp3')} />
          {/* Subtle tick when broken boxes appear */}
          <Sequence from={2}><Audio src={staticFile('sfx_tick.wav')} volume={0.6} /></Sequence>
          <Sequence from={10}><Audio src={staticFile('sfx_tick.wav')} volume={0.5} /></Sequence>
          <Sequence from={17}><Audio src={staticFile('sfx_tick.wav')} volume={0.55} /></Sequence>
          <Scene02_Outdated />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 03 — Process Intro (225f / 7.5s) ── */}
        <TransitionSeries.Sequence durationInFrames={225}>
          <Audio src={staticFile('vo_scene03.mp3')} />
          {/* Gold chime on image reveal */}
          <Sequence from={10}><Audio src={staticFile('sfx_appear.wav')} volume={0.7} /></Sequence>
          <Sequence from={12}><Audio src={staticFile('sfx_chime.wav')} volume={0.7} /></Sequence>
          <Scene03_ProcessIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 04 — Process Walkthrough (232f / 7.7s) ── */}
        <TransitionSeries.Sequence durationInFrames={232}>
          <Audio src={staticFile('vo_scene04.mp3')} />
          {/* Precise tick on each step card highlight (every 28f) */}
          <Sequence from={1}><Audio src={staticFile('sfx_tick.wav')} volume={0.5} /></Sequence>
          <Sequence from={28}><Audio src={staticFile('sfx_tick.wav')} volume={0.5} /></Sequence>
          <Sequence from={56}><Audio src={staticFile('sfx_tick.wav')} volume={0.5} /></Sequence>
          <Sequence from={84}><Audio src={staticFile('sfx_tick.wav')} volume={0.5} /></Sequence>
          <Scene04_ProcessZoom />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 05 — AI Transformation (225f / 7.5s) ── */}
        <TransitionSeries.Sequence durationInFrames={225}>
          <Audio src={staticFile('vo_scene05.mp3')} />
          {/* Cinematic pulse as each AI node connects */}
          <Sequence from={10}><Audio src={staticFile('sfx_cinematic_pulse.wav')} volume={0.5} /></Sequence>
          <Sequence from={50}><Audio src={staticFile('sfx_cinematic_pulse.wav')} volume={0.38} /></Sequence>
          <Sequence from={90}><Audio src={staticFile('sfx_cinematic_pulse.wav')} volume={0.32} /></Sequence>
          <Sequence from={130}><Audio src={staticFile('sfx_cinematic_pulse.wav')} volume={0.26} /></Sequence>
          <Scene05_AI />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 06 — Containerisation (245f / 8.2s) ── */}
        <TransitionSeries.Sequence durationInFrames={245}>
          <Audio src={staticFile('vo_scene06.mp3')} />
          <Sequence from={2}><Audio src={staticFile('sfx_appear.wav')} volume={0.65} /></Sequence>
          <Sequence from={25}><Audio src={staticFile('sfx_tick.wav')} volume={0.45} /></Sequence>
          <Scene06_Container />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 07 — Live Prototypes (250f / 8.3s) ── */}
        <TransitionSeries.Sequence durationInFrames={250}>
          <Audio src={staticFile('vo_scene07.mp3')} />
          {/* Soft appear as panels slide in from both sides */}
          <Sequence from={2}><Audio src={staticFile('sfx_appear.wav')} volume={0.6} /></Sequence>
          <Sequence from={12}><Audio src={staticFile('sfx_appear.wav')} volume={0.55} /></Sequence>
          <Scene07_Prototypes />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 08 — Engineering Power (146f / 4.9s) ── */}
        <TransitionSeries.Sequence durationInFrames={146}>
          <Audio src={staticFile('vo_scene08.mp3')} />
          <Sequence from={2}><Audio src={staticFile('sfx_appear.wav')} volume={0.6} /></Sequence>
          <Scene08_Code />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 09 — UK Impact (207f / 6.9s) ── */}
        <TransitionSeries.Sequence durationInFrames={207}>
          <Audio src={staticFile('vo_scene09.mp3')} />
          <Sequence from={2}><Audio src={staticFile('sfx_appear.wav')} volume={0.55} /></Sequence>
          {/* Cinematic pulse as each UK node lights up */}
          <Sequence from={18}><Audio src={staticFile('sfx_cinematic_pulse.wav')} volume={0.5} /></Sequence>
          <Sequence from={50}><Audio src={staticFile('sfx_cinematic_pulse.wav')} volume={0.4} /></Sequence>
          <Sequence from={82}><Audio src={staticFile('sfx_cinematic_pulse.wav')} volume={0.34} /></Sequence>
          <Sequence from={114}><Audio src={staticFile('sfx_cinematic_pulse.wav')} volume={0.28} /></Sequence>
          <Scene09_Impact />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 10 — ROI Growth (177f / 5.9s) ── */}
        <TransitionSeries.Sequence durationInFrames={177}>
          <Audio src={staticFile('vo_scene10.mp3')} />
          <Sequence from={2}><Audio src={staticFile('sfx_appear.wav')} volume={0.6} /></Sequence>
          <Sequence from={10}><Audio src={staticFile('sfx_chime.wav')} volume={0.6} /></Sequence>
          <Scene10_ROI />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 11 — Final Tagline (95f / 3.2s) ── */}
        <TransitionSeries.Sequence durationInFrames={95}>
          <Audio src={staticFile('vo_scene11.mp3')} />
          {/* Deep bass impact lands with the text */}
          <Sequence from={1}><Audio src={staticFile('sfx_impact.wav')} volume={0.8} /></Sequence>
          <Sequence from={22}><Audio src={staticFile('sfx_impact.wav')} volume={0.65} /></Sequence>
          <Scene11_Tagline />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* ── Scene 12 — Outro (280f / 9.3s) ── */}
        {/* VO: egaal_outro.mp3 (raw, no processing), brand sits 5-6s, then slides out with whoosh */}
        <TransitionSeries.Sequence durationInFrames={280}>
          <Audio src={staticFile('egaal_outro.mp3')} />
          <Sequence from={5}><Audio src={staticFile('sfx_outro.wav')} volume={0.7} /></Sequence>
          {/* Exit whoosh fires exactly when slide-out begins (frame 250) */}
          <Sequence from={250}><Audio src={staticFile('sfx_exit_whoosh.wav')} volume={0.75} /></Sequence>
          <Scene12_Outro />
        </TransitionSeries.Sequence>

      </TransitionSeries>
    </>
  );
};
