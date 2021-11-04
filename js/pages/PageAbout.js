import PageController from "./PageController.js";
import {template} from "../TemplateEngine.js";

class PageAbout extends PageController{

    async renderAboutPage() {
        const templateAbout = await template.setTemplate('./templates/about-me-template.html');
        this.renderContent(templateAbout);
    }
}

export const pageAbout = new PageAbout();