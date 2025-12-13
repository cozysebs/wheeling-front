import { api } from "./api";

const BASE_URL = `/api/user`;

//Role 변경
export const changeRole = (role) => {
  return api.put(`${BASE_URL}/change/${role}`, {});
};

// About me 조회 (로그인 사용자 누구나)
export const getUserProfile = (username) => {
  return api.get(`${BASE_URL}/profile/${username}`);
};

// 내 프로필 조회
export const getMyProfile = () => {
  return api.get(`${BASE_URL}/me/profile`);
};

// 내 프로필 수정
export const updateMyProfile = (payload) => {
  return api.put(`${BASE_URL}/me/profile`, payload);
};

// 회원 탈퇴
export const deleteMyAccount = () => {
  return api.delete(`${BASE_URL}/me`);
};

// 기존 default import 코드가 깨지지 않도록 호환용 default도 제공
export default {
  changeRole,
  getUserProfile,
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
};