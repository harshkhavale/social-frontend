import React, { useState, useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Navbar from "scenes/navbar";
import { useDispatch } from "react-redux";
import FlexBetween from "components/FlexBetween";
import ChatMenu from "scenes/widgets/ChatMenu";
import ChatBox from "scenes/widgets/ChatBox";
import { useTheme } from "@emotion/react";
import { setConversations } from "state";
import { sizing } from "@mui/system";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const ChatPage = () => {
  const [menuActive, setMenuActive] = useState(true)
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  return (
    <Box sx={{ height: "100%" }} overflow={"hidden"}>
      <br />
      <Navbar />

      <Box
        width={"100%"}
        overflow={"hidden"}
        p={"2rem 6%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap={"0.5rem"}
        justifyContent={"space-between"}
      >
        <Box width={"26%"}
        >
          <ChatMenu socket={socket} />
        </Box>
        <Box width={"74%"} height={"100%"} >
          <ChatBox socket={socket} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
