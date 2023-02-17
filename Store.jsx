import { makeAutoObservable } from 'mobx';
import * as sdk from "matrix-js-sdk";

class UserStore {
  baseUrl = "https://matrix.org";
  username = "kwado9";
  pass = "kwadoneuf";
  user_id = "@" + this.username + ":" + this.baseUrl.split("//")[1];
  token = "";
  rooms = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setUsername(username) {
    this.username = username;
    this.user_id = "@" + username + ":" + this.baseUrl.split("//")[1];
  }

  setPass(pass) {
    this.pass = pass;
  }

  setToken(token) {
    this.token = token;
  }

  setRooms(rooms) {
    this.rooms = rooms;
  }

  get utilisateur() {
    return sdk.createClient({
      baseUrl: this.baseUrl,
      accessToken: this.token,
      userId: this.user_id,
    });
  }
}

const userStore = new UserStore();
export default userStore;
