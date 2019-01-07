import { Units } from "@/types";
import Lifts from "./Lifts";
import { firestore } from "firebase";

export default class User extends Lifts {
  static fromDoc(doc: firestore.DocumentSnapshot) {
    return Object.assign(new User(doc.id), doc.data());
  }

  public units: Units = Units.METRIC;

  constructor(public uid: string) {
    super();
  }
}
