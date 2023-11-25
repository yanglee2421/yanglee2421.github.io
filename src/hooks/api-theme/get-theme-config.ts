// Assets Imports
import bgImg from "@/assets/images/snow-village.jpg";

export function getThemeConfig(): ThemeConfig {
  return {
    mode: "auto",
    bgImg,
    bgAlpha: 0,
    bgBlur: 0,
  };
}

export interface ThemeConfig {
  mode: "dark" | "light" | "auto";
  bgImg: string;
  bgAlpha: number;
  bgBlur: number;
}
