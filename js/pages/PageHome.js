import PageController from "./PageController.js";

class PageHome extends PageController{
    
    renderHomePage() {
        const mainContent = document.createElement('h3');
        mainContent.textContent = 'Main Content'
        this.renderContent(mainContent);
    }
}

export const pageHome = new PageHome();