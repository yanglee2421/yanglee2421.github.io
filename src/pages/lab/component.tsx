import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Box,
  alpha,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Camera } from "@/components/shared/Camera";
import { Slider } from "./Slider";
import { useTestEffect } from "@/hooks/useTestEffect";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragIndicatorOutlined } from "@mui/icons-material";
import bg from "@/assets/images/justHer.jpg";

const bgImgHref = new URL(bg, import.meta.url).href;

const WebSocketCard = () => {
  const [data, setData] = React.useState("");
  const [input, setInput] = React.useState("");

  const ref = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const connect = () => {
      ref.current = new WebSocket("ws://localhost:8080");

      ref.current.addEventListener("open", () => {}, controller);
      ref.current.addEventListener(
        "close",
        async () => {
          connect();
        },
        controller,
      );
      ref.current.addEventListener(
        "message",
        (e) => {
          setData(String(e.data));
        },
        controller,
      );
      ref.current.addEventListener("error", () => {}, controller);
    };

    connect();

    return () => {
      controller.abort();
      ref.current?.close();
      ref.current = null;
    };
  }, [setData]);

  return (
    <Card>
      <CardHeader title="WebSocket" subheader={data || "Placeholder"} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            ref.current?.send(input);
          }}
        >
          send
        </Button>
        <Button>reset</Button>
      </CardActions>
    </Card>
  );
};

type SortableItemProps = React.PropsWithChildren<{ id: number }>;

const SortableItem = (props: SortableItemProps) => {
  const sort = useSortable({ id: props.id });

  return (
    <ListItem
      style={{
        transition: sort.transition,
        transform: CSS.Transform.toString(sort.transform),
      }}
      sx={{
        boxShadow: (t) => (sort.isDragging ? t.shadows[1] : t.shadows[0]),
        backgroundColor: (t) =>
          sort.isDragging ? t.palette.background.paper : void 0,
        borderRadius: (t) =>
          sort.isDragging ? t.shape.borderRadius / 2 : void 0,
        position: "relative",
        zIndex: (t) => (sort.isDragging ? t.zIndex.speedDial : void 0),
        touchAction: "none",
        cursor: "pointer",
      }}
      secondaryAction={
        <ListItemIcon>
          <DragIndicatorOutlined />
        </ListItemIcon>
      }
      ref={sort.setNodeRef}
      {...sort.attributes}
      {...sort.listeners}
    >
      {props.children}
    </ListItem>
  );
};

const SortableDnd = () => {
  const [items, setItems] = React.useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e) => {
        setItems((items) => {
          if (!e.over) return items;

          if (e.active.id === e.over.id) {
            return items;
          }

          const oldIndex = items.indexOf(+e.active.id);
          const newIndex = items.indexOf(+e.over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <List>
          {items.map((i) => (
            <SortableItem key={i} id={i}>
              <ListItemAvatar>
                <Avatar>{i}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={i} secondary="sec" />
            </SortableItem>
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

const ChildEffect = () => {
  useTestEffect("child");
  return null;
};

const Counter = () => {
  const [count, setCount] = React.useState(0);

  useTestEffect("parent");
  useTestEffect("parent 2");

  return (
    <Button onClick={() => setCount((prev) => prev + 1)}>
      {count}
      <ChildEffect />
    </Button>
  );
};

export const Component = () => {
  const id = React.useId();

  const handleCutImage = () => {
    const video = document.getElementById(id);

    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    const cvs = document.createElement("canvas");
    const ctx = cvs.getContext("2d");
    if (!ctx) {
      return;
    }

    const size = video.getBoundingClientRect();
    cvs.width = size.width;
    cvs.height = size.height;
    ctx.drawImage(
      video,
      0,
      0,
      size.width,
      size.height,
      0,
      0,
      cvs.width,
      cvs.height,
    );

    const link = document.createElement("a");
    link.href = cvs.toDataURL();
    link.download = Date.now() + ".png";
    link.click();
    link.remove();
  };

  return (
    <Stack spacing={3}>
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

      <Card>
        <CardHeader title="Slider" subheader=" slider input" />
        <CardContent>
          <Slider />
          <input type="range" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Camera" subheader="Camera" />
        <CardContent>
          <Camera id={id} />
        </CardContent>
        <CardActions>
          <Button onClick={handleCutImage}>cut image</Button>
          <Counter />
        </CardActions>
      </Card>
      <Card>
        <CardHeader title="DnD" subheader="Drag and drop" />
        <CardContent>
          <SortableDnd />
        </CardContent>
      </Card>
      <WebSocketCard />
      <Card>
        <CardContent>
          <div
            onClick={async (e) => {
              const el = e.currentTarget;
              const view = document.startViewTransition(() => {
                el.style.height = 100 * 3 * Math.random() + "px";
              });
              await view.ready;
              await view.finished;
            }}
          >
            click me
          </div>
        </CardContent>
      </Card>
    </Stack>
  );
};
