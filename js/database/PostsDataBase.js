import DataBase from "./DataBase.js";

class PostsDataBase extends DataBase {
    basicURL = '/posts';

    async addPost(body) {
        const response = await this.requestWithFormData(this.basicURL, body, 'POST');
        return response;
    }

    async getAllPosts() {
        const response = await this.get(this.basicURL);
        return response;
    }

    async getOnePost(postId) {
        const URL = `${this.basicURL}/${postId}`;
        const response = await this.get(URL);
        return response;
    }

    async updatePost(postId, body) {
        const URL = `${this.basicURL}/${postId}`;
        const response = await this.requestWithFormData(URL, body, 'PUT');
        return response;
    }

    async deletePost(postId) {
        const URL = `${this.basicURL}/${postId}`;
        const response = await this.delete(URL);
        return response;        
    }
}

export const postsDataBase = new PostsDataBase();