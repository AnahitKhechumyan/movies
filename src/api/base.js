export class BaseApi {
    getFullUrl(endpoint) {
        return `${this.baseUrl}${endpoint}`;
    }
  };