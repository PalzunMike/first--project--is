import { authCheck } from "../js/AuthCheck.js";
import { pageHome } from "./pages/PageHome.js";
import { pageEditUsers } from "./pages/PageEditUsers.js";
import { pageAbout } from "./pages/PageAbout.js";
import { pagePhotoGallery } from "./pages/PagePhotoGallery.js"

class Router {

    routes = {
        '/': () => pageHome.renderHomePage(),
        '/index.html': () => pageHome.renderHomePage(),
        '/#': () => pageHome.renderHomePage(),
        '/#admin': () => pageEditUsers.renderEditUsersPage(),
        '/#about_me': () => pageAbout.renderAboutPage(),       // TODO: можно через bind;
        '/#photo': () => pagePhotoGallery.renderPhotoGalleryPage()
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