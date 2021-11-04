import Form from './Form.js';
import { usersDataBase } from '../database/UsersDataBase.js';
import { fileUpload } from '../database/FileLoader.js';
import { pagePhotoGallery } from '../pages/PagePhotoGallery.js';

export default class PhotoForm extends Form {

    templateURL = './templates/photo-form-template.html';

    constructor(...args) {
        super(...args);
        this.getTemplate(this.templateURL);
        this.showSelectedFile();
        this.onSubmit();
    }

    async showSelectedFile() {
        await this.templateInited;
        let photoInputs = document.querySelectorAll('.field_file');
        Array.prototype.forEach.call(photoInputs, function (input) {
            let label = input.nextElementSibling,
                labelVal = label.querySelector('.photo_field_fake').innerText;

            input.addEventListener('change', function (e) {
                let countFiles = '';
                if (this.files && this.files.length >= 1)
                    countFiles = this.files.length;

                if (countFiles)
                    label.querySelector('.photo_field_fake').innerText = 'Выбрано файлов: ' + countFiles;
                else
                    label.querySelector('.photo_field_fake').innerText = labelVal;
            });
        });
    }

    async addPhotoToUser(photoPath) {
        const authUserObj = await usersDataBase.getOneUser(this.authUserId);
        const photoArray = await pagePhotoGallery.getPhotoArray();

        if (photoArray) {
            photoArray.push(photoPath);
        } else {
            photoArray = [];
            photoArray.push(photoPath);
        }
        authUserObj.photo = photoArray;
        await usersDataBase.updateUser(authUserObj);
    }

    async onSubmit() {
        this.addEventListenerOnSubmit(async (e) => {
            e.preventDefault();

            const formData = new FormData(this.formElement);
            const photoPath = await fileUpload.sendPhoto(formData);

            await this.addPhotoToUser(photoPath);
            pagePhotoGallery.renderPhotoGalleryPage();
        });
    }
}