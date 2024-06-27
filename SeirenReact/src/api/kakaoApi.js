import axios from "axios";

const KakaoApi = {
  getToken: async (code) => {
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_API_KEY,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      code: code,
    };
    return await axios.post("https://kauth.kakao.com/oauth/token", data, {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  },
  getInfo: async (token) => {
    return await axios.post(Common.CP_DOMAIN + `/kakao/ismember`, token);
  },
};
export default KakaoApi;
