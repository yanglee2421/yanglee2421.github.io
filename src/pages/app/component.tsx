import { Markdown } from "@/components/markdown";
import { warn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MenuOutlined,
  MoreHorizOutlined,
  SearchOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  alpha,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { produce } from "immer";
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

type Message = {
  id: string;
  question: string;
  answer: string;
  error?: React.ReactNode;
};

class ChatAPI {
  isFetching = false;
  log: Message[] = [];
  controller: AbortController | null = null;
  listeners = new Set<() => void>();

  async fetch() {
    if (!this.log.length)
      throw new Error("No last log found, please ask a question first.");

    const stream = await client.chat.completions.create({
      messages: this.log
        .flatMap((i) => [
          { role: "user" as const, content: i.question },
          { role: "assistant" as const, content: i.answer },
        ])
        .slice(0, -1),
      stream: true,
      model: "4.0Ultra",
    });
    this.controller = stream.controller;

    for await (const chunk of stream) {
      chunk.choices.forEach((choice) => {
        if (!choice.delta.content) return;
        this.log = produce(this.log, (draft) => {
          draft[draft.length - 1].answer += choice.delta.content;
        });
        this.emit();
      });
    }
  }
  abort() {
    this.controller?.abort();
    this.controller = null;
  }
  subscribe(callback: () => void) {
    this.listeners.add(callback);

    return () => {
      this.listeners.delete(callback);
    };
  }
  emit() {
    this.listeners.forEach((callback) => callback());
  }
  async ask(question: string) {
    this.log = produce(this.log, (draft) => {
      draft.push({
        id: Date.now().toString(),
        question,
        answer: "",
        error: void 0,
      });
    });
    this.isFetching = true;
    this.emit();
    await this.fetch().catch((error) => {
      this.log = produce(this.log, (draft) => {
        draft[draft.length - 1].error =
          error.message || "Failed to connect to the server";
      });
    });
    this.isFetching = false;
    this.emit();
  }
}

type ChatAPIState = {
  chat: ChatAPI;
};

const chatReducer = (chat: ChatAPIState) => ({ ...chat });
const initChat = () => ({ chat: new ChatAPI() });

const CopilotChat = () => {
  const [{ chat }, dispatch] = React.useReducer(chatReducer, null, initChat);

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
  React.useEffect(() => chat.subscribe(dispatch), [chat, dispatch]);

  const handleChatAbort = () => chat.abort();
  const handleSubmit = chatForm.handleSubmit(async (data) => {
    chatForm.reset();
    await chat.ask(data.question);
  }, warn);

  const renderSendButton = () => {
    if (chat.isFetching) {
      return (
        <Button
          variant="contained"
          endIcon={<CircularProgress size={16} color="inherit" />}
          type="button"
          onClick={handleChatAbort}
        >
          Cancel
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
        {chat.log.map((i, idx) => (
          <MemoChatLogItem
            key={i.id}
            i={i}
            enableScroll={Object.is(idx + 1, chat.log.length)}
          />
        ))}
      </Box>
      <Box sx={{ padding: 3, paddingBlockStart: 0 }}>
        <form ref={formRef} onSubmit={handleSubmit}>
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
                    endAdornment: renderSendButton(),
                  },
                  htmlInput: {
                    autoFocus: true,
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
