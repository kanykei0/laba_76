"use client";
import axiosApi from "@/axiosApi";
import MessageForm from "@/components/MessageForm/MessageForm";
import MessagesList from "@/components/Messages/MessagesList";
import { MessageMutation } from "@/types";
import { Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const mutation = useMutation({
    mutationFn: async (messageData: MessageMutation) => {
      await axiosApi.post("/", {
        ...messageData,
      });
    },
  });

  const onSubmit = async (messageData: MessageMutation) => {
    await mutation.mutateAsync(messageData);
  };

  return (
    <Grid
      container
      direction="column"
      maxWidth="md"
      sx={{ mx: "auto", mt: "20px" }}
    >
      <div>
        <MessagesList />
      </div>
      <div>
        <MessageForm isLoading={mutation.isPending} onSubmit={onSubmit} />
      </div>
    </Grid>
  );
}
