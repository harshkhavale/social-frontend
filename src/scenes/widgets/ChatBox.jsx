import { Box, Typography, IconButton, InputBase } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import FlexBetween from "components/FlexBetween";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useTheme } from "@emotion/react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Message from "components/Message";
import { useSelector, useDispatch } from "react-redux";
import state from "state";
import { setConversations, setChats, setChat } from "state";
import { sizing } from "@mui/system";
import Conversation from "components/Conversation";

const ChatBox = ({ socket }) => {
  const scrollRef = useRef();
  const chats = useSelector((state) => state.chats);
  const [newMsg, setNewMsg] = useState("");
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  const { _id } = useSelector((state) => state.user);
  const theme = useTheme();
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.token);
  const currentConversation = useSelector((state) => state.currentConversation);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const user = useSelector((state) => state.user);
  const [conversationPerson, setConverstionPerson] = useState();
  const currentRoom = useSelector((state) => state.currentRoom);
  const selectedChat = useSelector((state) => state.selectedChat);
  const [selectedPerson,setSelectedPerson] = useState(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received_msg : ", data);
      dispatch(setChat({ chat: data }));

    })
  }, [socket]);


useEffect(()=>{
  setSelectedPerson(selectedChat);
},[selectedChat])


  const getChat = async () => {
    const response = await fetch(
      `http://localhost:3001/messages/${currentRoom}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const chatData = await response.json();
    console.log("chatData", chatData);

    dispatch(setChats({ chats: chatData }));
    // setChat(chatData);

    // console.log("chats",chat);
  };

  useEffect(() => {
    getChat();
  }, [currentConversation]);

  const handleSubmit = async (e) => {
    // console.log("current id : ",_id)
    e.preventDefault();

    const msgBody = {
      conversationId: currentConversation,
      senderId: _id, // Assuming _id is a valid sender ID
      text: newMsg,
      roomId: currentRoom,
    };



    await socket.emit("send_message", msgBody);
    const receiver = conversations.find(
      (conversation) => conversation._id === currentConversation
    );
    console.log("reciver : ", receiver);

    try {
      const response = await fetch(`http://localhost:3001/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(msgBody),
      });

      const message = await response.json();

      dispatch(setChat({ chat: message }));
      setNewMsg("");
      getChat();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

  }, [chats])
  useEffect(() => {
    console.log("specificState has changed:");
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });

    setData([chats]);
    console.log("data : ", data);
  }, [chats]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      dispatch(setChat({ chat: data }));


    })
  }, [socket, chats]);

  useEffect(() => {
    setConverstionPerson(currentConversation);
    console.log("current_convo : " + currentConversation)

  }, [currentConversation])
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const main = theme.palette.primary.main;
  return (
    <>
      {
        conversationPerson ? (""
        ) : (<p>no conversation selected</p>)
      }
      <Box padding={"2rem"}>
        <Box
          width={"100%"}
          p={"3rem"}
          sx={{
            height: "300px",
            overflow: "scroll",
          }}
        >
          {chats ? (chats.map((chat, index) => (
            <div ref={scrollRef}>
              <Message message={chat} key={index + "k1"} />
            </div>
          ))) : (<p>no chats</p>)}
        </Box>
        <Box>
          <Box>
            <Box
              display={"flex"}
              gap={"3rem"}
              borderRadius="9px"
              backgroundColor={alt}
              padding="2rem 2rem"
            >
              <InputBase
                placeholder="Enter message here"
                sx={{
                  width: "90%",
                  height: "auto",
                  borderRadius: "2rem"
                }}
                onChange={(e) => {
                  setNewMsg(e.target.value);
                }}
                value={newMsg}
              />
              <IconButton onClick={handleSubmit}>
                <ArrowCircleRightIcon className="h-96" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>

  )
};

export default ChatBox;
