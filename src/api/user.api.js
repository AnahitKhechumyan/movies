import { Storage } from '../utils/storage.js';
import { BaseApi } from "./base.js";

export class UserApi extends BaseApi{
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
  }

  async getUser(){
    try {
       
      const token = Storage.getItem('token')

      const response = await fetch(this.getFullUrl('/user'),{
        headers:{
          "Authorization": `Bearer ${token}`,
        },
        
      });

      this.validateResponse(response);
     
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      
      const user = await response.json();

      return user;
    } catch (error) {
      console.error(error);
    }
  }

};

export const isUserSignIn = () => {
    const user = Storage.getItem("user");
    const token = Storage.getItem("token");
    if (user && token) {
      return true;
    }
  
    return false;
  };