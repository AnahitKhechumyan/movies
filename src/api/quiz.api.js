import {BaseApi} from './base.js';

export class QuizApi extends BaseApi {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
  }

  async getQuestions() {
    try {
      const response = await fetch(this.getFullUrl("quiz?limit=10"));
      const data = await response.json();
      return {
               success: response.status === 200,
               data,
              error: response.status !== 200 ? response.error : null,
            };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  }
};
export const quizApi = new QuizApi("https://simple-blog-api-red.vercel.app/");
