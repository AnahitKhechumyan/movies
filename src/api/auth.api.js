import {BaseApi} from './base.js';
import { Storage } from "../utils/storage.js"; 

export class AuthApi extends BaseApi {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
  }
  async signin(values) {
    try {
      if (!values.email || !values.password) {
        throw new Error("Please fill in all fields");
      }

      const response = await fetch(`${this.baseUrl}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(
          {
            "email": values.email,
            "password": values.password
            }
        ),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.token) {
        Storage.set("token", data.token);  
        Storage.set("user", data.user);  
      }

      return data;
    } catch (error) {
      console.error("Error in signin method:", error);
      throw error;
    }
  }

};