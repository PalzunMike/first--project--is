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
        await this.templateInited;
        const commentBlock = document.querySelector('.comment_block');
        if (commentBlock) {
            if (commentBlock.closest('.tape_element').dataset.postId !== this.relatedElement.dataset.postId || commentBlock.previousElementSibling !== this.parentElement) {
                this.renderCommentForm();
            }
            commentBlock.remove();
        } else {
            this.renderCommentForm();
        }
    }

    async renderCommentForm() {
        await this.getTemplate(this.templateURL);
        if (this.parentElement.classList.contains('comment')) {
            await this.templateInited;
            this.formElement.comment.value = `${this.parentElement.children[0].innerText},`;
        }
        this.onSubmit();
    }

    showCommentAfterSubmit(postComments) {
        const commentsElements = pageTape.createComments(postComments.comments);

        if (postComments.comments.length > 1 && !this.parentElement.classList.contains('comment')) {
            const lastCommentId = commentsElements[postComments.comments.length - 2].dataset.commentId;
            const lastComment = document.querySelector(`.comment[data-comment-id='${lastCommentId}']`);
            lastComment.after(commentsElements[postComments.comments.length - 1]);
        } else {
            this.parentElement.after(commentsElements[postComments.comments.length - 1]);
        }
        const commentBlock = document.querySelector('.comment_block');
        commentBlock.remove();
        pageTape.setWidthForComments();
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

            if (this.parentElement.classList.contains('comment')) {
                commentObj.isAnswer = this.parentElement.dataset.commentId;
            }

            const postComments = await commentsDataLayer.addComment(commentObj);
            this.showCommentAfterSubmit(postComments);
        });
    }
}