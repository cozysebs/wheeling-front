import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const BASE_URL = BASE_API_URL+"/api/user";

class UserService {
  changeRole(role) {
    return axios.put(BASE_URL+"/change/"+role, {}, {headers:authHeader()})  //axios.put(url, data, headers)
  }
}

const userService = new UserService();
export default userService;