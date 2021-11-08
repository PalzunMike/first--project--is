import DataBase from "./DataBase.js";

class PostsDataBase extends DataBase {
    basicURL = '/posts';

    async addPost(body) {
        try {
            const response = await fetch(`${this.proxyURL}${this.basicURL}`, { method: 'POST', body: body });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }
            return data;
        } catch (e) {
            return e;
        }
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

    async deletePost(postId) {
        const URL = `${this.basicURL}/${postId}`;
        const response = await this.delete(URL);
        return response;        
    }
}

export const postsDataBase = new PostsDataBase();