import { Typography, Box, useMediaQuery } from "@mui/material";
import React from "react";
import { format } from "timeago.js";
import { useTheme } from "@emotion/react";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { _id } = useSelector((state) => state.user);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const primary = theme.palette.primary.main;
  const alt = theme.palette.background.alt;
  const own = _id === message.senderId;
  return (
    <Box
      display={"flex"}
      sx={
        own ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" }
      }
    >
      <Box
       
        // display={"inline-flex"}
        sx={{
          maxWidth: "70%",
          minWidth: "15%",
        }}
        // height={"auto"}
        color={own ? "black" : "white"}

      >
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          // alignItems={"center"}
          flexDirection={isNonMobile ? "column" : "column"}

        >
          <Typography
           borderRadius={"1rem"}
           backgroundColor={own ? primary : neutralLight}
          textAlign={"center"}
            width={"100%"}
            p={"0.8rem"}
            m={"0rem"}
          >
            {message.text}
          </Typography>
          <Typography
            width={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            color={dark}
            sx={{
              fontSize: "0.5rem",
              p:"0.2rem",
            }}
          >
            {format(message.createdAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
