import { Scroll } from "@/components/scroll";
import { Box } from "@mui/material";
import * as RadixScroll from "@radix-ui/react-scroll-area";

export const Component = () => {
  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
    >
      <Box sx={{ border: "1px solid #ccc", width: 300, height: 600 }}>
        <Scroll />
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          width: 300,
          height: 600,
          overflow: "auto",
        }}
      >
        <Box width={1000} height={10000}></Box>
      </Box>
      <Box sx={{ border: "1px solid #ccc", width: 300, height: 600 }}>
        <RadixScroll.Root
          type="always"
          style={{ inlineSize: "100%", blockSize: "100%" }}
        >
          <RadixScroll.Viewport
            style={{ inlineSize: "100%", blockSize: "100%" }}
          >
            <Box width={1000} height={10000}></Box>
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
