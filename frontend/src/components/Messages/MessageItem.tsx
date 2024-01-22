import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

interface Props {
  message: string;
  author: string;
  datetime: string;
}
const MessageItem: React.FC<Props> = ({ message, author, datetime }) => {
  dayjs.extend(relativeTime);

  const formatDate = (dateString: string) => {
    const now = dayjs();
    const date = dayjs(dateString);

    if (date.isSame(now, "day")) {
      return date.format("[Сегодня,] HH:mm");
    }

    if (date.isSame(now.subtract(1, "day"), "day")) {
      return date.format("[Вчера,] HH:mm");
    }

    if (date.isAfter(now.subtract(1, "month"))) {
      return date.format("D MMMM, HH:mm");
    }

    return date.format("YYYY-MM-DD HH:mm");
  };

  return (
    <Grid sx={{ display: "block", mb: "5px" }} color="primary">
      <Card>
        <CardContent>{author}</CardContent>
        <CardHeader title={message} />
        <CardContent>{formatDate(datetime)}</CardContent>
      </Card>
    </Grid>
  );
};

export default MessageItem;
