import { Box, Button, Divider, Grid, TextField, styled } from "@mui/material";
import React from "react";
import ReactDatepicker from "react-datepicker";
import "@/assets/scss/datepicker.scss";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { Datepicker } from "./Datepicker";
import { JsonBlock } from "./JsonBlock";
import { ScrollArea } from "./ScrollArea";

export function Home() {
  const authValue = useAuthStore();

  const [date, setDate] = React.useState<[Date | null, Date | null]>([
    firstDate,
    secondDate,
  ]);

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
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Datepicker />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatepickerWrapper>
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
          </DatepickerWrapper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ width: 300, height: 600, border: "1px red solid" }}>
            <ScrollArea>
              <Box width={1000} height={2000}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                magni itaque velit rem esse at placeat provident sed! Eaque
                dolor nisi tempore, voluptatum laudantium fuga velit eum
                pariatur eos nam? Iste, optio sint. Officia maiores neque
                distinctio fugit optio suscipit. Nulla, quisquam cumque porro
                voluptates quae, ullam nostrum maiores dolor accusantium
                recusandae autem, libero minima possimus omnis! Molestiae, eaque
                animi! Maiores ab nesciunt nihil laboriosam magni corporis
                tempore nulla suscipit, omnis officia id pariatur. A, eius
                accusantium. Impedit similique soluta sequi dolores quas
                suscipit natus, magnam dolorum voluptas autem quia.
              </Box>
            </ScrollArea>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <JsonBlock />
        </Grid>
      </Grid>
    </Box>
  );
}

const firstDate = new Date();
const secondDate = new Date();
secondDate.setDate(firstDate.getDate() + 7);

const DatepickerWrapper = styled("div")(({ theme }) => {
  return {
    display: "block",
    padding: 0,
    border: 0,

    ".react-datepicker__input-container": {
      position: "relative",
    },

    ".react-datepicker-popper": {
      zIndex: 1,
      lineHeight: 0,
    },

    ".react-datepicker": {
      position: "relative",
      display: "inline-block",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
      lineHeight: "initial",
    },

    ".react-datepicker__month-container": {
      float: "left",
    },

    ".react-datepicker__header": {
      position: "relative",
      paddingBlock: 8,
      paddingInline: 0,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
      textAlign: "center",
    },

    ".react-datepicker__current-month": {},

    ".react-datepicker__day--selected,.react-datepicker__day--in-selecting-range,.react-datepicker__day--in-range,.react-datepicker__month-text--selected,.react-datepicker__month-text--in-selecting-range,.react-datepicker__month-text--in-range,.react-datepicker__quarter-text--selected,.react-datepicker__quarter-text--in-selecting-range,.react-datepicker__quarter-text--in-range,.react-datepicker__year-text--selected,.react-datepicker__year-text--in-selecting-range,.react-datepicker__year-text--in-range":
      {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: theme.shape.borderRadius,
      },

    ".react-datepicker__week": {
      whiteSpace: "nowrap",
    },

    ".react-datepicker-popper .react-datepicker__triangle": {
      display: "none",
    },
  };
});
