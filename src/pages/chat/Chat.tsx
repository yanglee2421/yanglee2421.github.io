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
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (msg === props.text) return;
    if (!props.text.startsWith(msg)) return;

    const timer = setTimeout(() => {
      setMsg((p) => props.text.slice(0, p.length + 1));
    }, 4);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, props.text]);

  return <Markdown code={msg} />;
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
    <Box>
      <Card>
        <CardHeader title="Chat" />
        <CardContent>
          {msgList.map((msg) => (
            <Box key={msg.id}>
              <Avatar variant="rounded">
                {msg.role.charAt(0).toLocaleUpperCase()}
              </Avatar>
              <MemoMessageContent text={msg.content} />
            </Box>
          ))}
        </CardContent>
        <CardActions>
          <Box sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <InputBase
                value={contentVal}
                onChange={(e) => setContentVal(e.target.value)}
                name="content"
                fullWidth
                multiline
                placeholder="Ask me something"
              />
              <Box sx={{ display: "flex" }}>
                <IconButton
                  type="button"
                  sx={(theme) => ({
                    backgroundColor: theme.palette.action.hover,
                    "&:hover": {
                      backgroundColor: theme.palette.action.selected,
                    },
                  })}
                >
                  <AddOutlined />
                </IconButton>
                <Box sx={{ marginInlineStart: "auto" }}></Box>
                <Sender
                  onAbortClick={() => {
                    controller.current?.abort();
                    setMsgList((d) => {
                      d.splice(-1, 1);
                    });
                  }}
                />
              </Box>
            </form>
          </Box>
        </CardActions>
      </Card>
    </Box>
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

type SenderProps = {
  onAbortClick(): void;
};

const Sender = (props: SenderProps) => {
  const fs = useFormStatus();

  return (
    <IconButton
      onClick={() => {
        if (!fs.pending) return;
        props.onAbortClick();
      }}
      type={fs.pending ? "button" : "submit"}
    >
      {fs.pending ? <StopOutlined /> : <SendOutlined />}
    </IconButton>
  );
};
