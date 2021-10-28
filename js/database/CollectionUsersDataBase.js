import DataBase from "./DataBase.js";

class UsersDataBase extends DataBase {

    basicURL = '/users';

    async registerUser(body) {
        const URL = `${this.basicURL}/register`;
        const response = await this.post(URL, body);
        return response;
    }

    async authUser(body) {
        const URL = `${this.basicURL}/auth`;
        const response = await this.post(URL, body);
        return response;
    }

    async getAllUsers() {
        const response = await this.get(this.basicURL);
        return response;
    }

    async getOneUser(userId) {
        const URL = `${this.basicURL}/${userId}`;
        const response = await this.get(URL);
        return response;
    }

    async updateUser(body) {
        const response = await this.put(this.basicURL, body);
        return response;        
    }

    async deleteUser(userId) {
        const URL = `${this.basicURL}/${userId}`;
        const response = await this.delete(URL);
        return response;        
    }
}

export const usersDataBase = new UsersDataBase();