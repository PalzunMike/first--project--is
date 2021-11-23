import PageController from "./PageController.js";
import { postsDataLayer } from "../database/PostsDataLayer.js";
import { usersDataLayer } from "../database/UsersDataLayer.js";
import { authCheck } from "../AuthCheck.js";
import { commentsDataLayer } from "../database/CommentsDataLayer.js";

class PageTape extends PageController {

    async renderTapePage() {
        this.renderWelcomeMsg();
        const limitPosts = 3;
        let page = 0;

        const posts = await this.getPostElement(limitPosts, page);

        if (!posts.length) {
            const mainContent = document.createElement('h3');
            mainContent.textContent = 'Публикаций пока нет!'
            return this.renderContent(mainContent);
        }

        const tape = document.createElement('div');
        tape.classList.add('tape_wrapper');

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
                    pageTape.setWidthForComments();
                }
            });

            observer.observe(tapeLast);
        }
        const observer = new IntersectionObserver(handleIntersect, options);

        let tapeLast = tape.lastElementChild;
        if (tapeLast) {
            observer.observe(tapeLast);
        }

        this.setWidthForComments();
    }

    async getPostElement(limit, offset) {
        const posts = await postsDataLayer.getAllPosts(limit, offset);

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

                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].dataset.answerOn) {
                        const parentElement = divTapeEl.querySelector(`.comment[data-comment-id='${comments[i].dataset.answerOn}']`);
                        parentElement.after(comments[i]);
                    } else {
                        divTapeEl.append(comments[i]);
                    }
                }
                const commentsEl = divTapeEl.querySelectorAll('.comment');

                if (commentsEl.length > 2) {
                    for (let i = 2; i < commentsEl.length; i++) {
                        commentsEl[i].classList.add('hide');
                    }
                }

                if (commentsEl.length > 2) {
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

    showAllComments(element) {
        const mainElement = element.closest('.tape_element');
        const hidedComments = mainElement.querySelectorAll('.hide');
        for (let i = 0; i < hidedComments.length; i++) {
            hidedComments[i].classList.remove('hide');
        }
        this.setWidthForComments();
        element.textContent = '▲ скрыть последнии комментарии ▲';
        element.setAttribute('data-button-action', 'hide_comments');
    }

    hideComments(element) {
        const mainElement = element.closest('.tape_element');
        const comments = mainElement.querySelectorAll('.comment');
        for (let i = 2; i < comments.length; i++) {
            comments[i].classList.add('hide');
        }
        this.setWidthForComments();
        element.textContent = '▼ показать все комментарии ▼';
        element.setAttribute('data-button-action', 'show_comments');
    }

    renderComments(comments) {
        const commentElements = comments.map(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            if (comment.isAnswer) {
                commentElement.classList.add('answer');
                commentElement.setAttribute('data-answer-on', comment.isAnswer);
            }
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
        if (comments.length <= 2) {
            const showBtn = mainElement.querySelector('.show_all_comments');
            showBtn.remove();
        }
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

    async answerComment(linkElement) {
        console.log(linkElement);
    }

    setWidthForComments() {
        const commentsElements = document.querySelectorAll('.comment');

        for (let i = 0; i < commentsElements.length; i++) {
            const post = commentsElements[i].closest('.tape_element');

            if (commentsElements[i].nextElementSibling && commentsElements[i].nextElementSibling.classList.contains('answer') && !commentsElements[i].nextElementSibling.classList.contains('hide')) {
                commentsElements[i].style.borderBottomRightRadius = '0';
            } else {
                commentsElements[i].style.borderBottomRightRadius = '7px';
            }

            if (commentsElements[i].classList.contains('answer')) {
                const widthParent = commentsElements[i - 1].offsetWidth;
                const postWidth = post.offsetWidth;
                const width = Math.round((widthParent * 100) / postWidth);
                if (width >= 30) {
                    commentsElements[i].style.width = `${width - 5}%`;
                    commentsElements[i].style.marginLeft = `${100 - width + 2.5}%`;
                } else {
                    commentsElements[i].style.width = '25%';
                    commentsElements[i].style.marginLeft = '72.5%';
                }
            }
        }
    }
}

export const pageTape = new PageTape();