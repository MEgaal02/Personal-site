import "./index.css";
import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EgaalPromo"
        component={PromoVideo}
        durationInFrames={2378}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
