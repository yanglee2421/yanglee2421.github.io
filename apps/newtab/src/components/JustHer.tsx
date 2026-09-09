import bg from "@/assets/images/justHer.jpg";
import {
    Box,
    alpha
} from "@mui/material";
import { grey } from '@mui/material/colors';

const calculateAssetsHref = (path: string) => {
  return new URL(path, import.meta.url).href;
};

const bgImgHref = calculateAssetsHref(bg);


export const JustHer = ()=>{


    return          <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius(theme) {
            return theme.shape.borderRadius + "px";
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,

            backgroundImage: `url(${bgImgHref})`,
            backgroundPosition: "50%",
            backgroundSize: "150%",

            filter: "blur(15px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,

            backgroundColor: alpha(grey[700], 0.4),
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 3,

            display: "flex",
            alignItems: "center",

            height: 320,

            padding: 4,
          }}
        >
          <img src={bgImgHref} width={192} height={108} />
        </Box>
      </Box>
}