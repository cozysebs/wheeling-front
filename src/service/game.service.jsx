import axios from "axios";
import { BASE_API_URL } from "../common/constants";

// 백엔드 GameController 기준 BASE URL
const BASE_URL = `${BASE_API_URL}/api/games`;

/**
 * gamesConfig(games 배열) 전체를 백엔드로 동기화
 * @param {Array} gamesPayload - 프론트에서 관리하는 게임 메타 정보 배열
 * @returns {Promise}
 */

export const syncGamesService = (gamesPayload) => {
  return axios.post(`${BASE_URL}/sync`, gamesPayload);
};