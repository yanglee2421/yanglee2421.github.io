import React from "react";
import { CodeBlock } from "./CodeBlock";

export function ChatStream() {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const sse = new EventSource("/dev/stream");
    sse.onopen = () => {
      console.log("open");
    };
    sse.onerror = (evt) => {
      console.error(evt);
      sse.close();
    };
    sse.onmessage = (evt) => {
      console.log(evt);

      React.startTransition(() => {
        setText((prev) => prev + evt.data);
      });
    };

    return () => {
      sse.close();
    };
    // const controller = new AbortController();
    // const textDecoder = new TextDecoder();

    // void (async () => {
    //   const res = await fetch("/dev/stream", { signal: controller.signal });
    //   const reader = res.body?.getReader();

    //   while (reader) {
    //     const data = await reader.read();

    //     if (data.done) {
    //       break;
    //     }

    //     React.startTransition(() => {
    //       setText((prev) => prev + textDecoder.decode(data.value));
    //     });
    //   }
    // })();

    // return () => {
    //   controller.abort();
    // };
  }, [setText]);

  return <CodeBlock markdown={text} />;
}
