// MUI Imports
import { Box } from "@mui/material";

// React Imports
import ReactDOM from "react-dom";

// Query Imports
import { useBgImgQuery } from "@/hooks/api-localforage";

// Store Imports
import { useThemeStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";

export function GlobalBg() {
  const query = useBgImgQuery();

  const themeStore = useThemeStore(
    useShallow((store) => {
      return {
        bgAlpha: store.bgAlpha,
        bgBlur: store.bgBlur,
      };
    })
  );

  return ReactDOM.createPortal(
    <Box
      position={"fixed"}
      zIndex={-1}
      sx={{
        inset: 0,
        backgroundImage: `url(${query.data})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        filter: `blur(${20 * (themeStore.bgBlur / 100)}px)`,
        transition(theme) {
          return theme.transitions.create(["filter"]);
        },
      }}
    >
      <Box
        position={"absolute"}
        bgcolor={`rgba(0,0,0,${themeStore.bgAlpha / 100})`}
        sx={{
          inset: 0,
          transition(theme) {
            return theme.transitions.create(["background-color"]);
          },
        }}
      ></Box>
    </Box>,
    document.body
  );
}

export interface GlobalBgProps {
  bgImg: string;
  bgAlpha: number;
  bgBlur: number;
  loading: boolean;
}
