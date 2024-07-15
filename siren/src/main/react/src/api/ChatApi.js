import axios from "axios";

const ChatApi = {
  roomList: async () => {
    return await axios.get("/chat/list", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
  },

  memberInfo: async () => {
    return await axios.get("/chat/memberInfo", {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
  },
};

export default ChatApi;
