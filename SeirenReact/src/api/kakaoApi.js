import axios from "axios";

const KakaoApi = {
  getToken: async (code, key, uri) => {
    const data = {
      grant_type: "authorization_code",
      client_id: key,
      redirect_uri: uri,
      code: code,
    };
    return await axios.post("https://kauth.kakao.com/oauth/token", data, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  },
  getInfo: async (token) => {
    return await axios.post(`http://localhost:8111/auth/kakao`, token);
  },
};
export default KakaoApi;
