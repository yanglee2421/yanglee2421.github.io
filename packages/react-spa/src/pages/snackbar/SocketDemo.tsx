import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import React from "react";

export const SocketDemo = () => {
  const [message, setMessage] = React.useState<string>("");

  const socketRef = React.useRef<WebSocket>(null);

  React.useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080/ws");

    socketRef.current.addEventListener("message", (event) => {
      setMessage(event.data);
    });

    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  });

  return (
    <Card>
      <CardHeader title="WebSocket Demo" />
      <CardContent>{message}</CardContent>
      <CardActions>
        <Button
          onClick={() => {
            socketRef.current?.send("Hello from client!");
          }}
        >
          Click Me
        </Button>
      </CardActions>
    </Card>
  );
};
