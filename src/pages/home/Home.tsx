import React from "react";
import bgImg from "@/assets/images/justHer.jpg";
import { AsyncStore } from "./AyncStore";
import { Calendar } from "./Calendar";
import { Countdown } from "./Countdown";
import { InputNumber } from "./InputNumber";
import { RollCard } from "./RollCard";
import { TipTap } from "./TipTap";

export function Home() {
  const [number, setNumber] = React.useState(Number.NaN);

  const [html, setHtml] = React.useState("<p>hello world</p>");

  return (
    <Grid container spacing={{ xs: 3, md: 4 }}>
      <Grid size={12}>
        <Typography variant="h4">ApexCharts</Typography>
        <Typography>
          <code>react-apexcharts</code> is a third-party library. Please refer
          to its{" "}
          <Link href="https://apexcharts.com" target="_blank">
            official documentation
          </Link>{" "}
          for more details.
        </Typography>
      </Grid>
      <Grid size={12}>
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

      <Grid size={12}>
        <Calendar />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <RollCard />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Countdown />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
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
      <Grid size={12}>
        <Card>
          <CardHeader title="read only" />
          <CardContent>
            <TipTap value={html} onChange={() => {}} />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={12}>
        <Card>
          <CardHeader title="editable" />
          <CardContent>
            <TipTap value={html} onChange={setHtml} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;

const columns = 12;
const gutter = 20;
const width = 1200;
const perColumnsWidth = (width - (columns - 1) * gutter) / columns;
const c = 4;
const blockWidth = c * perColumnsWidth + (c - 1) * gutter;

function getWidthOfUnknowColumns(c: number) {
  return (width * c) / columns - (columns - c) * (gutter / columns);
}

console.log(blockWidth, Object.is(blockWidth, getWidthOfUnknowColumns(4)));
