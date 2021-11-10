import Form from './Form.js';
import { usersDataLayer } from '../database/UsersDataLayer.js';
import { postsDataLayer } from '../database/PostsDataLayer.js';
import { pagePhotoGallery } from '../pages/PagePhotoGallery.js';

export default class PostForm extends Form {

    templateURL = './templates/post-form-template.html';

    constructor(form, parentElement, authUserId, postId) {
        super(form, parentElement);
        this.authUserId = authUserId;
        this.postId = postId;
        this.getTemplate(this.templateURL);
        this.showSelectedFile();
        this.onSubmit();
    }

    async showSelectedFile() {
        await this.templateInited;

        const photoInput = document.querySelector('.field_file');
        const label = photoInput.nextElementSibling;
        const labelVal = label.querySelector('.photo_field_fake').innerText;

        photoInput.addEventListener('change', function (e) {
            const preview = document.createElement('img');
            const file = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                preview.src = reader.result;
            }

            if (file) {
                reader.readAsDataURL(file);
                label.querySelector('.photo_field_fake').innerText = '';
                label.querySelector('.photo_field_fake').append(preview);
            } else {
                preview.src = "";
                label.querySelector('.photo_field_fake').innerText = labelVal;
            }
        });

    }

    async editPost(postId) {
        await this.templateInited;
        const authUserObj = await usersDataLayer.getOneUser(this.authUserId);
        const postArray = authUserObj.posts;
        const photoIndex = postArray.indexOf(postId);
        if (photoIndex >= 0) {
            const post = await postsDataLayer.getOnePost(postId);
            this.formElement.title.value = post.title;
            const preview = this.formElement.querySelector('.photo_field_fake');
            preview.innerText = '';
            const img = document.createElement('img');
            img.src = `data:image/jpeg;base64, ${post.photo}`;
            preview.append(img);
            this.formElement.photo.required = false;
            this.formElement.submit.innerText = 'Изменить';
            return true;
        }
        return false;
    }

    async addPhotoToUser(postId) {
        const authUserObj = await usersDataLayer.getOneUser(this.authUserId);
        const postArray = authUserObj.posts;

        if (postArray) {
            postArray.push(postId);
        } else {
            postArray = [];
            postArray.push(postId);
        }
        authUserObj.posts = postArray;
        await usersDataBase.updateUser(authUserObj);
    }

    async onSubmit() {
        this.addEventListenerOnSubmit(async (e) => {
            e.preventDefault();

            const formData = new FormData(this.formElement);

            if (this.postId) {
                await postsDataLayer.updatePost(this.postId, formData);
            } else {
                const photoId = await postsDataLayer.addPost(formData);
                await this.addPhotoToUser(photoId.postId);
            }
            pagePhotoGallery.renderPhotoGalleryPage();
        });
    }
}