import { SendOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
} from "@mui/material";
import React from "react";
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

const getContent = (data: string) => {
  try {
    const json = JSON.parse(data.replace("data: ", ""));
    return json.choices[0].delta.content;
  } catch {
    return "";
  }
};

export const Chat = () => {
  const [question, setQuestion] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const controller = React.useRef<AbortController | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const chatLogRef = React.useRef<HTMLDivElement>(null);

  const [msgList, setMsgList] = useImmer<Message[]>([]);

  const handleScrollToBottom = React.useCallback(() => {
    chatLogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  React.useEffect(() => {
    handleScrollToBottom();
  }, [handleScrollToBottom]);

  const updateChatLog = (buf: string) => {
    setMsgList((d) => {
      const last = d[d.length - 1];
      if (!last) return;

      if (last.role === "assistant") {
        last.content = buf
          .split("data:")
          .map((i) => getContent(i))
          .filter(Boolean)
          .join("");
      } else {
        d.push({
          id: crypto.randomUUID(),
          time: Date.now(),
          role: "assistant",
          content: "",
        });
      }
    });
  };

  const sendRequest = async () => {
    controller.current = new AbortController();

    const res = await fetch("/v1/chat/completions", {
      signal: controller.current?.signal,
      method: "POST",
      body: JSON.stringify({
        model: "4.0Ultra",
        messages: msgList
          .map((i) => ({
            role: i.role,
            content: i.content,
          }))
          .concat({
            role: "user",
            content: question,
          }),
        stream: true,
        tools: [
          {
            type: "web_search",
            web_search: {
              enable: true,
            },
          },
        ],
      }),
      headers: {
        Authorization: "Bearer rCJALwydCHKaiiBolPGv:gxneLXlgwLjQQcsNnnEW",
      },
    });

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No reader");

    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buf += decoder.decode(value, { stream: true });
      updateChatLog(buf);
    }

    buf += decoder.decode();
    updateChatLog(buf);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!question) return;

    setQuestion("");
    setMsgList((d) => {
      d.push({
        id: crypto.randomUUID(),
        time: Date.now(),
        role: "user",
        content: question,
      });
      d.push({
        id: crypto.randomUUID(),
        time: Date.now(),
        role: "assistant",
        content: "Loading...",
      });
    });

    requestAnimationFrame(() => {
      chatLogRef.current?.lastElementChild?.previousElementSibling?.scrollIntoView(
        {
          behavior: "smooth",
          block: "start",
        },
      );
    });

    setLoading(true);
    await sendRequest().catch(() => {
      setMsgList((d) => {
        const last = d[d.length - 1];
        if (!last) return;
        if (last.role === "assistant") {
          last.content = "Failed to connect to the server";
        }
      });
    });
    setLoading(false);
  };

  return (
    <Box
      data-contentfixed
      sx={{
        height: "100%",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 5,
      }}
    >
      <Box
        sx={{
          flex: 1,
          minBlockSize: 0,
          overflowY: "auto",
          scrollbarColor: (t) => t.palette.action.disabled + " transparent",
        }}
      >
        <Container
          ref={chatLogRef}
          maxWidth="md"
          sx={{
            "&::before,&::after": {
              content: '""',
              display: "table",
              clear: "both",
            },
          }}
        >
          {msgList.map((i) => (
            <Box
              key={i.id}
              sx={{
                "&:last-child": {
                  minBlockSize: "calc(100dvh - 200px)",
                },
              }}
            >
              <MemoMessageContent text={i.content} />
            </Box>
          ))}
        </Container>
      </Box>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Container maxWidth="md">
          <TextField
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything"
            multiline
            fullWidth
            onFocus={handleScrollToBottom}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (e.ctrlKey) return;

              formRef.current?.requestSubmit();
              e.preventDefault();
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <Button
                    variant="contained"
                    endIcon={
                      loading ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <SendOutlined
                          sx={{
                            transform: "rotate(-45deg)",
                          }}
                        />
                      )
                    }
                    type="submit"
                    disabled={loading}
                  >
                    Send
                  </Button>
                ),
              },
            }}
          />
        </Container>
      </form>
    </Box>
  );
};
