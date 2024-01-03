// MUI Imports
import {
  styled,
  Box,
  Button,
  IconButton,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

// React Imports
import React from "react";

export function Swiper() {
  const ulRef = React.useRef<HTMLUListElement>(null);

  const handlePrevClick = () => {
    const rootStyle = globalThis.getComputedStyle(document.documentElement);
    ulRef.current?.scrollBy({
      left: -25 * Number.parseInt(rootStyle.fontSize),
      behavior: "smooth",
    });
  };

  const handleNextClick = () => {
    const rootStyle = globalThis.getComputedStyle(document.documentElement);
    ulRef.current?.scrollBy({
      left: 25 * Number.parseInt(rootStyle.fontSize),
      behavior: "smooth",
    });
  };

  const count = 5;
  const liEl = (() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(i);
    }

    return list.map((item) => <li key={item}>{item}</li>);
  })();

  const dotEl = (() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(i);
    }

    return list.map((item) => {
      const handleDotClick = () => {
        const rootStyle = globalThis.getComputedStyle(document.documentElement);
        const el = ulRef.current;

        el?.scroll({
          left: item * 25 * Number.parseInt(rootStyle.fontSize),
          behavior: "smooth",
        });
      };

      return (
        <Button key={item} onClick={handleDotClick}>
          dix-{item}
        </Button>
      );
    });
  })();

  return (
    <Card>
      <CardHeader title="Swiper"></CardHeader>
      <CardContent>
        <Box flex={1}>
          <UlStyled ref={ulRef}>{liEl}</UlStyled>
          <IconButton onClick={handlePrevClick}>
            <ArrowBackIosNewRounded />
          </IconButton>
          <IconButton onClick={handleNextClick}>
            <ArrowForwardIosRounded />
          </IconButton>
          <ButtonGroup>{dotEl}</ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
}

const UlStyled = styled("ul")(({ theme }) => {
  return {
    listStyle: "none",
    overflow: "hidden",
    scrollSnapType: "x mandatory",

    display: "flex",
    width: "25rem",
    padding: 0,
    // border: "blue dashed",
    margin: 0,

    "& > li": {
      scrollSnapStop: "always",
      scrollSnapAlign: "start",

      flex: "0 0 25rem",
      height: 100,
      padding: 0,
      border: "1px red dashed",
      margin: 0,
    },
    [theme.breakpoints.down("md")]: {
      overflow: "auto",
    },
  };
});
