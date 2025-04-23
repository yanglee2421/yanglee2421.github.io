import { Scroll } from "@/components/scroll";
import { Box } from "@mui/material";
import * as RadixScroll from "@radix-ui/react-scroll-area";

export const Component = () => {
  return (
    <Box>
      <Box sx={{ border: "1px solid #ccc", width: 300, height: 300 }}>
        <Scroll />
      </Box>
      <Box sx={{ border: "1px solid #ccc", width: 300, height: 300 }}>
        <RadixScroll.Root
          type="always"
          style={{ inlineSize: "100%", blockSize: "100%" }}
        >
          <RadixScroll.Viewport
            style={{ inlineSize: "100%", blockSize: "100%" }}
          >
            <Box width={2000} height={2000}></Box>
          </RadixScroll.Viewport>
          <RadixScroll.Scrollbar
            orientation="horizontal"
            style={{ height: 20 }}
          >
            <RadixScroll.Thumb
              style={{ backgroundColor: "green", height: "100%" }}
            ></RadixScroll.Thumb>
          </RadixScroll.Scrollbar>
          <RadixScroll.Scrollbar orientation="vertical" style={{ width: 20 }}>
            <RadixScroll.Thumb
              style={{ backgroundColor: "green", width: "100%" }}
            ></RadixScroll.Thumb>
          </RadixScroll.Scrollbar>
          <RadixScroll.Corner></RadixScroll.Corner>
        </RadixScroll.Root>
      </Box>
    </Box>
  );
};
