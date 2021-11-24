import PageController from "./PageController.js";
import { postsDataLayer } from "../database/PostsDataLayer.js";
import { usersDataLayer } from "../database/UsersDataLayer.js";
import { authCheck } from "../AuthCheck.js";
import { commentsDataLayer } from "../database/CommentsDataLayer.js";

class PageTape extends PageController {
    limitPosts = 3;
    page = 0;
    optionsForScroll = {
        root: null,
        rootMargin: "0px",
        threshold: 0.25
    };

    async renderTapePage() {
        this.renderWelcomeMsg();
        this.limitPosts = 3;
        this.page = 0;
        const posts = await this.getPostElement(this.limitPosts, this.page);
        this.renderPageIfNonePosts(posts);
        const tape = document.createElement('div');
        tape.classList.add('tape_wrapper');
        this.renderPostElement(posts, tape);
        await this.renderContent(tape);
        this.setInfiniteScroll(posts, tape);
        this.setWidthForComments();
    }

    renderPageIfNonePosts(posts) {  //вынесенно      
        if (!posts.length) {
            const mainContent = document.createElement('h3');
            mainContent.textContent = 'Публикаций пока нет!'
            return this.renderContent(mainContent);
        }
    }

    renderPostElement(posts, tape) { //вынесено
        for (let i = 0; i < posts.length; i++) {
            tape.append(posts[i]);
        }
    }

    async setInfiniteScroll(posts, tape) { //вынесено
        let lastPosts = posts;
        function handleIntersect(entries, observer) {
            entries.forEach(async (entry) => {
                if (lastPosts.length !== 0) {
                    if (entry.isIntersecting) {
                        pageTape.page += 1;
                        const posts = await pageTape.getPostElement(pageTape.limitPosts, pageTape.page);
                        pageTape.renderPostElement(posts, tape);
                        lastPosts = posts;
                    }
                    tapeElementLast = tape.lastElementChild;
                    pageTape.setWidthForComments();
                }
            });
            observer.observe(tapeElementLast);
        }
        const observer = new IntersectionObserver(handleIntersect, this.optionsForScroll);

        let tapeElementLast = tape.lastElementChild;
        if (tapeElementLast) {
            observer.observe(tapeElementLast);
        }
    }

    async getPostElement(limit, offset) {
        const posts = await postsDataLayer.getAllPosts(limit, offset);

        const postsElements = await Promise.all(
            posts.map(async post => { //TODO: ??
                const tapeWrapper = this.setTemplateForPost();
                const tapeElement = tapeWrapper.querySelector('.tape_element');
                tapeElement.dataset.postId = post._id;

                this.setImgAndTitleForPost(post, tapeWrapper);
                await this.setCaptionForPost(post, tapeWrapper);
                this.setColorLike(post.likesAuthor.includes(this.authUserId), tapeElement);
                this.renderCommentsForPost(post, tapeElement);

                this.addHideButtonForComments(tapeElement);
                return tapeWrapper;
            })
        )
        return postsElements;
    }

    setTemplateForPost() { //вынесенно
        const tapeElementTempalte = document.querySelector('#tape_element_template');
        const tapeWrapper = tapeElementTempalte.content.cloneNode(true);
        return tapeWrapper;
    }

    setImgAndTitleForPost(post, tapeWrapper) { //вынесенно
        const photoImg = tapeWrapper.querySelector('.photo');
        photoImg.src = `data:image/jpeg;base64, ${post.photo}`;

        const title = tapeWrapper.querySelector('.title');
        if (post.title) {
            title.innerText = post.title;
        }
    }

    async setCaptionForPost(post, tapeWrapper) { //вынесенно
        const timePost = tapeWrapper.querySelector('.time-post');
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(post.date);
        timePost.innerText = date.toLocaleDateString('ru-RU', optionsDate);

        const author = tapeWrapper.querySelector('.author');
        const nameAuthor = await usersDataLayer.getAuthor(post._id);
        author.innerText = `Автор: ${nameAuthor.firstName} ${nameAuthor.secondName}`;

        const likes = tapeWrapper.querySelector('.count_likes');
        likes.innerText = post.likesAuthor.length;

        const commentBtn = tapeWrapper.querySelector('.comment_add_btn');

        if (!authCheck.checkLoggedUser()) {
            commentBtn.classList.add('comment_btn_hide');
        }
    }

