import { Box, IconButton, InputBase } from "@mui/material";
import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import Conversation from "components/Conversation";

import { setConversations, setCurrentConversation, setChats, setCurrentRoom,setSelectedChat } from "state";
const ChatMenu = ({ socket }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const { _id, picturePath } = useSelector((state) => state.user);
  const conversations = useSelector((state) => state.conversations);
  const friends = useSelector((state) => state.user.friends);

  const selectedChats = useSelector((state) => state.chats);
  const [selectedchat, setSelectedChat] = useState();

  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const startConversations = async () => {
    try {
      const requestBody = {
        senderId: _id,
        receiverId: selectedchat,
      };
      const response = await fetch(`http://localhost:3001/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("conversation_data: ", data);

        dispatch(setCurrentConversation({
          currentConversation: data._id // Check the key used in the response
        }));
        console.log("selectedChat : ", selectedchat)
        dispatch(setSelectedChat({selectedchat:selectedchat}));

        dispatch(setCurrentRoom({
          currentRoom: data.roomId
        }))

        socket.emit("join_room", data.roomId);


        dispatch(setConversations({ conversations: [data] }));
      } else {
        console.error("Failed to start conversation:", response.status);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };



  const getConversations = async () => {
    console.log("friends : ", friends);
    const response = await fetch(`http://localhost:3001/conversations/${_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setConversations({ conversations: data }));
  };

  useEffect(() => {
    getConversations();
  }, []);


  return (
    <Box>

      <Box>
        <FlexBetween gap={"3rem"} padding="0.1rem 1.5rem">
          <InputBase placeholder="search friends" />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>

        <hr />
      </Box>
      <Box>
        {friends.map((chat, index) => (
          <Box
            onClick={() => {
              // getChat(conversation._id);
              setSelectedChat(chat._id)

              startConversations();

              // console.log("conversation_id : " + cha);
            }}
          >
            <Conversation Id={chat._id} key={"key_" + index} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMenu;
