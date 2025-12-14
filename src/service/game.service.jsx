// import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { api } from "./api";

// 백엔드 GameController 기준 BASE URL
// const BASE_URL = `${BASE_API_URL}/api/games`;
const BASE_URL = `/api/games`

/**
 * gamesConfig(games 배열) 전체를 백엔드로 동기화
 * @param {Array} gamesPayload - 프론트에서 관리하는 게임 메타 정보 배열
 * @returns {Promise}
 */
export const syncGamesService = (gamesPayload) => {
  return api.post(`${BASE_URL}/sync`, gamesPayload);
};

/**
 * 특정 게임(slug)의 좋아요 상태/개수 조회
 * GET /api/games/{slug}/likes
 * @param {string} gameSlug
 * @returns {Promise<AxiosResponse<LikeDTO>>}
 */
export const getGameLikeInfo = (gameSlug) => {
  return api.get(`${BASE_URL}/${gameSlug}/likes`);
};

/**
 * 특정 게임(slug)에 대한 좋아요 토글
 * POST /api/games/{slug}/likes/toggle
 * @param {string} gameSlug
 * @returns {Promise<AxiosResponse<LikeDTO>>}
 */
export const toggleGameLike = (gameSlug) => {
  return api.post(`${BASE_URL}/${gameSlug}/likes/toggle`);
};

/**
 * 특정 게임(slug)의 북마크 상태/개수 조회
 * GET /api/games/{slug}/bookmarks
 */
export const getGameBookmarkInfo = (gameSlug) => {
  return api.get(`${BASE_URL}/${gameSlug}/bookmarks`);
};

/**
 * 특정 게임(slug)에 대한 북마크 토글
 * POST /api/games/{slug}/bookmarks/toggle
 */
export const toggleGameBookmark = (gameSlug) => {
  return api.post(`${BASE_URL}/${gameSlug}/bookmarks/toggle`);
};

/**
 * 내 북마크 게임 리스트 조회 (프로필 페이지용)
 * GET /api/games/bookmarks/me
 */
export const getMyBookmarks = () => {
  return api.get(`${BASE_URL}/bookmarks/me`);
};

// 추천 게임 목록
export const getRecommendedGames = () => {
  return api.get(`${BASE_URL}/recommendations`);
};