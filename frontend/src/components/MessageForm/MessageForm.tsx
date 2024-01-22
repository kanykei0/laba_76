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
    <Grid
      sx={{
        minHeight: "150px",
        pt: "10px",
      }}
    >
      <form onSubmit={submitFormHandler}>
        <Grid
          container
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs>
            <TextField
              sx={{ background: "white", opacity: "0.8", width: "300px" }}
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
              sx={{ background: "white", opacity: "0.8", width: "450px" }}
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
              sx={{ py: "15px" }}
              type="submit"
              color="info"
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
    </Grid>
  );
};

export default MessageForm;
