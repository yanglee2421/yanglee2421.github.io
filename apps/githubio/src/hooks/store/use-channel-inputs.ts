import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Gate {
  x: number;
  y: number;
  width: number;
}

interface Channel {
  id: string;
  name: string;
  gates: Gate[];
}

interface ChannelInputs {
  open: boolean;
  interval: number;
  channels: Channel[];
}

export const useChannelInputs = create<ChannelInputs>()(
  immer(() => {
    return {
      open: false,
      interval: 64,
      channels: [
        {
          id: "0-1",
          name: "左穿",
          gates: [
            {
              id: 0,
              width: 0,
              x: 0,
              y: 0,
            },
            {
              id: 1,
              width: 0,
              x: 0,
              y: 0,
            },
          ],
        },
        {
          id: "0-2",
          name: "左A1",
          gates: [],
        },
        {
          id: "1-1",
          name: "右穿",
          gates: [],
        },
      ],
    };
  }),
);
