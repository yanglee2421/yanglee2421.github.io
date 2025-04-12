import { Markdown } from "@/components/markdown";
import { warn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MenuOutlined,
  MoreHorizOutlined,
  SearchOutlined,
  SendOutlined,
  StopOutlined,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  alpha,
  Box,
  CircularProgress,
  Fab,
  IconButton,
  InputAdornment,
  Paper,
  Skeleton,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import openai from "openai";

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
  i: ChatLog;
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
    switch (i.status) {
      case "loading":
        return (
          <Box>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        );
      case "error":
        return (
          <Alert severity="error" variant="filled">
            <AlertTitle>Error</AlertTitle>
            {i.answer}
          </Alert>
        );
      case "pending":
      case "success":
      default:
        return <MemoMessageContent text={i.answer} />;
    }
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

const schema = z.object({
  question: z.string().min(1, "Please enter a question"),
});

type FormValues = z.infer<typeof schema>;

const useChatForm = () =>
  useForm<FormValues>({
    defaultValues: {
      question: "",
    },

    resolver: zodResolver(schema),
  });

const url = new URL("/v1", window.location.href);

const client = new openai.OpenAI({
  apiKey: "rCJALwydCHKaiiBolPGv:gxneLXlgwLjQQcsNnnEW",
  baseURL: url.href,
  dangerouslyAllowBrowser: true,
});

type ChatStatus = "pending" | "success" | "error" | "loading";

type ChatLog = {
  id: string;
  question: string;
  answer: string;
  time: string;
  status: ChatStatus;
};

const initChatLog = () => new Map<string, ChatLog>();

type SendParams = {
  id: string;
  question: string;
};

const send = ({ id, question }: SendParams, map: Map<string, ChatLog>) => {
  const chatLog: ChatLog = {
    id,
    question,
    answer: "",
    time: new Date().toLocaleString(),
    status: "loading",
  };

  return new Map(map).set(chatLog.id, chatLog);
};

type UpdateParams = {
  id: string;
  answer: string;
  status?: ChatStatus;
};

const update = (
  { id, answer, status = "pending" }: UpdateParams,
  map: Map<string, ChatLog>,
) => {
  const chatLog = map.get(id);
  if (!chatLog) return map;
  return new Map(map).set(id, { ...chatLog, answer, status });
};

type SendButtonStatus = "idle" | "loading" | "streaming";

const CopilotChat = () => {
  const [chatLog, setChatLog] = React.useState(initChatLog);
  const [sendButtonStatus, setSendButtonStatus] =
    React.useState<SendButtonStatus>("idle");

  const controllerRef = React.useRef<AbortController | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const chatLogRef = React.useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const chatForm = useChatForm();

  const handleScrollToBottom = React.useCallback(() => {
    chatLogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  React.useEffect(handleScrollToBottom, [handleScrollToBottom]);

  const logs = [...chatLog.values()];

  type Message = {
    role: "user" | "assistant" | "system";
    content: string;
  };

  const requestChat = async (id: string, messages: Message[]) => {
    const stream = await client.chat.completions.create({
      messages,
      stream: true,
      model: "4.0Ultra",
      web_search_options: { search_context_size: "high" },
    });

    controllerRef.current = stream.controller;
    setSendButtonStatus("streaming");
    let answer = "";

    for await (const chunk of stream) {
      chunk.choices.forEach((choice) => {
        if (!choice.delta.content) return;
        answer += choice.delta.content;
        setChatLog((prev) => update({ answer, id }, prev));
      });
    }

    setChatLog((prev) => update({ answer, id, status: "success" }, prev));
  };

  const handleSubmit = chatForm.handleSubmit(async (data) => {
    const question = data.question.trim();
    const id = crypto.randomUUID();

    chatForm.reset();
    setChatLog((prev) => send({ id, question }, prev));
    setSendButtonStatus("loading");

    await requestChat(
      id,
      logs
        .flatMap((i) => [
          { role: "user" as const, content: i.question },
          { role: "assistant" as const, content: i.answer },
        ])
        .concat({ role: "user", content: question }),
    ).catch((e) => {
      setChatLog((prev) =>
        update({ id, answer: e.message, status: "error" }, prev),
      );
    });

    setSendButtonStatus("idle");
  }, warn);

  const handleChatAbort = (e: React.SyntheticEvent) => {
    /*
     * Solution 2:
     * A button with type=submit can prevent form submission by preventing the default event behavior,
     * which is more performant compared to Solution 1 because there's no DOM replacement
     */
    e.preventDefault();
    controllerRef.current?.abort();
  };

  const renderSendButton = () => {
    switch (sendButtonStatus) {
      case "loading":
        return (
          <Fab type="button" size="small" disabled>
            <CircularProgress size={20} color="inherit" />
          </Fab>
        );
      case "streaming":
        return (
          <Fab
            /*
             * Solution 1:
             * When onClick event changes the button's type from button to submit, the form would be submitted.
             * But when using a key prop, the onClick event replaces the entire DOM node instead of just
             * updating the type, so the form won't be submitted.
             */
            // key={"stop"}
            type="button"
            onClick={handleChatAbort}
            size="small"
            color="error"
          >
            <StopOutlined fontSize="small" />
          </Fab>
        );
      case "idle":
      default:
        return (
          <Fab type="submit" size="small" color="primary">
            <SendOutlined
              sx={{ transform: "rotate(-90deg)" }}
              fontSize="small"
            />
          </Fab>
        );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        blockSize: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          scrollbarColor: `${theme.palette.divider} transparent`,
          padding: 3,

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
        {logs.map((i, idx) => (
          <MemoChatLogItem
            key={i.id}
            i={i}
            enableScroll={Object.is(idx + 1, logs.length)}
          />
        ))}
      </Box>
      <Box sx={{ padding: 3, paddingBlockStart: 0 }}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onReset={() => chatForm.reset()}
          noValidate
          autoComplete="off"
        >
          <Controller
            control={chatForm.control}
            name="question"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {renderSendButton()}
                      </InputAdornment>
                    ),
                  },
                  htmlInput: {
                    autoFocus: true,
                    autoComplete: "off",
                  },
                }}
              />
            )}
          />
        </form>
      </Box>
    </Box>
  );
};

