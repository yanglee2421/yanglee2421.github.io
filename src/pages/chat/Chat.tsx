import { AddOutlined, SendOutlined, StopOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
} from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";
import { useImmer } from "use-immer";
import { Markdown } from "@/components/markdown";

type MessageContentProps = {
  text: string;
};

const MessageContent = (props: MessageContentProps) => {
  return (
    <Box
      sx={{
        "& pre.shiki": {
          whiteSpace: "pre-wrap",
        },
      }}
    >
      <Markdown code={props.text} />
    </Box>
  );
};

const MemoMessageContent = React.memo(MessageContent);

type Message = {
  id: string;
  role: string;
  content: string;
  time: number;
};

export const Chat = () => {
  const [contentVal, setContentVal] = React.useState("");

  const controller = React.useRef<AbortController | null>(null);

  const [msgList, setMsgList] = useImmer<Message[]>([]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    controller.current = new AbortController();
    const fd = new FormData(e.currentTarget);
    const question = fd.get("content") as string;

    const last = {
      id: crypto.randomUUID(),
      time: Date.now(),
      role: "user",
      content: question,
    };

    setMsgList((d) => {
      d.push(last);
      d.push({
        id: crypto.randomUUID(),
        time: Date.now(),
        role: "assistant",
        content: "",
      });
    });
    setContentVal("");

    const res = await fetch("/v1/chat/completions", {
      signal: controller.current.signal,
      method: "POST",
      body: JSON.stringify({
        model: "4.0Ultra",
        messages: msgList
          .map((i) => ({
            role: i.role,
            content: i.content,
          }))
          .concat([last]),
        stream: true,
        tools: [
          {
            type: "web_search",
            web_search: {
              enable: false,
            },
          },
        ],
      }),
      headers: {
        Authorization: "Bearer rCJALwydCHKaiiBolPGv:gxneLXlgwLjQQcsNnnEW",
      },
    });

    const reader = res.body?.getReader();

    if (!reader) {
      return;
    }

    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      const decocded = decoder.decode(value, { stream: true });
      buf += decocded;

      setMsgList((d) => {
        const last = d[d.length - 1];
        if (!last) return;
        last.content = buf
          .split("data:")
          .map((i) => getContent(i))
          .filter(Boolean)
          .join("");
      });
    }
  };

  return (
    <Box
      data-contentfixed
      sx={{ height: "100%", position: "relative", zIndex: 1 }}
    ></Box>
  );
};

const getContent = (data: string) => {
  try {
    const json = JSON.parse(data.replace("data: ", ""));
    return json.choices[0].delta.content;
  } catch {
    return "";
  }
};
