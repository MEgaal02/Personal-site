import { loadFont as loadSyne } from '@remotion/google-fonts/Syne';
import { loadFont as loadOutfit } from '@remotion/google-fonts/Outfit';

export const { fontFamily: SYNE } = loadSyne('normal', {
  weights: ['700', '800'],
  subsets: ['latin'],
});

export const { fontFamily: OUTFIT } = loadOutfit('normal', {
  weights: ['400', '500', '600'],
  subsets: ['latin'],
});
