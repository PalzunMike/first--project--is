import DataLayer from "./DataLayer.js";

class CommentsDataLayer extends DataLayer {
    basicURL = '/comments';

    async addComment(body) {
        const response = await this.post(this.basicURL, body);
        return response;
    }

    async deleteComment(commentId) {
        const URL = `${this.basicURL}/${commentId}`;
        const response = await this.delete(URL);
        return response;
    }
}

export const commentsDataLayer = new CommentsDataLayer();