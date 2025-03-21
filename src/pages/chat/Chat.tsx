import { SendOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
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

export const Chat = () => {
  const [question, setQuestion] = React.useState("");

  const controller = React.useRef<AbortController | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [msgList, setMsgList] = useImmer<Message[]>([]);

  const handleScrollToBottom = React.useCallback(() => {
    scrollRef.current?.scroll({
      behavior: "smooth",
      top: scrollRef.current.scrollHeight,
    });
  }, []);

  React.useEffect(() => {
    handleScrollToBottom();
  }, [handleScrollToBottom]);

  const handleChatChange = (buf: string) => {
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    controller.current = new AbortController();

    const last = {
      id: crypto.randomUUID(),
      time: Date.now(),
      role: "user",
      content: question,
    };

    setMsgList((d) => {
      d.push(last);
    });
    requestAnimationFrame(handleScrollToBottom);

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

    if (!reader) return;

    const decoder = new TextDecoder();
    let buf = "";
    let timer = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const decocded = decoder.decode(value, { stream: true });
      buf += decocded;

      handleChatChange(buf);
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(handleScrollToBottom);
    }

    buf += decoder.decode();

    handleChatChange(buf);
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
      <Box ref={scrollRef} sx={{ flex: 1, minBlockSize: 0, overflowY: "auto" }}>
        {msgList.map((i) => (
          <Box key={i.id}>
            <MemoMessageContent text={i.content} />
          </Box>
        ))}
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything"
          multiline
          fullWidth
          onFocus={handleScrollToBottom}
          slotProps={{
            input: {
              endAdornment: (
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
              ),
            },
          }}
        />
      </form>
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
