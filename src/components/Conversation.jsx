import React, { useEffect, useState } from "react";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Typography, Box } from "@mui/material";

const Conversation = ({ Id }) => {
  // const { _id, picturePath } = useSelector((state) => state.user);
  console.log("conversation_id ReCIEVED",Id);
  // const friendId = conversation.receiverId;
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const token = useSelector((state) => state.token);

  const [user, setuser] = useState({
    username:'',
    picturepath:'',

  });
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${Id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("user data : ", data);
    setuser({
      username:data?.firstName +" "+ data?.lastName,
      picturepath:data?.picturePath,
    });
    console.log(user);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Box
      backgroundColor={neutralLight}
      m={"0.5rem 0.5rem"}
      p={"0rem 0.5rem"}
      borderRadius={"15px"}
    >
      <Box sx={{
        display:"flex",
        gap:"2rem",
        alignItems:"center"
      }}>
        <UserImage image={user.picturepath} size="35px" />
        <Typography>
          <p style={{alignItems:"start"}} >{user.username}</p>
        </Typography>
      </Box>
    </Box>
  );
};

export default Conversation;
