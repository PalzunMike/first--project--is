class Template {

    async setTemplate(templateURL) {
        const responce = await fetch(templateURL);
        const template = await responce.text();
        return template;
    }
}

export const template = new Template();