import PageController from "./PageController.js";
import { postsDataLayer } from "../database/PostsDataLayer.js";
import { usersDataLayer } from "../database/UsersDataLayer.js";

class PageTape extends PageController {

    async renderTapePage() {
        const posts = await postsDataLayer.getAllPosts();

        const tape = document.createElement('div');
        tape.classList.add('tape_wrapper');        

        posts.forEach(async post => {

            const tapeElementTempalte = document.querySelector('#tape_element_template');
            const tapeElement = tapeElementTempalte.content.cloneNode(true);
            const divTapeEl = tapeElement.querySelector('.tape_element');
            const photoImg = tapeElement.querySelector('.photo');
            const title = tapeElement.querySelector('.title');
            divTapeEl.dataset.postId = post._id;
            photoImg.src = `data:image/jpeg;base64, ${post.photo}`;
            if (post.title) {
                title.innerText = post.title;
            }
            tape.append(tapeElement);
        });

        await this.renderContent(tape);
    }
}

export const pageTape = new PageTape();