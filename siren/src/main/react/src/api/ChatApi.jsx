import axios from "axios";
const Domain = "";
const accessToken = localStorage.getItem("accessToken");

const ChatApi = {
  roomList: async () => {
    return await axios.get(Domain + "/chat/list", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  memberInfo: async () => {
    return await axios.get(Domain + "/chat/memberInfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default ChatApi;
