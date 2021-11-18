import DataLayer from "./DataLayer.js";

class CommentsDataLayer extends DataLayer {
    basicURL = '/comments';

    async addComment(body) {
        const response = await this.post(this.basicURL, body);
        return response;
    }

    async deleteComment(body) {
        const response = await this.delete(this.basicURL, body);
        return response;
    }
}

export const commentsDataLayer = new CommentsDataLayer();