    renderCommentsForPost(post, tapeElement) { //вынесенно

        const comments = this.createComments(post.comments);
        for (let comment of comments) {
            if (comment.dataset.answerOn) {
                const parentElement = tapeElement.querySelector(`.comment[data-comment-id='${comment.dataset.answerOn}']`);
                parentElement.after(comment);
            } else {
                tapeElement.append(comment);
            }
        }
    }

    addHideButtonForComments(tapeElement) { //вынесенно
        const commentsEl = tapeElement.querySelectorAll('.comment');
        if (commentsEl.length > 2) {
            for (let i = 2; i < commentsEl.length; i++) {
                commentsEl[i].classList.add('hide');
            }
            const showAllComments = this.createButtonInComment('show', '▼ показать все комментарии ▼');
            tapeElement.append(showAllComments);
        }
    }

    showAllComments(element) {
        const mainElement = element.closest('.tape_element');
        const hidedComments = mainElement.querySelectorAll('.hide');
        for (let i = 0; i < hidedComments.length; i++) {
            hidedComments[i].classList.remove('hide');
        }
        this.setWidthForComments();
        element.textContent = '▲ скрыть последнии комментарии ▲';
        element.setAttribute('data-button-action', 'comment-hide');
    }

    hideComments(element) {
        const mainElement = element.closest('.tape_element');
        const comments = mainElement.querySelectorAll('.comment');
        for (let i = 2; i < comments.length; i++) {
            comments[i].classList.add('hide');
        }
        this.setWidthForComments();
        element.textContent = '▼ показать все комментарии ▼';
        element.setAttribute('data-button-action', 'comment-show');
    }

    createComments(comments) {
        let commentElementsArr = [];
        let answerArray = [];

        for (let comment of comments) {
            if (!comment.isAnswer) {
                const commentElement = this.formationComment(comment);
                commentElementsArr.push(commentElement);
            }
            if (comment.hasAnswer.length) {
                answerArray = [];
                for (let i = 0; i < comment.hasAnswer.length; i++) {
                    for (let element of comments) {
                        if (comment.hasAnswer[i] === element._id) {
                            const answer = element;
                            const answerElement = this.formationComment(answer);
                            answerArray.push(answerElement);
                        }
                    }
                }
                if (answerArray.length) {
                    commentElementsArr = commentElementsArr.concat(answerArray.reverse());

                }
            }
        }
        return commentElementsArr;
    }

    formationComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        if (comment.isAnswer) {
            commentElement.classList.add('answer');
            commentElement.setAttribute('data-answer-on', comment.isAnswer);
        }
        commentElement.setAttribute('data-comment-id', comment._id);

        const commentAuthor = this.createContentForComment('h4', comment.authorName);
        const commentText = this.createContentForComment('p', comment.text);
        const answerCommentBtn = this.createButtonInComment('answer', 'ответить');
        const deleteCommentBtn = this.createButtonInComment('delete', 'удалить');

        commentElement.append(commentAuthor, commentText);

