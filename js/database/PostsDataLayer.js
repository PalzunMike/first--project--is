import DataLayer from "./DataLayer.js";

class PostsDataLayer extends DataLayer {
    basicURL = '/posts';

    async addPost(body) {
        const response = await this.requestWithFormData(this.basicURL, body, 'POST');
        return response;
    }

    async getAllPosts(limit, offset) {
        let query = { limit, offset };
        query = JSON.stringify(query);
        const URL = `${this.basicURL}/tape/${query}`;
        const response = await this.get(URL);
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

    async updatePostForLike(postId, body) {
        const URL = `${this.basicURL}/updateLike/${postId}`;
        const response = await this.put(URL, body);
        return response;
    }

    async deletePost(postId) {
        const URL = `${this.basicURL}/${postId}`;
        const response = await this.delete(URL);
        return response;
    }
}

export const postsDataLayer = new PostsDataLayer();