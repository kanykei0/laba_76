import axiosApi from "@/axiosApi";
import { Message } from "@/types";
import { CircularProgress, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useLayoutEffect, useRef } from "react";
import MessageItem from "./MessageItem";

const MessagesList = () => {
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const messageResponse = await axiosApi.get<Message[]>("/");
      return messageResponse.data;
    },
    refetchInterval: 2000,
  });

  const toBotom = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (toBotom.current) {
      toBotom.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  let messagesArea: React.ReactNode = <CircularProgress />;

  if (!isLoading && messages) {
    messagesArea = messages.map((message) => (
      <MessageItem
        key={message.id}
        message={message.message}
        author={message.author}
        datetime={message.datetime}
      />
    ));
  }
  return (
    <div>
      <Grid container maxWidth="md" sx={{ mx: "auto" }} direction="column">
        {messagesArea}
        <div ref={toBotom}></div>
      </Grid>
    </div>
  );
};

export default MessagesList;
