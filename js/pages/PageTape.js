import PageController from "./PageController.js";
import { postsDataLayer } from "../database/PostsDataLayer.js";
import { usersDataLayer } from "../database/UsersDataLayer.js";

class PageTape extends PageController {

    async renderTapePage() {
        const posts = await postsDataLayer.getAllPosts();

        const tape = document.createElement('div');
        tape.classList.add('tape_wrapper');

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

                const likes = tapeElement.querySelector('.count_likes');
                likes.innerText = post.likesAuthor.length;
                return tapeElement;
            })
        )
        for (let i = 0; i < postsElements.length; i++) {
            tape.append(postsElements[i]);
        }
        await this.renderContent(tape);
    }    

    async checkLike(tapeElement) {
        const likedPost = await postsDataLayer.getOnePost(tapeElement.dataset.postId);
        const likesArray = likedPost.likesAuthor;

        const hasLike = likesArray.includes(this.authUserId);

        if (hasLike) {
            const likeIndex = likesArray.indexOf(this.authUserId);
            likesArray.splice(likeIndex, 1);            
        } else {
            likesArray.push(this.authUserId);            
        }
        const fakePost = {
            likesAuthor: likesArray
        }
        await postsDataLayer.updatePostForLike(tapeElement.dataset.postId, fakePost);

        this.renderCoutLikes(tapeElement);
    }

    async renderCoutLikes(tapeElement){
        const likes = tapeElement.querySelector('.count_likes');
        const post = await postsDataLayer.getOnePost(tapeElement.dataset.postId);
        likes.innerText = post.likesAuthor.length;
    }
}

export const pageTape = new PageTape();