import { create } from "zustand";
import { persist } from "zustand/middleware"

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';

//로그인한 유저 정보를 저장해서 component에 공유한다. 유저가 로그아웃 했을 때 정보가 삭제된다.
const useUserStore = create(
  persist(
    (set) => ({
      user:null,
      setCurrentUser:(user) =>    //user 정보 저장하기(로그인)
        set({
          user,
          lastAction: SET_CURRENT_USER,
        }),
      clearCurrentUser: () =>   //user 정보 삭제하기(로그아웃)
        set({
          user:null,
          lastAction:CLEAR_CURRENT_USER,
        }),
    }),
    {name:'currentUser'}
  )
)

export default useUserStore;