import { Units } from "@/types";
import Lifts from "./Lifts";
import { firestore } from "firebase";

export default class User extends Lifts {
  static fromDoc(doc: firestore.DocumentSnapshot) {
    return new User(doc.id, doc.data());
  }

  public units: Units = Units.METRIC;
  public email?: string;

  constructor(public uid: string, props: Partial<User> = {}) {
    super();
    Object.assign(this, props);
  }
}
