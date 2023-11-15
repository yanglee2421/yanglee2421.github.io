export const eventsMap = new Map<string, EventQuery>();
eventsMap.set("VSR - Clicks", {
  order: 0,
  type: "events",
  id: "$pageview",
  name: "VSR - Clicks",
  math: "total",
  properties: [
    {
      key: "$current_url",
      value: "vsr_click",
      operator: "icontains",
      type: "event",
    },
  ],
});
eventsMap.set("VSR - View", {
  order: 1,
  type: "events",
  id: "WarpDrivenVSRView",
  name: "VSR - View",
  math: "total",
});
eventsMap.set("VSR - Add to cart", {
  order: 2,
  type: "events",
  id: "$autocapture",
  name: "VSR - Add to cart",
  math: "total",
  properties: [
    {
      key: "$el_text",
      value: "Add to cart",
      operator: "icontains",
      type: "event",
    },
  ],
});
eventsMap.set("VSR - Checkout", {
  order: 3,
  type: "events",
  id: "$autocapture",
  name: "VSR - Checkout",
  math: "total",
  properties: [
    {
      key: "$el_text",
      value: "Checkout",
      operator: "icontains",
      type: "event",
    },
  ],
});

interface EventQuery {
  order: number;
  type: string;
  id: string;
  name: string;
  math: string;
  properties?: Property[];
}

interface Property {
  key: string;
  value: string;
  operator: string;
  type: string;
}
