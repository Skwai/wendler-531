import { ActionContext } from "vuex";
import State from "./state";
import * as types from "./types";
import * as auth from "../services/auth";
import { db } from "../services/firebase";
import User from "@/models/User";

interface IActionContext extends ActionContext<State, any> {}

const userDocRef = (uid: string) => db.collection("users").doc(uid);

export const login = async ({ commit }: IActionContext): Promise<void> => {
  commit(types.SET_AUTHENTICATING);
  try {
    const userRecord = await auth.login();
    const userInfo = userRecord.user!.toJSON();
    commit(types.SET_USER_INFO, userInfo);
  } catch (err) {
    if (err.message) {
      console.error(err.message);
    }
    throw err;
  } finally {
    commit(types.RESET_AUTHENTICATING);
  }
};

export const loadSession = async ({ commit }: IActionContext): Promise<void> => {
  commit(types.SET_AUTHENTICATING);
  const userInfo = await auth.getCurrentUser();

  if (userInfo) {
    commit(types.SET_USER_INFO, userInfo);
  }

  commit(types.RESET_AUTHENTICATING);
};

export const logout = ({ commit }: IActionContext): void => {
  commit(types.RESET_STATE);
};

export const loadOrCreateUser = async ({ commit }: IActionContext, uid: string): Promise<void> => {
  const ref = userDocRef(uid);
  const doc = await ref.get();

  if (doc.exists) {
    commit(types.SET_CURRENT_USER, User.fromDoc(doc));
    return;
  }

  const user = new User(uid);
  commit(types.SET_CURRENT_USER, user);
  await ref.set({
    ...user
  });
};

export const updateOneRepMax = async (
  { commit, getters }: IActionContext,
  { lift, value }: { lift: string; value: number }
): Promise<void> => {
  const { uid } = getters;
  const ref = userDocRef(uid);
  await ref.update({
    [lift]: value
  });
  const doc = await ref.get();
  commit(types.SET_CURRENT_USER, User.fromDoc(doc));
};
