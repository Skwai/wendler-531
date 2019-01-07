import { MutationTree } from "vuex";
import State from "./state";
import * as types from "./types";
import User from "@/models/User";

const mutations: MutationTree<State> = {
  [types.SET_USER_INFO]: (state, userInfo: firebase.UserInfo) => {
    state.userInfo = userInfo;
  },

  [types.SET_CURRENT_USER]: (state, currentUser: User) => {
    state.currentUser = currentUser;
  },

  [types.SET_AUTHENTICATING]: (state) => {
    state.authenticating = true;
  },

  [types.RESET_AUTHENTICATING]: (state) => {
    state.authenticating = false;
  },

  [types.RESET_STATE]: (state) => {
    Object.assign(state, new State());
  }
};

export default mutations;
