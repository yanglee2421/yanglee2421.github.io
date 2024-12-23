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
import { hightlighter } from "@/lib/hightlighter";

type MessageContentProps = {
  last: boolean;
  text: string;
};

const MessageContent = (props: MessageContentProps) => {
  const hgr = React.use(hightlighter);
  const timer = React.useRef(0);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (!props.last) return;

    if (msg === props.text) return;

    if (!props.text.startsWith(msg)) return;
    timer.current = setTimeout(() => {
      React.startTransition(() => {
        setMsg((p) => props.text.slice(0, p.length + 1));
      });
    }, 4);

    return () => clearTimeout(timer.current);
  }, [msg, props.text, props.last]);

  return (
    <Box
      sx={{
        "pre.shiki": {
          whiteSpace: "pre-wrap",
        },
      }}
      dangerouslySetInnerHTML={{
        __html: hgr.codeToHtml(props.last ? msg : props.text, {
          lang: "markdown",
          theme: "dark-plus",
        }),
      }}
    >
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
  React.use(hightlighter);
  const [msgList, setMsgList] = useImmer<Message[]>([]);
  const controller = React.useRef<AbortController | null>(null);

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

    const res = await fetch(
      "/v1/chat/completions",
      {
        signal: controller.current.signal,
        method: "POST",
        body: JSON.stringify({
          model: "4.0Ultra",
          messages: msgList.map((i) => ({
            role: i.role,
            content: i.content,
          })).concat([last]),
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
      },
    );

    const reader = res.body?.getReader();

    if (!reader) {
      return;
    }

    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      const decocded = decoder.decode(value, { stream: true });
      console.log(decocded);
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

      if (done) {
        break;
      }
    }
  };

  return (
    <Box>
      <Card>
        <CardHeader title="Chat" />
        <CardContent>
          {msgList.map((msg, i) => (
            <Box
              key={msg.id}
            >
              <Avatar>{msg.role}</Avatar>
              <MemoMessageContent
                last={i + 1 === msgList.length}
                text={msg.content}
              />
            </Box>
          ))}
        </CardContent>
        <CardActions>
          <Box sx={{ width: "100%" }}>
            <form
              onSubmit={handleSubmit}
            >
              <InputBase
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
