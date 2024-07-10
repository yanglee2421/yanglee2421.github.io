import { Box, Divider, Grid, Paper, Stack, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import bgImg from "@/assets/images/justHer.jpg";
import { ScrollView } from "@/components/ui/ScrollView";
import { AsyncStore } from "./AyncStore";
import { Calendar } from "./Calendar";
import { Countdown } from "./Countdown";
import { InputNumber } from "./InputNumber";
import { RollCard } from "./RollCard";
import { TipTap } from "./TipTap";

export function Home() {
  const [number, setNumber] = React.useState(Number.NaN);

  const ref = React.useRef<HTMLElement>(null);

  const [html, setHtml] = React.useState("<p>hello world</p>");

  return (
    <Grid container spacing={{ xs: 3, md: 4 }}>
      <Grid item xs={12}>
        <Box
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
      </Grid>

      <Grid item xs={12}>
        <Calendar />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <RollCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Countdown />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={3}>
            <InputNumber
              value={number}
              onChange={setNumber}
              step={1}
              min={1}
              max={100}
            />
            <AsyncStore />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          {(() => {
            const headerText = 'attachment;  filename="filename.jpg"';

            const reg = /^attachment;( *)filename="(?<filename>.+)"$/;

            return reg.exec(headerText)?.groups?.filename;
          })()}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box
          ref={ref}
          sx={{
            overflow: "auto",
            width: "25dvw",
            height: 100,
            border: "1px red solid",
          }}
        >
          <Box
            sx={{
              width: 150,
            }}
          ></Box>
        </Box>
        <hr />
        <Box
          sx={{
            width: "25dvw",
            height: 100,
            border: "1px red solid",
          }}
        >
          <ScrollView>
            <Box
              sx={{
                width: 150,
              }}
            ></Box>
          </ScrollView>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TipTap value={html} onChange={() => {}} />
        <Divider />
        <TipTap value={html} onChange={setHtml} />
      </Grid>
    </Grid>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;
