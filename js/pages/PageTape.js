import PageController from "./PageController.js";
import { postsDataLayer } from "../database/PostsDataLayer.js";
import { usersDataLayer } from "../database/UsersDataLayer.js";

class PageTape extends PageController {

    async renderTapePage() {
        const posts = await postsDataLayer.getAllPosts();
        // const mainContent = document.createElement('h3');
        // mainContent.textContent = 'Main Content'
        // this.renderContent(mainContent);
    }
}

export const pageTape = new PageTape();