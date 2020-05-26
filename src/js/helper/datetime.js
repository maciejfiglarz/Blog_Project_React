import React from "react";
import TimeAgo from "react-timeago";
import polishStrings from "react-timeago/lib/language-strings/pl";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
const formatter = buildFormatter(polishStrings);

export const ShowTimeAgo = ({ date }) => {
  return (
    <TimeAgo
      //   date={new Date()}
      date={new Date(date)}
      formatter={formatter}
      render={({ error, value }) => <span>{value}</span>}
    />
  );
};
