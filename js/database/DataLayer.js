import { authCheck } from "../AuthCheck.js";
export default class DataLayer {

    proxyURL = 'http://localhost:5000/api';
    access_token;
    constructor() {
        this.checkToken();
    }

    async checkToken() {
        this.access_token = await authCheck.checkLoggedUser();
    }

    async requestWithFormData(url, body, method) {
        await this.checkToken();
        try {
            const response = await fetch(`${this.proxyURL}${url}`, { method: method, body: body, headers: { 'Authorization': `Bearer ${this.access_token}` } });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }
            return data;
        } catch (e) {
            return e;
        }
    }

    async post(url, body) {
        try {
            body = JSON.stringify(body);
            const response = await fetch(`${this.proxyURL}${url}`, { method: 'POST', body: `${body}`, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.access_token}` } });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }
            return data;
        } catch (e) {
            return e;
        }
    }

    async get(url) {
        await this.checkToken();
        try {
            const response = await fetch(`${this.proxyURL}${url}`, { method: 'GET', headers: { 'Authorization': `Bearer ${this.access_token}` } });
            const data = await response.json();
            return data;
        } catch (e) {
            return e.message;
        }
    }

    async put(url, body) {
        await this.checkToken();
        try {
            body = JSON.stringify(body);
            const response = await fetch(`${this.proxyURL}${url}`, { method: 'PUT', body: `${body}`, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.access_token}` } });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async delete(url) {
        await this.checkToken();
        try {
            const response = await fetch(`${this.proxyURL}${url}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.access_token}` } });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }
}
