import DataLayer from "./DataLayer.js";

class LikesDataLayer extends DataLayer {
    basicURL = '/likes';

    async addLike(body) {
        const response = await this.post(this.basicURL, body);
        return response;
    }

    async deleteLike(body) {
        const response = await this.delete(this.basicURL, body);
        return response;
    }
}

export const likesDataLayer = new LikesDataLayer();