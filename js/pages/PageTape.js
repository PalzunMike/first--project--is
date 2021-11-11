import PageController from "./PageController.js";
import { postsDataLayer } from "../database/PostsDataLayer.js";
import { usersDataLayer } from "../database/UsersDataLayer.js";

class PageTape extends PageController {

    async renderTapePage() {
        const posts = await postsDataLayer.getAllPosts();
        console.log(posts);
        const tape = document.createElement('div');
        tape.classList.add('tape_wrapper');

        if (!posts) {
            const mainContent = document.createElement('h3');
            mainContent.textContent = 'Публикаций пока нет!'
            this.renderContent(mainContent);
        }

        posts.forEach( post => {
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

            tape.append(tapeElement);            
        });
        await this.renderContent(tape);

        const allPosts = document.querySelectorAll('.tape_element');
        for (let i=  0; i < allPosts.length; i++){
            const author = allPosts[i].querySelector('.author');
            const nameAuthor = await usersDataLayer.getAuthor(allPosts[i].dataset.postId);
            author.innerText = `Автор: ${nameAuthor.firstName} ${nameAuthor.secondName}`;
        }
    }
}

export const pageTape = new PageTape();