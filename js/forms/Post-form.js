import Form from './Form.js';
import { usersDataBase } from '../database/UsersDataBase.js';
import { postsDataBase } from '../database/PostsDataBase.js';
import { pagePhotoGallery } from '../pages/PagePhotoGallery.js';

export default class PostForm extends Form {

    templateURL = './templates/post-form-template.html';

    constructor(...args) {
        super(...args);
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

    async addPhotoToUser(photoId) {
        const authUserObj = await usersDataBase.getOneUser(this.authUserId);
        const photoArray = await pagePhotoGallery.getPhotoArray();

        if (photoArray) {
            photoArray.push(photoId);
        } else {
            photoArray = [];
            photoArray.push(photoId);
        }
        authUserObj.photo = photoArray;
        await usersDataBase.updateUser(authUserObj);
    }

    async onSubmit() {
        this.addEventListenerOnSubmit(async (e) => {
            e.preventDefault();

            const formData = new FormData(this.formElement);
            const photoId = await postsDataBase.addPost(formData);
            await this.addPhotoToUser(photoId.postId);
            pagePhotoGallery.renderPhotoGalleryPage();
        });
    }
}