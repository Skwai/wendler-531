import firebase from "firebase";
import "firebase/firestore";
import { FIREBASE } from "../config";

export const app = firebase.initializeApp(FIREBASE);

export const db = app.firestore();
db.settings({ timestampsInSnapshots: true });

export const storage = firebase.storage();
