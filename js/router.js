import { page } from "./adminPage.js";
class Router {

    routes = {
        '/': page.renderHomePage,
        '/index.html': page.renderHomePage,
        '/#admin': page.renderAdminPage
    }

    root = '/'

    constructor() {
        window.onpopstate = () => {
            this.routes[this.root + location.hash]();
        }
        window.addEventListener('load', () => {
            if (location.hash) {
                this.routes[this.root + location.hash]();
            }
        })
    }

    navigate(pathname) {
        window.history.pushState(null, null, pathname);
        this.routes[pathname]();
        return this;
    }
}

export const router = new Router();