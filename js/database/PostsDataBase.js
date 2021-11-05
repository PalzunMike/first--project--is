import DataBase from "./DataBase.js";

class PostsDataBase extends DataBase {
    async addPost(body) {
        try {
            const response = await fetch(`${this.proxyURL}/posts`, { method: 'POST', body: body });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }
            return data;
        } catch (e) {
            return e;
        }
    }

    async deletePhoto(body) {
        body = { path: body };
        const URL = '/upload/delete';
        const response = await this.post(URL, body);
        return response;
    }
}

export const postsDataBase = new PostsDataBase();