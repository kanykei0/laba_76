import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";

interface Props {
  message: string;
  author: string;
  datetime: string;
}
const MessageItem: React.FC<Props> = ({ message, author, datetime }) => {
  return (
    <Grid item>
      <Card>
        <CardContent>
          {author} date: {datetime}
        </CardContent>
        <CardHeader title={message} />
      </Card>
    </Grid>
  );
};

export default MessageItem;
