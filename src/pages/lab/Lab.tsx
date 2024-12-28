import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { type Container } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import { loadSlim } from "@tsparticles/slim";
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
import { CircleOutlined } from "@mui/icons-material";

type SortableItemProps = React.PropsWithChildren<{ id: number }>;

const SortableItem = (props: SortableItemProps) => {
  const sort = useSortable({ id: props.id });

  return (
    <ListItem
      ref={sort.setNodeRef}
      style={{
        transition: sort.transition,
        transform: CSS.Transform.toString(sort.transform),
      }}
      {...sort.attributes}
      {...sort.listeners}
      secondaryAction={
        <ListItemIcon>
          <CircleOutlined />
        </ListItemIcon>
      }
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

const snowPro = initParticlesEngine(async (engine) => {
  await loadBubblesPreset(engine);
  await loadSlim(engine);
});

const ParticlesUI = () => {
  React.use(snowPro);
  const particlesLoaded = async (container?: Container) => {
    console.log(container);
  };

  return (
    <Particles
      options={{
        preset: "bubbles",
        background: { opacity: 0 },
      }}
      particlesLoaded={particlesLoaded}
    />
  );
};

const Counter = () => {
  const [count, setCount] = React.useState(0);

  useTestEffect();

  return (
    <Button onClick={() => setCount((prev) => prev + 1)} variant="contained">
      {count}
    </Button>
  );
};

export const Lab = () => {
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
    <>
      <Stack spacing={6} sx={{ zIndex: 1, position: "relative" }}>
        <Card>
          <CardHeader title="Slider" />
          <CardContent>
            <Slider />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Camera" />
          <CardContent>
            <Camera id={id} />
          </CardContent>
          <CardActions>
            <Button onClick={handleCutImage} variant="contained">
              cut image
            </Button>
            <Counter />
          </CardActions>
        </Card>
        <Card>
          <CardHeader title="DnD" />
          <CardContent>
            <SortableDnd />
          </CardContent>
        </Card>
      </Stack>
      <ParticlesUI />
    </>
  );
};
