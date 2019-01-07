import firebase from "firebase";

const google = new firebase.auth.GoogleAuthProvider();

google.addScope(["https://www.googleapis.com/auth/userinfo.email"].join(","));

export const login = () => firebase.auth().signInWithPopup(google);

export const logout = () => firebase.auth().signOut();

export const currentUser = (): firebase.User | undefined =>
  firebase.auth().currentUser || undefined;

export const getCurrentUser = (): Promise<firebase.User | null> => {
  const authUser = currentUser();

  if (authUser) {
    return Promise.resolve(authUser);
  }

  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject("No authenticated user found");
      }
    });
  });
};
