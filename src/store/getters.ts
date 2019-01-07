import State from "./state";
import User from "@/models/User";
import { Units } from "@/types";
import Lifts from "@/models/Lifts";

export const isAuthenticated = (state: State): boolean => !!state.userInfo;

export const userInfo = (state: State): firebase.UserInfo | undefined =>
  state.userInfo || undefined;

export const currentUser = (state: State): User | undefined => state.currentUser || undefined;

export const uid = (state: State): string | undefined =>
  (state.userInfo && state.userInfo.uid) || undefined;

export const lifts = ({ currentUser }: State): Lifts => {
  if (!currentUser) {
    return new Lifts();
  }

  const { deadlift, squat, benchPress, shoulderPress } = currentUser;
  return { deadlift, squat, benchPress, shoulderPress };
};

export const units = (state: State): string => {
  const unit = (state.currentUser && state.currentUser.units) || Units.METRIC;

  if (unit === Units.IMPERIAL) {
    return "lb";
  }

  return "kg";
};
