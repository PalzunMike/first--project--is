import DataBase from "./DataBase.js";

class FileUpload extends DataBase{
    async sendPhoto(body){
        try {
            const response = await fetch(`${this.proxyURL}/upload`, { method: 'POST', body: body});
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }
            return data;
        } catch (e) {
            return e;
        }
    }
}

export const fileUpload = new FileUpload();