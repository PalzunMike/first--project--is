import RegisterForm from './Register-form.js';

export default class EditForm extends RegisterForm {

    deleteUser(login) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].dataset.login === login) {
                users[i].remove();
                delete localUserObj[login];
                localStorageSetInfo('users', localUserObj);
            }
        }
    }

    editUser(login) {

        console.log(login);

        //Наполняем форму из local storage соответвующими значениями;
        for (let index of editForm.formElement) {
            if (index.type !== 'radio') {
                let inputName = index.name;
                index.value = localUserObj[login][inputName];
            }
        }

        //Проверяем признак sex в local storage, и ставим checked на соответвующий radio button;
        if (localUserObj[login].sex === 'male') {
            document.getElementById('radioMale').checked = true
        } else if (localUserObj[login].sex === 'female') {
            document.getElementById('radioFemale').checked = true
        }

        //При submit формы меняем объект localUserObj и перезаписываем его в local Storage;
        editForm.addEventListenerOnSubmit((e) => {
            e.preventDefault();
            if (editForm.submit()) {
                editForm.userObj.sex = editForm.formElement.sex.value;

                localUserObj[login] = editForm.userObj;

                console.log(login);

                localStorageSetInfo('users', localUserObj);

                clear(modalEl, 1);
                let message = document.createElement('div');
                message.id = 'succesEdit';
                message.textContent = 'Пользователь успешно изменен!';
                modalEl.append(message);
            }
        })
    }
}