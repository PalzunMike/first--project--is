import { content } from "./pages/ContentRender.js"

class Router {

    routes = {
        '/': () => content.renderHome(),
        '/index.html': () => content.renderHome(),
        '/#': () => content.renderHome(),
        '/#admin': () => content.renderEdit(),
        '/#about_me': () => content.renderAboutMe(), // можно через bind;
        '/#photo': () => content.renderPhoto()
    };
    root = '/';
    logged = false;

    constructor() {
        window.addEventListener('popstate', async () => { 
            await this.checkLogged();           
            if (location.hash === '#admin' && !this.logged) {
                alert('Пройдите авторизацию');                
                return false;
            } else {
                this.routes[this.root + location.hash]();
            }

        });

        window.addEventListener('load', async () => {
            await this.checkLogged();  
            if (location.hash === '#admin' && !this.logged) {
                alert('Пройдите авторизацию');
                return false;
            }else{
                this.routes[this.root + location.hash]();
            }
        });
    }

    navigate(pathname) {
        window.history.pushState(null, null, pathname);
        this.routes[pathname]();
        return this;
    }

    async checkLogged(){
        this.logged = await content.checkLoggedUser();
    }
}

export const router = new Router();