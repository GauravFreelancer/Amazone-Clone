import { IProduct } from "./Product";
import firebase from 'firebase';

export interface State {
    basket: IProduct[],
    user: firebase.User | null
}