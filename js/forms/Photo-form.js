import Form from './Form.js';
import { popup } from '../Popup.js';
import { usersDataBase } from '../database/CollectionUsersDataBase.js';

export default class PhotoForm extends Form {

    templateURL = './templates/photo-form-template.html';

    constructor(...args) {
        super(...args);
        this.getTemplate(this.templateURL);
        this.shoeSelectedFile();
        this.onSubmit();
    }

    async shoeSelectedFile() {
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

    onSubmit() {
        this.addEventListenerOnSubmit((e) => {
            debugger;
            e.preventDefault();
        });
    }
}