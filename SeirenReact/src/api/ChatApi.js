import axios from "axios";
const Domain = "http://localhost:8111";
const accessToken = localStorage.getItem("accessToken");

const ChatApi = {
  roomList: async () => {
    return await axios.get(Domain + "/chat/list", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default ChatApi;
