import { Markdown } from "@/components/markdown";
import { warn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AutorenewOutlined,
  ContentCopyOutlined,
  MenuOutlined,
  PushPin,
  PushPinOutlined,
  SearchOutlined,
  SendOutlined,
  SmartToyOutlined,
  StopOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import openai from "openai";
import { useSnackbar } from "notistack";
import { PanelResizeHandle, PanelGroup, Panel } from "react-resizable-panels";
import { DateTimePicker } from "@mui/x-date-pickers";

type MarkdownContentProps = {
  text: string;
};

const MarkdownContent = (props: MarkdownContentProps) => {
  return (
    <Box
      component={"article"}
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

type ChatLogItemProps = {
  question: string;
  answer: React.ReactNode;
  ref: React.Ref<HTMLDivElement>;
};

const ChatLogItem = ({ question, answer, ref }: ChatLogItemProps) => {
  return (
    <>
      <Box
        ref={ref}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Paper sx={{ padding: 3, bgcolor: (t) => t.palette.primary.main }}>
          {question}
        </Paper>
      </Box>
      <Box
        sx={{
          "&:last-child": {
            minBlockSize: "100dvh",
          },
        }}
      >
        {answer}
      </Box>
    </>
  );
};

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
  messages: Message[];
  time: string;
  status: ChatStatus;
};

type ChatLogMap = Map<string, ChatLog>;

const initChatLog = (): ChatLogMap => new Map();

type InsertParams = {
  id: string;
  question: string;
  messages: Message[];
} & Partial<ChatLog>;

const insert = (param: InsertParams, map: ChatLogMap) => {
  const chatLog: ChatLog = {
    answer: "",
    time: new Date().toLocaleString(),
    status: "loading",
    ...param,
  };

  return new Map(map).set(chatLog.id, chatLog);
};

type UpdateParams = {
  id: string;
} & Partial<ChatLog>;

const update = (param: UpdateParams, map: ChatLogMap) => {
  const chatLog = map.get(param.id);
  if (!chatLog) return map;
  return new Map(map).set(param.id, { ...chatLog, ...param });
};

type SendButtonStatus = "idle" | "loading" | "streaming";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const useScrollToBottom = () => {
  const chatLogRef = React.useRef<HTMLDivElement>(null);

  const handleScrollToBottom = React.useCallback(() => {
    chatLogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  React.useEffect(handleScrollToBottom, [handleScrollToBottom]);

  return [chatLogRef, handleScrollToBottom] as const;
};

const useScrollToView = () => {
  const [id, setId] = React.useState("");

  const scrollRef = React.useRef<Map<string, HTMLDivElement>>(new Map());

  React.useEffect(() => {
    if (!id) return;
    const element = scrollRef.current.get(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setId("");
  }, [id]);

  return [scrollRef, setId] as const;
};

const CopilotChat = () => {
  const [chatLog, setChatLog] = React.useState(initChatLog);
  const [sendButtonStatus, setSendButtonStatus] =
    React.useState<SendButtonStatus>("idle");

  const controllerRef = React.useRef<AbortController | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const theme = useTheme();
  const chatForm = useChatForm();
  const [scrollRef, setScrollId] = useScrollToView();
  const [chatLogRef, handleScrollToBottom] = useScrollToBottom();
  const snackbar = useSnackbar();

  const logs = [...chatLog.values()];

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
        setChatLog((prev) => update({ answer, id, status: "pending" }, prev));
      });
    }

    setChatLog((prev) => update({ answer, id, status: "success" }, prev));
  };

  const runChat = async (id: string, messages: Message[]) => {
    setSendButtonStatus("loading");

    await requestChat(id, messages).catch((e) => {
      setChatLog((prev) =>
        update({ id, answer: e.message, status: "error" }, prev),
      );
    });

    setSendButtonStatus("idle");
  };

  const runRetry = async (log: ChatLog) => {
    setScrollId(log.id);
    setChatLog((prev) => update({ id: log.id, status: "loading" }, prev));
    await runChat(log.id, log.messages);
  };

  const handleSubmit = chatForm.handleSubmit(async (data) => {
    if (sendButtonStatus !== "idle") return;

    const id = crypto.randomUUID();
    const question = data.question.trim();
    const messages = logs
      .flatMap((i) => [
        { role: "user" as const, content: i.question },
        { role: "assistant" as const, content: i.answer },
      ])
      .concat({ role: "user", content: question });

    chatForm.reset();
    setScrollId(id);
    setChatLog((prev) => insert({ id, question, messages }, prev));
    await runChat(id, messages);
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

  const renderAnswer = (i: ChatLog) => {
    switch (i.status) {
      case "loading":
        return (
          <div>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </div>
        );
      case "error":
        return (
          <>
            <Alert severity="error" variant="filled">
              <AlertTitle>Error</AlertTitle>
              {i.answer}
            </Alert>
            <p>
              <IconButton
                size="small"
                onClick={() => runRetry(i)}
                disabled={sendButtonStatus !== "idle"}
              >
                <AutorenewOutlined />
              </IconButton>
            </p>
          </>
        );
      case "success":
        return (
          <>
            <MarkdownContent text={i.answer} />
            <p>
              <IconButton
                onClick={async () => {
                  await navigator.clipboard.writeText(i.answer);
                  snackbar.enqueueSnackbar("Copied Successfully", {
                    variant: "success",
                  });
                }}
                size="small"
              >
                <ContentCopyOutlined />
              </IconButton>
              <IconButton size="small">
                <ThumbUpOutlined />
              </IconButton>
              <IconButton size="small">
                <ThumbDownOutlined />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => runRetry(i)}
                disabled={sendButtonStatus !== "idle"}
              >
                <AutorenewOutlined />
              </IconButton>
            </p>
          </>
        );
      case "pending":
        return <MarkdownContent text={i.answer} />;
      default:
        return null;
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
        }}
      >
        <Box
          sx={{
            padding: 3,
            "&>*+*": {
              marginBlockStart: 3,
            },
          }}
        >
          {logs.map((i) => (
            <ChatLogItem
              key={i.id}
              question={i.question}
              answer={renderAnswer(i)}
              ref={(el) => {
                if (!el) return;
                scrollRef.current.set(i.id, el);
                return () => {
                  scrollRef.current.delete(i.id);
                };
              }}
            />
          ))}
        </Box>
        <div ref={chatLogRef} />
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
                onFocus={handleScrollToBottom}
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

const Menu = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderInlineEnd: `1px solid ${theme.palette.divider}`,

        overflow: "hidden",
      }}
    ></Box>
  );
};

