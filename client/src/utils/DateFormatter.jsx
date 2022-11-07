//External Lib Import
import React from "react";
import Moment from "react-moment";

const DateFormatter = (date) => {
  return (
    <>
      <Moment format="D MMM YYYY" withTitle>
        {date}
      </Moment> <br />
      <small>
        <Moment format="hh:mm A">{date}</Moment>
      </small>
    </>
  );
};

export default DateFormatter;
