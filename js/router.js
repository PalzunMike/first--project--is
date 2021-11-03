import { content } from "./pages/ContentRender.js";
import { authCheck } from "../js/AuthCheck.js";

class Router {

    routes = {
        '/': () => content.renderHome(),
        '/index.html': () => content.renderHome(),
        '/#': () => content.renderHome(),
        '/#admin': () => content.renderEdit(),
        '/#about_me': () => content.renderAboutMe(), // можно через bind;
        '/#photo': () => content.renderPhotoPage()
    };
    root = '/';
    logged = false;

    constructor() {
        window.addEventListener('popstate', async () => {
            await this.checkLogged();
            if ((location.hash === '#admin' || location.hash === '#photo') && !this.logged) {
                alert('Пройдите авторизацию');
                return false;
            } else {
                this.routes[this.root + location.hash]();
            }

        });

        window.addEventListener('load', async () => {
            await this.checkLogged();
            if ((location.hash === '#admin' || location.hash === '#photo') && !this.logged) {
                alert('Пройдите авторизацию');
                return false;
            } else {
                this.routes[this.root + location.hash]();
            }
        });
    }

    navigate(pathname) {
        window.history.pushState(null, null, pathname);
        this.routes[pathname]();
        return this;
    }

    checkLogged() {
        this.logged = authCheck.checkLoggedUser();
    }
}

export const router = new Router();