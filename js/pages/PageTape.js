import PageController from "./PageController.js";
import { template } from "../TemplateEngine.js";
import { postsDataLayer } from "../database/PostsDataLayer.js";
import { usersDataLayer } from "../database/UsersDataLayer.js";
import { authCheck } from "../AuthCheck.js";
import { commentsDataLayer } from "../database/CommentsDataLayer.js";

class PageTape extends PageController {

    // writtingComment = false;

    async renderTapePage() {
        this.renderWelcomeMsg();
        const limitPosts = 3;
        let page = 0;
        const tape = document.createElement('div');
        tape.classList.add('tape_wrapper');

        const posts = await this.getPostElement(limitPosts, page);

        for (let i = 0; i < posts.length; i++) {
            tape.append(posts[i]);
        }
        await this.renderContent(tape);

        let lastPosts = posts;

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        };

        function handleIntersect(entries, observer) {
            entries.forEach(async (entry) => {
                if (lastPosts.length !== 0) {
                    if (entry.isIntersecting) {
                        page += 1;
                        const posts = await pageTape.getPostElement(limitPosts, page);
                        for (let i = 0; i < posts.length; i++) {
                            tape.append(posts[i]);
                        }
                        lastPosts = posts;
                    }
                    tapeLast = tape.lastElementChild;
                }

            });
            observer.observe(tapeLast);
        }
        const observer = new IntersectionObserver(handleIntersect, options);

        let tapeLast = tape.lastElementChild;
        observer.observe(tapeLast);
    }

    async getPostElement(limit, offset) {
        const posts = await postsDataLayer.getAllPosts(limit, offset);

        if (!posts) {
            const mainContent = document.createElement('h3');
            mainContent.textContent = 'Публикаций пока нет!'
            this.renderContent(mainContent);
        }

        const postsElements = await Promise.all(
            posts.map(async post => {
                const tapeElementTempalte = document.querySelector('#tape_element_template');
                const tapeElement = tapeElementTempalte.content.cloneNode(true);

                const divTapeEl = tapeElement.querySelector('.tape_element');
                divTapeEl.dataset.postId = post._id;                

                const photoImg = tapeElement.querySelector('.photo');
                photoImg.src = `data:image/jpeg;base64, ${post.photo}`;

                const title = tapeElement.querySelector('.title');
                if (post.title) {
                    title.innerText = post.title;
                }

                const timePost = tapeElement.querySelector('.time-post');
                const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
                const date = new Date(post.date);
                timePost.innerText = date.toLocaleDateString('ru-RU', optionsDate);

                const author = tapeElement.querySelector('.author');
                const nameAuthor = await usersDataLayer.getAuthor(post._id);
                author.innerText = `Автор: ${nameAuthor.firstName} ${nameAuthor.secondName}`;

                const imgLike = tapeElement.querySelector('.like_img');
                if (post.likesAuthor.includes(this.authUserId)) {
                    imgLike.src = "/assets/img/liked.png";
                } else {
                    imgLike.src = "/assets/img/like.png";
                }
                const likes = tapeElement.querySelector('.count_likes');
                likes.innerText = post.likesAuthor.length;

                const commentBtn = tapeElement.querySelector('.comment_add_btn');

                if (!authCheck.checkLoggedUser()) {
                    commentBtn.classList.add('comment_btn_hide');
                }

                const comments = this.renderComments(post.comments);

                if (comments.length > 2) {
                    for (let i = 2; i < comments.length; i++) {
                        comments[i].classList.add('hide');
                    }                    
                }

                for (let i = 0; i < comments.length; i++) {
                   divTapeEl.append(comments[i]);
                }

                if (comments.length > 2){
                    const showAllComments = document.createElement('button');
                    showAllComments.classList.add('show_all_comments');
                    showAllComments.textContent = '▼ показать все комментарии ▼';
                    showAllComments.setAttribute('data-button-action', 'show_comments');
                    divTapeEl.append(showAllComments);
                }

                return tapeElement;
            })
        )
        return postsElements;
    }

    showAllComments(element){
        const mainElement = element.closest('.tape_element');
        const hidedComments = mainElement.querySelectorAll('.hide');        
            for (let i = 0; i < hidedComments.length; i++ ){
                hidedComments[i].classList.remove('hide');
            }
        element.textContent = '▲ показать все комментарии ▲';
        element.setAttribute('data-button-action', 'hide_comments'); 
    }

    hideComments(element){
        const mainElement = element.closest('.tape_element');
        const comments = mainElement.querySelectorAll('.comment');        
            for (let i = 2; i < comments.length; i++ ){
                comments[i].classList.add('hide');
            }
        element.textContent = '▼ показать все комментарии ▼';
        element.setAttribute('data-button-action', 'show_comments'); 
    }

    renderComments(comments) {
        const commentElements = comments.map(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.setAttribute('data-comment-id', comment._id);

            const commentAuthor = document.createElement('h4');
            commentAuthor.textContent = comment.authorName;

            const commentText = document.createElement('p');
            commentText.textContent = comment.text;

            const answerCommentBtn = document.createElement('button');
            answerCommentBtn.classList.add('comment_answer_btn');
            answerCommentBtn.textContent = 'ответить';
            answerCommentBtn.setAttribute('data-button-action', 'comment-answer');

            const deleteCommentBtn = document.createElement('button');
            deleteCommentBtn.classList.add('comment_delete_btn');
            deleteCommentBtn.textContent = 'удалить';
            deleteCommentBtn.setAttribute('data-button-action', 'comment-delete');

            commentElement.append(commentAuthor);
            commentElement.append(commentText);
            if (this.authUserId === comment.authorId) {
                commentElement.append(deleteCommentBtn);
            }
            if (authCheck.checkLoggedUser()) {
                commentElement.append(answerCommentBtn);
            }
            return commentElement;
        })
        return commentElements;
    }

    async deleteComment(commentElement) {
        const deletedComment = await commentsDataLayer.deleteComment(commentElement.dataset.commentId);
        const mainElement = commentElement.closest('.tape_element');
        commentElement.remove();
        const comments = mainElement.querySelectorAll('.comment');
        if (comments.length <= 2){
            const showBtn = mainElement.querySelector('.show_all_comments');
            showBtn.remove();
        }
        console.log(comments.length);
        
    }

    async addOrDeleteLike(tapeElement) {
        const imgLike = tapeElement.querySelector('.like_img');
        const fakePost = {
            likesAuthor: this.authUserId
        }
        const hasLike = await postsDataLayer.updatePostForLike(tapeElement.dataset.postId, fakePost);
        if (hasLike) {
            imgLike.src = "/assets/img/liked.png";
        } else {
            imgLike.src = "/assets/img/like.png";
        }
        await this.renderCountLikes(tapeElement);
    }

    async renderCountLikes(tapeElement) {
        const likes = tapeElement.querySelector('.count_likes');
        const post = await postsDataLayer.getOnePost(tapeElement.dataset.postId);
        likes.innerText = post.likesAuthor.length;
    }
}

export const pageTape = new PageTape();