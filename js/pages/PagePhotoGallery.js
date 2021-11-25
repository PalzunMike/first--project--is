import PageController from "./PageController.js";
import { authCheck } from "../AuthCheck.js";
import { usersDataLayer } from "../database/UsersDataLayer.js"
import { postsDataLayer } from '../database/PostsDataLayer.js';

class PagePhotoGallery extends PageController {

    async renderPhotoGalleryPage() {
        const photoPageWrapper = document.createElement('div');
        photoPageWrapper.classList.add('photo_wrapper');
        const template = document.querySelector('#photo_template');
        const photoBlock = template.content.cloneNode(true);
        photoPageWrapper.append(photoBlock);
        await this.renderContent(photoPageWrapper);
        await this.renderPhotoArea();
    }

    async renderPhotoArea() {
        const authUserObj = await usersDataLayer.getOneUser(this.authUserId);

        const postsArray = authUserObj.posts;
        const photoArea = document.querySelector('.photo_area');

        postsArray.forEach(async post => {
            const postElementTempalte = document.querySelector('#post_element_template');
            const photoElement = postElementTempalte.content.cloneNode(true);
            const divPostEl = photoElement.querySelector('.post_element');
            const photoImg = photoElement.querySelector('.photo');
            const title = photoElement.querySelector('.title');
            divPostEl.dataset.postId = post._id;
            photoImg.src = `data:image/jpeg;base64, ${post.photo}`;
            if (post.title) {
                title.innerText = post.title;
            }
            photoArea.append(photoElement);
        });
    }

    async deletePhoto(postId) {
        await postsDataLayer.deletePost(postId);
    }
}

export const pagePhotoGallery = new PagePhotoGallery();