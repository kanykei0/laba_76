"use client";
import { MessageMutation } from "@/types";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";

interface Props {
  onSubmit: (messageMutation: MessageMutation) => void;
  isLoading: boolean;
}

const MessageForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState<MessageMutation>({
    message: "",
    author: "",
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState({ message: "", author: "" });
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs>
          <TextField
            type="text"
            id="author"
            label="Author"
            name="author"
            value={state.author}
            onChange={inputChange}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            type="text"
            id="message"
            label="Message"
            name="message"
            value={state.message}
            onChange={inputChange}
            required
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<SendIcon />}
          >
            Send
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;
