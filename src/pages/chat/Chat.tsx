import {
  AddOutlined,
  RotateRightOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
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
import { hightlighter } from "@/lib/hightlighter";

export const Chat = () => {
  const hgr = React.use(hightlighter);
  const [msgList, setMsgList] = React.useState<string[]>([]);
  const [msg, setMsg] = React.useState("");

  return (
    <Box>
      <Card>
        <CardHeader title="Chat" />
        <CardContent>
          <ul>
            {msgList.map((msg, i) => (
              <li
                key={i}
              >
                <Box
                  sx={{
                    "pre.shiki": {
                      whiteSpace: "pre-wrap",
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: hgr.codeToHtml(msg, {
                      lang: "markdown",
                      theme: "dark-plus",
                    }),
                  }}
                >
                </Box>
              </li>
            ))}
          </ul>
          <Box
            sx={{
              "pre.shiki": {
                whiteSpace: "pre-wrap",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: hgr.codeToHtml(msg, {
                lang: "markdown",
                theme: "dark-plus",
              }),
            }}
          >
          </Box>
        </CardContent>
        <CardActions>
          <Box sx={{ width: "100%" }}>
            <form
              action={async (fd) => {
                setMsg("");

                const res = await fetch(
                  "/v1/chat/completions",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      model: "4.0Ultra",
                      messages: [
                        {
                          role: "system",
                          content: "你是知识渊博的助理",
                        },
                        {
                          role: "user",
                          content: fd.get("content"),
                        },
                      ],
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
                      Authorization:
                        "Bearer rCJALwydCHKaiiBolPGv:gxneLXlgwLjQQcsNnnEW",
                    },
                  },
                );

                const reader = res.body?.getReader();

                if (reader) {
                  const decoder = new TextDecoder();
                  let content = "";

                  while (true) {
                    const { done, value } = await reader.read();
                    const decocded = decoder.decode(value, { stream: true });
                    console.log(decocded);
                    content += getContent(decocded);
                    setMsg(content);

                    if (done) {
                      setMsg("");
                      setMsgList((prev) => [...prev, content]);
                      break;
                    }
                  }
                }
              }}
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
                <Sender />
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

const Sender = () => {
  const fs = useFormStatus();

  return (
    <IconButton disabled={fs.pending} type="submit">
      {fs.pending ? <RotateRightOutlined /> : <SendOutlined />}
    </IconButton>
  );
};
