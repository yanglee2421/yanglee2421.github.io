import { styled, Box, Button } from "@mui/material";
import { TouchAppOutlined } from "@mui/icons-material";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { LangToggle } from "@/components/shared/LangToggle";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <Header>
        <Box sx={{ marginInlineStart: "auto" }}></Box>
        <LangToggle />
        <ModeToggle />
      </Header>
      <Button
        variant="contained"
        size="large"
        startIcon={<TouchAppOutlined />}
        component={Link}
        to={"/dashboard"}
      >
        get started
      </Button>
    </>
  );
}

const Header = styled("header")(({ theme: t }) => ({
  display: "flex",
  gap: 3,

  paddingInline: t.spacing(5),
  paddingBlock: t.spacing(2),
}));

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
