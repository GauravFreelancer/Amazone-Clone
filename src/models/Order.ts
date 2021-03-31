import firebase from "firebase";

export interface IOrder {
  id: string;
  data: firebase.firestore.DocumentData;
}