const Content = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowX: "auto",
        overflowY: "auto",
        scrollbarColor: `${theme.palette.divider} transparent`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <DateTimePicker />
      <Box sx={{ padding: 3 }}>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quam
          aperiam doloribus vero accusamus tempora. Nesciunt similique error
          aspernatur, repudiandae id voluptatibus quod eligendi minima
          laudantium consequatur nostrum molestiae totam! Consequatur iure
          perspiciatis autem in nesciunt! Debitis inventore pariatur cupiditate
          accusamus illum excepturi quas recusandae dolorum repellat voluptatum
          amet facilis aliquam odit aspernatur maiores, mollitia molestias, quam
          harum unde praesentium. Eos corrupti soluta nam adipisci. Dolore
          laboriosam necessitatibus earum molestias asperiores esse debitis
          cumque alias deleniti beatae sapiente eos itaque sequi, rerum et
          impedit, deserunt nobis, iure ipsa est! Officiis. Dolorem deleniti ex
          blanditiis in ducimus! Maiores debitis nihil explicabo, consequuntur
          aperiam quod perferendis assumenda quasi suscipit fuga delectus
          similique dignissimos, cumque expedita. Vero dolor, maiores quisquam
          reiciendis doloribus consectetur. Delectus atque architecto ea nisi
          quaerat unde quod soluta aliquam? Ipsum, voluptate ab repellendus modi
          asperiores quo nobis repellat quod beatae alias nesciunt temporibus
          non iusto? Harum magni eos cum. Odit quam itaque saepe, ipsam mollitia
          cupiditate illo porro, similique qui tempora minima ad obcaecati
          incidunt. Distinctio perspiciatis quia, iure nisi harum ut quo
          quisquam ipsum ipsam? Incidunt, repellendus voluptatem. Dolorem
          incidunt reprehenderit consequuntur tempore in alias molestiae beatae
          esse unde ab? Nemo iure officiis labore possimus neque facilis modi,
          iusto assumenda sit soluta. Omnis consequuntur expedita aliquam nulla
          eum. Accusantium quis minima, quidem voluptatum sequi placeat modi
          doloribus adipisci ipsum quos pariatur similique amet itaque dolor
          ipsa minus numquam reiciendis id qui officia, vel excepturi?
          Repellendus harum ducimus delectus! At, error! Iste soluta, aut alias
          reprehenderit officiis praesentium ab ipsam asperiores. Perferendis
          consequatur, facere, enim error fuga fugiat recusandae nisi neque
          assumenda omnis voluptates optio facilis aut dolorem sequi? Vitae eum
          reiciendis nobis ipsum saepe officiis atque eius maiores aliquam?
          Cumque, unde neque suscipit quasi officia fuga, iusto asperiores eos
          ea facere, nihil ducimus! Voluptatum, tenetur aspernatur? Expedita,
          officia.
        </span>
        <Box width={2000} height={2000}></Box>
      </Box>
    </Box>
  );
};

