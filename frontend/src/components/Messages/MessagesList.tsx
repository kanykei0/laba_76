import axiosApi from "@/axiosApi";
import { Message } from "@/types";
import { CircularProgress, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
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
      <Grid item container>
        {messagesArea}
      </Grid>
    </div>
  );
};

export default MessagesList;
