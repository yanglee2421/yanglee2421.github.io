import { styled } from "@mui/material";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React from "react";

const StyledParticles = styled(Particles)({
  position: "relative",
  zIndex: -1,
});

const snowPro = initParticlesEngine(async (engine) => {
  await loadBubblesPreset(engine);
  await loadBigCirclesPreset(engine);
  await loadSlim(engine);
});

type ParticlesUIProps = {
  preset: string;
};

export const ParticlesUI = (props: ParticlesUIProps) => {
  React.use(snowPro);

  return (
    <StyledParticles
      options={{
        preset: props.preset,
        background: { opacity: 0 },
      }}
    />
  );
};
