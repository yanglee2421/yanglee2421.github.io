export function onAnimationFrame(cb: () => void) {
  let animate = 0;

  const run = () => {
    animate = requestAnimationFrame(run);
    cb();
  };

  run();

  return () => cancelAnimationFrame(animate);
}

export const android_ripple = (color: string) => ({
  color,
  foreground: true,
  borderless: false,
});

export const modeToIsDark = (
  mode: "dark" | "light" | "system",
  inDark: boolean,
) => {
  switch (mode) {
    case "dark":
      return true;
    case "light":
      return false;
    case "system":
    default:
      return inDark;
  }
};
