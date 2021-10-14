import Page from './adminPage.js'
import EnterForm from './Enter-form.js';
import RegisterForm from './Register-form.js';
import EditForm from './Edit-form.js';
import { popup } from './Popup.js';


const page = new Page();

// 
// const editForm = new EditForm('edit_form');

const modal = document.querySelector('.modal');
const enterForm = new EnterForm('login_form');

const btnBlock = document.querySelector('.btn_block');

btnBlock.addEventListener('click', async (e) => {
    if (e.target.dataset.modalTarget === '#modalLog') {
        popup.openModal(modal);
        enterForm.renderForm(modal);
        

        console.log(enterForm.formElement);

        
    } else if (e.target.dataset.modalTarget === '#modalReg') {
        popup.openModal(modal);
        const registerForm = new RegisterForm('register_form', modal);
    }
});

enterForm.addEventListenerOnSubmit((e) => {
    debugger;
    e.preventDefault();
    if (enterForm.submit()) {
        page.renderUsers();
    }
});



// registerForm.addEventListenerOnSubmit((e) => {
//     e.preventDefault();
//     if (registerForm.submit()) {
//         document.querySelector('.register_block').textContent = 'Пользователь успешно добавлен. Воспользуйтесь кнопкой входа, чтобы зайти на сайт.';
//     }
// });

const quitBtn = document.querySelector('.quit_btn');
quitBtn.addEventListener('click', page.quitUser);


const listUsers = document.querySelector('.content');
const formEditBlock = document.querySelector('.edit_block');

listUsers.addEventListener('click', (event) => {
    const users = document.querySelectorAll('.user');
    const target = event.target.closest('div');
    const loginUser = target.dataset.login;
    const btnAction = event.target.dataset.buttonAction;


    if (btnAction === 'remove') {
        editForm.deleteUser(loginUser, users);
    } else if (btnAction === 'edit') {

        const editOpenBtn = document.querySelector('.edit');
        const modalEditWindow = document.querySelector(editOpenBtn.dataset.modalTarget);
        popup.openModal(modalEditWindow);

        popup.clear(1);
        modalEditWindow.append(formEditBlock);
        editForm.editUser(loginUser);
    }
});

// const responce = await fetch('./templates/enter_form_template.html');
// const template = await responce.text();

// // let div = document.createElement('div');
// // div.style = 'position:fixed;top:10px;left:10px;width:100px';
// // document.body.append(div);

// // div.src = URL.createObjectURL(template);

// // const fragment = new DocumentFragment();
// const modalTest = document.querySelector('#modalLog');

// console.log(modalTest)

// const div = document.createElement('div');

// div.insertAdjacentHTML('afterbegin', template);

// // fragment.append(div);


// modalTest.insertAdjacentHTML('afterbegin', template);




// console.log(div);







