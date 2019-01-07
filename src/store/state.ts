import User from "@/models/User";

export default class State {
  authenticating = false;
  userInfo: firebase.UserInfo | null = null;
  currentUser: User | null = null;
}