export const Component = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);

  const theme = useTheme();

  const handleMenuToggle = () => setOpenMenu((prev) => !prev);
  const handleChatToggle = () => setOpenChat((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        inlineSize: "100dvw",
        blockSize: "100dvh",

        position: "relative",
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          borderBlockEnd: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: "blur(8px)",

          padding: 2,
        }}
      >
        <Box>
          <IconButton onClick={handleMenuToggle}>
            <MenuOutlined />
          </IconButton>
        </Box>
        <Box>
          <TextField
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box>
          <IconButton onClick={handleChatToggle}>
            <MoreHorizOutlined />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",

          display: "flex",
          flexDirection: "row",
        }}
      >
        {openMenu && (
          <Box
            sx={{
              borderInlineEnd: `1px solid ${theme.palette.divider}`,
              width: 384,
              overflow: "hidden",
            }}
          ></Box>
        )}
        <Box
          sx={{
            flex: 1,
            overflowX: "auto",
            overflowY: "auto",
            scrollbarColor: `${theme.palette.divider} transparent`,
            backgroundColor: theme.palette.background.paper,

            padding: 3,
          }}
        >
          <Box width={2000} height={2000}></Box>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            quam aperiam doloribus vero accusamus tempora. Nesciunt similique
            error aspernatur, repudiandae id voluptatibus quod eligendi minima
            laudantium consequatur nostrum molestiae totam! Consequatur iure
            perspiciatis autem in nesciunt! Debitis inventore pariatur
            cupiditate accusamus illum excepturi quas recusandae dolorum
            repellat voluptatum amet facilis aliquam odit aspernatur maiores,
            mollitia molestias, quam harum unde praesentium. Eos corrupti soluta
            nam adipisci. Dolore laboriosam necessitatibus earum molestias
            asperiores esse debitis cumque alias deleniti beatae sapiente eos
            itaque sequi, rerum et impedit, deserunt nobis, iure ipsa est!
            Officiis. Dolorem deleniti ex blanditiis in ducimus! Maiores debitis
            nihil explicabo, consequuntur aperiam quod perferendis assumenda
            quasi suscipit fuga delectus similique dignissimos, cumque expedita.
            Vero dolor, maiores quisquam reiciendis doloribus consectetur.
            Delectus atque architecto ea nisi quaerat unde quod soluta aliquam?
            Ipsum, voluptate ab repellendus modi asperiores quo nobis repellat
            quod beatae alias nesciunt temporibus non iusto? Harum magni eos
            cum. Odit quam itaque saepe, ipsam mollitia cupiditate illo porro,
            similique qui tempora minima ad obcaecati incidunt. Distinctio
            perspiciatis quia, iure nisi harum ut quo quisquam ipsum ipsam?
            Incidunt, repellendus voluptatem. Dolorem incidunt reprehenderit
            consequuntur tempore in alias molestiae beatae esse unde ab? Nemo
            iure officiis labore possimus neque facilis modi, iusto assumenda
            sit soluta. Omnis consequuntur expedita aliquam nulla eum.
            Accusantium quis minima, quidem voluptatum sequi placeat modi
            doloribus adipisci ipsum quos pariatur similique amet itaque dolor
            ipsa minus numquam reiciendis id qui officia, vel excepturi?
            Repellendus harum ducimus delectus! At, error! Iste soluta, aut
            alias reprehenderit officiis praesentium ab ipsam asperiores.
            Perferendis consequatur, facere, enim error fuga fugiat recusandae
            nisi neque assumenda omnis voluptates optio facilis aut dolorem
            sequi? Vitae eum reiciendis nobis ipsum saepe officiis atque eius
            maiores aliquam? Cumque, unde neque suscipit quasi officia fuga,
            iusto asperiores eos ea facere, nihil ducimus! Voluptatum, tenetur
            aspernatur? Expedita, officia.
          </span>
        </Box>
        {openChat && (
          <Box
            sx={{
              borderInlineStart: `1px solid ${theme.palette.divider}`,
              width: 384,
              overflow: "hidden",
            }}
          >
            <CopilotChat />
          </Box>
        )}
      </Box>
    </Box>
  );
};
