import { styled } from "@mui/material";
import type { Engine } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const StyledParticles = styled(Particles)({
  position: "relative",
  zIndex: -1,
});

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
  await loadBubblesPreset(engine);
  await loadBigCirclesPreset(engine);
};

interface ParticlesUIProps {
  preset: string;
}

export const ParticlesUI = (props: ParticlesUIProps) => {
  return (
    <ParticlesProvider init={init}>
      <StyledParticles
        options={{
          preset: props.preset,
          background: { opacity: 0 },
        }}
      />
    </ParticlesProvider>
  );
};
