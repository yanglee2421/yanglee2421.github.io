import { Box, Button, Divider, TextField, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatepicker from "react-datepicker";
import bgImg from "@/assets/images/justHer.jpg";
import { ScrollView } from "@/components/ui/ScrollView";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { JsonBlock } from "./JsonBlock";

export function Home() {
  const authValue = useAuthStore();

  const [date, setDate] = React.useState<[Date | null, Date | null]>(() => {
    const firstDate = new Date();
    const secondDate = new Date();
    secondDate.setDate(firstDate.getDate() + 7);

    return [firstDate, secondDate];
  });

  return (
    <Box>
      <Button
        onClick={() => {
          authValue.value.auth.signOut();
        }}
        color="error"
        variant="contained"
      >
        sign out
      </Button>
      <Divider>Component</Divider>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
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
        ></Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,

            backgroundColor: alpha(grey[700], 0.4),
          }}
        ></Box>
        <Box
          sx={{
            position: "relative",
            zIndex: 3,

            display: "flex",
            alignItems: "center",

            height: 320,
          }}
        >
          <img src={bgImgHref} width={192} height={108} />
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <ScrollView>
          <JsonBlock />
        </ScrollView>
      </Box>
      <ReactDatepicker
        selected={date[0]}
        startDate={date[0]}
        endDate={date[1]}
        onChange={(date) => {
          setDate(date);
        }}
        customInput={<TextField label="Datepicker" fullWidth />}
        selectsRange
        monthsShown={2}
        minDate={(() => {
          if (date.every(Boolean)) {
            return void 0;
          }

          return date[0];
        })()}
        maxDate={(() => {
          if (date.every(Boolean)) {
            return void 0;
          }

          const firstDate = date[0];

          if (!firstDate) {
            return void 0;
          }

          return new Date(firstDate.getTime() + 1000 * 60 * 60 * 24 * 60);
        })()}
      />
    </Box>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;
