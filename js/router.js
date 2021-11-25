import { authCheck } from "../js/AuthCheck.js";
import { pageEditUsers } from "./pages/PageEditUsers.js";
import { pageAbout } from "./pages/PageAbout.js";
import { pagePhotoGallery } from "./pages/PagePhotoGallery.js";
import { pageTape } from "./pages/PageTape.js";

class Router {

    routes = {
        '/': () => pageTape.renderTapePage(),
        '/index.html': () => pageTape.renderTapePage(),
        '/#': () => pageTape.renderTapePage(),
        '/#tape': () => pageTape.renderTapePage(),
        '/#admin': () => pageEditUsers.renderEditUsersPage(),
        '/#about_me': () => pageAbout.renderAboutPage(),
        '/#posts': () => pagePhotoGallery.renderPhotoGalleryPage()
    };
    root = '/';
    logged = false;

    constructor() {
        window.addEventListener('popstate', async () => {
            await this.checkLogged();
            if ((location.hash === '#admin' || location.hash === '#posts') && !this.logged) {
                alert('Пройдите авторизацию');
                return false;
            } else {
                this.routes[this.root + location.hash]();
            }

        });

        window.addEventListener('load', async () => {
            await this.checkLogged();
            if ((location.hash === '#admin' || location.hash === '#posts') && !this.logged) {
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