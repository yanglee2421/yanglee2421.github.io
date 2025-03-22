import { SendOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import { useImmer } from "use-immer";
import { Markdown } from "@/components/markdown";

const MemoMarkdown = React.memo(Markdown);

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
      <MemoMarkdown code={props.text} />
    </Box>
  );
};

const MemoMessageContent = React.memo(MessageContent);

type ChatLogItemProps = {
  i: Message;
  enableScroll?: boolean;
};

const ChatLogItem = ({ i, enableScroll }: ChatLogItemProps) => {
  const questionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!enableScroll) return;

    const timer = requestAnimationFrame(() => {
      questionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [enableScroll]);

  const renderAnswer = () => {
    if (i.error) {
      return (
        <Alert severity="error" variant="filled">
          <AlertTitle>Error</AlertTitle>
          {i.error}
        </Alert>
      );
    }

    return <MemoMessageContent text={i.answer} />;
  };

  return (
    <>
      <Box
        ref={questionRef}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Paper sx={{ padding: 3, bgcolor: (t) => t.palette.primary.main }}>
          {i.question}
        </Paper>
      </Box>
      <Box
        sx={{
          "&:last-child": {
            minBlockSize: "calc(100dvh - 200px)",
          },
        }}
      >
        {renderAnswer()}
      </Box>
    </>
  );
};

const MemoChatLogItem = React.memo(ChatLogItem);

type Message = {
  id: string;
  question: string;
  answer: string;
  error?: React.ReactNode;
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
    const content = buf
      .split("data:")
      .map((i) => getContent(i))
      .filter(Boolean)
      .join("");

    setMsgList((d) => {
      const last = d[d.length - 1];
      if (!last) return;

      last.answer = content;
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
          .flatMap((i) => [
            { role: "user", content: i.question },
            { role: "assistant", content: i.answer },
          ])
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

    if (!res.ok) throw new Error("Failed to connect to the server");
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
        question: question,
        answer: "Loading...",
      });
    });

    setLoading(true);
    await sendRequest().catch((error) => {
      console.warn(error);

      setMsgList((d) => {
        const last = d[d.length - 1];
        if (!last) return;
        last.error = error.message || "Failed to connect to the server";
      });
    });
    setLoading(false);
  };

  const renderSendButton = () => {
    if (loading) {
      return (
        <Button
          variant="contained"
          endIcon={<CircularProgress size={16} color="inherit" />}
          type="button"
          onClick={() => {
            controller.current?.abort();
          }}
        >
          Send
        </Button>
      );
    }

    return (
      <Button
        variant="contained"
        endIcon={
          <SendOutlined
            sx={{
              transform: "rotate(-45deg)",
            }}
          />
        }
        type="submit"
      >
        Send
      </Button>
    );
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
            "&>*+*": {
              marginTop: 2,
            },
          }}
        >
          {msgList.map((i, idx) => (
            <MemoChatLogItem
              key={i.id}
              i={i}
              enableScroll={Object.is(idx + 1, msgList.length)}
            />
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
                endAdornment: renderSendButton(),
              },
            }}
          />
        </Container>
      </form>
    </Box>
  );
};