        if (this.authUserId === comment.authorId) {
            commentElement.append(deleteCommentBtn);
        }
        if (authCheck.checkLoggedUser()) {
            commentElement.append(answerCommentBtn);
        }
        return commentElement;
    }

    createContentForComment(teg, textContent) { //вынесено
        const element = document.createElement(teg);
        element.textContent = textContent;
        return element;
    }

    createButtonInComment(action, textContent) { //вынес из renderComments();
        const button = document.createElement('button');
        button.classList.add(`comment_${action}_btn`);
        button.textContent = textContent;
        button.setAttribute('data-button-action', `comment-${action}`);
        return button;
    }

    async deleteComment(commentElement) {
        const deletedComment = await commentsDataLayer.deleteComment(commentElement.dataset.commentId);
        const mainElement = commentElement.closest('.tape_element');
        commentElement.remove();
        const comments = mainElement.querySelectorAll('.comment');
        if (comments.length <= 2) {
            const showBtn = mainElement.querySelector('.comment_show_btn');
            if (showBtn) {
                showBtn.remove();
            }
        }
        this.setWidthForComments();
    }

    async addOrDeleteLike(tapeElement) {
        const fakePost = {
            likesAuthor: this.authUserId
        }
        const hasLike = await postsDataLayer.updatePostForLike(tapeElement.dataset.postId, fakePost);
        this.setColorLike(hasLike, tapeElement);
        await this.renderCountLikes(tapeElement);
    }

    setColorLike(condition, tapeElement) { //вынес из addOrDeleteLike & getPostElement;
        const imgLike = tapeElement.querySelector('.like_img');
        if (condition) {
            imgLike.src = "/assets/img/liked.png";
        } else {
            imgLike.src = "/assets/img/like.png";
        }
    }

    async renderCountLikes(tapeElement) {
        const likes = tapeElement.querySelector('.count_likes');
        const post = await postsDataLayer.getOnePost(tapeElement.dataset.postId);
        likes.innerText = post.likesAuthor.length;
    }

    setWidthForComments() {
        const commentsElements = document.querySelectorAll('.comment');

        for (let i = 0; i < commentsElements.length; i++) {
            const post = commentsElements[i].closest('.tape_element');
            this.setBorderRadiusForCommnet(commentsElements[i], 1);

            if (commentsElements[i].classList.contains('answer')) {
                const widthParent = commentsElements[i - 1].offsetWidth;
                const postWidth = post.offsetWidth;
                const width = Math.round((widthParent * 100) / postWidth);

                if (width >= 30 && commentsElements[i].dataset.answerOn === commentsElements[i].previousElementSibling.dataset.commentId) {
                    this.setWidthAndMarginForPost(commentsElements[i], `${width - 5}%`, `${100 - width + 2.5}%`);
                    this.setBorderRadiusForCommnet(commentsElements[i], 1);
                } else if (commentsElements[i].dataset.answerOn !== commentsElements[i].previousElementSibling.dataset.commentId) {
                    this.setWidthAndMarginForPost(commentsElements[i], `${width}%`, `${100 - width - 2.5}%`);
                    this.setBorderRadiusForCommnet(commentsElements[i], 2);
                } else {
                    this.setWidthAndMarginForPost(commentsElements[i], '25%', '72.5%');
                    this.setBorderRadiusForCommnet(commentsElements[i], 2);

                }
            }
        }
    }

    setBorderRadiusForCommnet(commentElement, condition) {

        if (condition === 1) {
            if (commentElement.nextElementSibling && commentElement.nextElementSibling.classList.contains('answer') && !commentElement.nextElementSibling.classList.contains('hide')) {
                commentElement.style.borderBottomRightRadius = '0';
            } else {
                commentElement.style.borderBottomRightRadius = '7px';
            }
        } else if (condition === 2) {
            if (commentElement.classList.contains('answer') && !commentElement.nextElementSibling.classList.contains('hide')) {
                commentElement.previousElementSibling.style.borderBottomLeftRadius = '0';
                commentElement.previousElementSibling.style.borderBottomRightRadius = '0';
            } else {
                commentElement.previousElementSibling.style.borderBottomLeftRadius = '7px';
                commentElement.previousElementSibling.style.borderBottomRightRadius = '7px';
            }
        }
        
        // else if (condition === 3) {
        //     if (commentElement.nextElementSibling && commentElement.nextElementSibling.classList.contains('answer') && !commentElement.nextElementSibling.classList.contains('hide')) {
        //         commentElement.style.borderBottomLeftRadius = '0';
        //         commentElement.previousElementSibling.style.borderBottomLeftRadius = '0';
        //     } else {
        //         commentElement.style.borderBottomLeftRadius = '7px';
        //     }
        // }
    }

    setWidthAndMarginForPost(commentElement, width, margin) {
        commentElement.style.width = width;
        commentElement.style.marginLeft = margin;
    }
}

export const pageTape = new PageTape();