type ActivePanel = "menu" | "chat" | "content";

export const Component = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);
  const [alwaysOnTop, setAlwaysOnTop] = React.useState(false);
  const [leftResizeActive, setLeftResizeActive] = React.useState(false);
  const [rightResizeActive, setRightResizeActive] = React.useState(false);
  const [lastActivePanel, setLastActivePanel] =
    React.useState<ActivePanel>("content");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAlwaysOnTopToggle = () => setAlwaysOnTop((prev) => !prev);
  const handleMenuToggle = () => {
    setOpenMenu((prev) => !prev);
    setLastActivePanel((prev) => (prev === "menu" ? "content" : "menu"));
  };
  const handleChatToggle = () => {
    setOpenChat((prev) => !prev);
    setLastActivePanel((prev) => (prev === "chat" ? "content" : "chat"));
  };

  const renderPanelGroupInSmallScreen = () => {
    switch (lastActivePanel) {
      case "menu":
        return (
          <PanelGroup direction="horizontal" autoSaveId="resize">
            <Panel id="menu" order={1}>
              <Menu />
            </Panel>
          </PanelGroup>
        );
      case "chat":
        return (
          <PanelGroup direction="horizontal" autoSaveId="resize">
            <Panel id="chat" order={3}>
              <CopilotChat />
            </Panel>
          </PanelGroup>
        );
      case "content":
      default:
        return (
          <PanelGroup direction="horizontal" autoSaveId="resize">
            <Panel id="content" order={2}>
              <Content />
            </Panel>
          </PanelGroup>
        );
    }
  };

  const renderPanelGroup = () => {
    if (isSmallScreen) {
      return renderPanelGroupInSmallScreen();
    }

    return (
      <PanelGroup direction="horizontal" autoSaveId="resize">
        {openMenu && (
          <>
            <Panel minSize={16} defaultSize={25} id="menu" order={1}>
              <Menu />
            </Panel>
            <PanelResizeHandle
              style={{
                width: leftResizeActive ? 2 : 1,
                backgroundColor: leftResizeActive
                  ? theme.palette.primary.main
                  : theme.palette.divider,
              }}
              onDragging={setLeftResizeActive}
            />
          </>
        )}
        <Panel id="content" order={2}>
          <Content />
        </Panel>
        {openChat && (
          <>
            <PanelResizeHandle
              style={{
                width: rightResizeActive ? 2 : 1,
                backgroundColor: rightResizeActive
                  ? theme.palette.primary.main
                  : theme.palette.divider,
              }}
              onDragging={setRightResizeActive}
            />
            <Panel minSize={20} defaultSize={30} id="chat" order={3}>
              <CopilotChat />
            </Panel>
          </>
        )}
      </PanelGroup>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        inlineSize: "100dvw",
        blockSize: "100dvh",

        position: "fixed",
        inset: 0,
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
          <IconButton onClick={handleAlwaysOnTopToggle}>
            {alwaysOnTop ? <PushPin /> : <PushPinOutlined />}
          </IconButton>
          <IconButton onClick={handleChatToggle}>
            <SmartToyOutlined />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flex: 1, minBlockSize: 0 }}>{renderPanelGroup()}</Box>
    </Box>
  );
};
