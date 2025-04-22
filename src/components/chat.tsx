import { warn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StopOutlined,
  SendOutlined,
  AutorenewOutlined,
  ContentCopyOutlined,
  ThumbUpOutlined,
  ThumbDownOutlined,
  ThumbDown,
  ThumbUp,
  MoreVertOutlined,
  DeleteOutlined,
  AddOutlined,
} from "@mui/icons-material";
import {
  Box,
  Paper,
  useMediaQuery,
  Fab,
  CircularProgress,
  Skeleton,
  Alert,
  AlertTitle,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";
import openai from "openai";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Markdown } from "@/components/markdown";
import { z } from "zod";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import type { Message, MessageInAPI } from "@/lib/db";
import { useDbStore } from "@/hooks/store/useDbStore";
import { ScrollView } from "./scrollbar";

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
  question: React.ReactNode;
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
        {question}
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

type SendButtonStatus = "idle" | "loading" | "streaming";

const useScrollToBottom = () => {
  const chatLogRef = React.useRef<HTMLDivElement>(null);

  const handleScrollToBottom = React.useCallback(() => {
    chatLogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  React.useEffect(handleScrollToBottom, [handleScrollToBottom]);

  return chatLogRef;
};

const useScrollToView = () => {
  const [id, setId] = React.useState(0);

  const scrollRef = React.useRef<Map<number, HTMLDivElement>>(new Map());

  React.useEffect(() => {
    if (!id) return;
    const element = scrollRef.current.get(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setId(0);
  }, [id]);

  return [scrollRef, setId] as const;
};

const useVisualViewportHeight = () =>
  React.useSyncExternalStore(
    (fn) => {
      window.visualViewport?.addEventListener("resize", fn);
      return () => {
        window.visualViewport?.removeEventListener("resize", fn);
      };
    },
    () => window.visualViewport?.height || 0,
    () => 0,
  );

const useWindowInnerHeight = () =>
  React.useSyncExternalStore(
    (fn) => {
      window.addEventListener("resize", fn);
      return () => {
        window.removeEventListener("resize", fn);
      };
    },
    () => window.innerHeight,
    () => 0,
  );

export const CopilotChat = () => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [sendButtonStatus, setSendButtonStatus] =
    React.useState<SendButtonStatus>("idle");

  const controllerRef = React.useRef<AbortController | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const chatForm = useChatForm();
  const [scrollRef, setScrollId] = useScrollToView();
  const chatLogRef = useScrollToBottom();
  const snackbar = useSnackbar();
  const isMobile = useMediaQuery("(any-pointer: coarse)");
  const windowInnerHeight = useWindowInnerHeight();
  const visualViewportHeight = useVisualViewportHeight();
  const activeCompletionId = useDbStore((state) => state.completionId);
  const setDb = useDbStore((state) => state.set);
  const completion = useLiveQuery(
    () => db.completions.get(activeCompletionId),
    [activeCompletionId],
  );
  const completions = useLiveQuery(() => db.completions.toArray(), []);
  const chatLogs = useLiveQuery(async () => {
    if (!completion?.id) return null;
    return db.messages.where("completionId").equals(completion.id).toArray();
  }, [completion?.id]);

  const getVirtualKeyboardHeight = () => {
    if (!isMobile) return 0;

    return Math.abs(windowInnerHeight - Math.floor(visualViewportHeight));
  };

  const virtualKeyboardHeight = getVirtualKeyboardHeight();
  const isVirtualKeyboardVisible = !!virtualKeyboardHeight;

  const runFetch = async (id: number, messages: MessageInAPI[]) => {
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
      for (const choice of chunk.choices) {
        if (!choice.delta.content) return;
        answer += choice.delta.content;
        await db.messages.update(id, {
          answer,
          status: "pending",
        });
      }
    }

    await db.messages.update(id, {
      answer,
      status: "success",
      answerDate: new Date().toISOString(),
    });
  };

  const runChat = async (id: number, messages: MessageInAPI[]) => {
    setSendButtonStatus("loading");

    await runFetch(id, messages).catch(async (e) => {
      await db.messages.update(id, {
        answer: e.message,
        status: "error",
      });
    });

    setSendButtonStatus("idle");
  };

  const runRetry = async (log: Message) => {
    setScrollId(log.id);
    await db.messages.update(log.id, { status: "loading", thumb: null });
    await runChat(log.id, log.messages);
  };

  const handleSubmit = chatForm.handleSubmit(async (data) => {
    if (sendButtonStatus !== "idle") return;

    chatForm.reset();
    let completionId = 0;
    const question = data.question.trim();

    // No completion
    if (!completion) {
      completionId = await db.completions.add({
        name: question,
      });
      setDb((draft) => {
        draft.completionId = completionId;
      });

      // Has completion but no messages
    } else if (!chatLogs?.length) {
      completionId = completion.id;
      await db.completions.update(completion.id, {
        name: question,
      });

      // Has completion and messages
    } else {
      completionId = completion.id;
    }

    const prevMessages =
      chatLogs?.flatMap((i) => [
        { role: "user" as const, content: i.question },
        { role: "assistant" as const, content: i.answer },
      ]) || [];

    const messages = prevMessages.concat({ role: "user", content: question });

    const id = await db.messages.add({
      question,
      questionDate: new Date().toISOString(),
      messages,
      answer: "",
      answerDate: null,
      status: "loading",
      thumb: null,
      completionId,
    });

    setScrollId(id);
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

  const handleMenuClose = () => setMenuAnchorEl(null);

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
            <SendOutlined fontSize="small" />
          </Fab>
        );
    }
  };

  const renderThumb = (i: Message) => {
    switch (i.thumb) {
      case "up":
        return (
          <IconButton size="small" disabled>
            <ThumbUp />
          </IconButton>
        );
      case "down":
        return (
          <IconButton size="small" disabled>
            <ThumbDown />
          </IconButton>
        );
      default:
        return (
          <>
            <IconButton
              size="small"
              onClick={async () => {
                await db.messages.update(i.id, {
                  thumb: "up",
                });
              }}
            >
              <ThumbUpOutlined />
            </IconButton>
            <IconButton
              size="small"
              onClick={async () => {
                await db.messages.update(i.id, {
                  thumb: "down",
                });
              }}
            >
              <ThumbDownOutlined />
            </IconButton>
          </>
        );
    }
  };

  const renderAnswer = (i: Message) => {
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
              {renderThumb(i)}
              <IconButton
                size="small"
                onClick={() => runRetry(i)}
                disabled={sendButtonStatus !== "idle"}
              >
                <AutorenewOutlined />
              </IconButton>
              <Typography variant="caption" color="text.secondary">
                {new Date(i.answerDate!).toLocaleTimeString()}
              </Typography>
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
      <Box sx={{ display: "flex", paddingInline: 3.5, paddingBlock: 1.5 }}>
        <Box sx={{ flex: 1, minInlineSize: 0 }}>
          <Typography variant="h6">Copilot Chat</Typography>
          <Typography variant="subtitle1">#{completion?.id}</Typography>
        </Box>
        <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
          <MoreVertOutlined />
        </IconButton>
        <Menu
          open={!!menuAnchorEl}
          onClose={handleMenuClose}
          anchorEl={menuAnchorEl}
        >
          <MenuItem
            onClick={async () => {
              handleMenuClose();
              const id = await db.completions.add({ name: "New completion" });
              setDb((draft) => {
                draft.completionId = id;
              });
            }}
          >
            <ListItemIcon>
              <AddOutlined />
            </ListItemIcon>
            <ListItemText primary="Add completion" />
          </MenuItem>
          {completions?.map((i) => (
            <MenuItem
              key={i.id}
              onClick={() => {
                handleMenuClose();
                setDb((draft) => {
                  draft.completionId = i.id;
                });
              }}
            >
              {i.name}
            </MenuItem>
          ))}
          {completion && (
            <MenuItem
              onClick={() => {
                handleMenuClose();
                db.completions.delete(completion.id);
                db.messages
                  .where("completionId")
                  .equals(completion.id)
                  .delete();
              }}
            >
              <ListItemIcon>
                <DeleteOutlined color="error" />
              </ListItemIcon>
              <ListItemText primary="Delete completion" />
            </MenuItem>
          )}
        </Menu>
      </Box>
      <Divider />
      <Box
        sx={{
          flex: 1,
          minBlockSize: 0,
        }}
      >
        <ScrollView>
          <Box
            sx={{
              padding: 3,
              "&>*+*": {
                marginBlockStart: 3,
              },
            }}
          >
            {chatLogs?.map((i) => (
              <ChatLogItem
                key={i.id}
                question={
                  <div>
                    <Paper
                      sx={{
                        padding: 3,
                        bgcolor: (t) => t.palette.primary.main,
                      }}
                    >
                      {i.question}
                    </Paper>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(i.questionDate).toLocaleTimeString()}
                    </Typography>
                  </div>
                }
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
        </ScrollView>
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
                placeholder={`Height: ${virtualKeyboardHeight}px; Visible: ${isVirtualKeyboardVisible}`}
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
