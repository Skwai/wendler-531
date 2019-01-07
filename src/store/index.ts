import Vue from "vue";
import Vuex, { Store } from "vuex";

import State from "./state";
import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Store({
  actions,
  getters,
  mutations,
  state: new State()
});
