import Form from './Form.js';
import { authCheck } from '../AuthCheck.js';
import { pageTape } from '../pages/PageTape.js';
import { commentsDataLayer } from '../database/CommentsDataLayer.js';

export default class CommentForm extends Form {

    templateURL = './templates/comment-form-template.html';
    position = 'afterend';

    constructor(form, parentElement, element) {
        super(form, parentElement);
        this.relatedElement = element;
        this.showCommentForm();
    }

    async showCommentForm() {
        const commentBlock = document.querySelector('.comment_block');
        if (commentBlock) {
            if (commentBlock.closest('.tape_element').dataset.postId !== this.relatedElement.dataset.postId) {
                await this.getTemplate(this.templateURL);
                this.onSubmit();
            }
            commentBlock.remove();
        } else {
            await this.getTemplate(this.templateURL);
            this.onSubmit();
        }
    }

    async onSubmit() {
        this.addEventListenerOnSubmit(async (e) => {
            e.preventDefault();
            const commentObj = {
                authorId: `${authCheck.loggedUser._id}`,
                authorName: `${authCheck.loggedUser.firstName} ${authCheck.loggedUser.secondName}`,
                text: `${this.formElement.comment.value}`,
                postId: this.relatedElement.dataset.postId
            }

            const comments = await commentsDataLayer.addComment(commentObj);
            const commentsElements = pageTape.renderComments(comments.comments);

            if (comments.comments.length > 1) {
                const lastCommentId = commentsElements[comments.comments.length - 2].dataset.commentId;
                const lastComment = document.querySelector(`.comment[data-comment-id='${lastCommentId}']`);
                lastComment.after(commentsElements[comments.comments.length - 1]);
            } else {
                this.parentElement.after(commentsElements[comments.comments.length - 1]);
            }
            const commentBlock = document.querySelector('.comment_block');
            commentBlock.remove();

        });
    }
}