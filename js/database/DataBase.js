export default class DataBase {
    
    proxyURL = 'http://localhost:5000/api';

    async post(url, body) {
        try {
            body = JSON.stringify(body);
            const response = await fetch(`${this.proxyURL}${url}`, { method: 'POST', body: `${body}`, headers: { 'Content-Type': 'application/json' } });
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
        try {
            const response = await fetch(`${this.proxyURL}${url}`, { method: 'GET' });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async put(url, body) {
        try {
            body = JSON.stringify(body);
            const response = await fetch(`${this.proxyURL}${url}`, { method: 'PUT', body: `${body}`, headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async delete(url) {
        try {
            const response = await fetch(`${this.proxyURL}${url}`, { method: 'DELETE' });
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }
}
