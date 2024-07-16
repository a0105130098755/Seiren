import api, { handleAxiosError } from "./Api";

export const requestRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await api.post("/auth/reissued", { refreshToken });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("tokenExpiresIn", response.data.accessTokenExpiresIn);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/login";
    } else {
      handleAxiosError(error, "토큰 재발행에 실패했습니다. 다시 시도해주세요.");
    }
    throw error;
  }
};
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log("Server response:", response.data); // 추가된 로그
    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
    );
  }
};

export const signUp = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "회원 가입에 실패했습니다. 다시 시도해주세요.");
  }
};

export const sendEmailCode = async (email) => {
  try {
    const response = await api.get("/auth/sendmail", {
      params: { email },
    });
    return response;
  } catch (error) {
    handleAxiosError(error, "인증번호 발송에 실패했습니다. 다시 시도해주세요.");
  }
};

export const checkExist = async ({ type, value }) => {
  try {
    const response = await api.post("/auth/checkExist", { type, value });
    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      `${type} 중복 확인에 실패했습니다. 다시 시도해주세요.`
    );
  }
};

// 이메일 찾기 함수
export const findEmail = async (nickname) => {
  try {
    const response = await checkExist({ type: "nickname", value: nickname });
    if (response) {
      return response;
    } else {
      throw new Error("입력하신 닉네임과 일치하는 이메일을 찾을 수 없습니다.");
    }
  } catch (error) {
    handleAxiosError(
      error,
      "입력하신 닉네임과 일치하는 이메일을 찾을 수 없습니다."
    );
  }
};

// 비밀번호 찾기 함수
export const forgotPassword = async (email) => {
  try {
    const response = await checkExist({ type: "email", value: email });
    if (response) {
      return response;
    } else {
      throw new Error("입력하신 이메일과 일치하는 사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    handleAxiosError(
      error,
      "입력하신 이메일과 일치하는 사용자를 찾을 수 없습니다."
    );
  }
};
