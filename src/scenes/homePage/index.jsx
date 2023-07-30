import React from "react";
import Navbar from "scenes/navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import state from "state";
import UserWidget from "scenes/widgets/UserWidget";
import MYPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertizeWidget from "scenes/widgets/AdvertizeWidget";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width={"100%"}
        p={"2rem 6%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap={"0.5rem"}
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MYPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id}/>
        </Box>
        {isNonMobileScreens && <Box flexBasis={"26%"}> 
        <AdvertizeWidget/>    
        <Box m={"2rem 0"}></Box> 
        <FriendsListWidget userId={_id}/>   
</Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
