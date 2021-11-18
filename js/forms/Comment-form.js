import Form from './Form.js';
import { authCheck } from '../AuthCheck.js';
import { pageTape } from '../pages/PageTape.js';
import { commentsDataLayer } from '../database/CommentsDataLayer.js';
// import { usersDataLayer } from '../database/UsersDataLayer.js';
// import { postsDataLayer } from '../database/PostsDataLayer.js';
// import { pagePhotoGallery } from '../pages/PagePhotoGallery.js';

export default class CommentForm extends Form {

    templateURL = './templates/comment-form-template.html';
    position = 'afterend';

    constructor(form, parentElement) {
        super(form, parentElement);
        this.showCommentForm();        
    }

    async showCommentForm() {
        const commentBlock = document.querySelector('.comment_block');
        if (commentBlock) {
            if (commentBlock.previousSibling.dataset.postId !== this.parentElement.dataset.postId) {
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
                postId : this.parentElement.dataset.postId
            }
            const commentId = await commentsDataLayer.addComment(commentObj);
            // console.log(authCheck.loggedUser);
            console.log(commentId);
            // pageTape.renderTapePage();
        });
    }
}