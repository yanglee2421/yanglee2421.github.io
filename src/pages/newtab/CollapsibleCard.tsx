import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@mui/material";
import React from "react";

export function CollapsibleCard(props: Props) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Card>
      <CardHeader
        title={props.title}
        titleTypographyProps={{
          variant: "h6",
          textTransform: "uppercase",
        }}
        subheader={props.subheader}
        subheaderTypographyProps={{
          variant: "subtitle2",
          fontWeight: 400,
          color: "InactiveCaptionText",
        }}
        action={
          <IconButton
            onClick={() => {
              setCollapsed((p) => !p);
            }}
          >
            {collapsed ? <AddOutlined /> : <RemoveOutlined />}
          </IconButton>
        }
      />
      <Collapse in={!collapsed}>
        <CardContent>{props.children}</CardContent>
      </Collapse>
    </Card>
  );
}

type Props = {
  children: React.ReactNode;
  title: React.ReactNode;
  subheader: React.ReactNode;
};
