import api, { handleAxiosError } from "./Api";

/**
 * 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청합니다.
 * @returns {Promise<Object>} 새로운 액세스 토큰 정보
 * @throws {Error} 토큰 재발행 실패 시 에러
 */
export const requestRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await api.post("/auth/reissued", { refreshToken });

    // 새로운 토큰 정보를 로컬 스토리지에 저장
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

/**
 * 사용자 로그인을 처리합니다.
 * @param {string} email 사용자 이메일
 * @param {string} password 사용자 비밀번호
 * @returns {Promise<Object>} 로그인 응답 데이터
 */
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log("Server response:", response.data); // 디버깅용 로그
    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
    );
  }
};

/**
 * 새로운 사용자를 등록합니다.
 * @param {Object} userData 사용자 등록 정보
 * @returns {Promise<Object>} 회원가입 응답 데이터
 */
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

/**
 * 이메일 인증 코드를 발송합니다.
 * @param {string} email 사용자 이메일
 * @returns {Promise<Object>} 이메일 발송 응답
 */
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

/**
 * 이메일 또는 닉네임의 중복 여부를 확인합니다.
 * @param {Object} params
 * @param {string} params.type 확인할 타입 ('email' 또는 'nickname')
 * @param {string} params.value 확인할 값
 * @returns {Promise<Object>} 중복 확인 응답 데이터
 */
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

/**
 * 닉네임을 사용하여 이메일을 찾습니다.
 * @param {string} nickname 사용자 닉네임
 * @returns {Promise<Object>} 이메일 찾기 응답 데이터
 */
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

/**
 * 비밀번호 찾기 요청을 처리합니다.
 * @param {string} email 사용자 이메일
 * @returns {Promise<Object>} 비밀번호 찾기 응답 데이터
 */
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
