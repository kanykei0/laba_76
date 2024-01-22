import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
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
      return date.format("[Today,] HH:mm");
    }

    if (date.isSame(now.subtract(1, "day"), "day")) {
      return date.format("[Yesterday,] HH:mm");
    }

    if (date.isAfter(now.subtract(1, "month"))) {
      return date.format("D MMMM, HH:mm");
    }

    if (date.isAfter(now.subtract(1, "year")) && date.isBefore(now)) {
      return date.fromNow();
    }

    return date.format("D MMMM YYYY, HH:mm");
  };

  return (
    <Grid
      sx={{
        display: "block",
        mb: "5px",
      }}
    >
      <Card sx={{ backgroundColor: "CadetBlue", color: "white" }}>
        <CardContent>
          <Typography>
            <strong>{author}</strong>
          </Typography>
          <CardHeader title={message} />
          <Typography>{formatDate(datetime)}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MessageItem;
