import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  currentConversation: null,
  selectedChat: null,
  currentRoom: null,
  posts: [],
  chats: [],
  conversations: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload.currentConversation;
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload.currentRoom;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload.selectedChat;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setConversation: (state, action) => {
      const updatedConversations = state.conversations.map((conversation) => {
        if (conversation._id === action.payload.conversation._id)
          return action.payload.conversation;
      });
      state.conversations = updatedConversations;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload.conversations;
    },
    setChat: (state, action) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat._id === action.payload.chat._id) {
          return {
            ...chat,
            ...action.payload.chat,
          };
        }

        return chat;
      });
      state.chats = updatedChats;
    },
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setChat,
  setChats,
  setConversation,
  setConversations,
  setCurrentConversation,
  setCurrentRoom,
  setSelectedChat
} = authSlice.actions;
export default authSlice.reducer;
